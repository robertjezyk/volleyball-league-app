import prisma from "@/utils/db";

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
