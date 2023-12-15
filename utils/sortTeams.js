export const sortTeams = (teams) => {
  teams.sort((a, b) => {
    // Sort by points (descending)
    if (b.points !== a.points) {
      return b.points - a.points;
    }

    // Sort by won (descending)
    if (b.won !== a.won) {
      return b.won - a.won;
    }

    // Sort by difference between setsFor & setsAgainst (descending)
    const diffSetsB = b.setsFor - b.setsAgainst;
    const diffSetsA = a.setsFor - a.setsAgainst;
    if (diffSetsB !== diffSetsA) {
      return diffSetsB - diffSetsA;
    }

    // Sort by difference between pointsFor & pointsAgainst (descending)
    const diffPointsB = b.pointsFor - b.pointsAgainst;
    const diffPointsA = a.pointsFor - a.pointsAgainst;
    return diffPointsB - diffPointsA;
  });

  return teams;
};
