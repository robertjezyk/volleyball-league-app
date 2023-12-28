import { sortTeams } from "@/utils/sortTeams";
import {
  getLeagueStandings,
  getLeagueMatches,
  getLeagueTeams,
  getLeague,
} from "@/utils/actions";
import { TableRow } from "@/components/TableRow";
import { TableHead } from "@/components/TableHead";
import { GamesSection } from "@/components/GamesSection";

export const dynamic = "force-dynamic";

const LeaguePage = async ({ params }) => {
  const league = await getLeague(params.id);
  const standings = await getLeagueStandings(params.id)();
  const matches = await getLeagueMatches(params.id);
  const teams = await getLeagueTeams(params.id);

  const sortedStandings = sortTeams(standings);

  return (
    <>
      <h2 className="text-2xl mb-8 flex justify-between items-center">
        League Table <kbd className="kbd kbd-lg">{league.season}</kbd>
      </h2>
      <div className="overflow-x-scroll">
        <table className="table">
          <TableHead />
          <tbody>
            {sortedStandings.map((team, index) => (
              <TableRow teamData={team} position={index + 1} key={index} />
            ))}
          </tbody>
        </table>
      </div>
      {/* TODO: Change to server side filtering */}
      <GamesSection matches={matches} teams={teams} />
    </>
  );
};

export default LeaguePage;
