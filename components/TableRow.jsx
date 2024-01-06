import Image from "next/image";
import { VscWorkspaceUnknown } from "react-icons/vsc";

export const TableRow = ({ teamData, position }) => {
  const {
    team: { name, badge },
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
    <tr className="hover border border-slate-700">
      <td className="position w-4 border-r border-slate-700">{position}</td>
      <td className="team flex gap-3 pl-4 items-center">
        {badge ? (
          <Image
            src={badge}
            width={24}
            height={24}
            className="w-6 h-6 rounded shrink-0"
            priority
            alt={`${name} badge`}
          />
        ) : (
          <VscWorkspaceUnknown size={20} className="mr-1 shrink-0" />
        )}
        {name}
      </td>
      <td className="points font-bold text-center">{points}</td>
      <td className="played text-center">{played}</td>
      <td className="wins text-center">{won}</td>
      <td className="losses text-center">{lost}</td>
      <td className="sets-for text-center">{setsFor}</td>
      <td className="sets-against text-center">{setsAgainst}</td>
      <td className="sets-diff text-center">{setsFor - setsAgainst}</td>
      <td className="points-for text-center">{pointsFor}</td>
      <td className="points-against text-center">{pointsAgainst}</td>
      <td className="points-diff text-center">{pointsFor - pointsAgainst}</td>
    </tr>
  );
};
