import { format } from "date-fns";
import Image from "next/image";
import { VscWorkspaceUnknown } from "react-icons/vsc";

import { DeleteForm } from "@/components/DeleteForm";

const UnknownBadge = () => (
  <div className="w-6 h-6 flex justify-center items-center text-slate-500">
    <VscWorkspaceUnknown size={20} />
  </div>
);

const TeamBadge = ({ team }) => (
  <Image
    src={team.badge}
    width={24}
    height={24}
    className="w-6 h-6 rounded"
    priority
    alt={`${team.name} badge`}
  />
);

export const Match = ({ match, showDeleteButton }) => {
  const homeTeamWon = match.setsHome > match.setsAway;
  const homeTeamClassName = `flex gap-2 items-center text-lg capitalize ${
    homeTeamWon ? "text-slate-100" : "text-slate-500"
  }`;
  const awayTeamClassName = `flex gap-2 items-center text-lg capitalize ${
    !homeTeamWon ? "text-slate-100" : "text-slate-500"
  }`;
  const triangleClassName =
    "border-t-4 border-b-4 border-r-8 border-r-white border-t-transparent border-b-transparent block w-4 h-2";

  return (
    <li className="p-4 border border-base-300 rounded-lg shadow-lg bg-black pr-0">
      <span className="flex justify-between text-xs mb-2 text-lime-500">
        {format(match.date, "d LLL yy")}
        {showDeleteButton && <DeleteForm id={match.id} />}
      </span>
      <div className="flex justify-between gap-2 items-center">
        <div>
          <h3 className={homeTeamClassName}>
            {match.homeTeam.badge ? (
              <TeamBadge team={match.homeTeam} />
            ) : (
              <UnknownBadge />
            )}
            {match.homeTeam.name}
          </h3>
          <h3 className={awayTeamClassName}>
            {match.awayTeam.badge ? (
              <TeamBadge team={match.awayTeam} />
            ) : (
              <UnknownBadge />
            )}
            {match.awayTeam.name}
          </h3>
        </div>

        <div className="flex">
          <div>
            <h3 className={homeTeamClassName}>{match.setsHome}</h3>
            <h3 className={awayTeamClassName}>{match.setsAway}</h3>
          </div>
          <div className="divider divider-horizontal divider-neutral"></div>
          <div>
            <h3 className={homeTeamClassName}>{match.pointsHome}</h3>
            <h3 className={awayTeamClassName}>{match.pointsAway}</h3>
          </div>
          <div>
            <div className="h-[28px] flex flex-col justify-center">
              <span className={homeTeamWon ? triangleClassName : ""} />
            </div>
            <div className="h-[28px] flex flex-col justify-center">
              <span className={!homeTeamWon ? triangleClassName : ""} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
