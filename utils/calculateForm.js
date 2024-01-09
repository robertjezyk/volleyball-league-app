export const calculateForm = (teamId, playedMatches = []) => {
  if (!teamId) {
    return;
  }

  const reversed = playedMatches.slice().reverse();

  return reversed
    .filter(
      (match) => match.homeTeamId === teamId || match.awayTeamId === teamId
    )
    .map((match) =>
      (match.homeTeamId === teamId && match.setsHome > match.setsAway) ||
      (match.awayTeamId === teamId && match.setsAway > match.setsHome)
        ? "W"
        : "L"
    );
};
