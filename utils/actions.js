import prisma from "@/utils/db";

export const getMenStandings = async () =>
  await prisma.teamMenStanding.findMany({
    orderBy: [{ points: "desc" }, { won: "desc" }],
    include: {
      team: {
        select: {
          name: true,
        },
      },
    },
  });

export const getMixedStandings = async () =>
  await prisma.teamMixedStanding.findMany({
    orderBy: [{ points: "desc" }, { won: "desc" }],
    include: {
      team: {
        select: {
          name: true,
        },
      },
    },
  });

export const getWomenStandings = async () =>
  await prisma.teamWomenStanding.findMany({
    orderBy: [{ points: "desc" }, { won: "desc" }],
    include: {
      team: {
        select: {
          name: true,
        },
      },
    },
  });
