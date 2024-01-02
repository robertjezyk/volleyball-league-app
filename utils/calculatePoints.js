export const calculateLeaguePoints = (setsFor) => {
  switch (setsFor) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 4;
    case 3:
      return 5;
    default:
      return 0;
  }
};
