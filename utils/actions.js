import prisma from "@/utils/db";

export const getLeagues = async () => await prisma.league.findMany();

export const getStandings = (type) => async () =>
  await prisma.teamStanding.findMany({
    where: {
      team: {
        league: {
          type,
        },
      },
    },
    orderBy: [{ points: "desc" }, { won: "desc" }],
    include: {
      team: {
        select: {
          name: true,
        },
      },
    },
  });

export const getStandingsByLeagueId = (leagueId) => async () =>
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
        },
      },
    },
  });

export const getMatchesForLeague = async (leagueId) =>
  await prisma.match.findMany({
    where: {
      leagueId,
    },
    include: {
      homeTeam: true,
      awayTeam: true,
    },
  });
