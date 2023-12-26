export const Match = ({ match }) => {
  return (
    <li className="flex justify-center gap-2 items-center p-4 border border-base-300 rounded-lg shadow-lg bg-black">
      <h3 className="text-lg capitalize">{match.homeTeam.name}</h3>
      <div
        className="tooltip tooltip-info"
        data-tip={`${match.pointsHome}:${match.pointsAway}`}
      >
        <div className="badge badge-accent badge-outline font-semibold">
          {match.setsHome}:{match.setsAway}
        </div>
      </div>
      <h3 className="text-lg capitalize">{match.awayTeam.name}</h3>
    </li>
  );
};
