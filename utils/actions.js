"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import prisma from "@/utils/db";
import { calculateLeaguePoints } from "@/utils/calculatePoints";

export const getLeagues = async () => await prisma.league.findMany();

export const getLeague = async (leagueId) =>
  await prisma.league.findUnique({
    where: {
      id: leagueId,
    },
  });

export const getLeagueStandings = (leagueId) => async () =>
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
  }
};

export const deleteMatch = async (prevState, formData) => {
  const id = formData.get("id");

  try {
    await prisma.match.delete({
      where: {
        id,
      },
    });
    revalidatePath("/leagues/[id]", "page");
    return { message: "deleted" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
};
