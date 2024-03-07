"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import prisma from "@/utils/db";
import { calculateLeaguePoints } from "@/utils/calculatePoints";
import { redirect } from "next/navigation";
import { differenceWith, isEqual } from "lodash";

export const getLeagues = async () => await prisma.league.findMany();

export const getLeague = async (leagueId) =>
  await prisma.league.findUnique({
    where: {
      id: leagueId,
    },
  });

export const getLeagueStandings = async (leagueId) =>
  await prisma.teamStanding.findMany({
    where: {
      team: {
        league: {
          id: leagueId,
        },
      },
    },
    orderBy: [{ points: "desc" }, { won: "desc" }],
    include: {
      team: {
        select: {
          id: true,
          name: true,
          badge: true,
        },
      },
    },
  });

export const getLeagueMatches = async (leagueId, teamId) =>
  await prisma.match.findMany({
    where: {
      leagueId,
      ...(teamId && { OR: [{ homeTeamId: teamId }, { awayTeamId: teamId }] }),
    },
    include: {
      homeTeam: true,
      awayTeam: true,
    },
    orderBy: {
      date: "desc",
    },
  });

export const getLeagueTeams = async (leagueId) =>
  await prisma.team.findMany({
    where: {
      league: {
        id: leagueId,
      },
    },
  });

export const getTeamById = async (teamId) =>
  await prisma.team.findUnique({
    where: {
      id: teamId,
    },
  });

export const getTeamStandingById = async (teamStandingId) =>
  await prisma.teamStanding.findUnique({
    where: {
      teamStandingId,
    },
    include: {
      team: {
        select: {
          id: true,
          name: true,
          leagueId: true,
        },
      },
    },
  });

export const updateStanding = async (formData) => {
  const teamId = formData.get("teamId");
  const leagueId = formData.get("leagueId");
  const teamStandingId = formData.get("teamStandingId");
  const points = parseInt(formData.get("points"));
  const played = parseInt(formData.get("played"));
  const won = parseInt(formData.get("won"));
  const lost = parseInt(formData.get("lost"));
  const setsFor = parseInt(formData.get("setsFor"));
  const setsAgainst = parseInt(formData.get("setsAgainst"));
  const pointsFor = parseInt(formData.get("pointsFor"));
  const pointsAgainst = parseInt(formData.get("pointsAgainst"));

  await prisma.teamStanding.update({
    where: { teamStandingId },
    data: {
      teamStandingId,
      points,
      played,
      won,
      lost,
      setsFor,
      setsAgainst,
      pointsFor,
      pointsAgainst,
    },
  });
  revalidatePath(`/leagues/${leagueId}`);
  revalidatePath(`/teams/${teamId}`);
  redirect(`/leagues/${leagueId}`);
};

export const createMatch = async (prevState, formData) => {
  const leagueId = formData.get("leagueId");
  const homeTeamId = formData.get("homeTeamId");
  const awayTeamId = formData.get("awayTeamId");
  const setsHome = parseInt(formData.get("setsHome"), 10);
  const setsAway = parseInt(formData.get("setsAway"), 10);
  const pointsHome = parseInt(formData.get("pointsHome"), 10);
  const pointsAway = parseInt(formData.get("pointsAway"), 10);
  const date = new Date(formData.get("date"));
  const league = await getLeague(leagueId);

  const leagueType = league.type;

  const Match = z.object({
    leagueType: z.enum(["women", "men", "mixed"]),
    leagueId: z.string(),
    homeTeamId: z.string(),
    awayTeamId: z.string(),
    setsHome: z.number().refine((value) => value <= 3, {
      message: "Number must not be greater than 3",
    }),
    setsAway: z.number().refine((value) => value <= 3, {
      message: "Number must not be greater than 3",
    }),
    pointsHome: z.number().refine((value) => value >= 0, {
      message: "Number must be greater than 0",
    }),
    pointsAway: z.number().refine((value) => value >= 0, {
      message: "Number must be greater than 0",
    }),
    date: z.date(),
  });

  try {
    Match.parse({
      leagueType,
      leagueId,
      homeTeamId,
      awayTeamId,
      setsHome,
      setsAway,
      pointsHome,
      pointsAway,
      date,
    });

    await prisma.teamStanding.update({
      where: { teamStandingId: homeTeamId },
      data: {
        points: {
          increment: calculateLeaguePoints(setsHome),
        },
        played: {
          increment: 1,
        },
        won: {
          increment: setsHome > setsAway ? 1 : 0,
        },
        lost: {
          increment: setsHome < setsAway ? 1 : 0,
        },
        setsFor: {
          increment: setsHome,
        },
        setsAgainst: {
          increment: setsAway,
        },
        pointsFor: {
          increment: pointsHome,
        },
        pointsAgainst: {
          increment: pointsAway,
        },
      },
    });

    await prisma.teamStanding.update({
      where: { teamStandingId: awayTeamId },
      data: {
        points: {
          increment: calculateLeaguePoints(setsAway),
        },
        played: {
          increment: 1,
        },
        won: {
          increment: setsHome < setsAway ? 1 : 0,
        },
        lost: {
          increment: setsHome > setsAway ? 1 : 0,
        },
        setsFor: {
          increment: setsAway,
        },
        setsAgainst: {
          increment: setsHome,
        },
        pointsFor: {
          increment: pointsAway,
        },
        pointsAgainst: {
          increment: pointsHome,
        },
      },
    });

    await prisma.match.create({
      data: {
        date,
        leagueId,
        leagueType,
        homeTeamId,
        awayTeamId,
        setsHome,
        setsAway,
        pointsHome,
        pointsAway,
        leaguePointsHome: calculateLeaguePoints(setsHome),
        leaguePointsAway: calculateLeaguePoints(setsAway),
      },
    });
    revalidatePath("/leagues/[id]", "page");
    return { message: "success" };
  } catch (error) {
    console.log(error);
    return { message: "database error. failed to create match" };
  } finally {
    redirect(`/leagues/${leagueId}`);
  }
};

export const deleteMatch = async (prevState, formData) => {
  const id = formData.get("id");

  const {
    homeTeamId,
    awayTeamId,
    setsHome,
    setsAway,
    pointsHome,
    pointsAway,
    // leagueId,
  } = await prisma.match.findUnique({
    where: {
      id,
    },
  });

  try {
    await prisma.match.delete({
      where: {
        id,
      },
    });

    await prisma.teamStanding.update({
      where: { teamStandingId: homeTeamId },
      data: {
        points: {
          decrement: calculateLeaguePoints(setsHome),
        },
        played: {
          decrement: 1,
        },
        won: {
          decrement: setsHome > setsAway ? 1 : 0,
        },
        lost: {
          decrement: setsHome < setsAway ? 1 : 0,
        },
        setsFor: {
          decrement: setsHome,
        },
        setsAgainst: {
          decrement: setsAway,
        },
        pointsFor: {
          decrement: pointsHome,
        },
        pointsAgainst: {
          decrement: pointsAway,
        },
      },
    });

    await prisma.teamStanding.update({
      where: { teamStandingId: awayTeamId },
      data: {
        points: {
          decrement: calculateLeaguePoints(setsAway),
        },
        played: {
          decrement: 1,
        },
        won: {
          decrement: setsHome < setsAway ? 1 : 0,
        },
        lost: {
          decrement: setsHome > setsAway ? 1 : 0,
        },
        setsFor: {
          decrement: setsAway,
        },
        setsAgainst: {
          decrement: setsHome,
        },
        pointsFor: {
          decrement: pointsAway,
        },
        pointsAgainst: {
          decrement: pointsHome,
        },
      },
    });
    revalidatePath("/leagues/[id]", "page");
    return { message: "deleted" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
};

export const getRemainingLeagueMatches = async (leagueId, teamId, teamName) => {
  // Fetch opponents in the league
  const opponentTeams = await prisma.team.findMany({
    where: {
      leagueId,
      id: {
        not: teamId,
      },
    },
  });

  const possibleMatches = opponentTeams.flatMap((opponent) => [
    {
      homeTeam: { id: teamId, name: teamName },
      awayTeam: { id: opponent.id, name: opponent.name },
    },
    {
      homeTeam: { id: opponent.id, name: opponent.name },
      awayTeam: { id: teamId, name: teamName },
    },
  ]);

  // Fetch all team's matches
  const teamMatches = await prisma.match.findMany({
    where: {
      leagueId,
      OR: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
    },
    include: {
      homeTeam: true,
      awayTeam: true,
    },
  });

  const playedMatches = teamMatches.map((match) => ({
    homeTeam: {
      id: match.homeTeamId,
      name: match.homeTeam.name,
    },
    awayTeam: {
      id: match.awayTeamId,
      name: match.awayTeam.name,
    },
  }));

  const remainingMatches = differenceWith(
    possibleMatches,
    playedMatches,
    isEqual
  );

  return remainingMatches;
};
