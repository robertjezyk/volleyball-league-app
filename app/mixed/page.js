import { sortTeams } from "@/utils/sortTeams";
import { getMixedStandings } from "@/utils/actions";
import { TableRow } from "@/components/TableRow";
import { TableHead } from "@/components/TableHead";

const MixedPage = async () => {
  const data = await getMixedStandings();
  const sortedData = sortTeams(data);

  return (
    <>
      <h1 className="text-4xl mb-8">League Table</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <TableHead />
          <tbody>
            {sortedData.map((team, index) => (
              <TableRow teamData={team} position={index + 1} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MixedPage;
