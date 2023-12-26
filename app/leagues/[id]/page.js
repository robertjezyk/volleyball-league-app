import { sortTeams } from "@/utils/sortTeams";
import { getStandingsByLeagueId, getMatchesForLeague } from "@/utils/actions";
import { TableRow } from "@/components/TableRow";
import { TableHead } from "@/components/TableHead";
import { Match } from "@/components/Match";

export const dynamic = "force-dynamic";

const LeaguePage = async ({ params }) => {
  const standings = await getStandingsByLeagueId(params.id)();
  const matches = await getMatchesForLeague(params.id);

  const sortedStandings = sortTeams(standings);

  return (
    <>
      <h2 className="text-4xl mb-8">League Table</h2>
      <table className="table">
        <TableHead />
        <tbody>
          {sortedStandings.map((team, index) => (
            <TableRow teamData={team} position={index + 1} key={index} />
          ))}
        </tbody>
      </table>
      <h2 className="text-4xl mt-24 mb-8">Games ({matches.length})</h2>
      <ul className="grid gap-4 grid-cols-2">
        {matches.map((match) => (
          <Match match={match} key={match.id} />
        ))}
      </ul>
    </>
  );
};

export default LeaguePage;
