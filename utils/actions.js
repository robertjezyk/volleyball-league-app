import prisma from "@/utils/db";

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
      date: "asc",
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
