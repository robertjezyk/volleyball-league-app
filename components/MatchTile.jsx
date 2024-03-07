export const MatchTile = ({ match, teamId }) => {
  const { homeTeam, awayTeam } = match;
  return (
    <li className="p-4 border border-base-300 rounded-lg shadow-lg bg-black">
      <div className="flex flex-col justify-between gap-1 items-center">
        <h3
          className={`${
            homeTeam.id !== teamId ? "text-slate-100" : "text-slate-500"
          }`}
        >
          {homeTeam.name}
        </h3>
        <div className="divider my-1">
          <p className="text-sm">&#8645;</p>
        </div>
        <h3
          className={`${
            awayTeam.id !== teamId ? "text-slate-100" : "text-slate-500"
          }`}
        >
          {awayTeam.name}
        </h3>
      </div>
    </li>
  );
};
