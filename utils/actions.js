import prisma from "@/utils/db";

export const getLeagues = async () => await prisma.league.findMany();

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

export const getMatchesForLeague = async (leagueId, teamId) =>
  await prisma.match.findMany({
    where: {
      leagueId,
      ...(teamId && { OR: [{ homeTeamId: teamId }, { awayTeamId: teamId }] }),
    },
    include: {
      homeTeam: true,
      awayTeam: true,
    },
  });
