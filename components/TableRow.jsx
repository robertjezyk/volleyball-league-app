export const TableRow = ({ teamData, position }) => {
  const {
    team: { name },
    points,
    played,
    won,
    lost,
    setsFor,
    setsAgainst,
    pointsFor,
    pointsAgainst,
  } = teamData;
  return (
    <tr className="hover">
      <td className="position w-4">{position}</td>
      <td className="team">{name}</td>
      <td className="points font-bold text-center">{points}</td>
      <td className="played text-center">{played}</td>
      <td className="wins text-center">{won}</td>
      <td className="losses text-center">{lost}</td>
      <td className="sets-for text-center">{setsFor}</td>
      <td className="sets-against text-center">{setsAgainst}</td>
      <td className="points-for text-center">{pointsFor}</td>
      <td className="points-against text-center">{pointsAgainst}</td>
    </tr>
  );
};
