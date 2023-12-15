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
      <th className="position">{position}</th>
      <td className="team">{name}</td>
      <td className="points">{points}</td>
      <td className="played">{played}</td>
      <td className="wins">{won}</td>
      <td className="losses">{lost}</td>
      <th className="sets-for">{setsFor}</th>
      <td className="sets-against">{setsAgainst}</td>
      <td className="points-for">{pointsFor}</td>
      <td className="points-against">{pointsAgainst}</td>
    </tr>
  );
};
