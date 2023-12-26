export const Match = ({ match }) => {
  const homeTeamWon = match.setsHome > match.setsAway;
  const homeTeamClassName = `text-lg capitalize ${
    homeTeamWon ? "text-slate-100" : "text-slate-500"
  }`;
  const awayTeamClassName = `text-lg capitalize ${
    !homeTeamWon ? "text-slate-100" : "text-slate-500"
  }`;
  const triangleClassName =
    "border-t-4 border-b-4 border-r-8 border-r-white border-t-transparent border-b-transparent block w-4 h-2";

  return (
    <li className="flex justify-between gap-2 items-center p-4 border border-base-300 rounded-lg shadow-lg bg-black pr-0">
      <div>
        <h3 className={homeTeamClassName}>{match.homeTeam.name}</h3>
        <h3 className={awayTeamClassName}>{match.awayTeam.name}</h3>
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
    </li>
  );
};
