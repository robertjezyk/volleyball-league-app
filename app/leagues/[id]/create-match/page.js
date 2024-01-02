import { CreateMatchForm } from "@/components/CreateMatchForm";
import { getLeagueTeams } from "@/utils/actions";

const CreateMatchPage = async ({ params }) => {
  const teams = await getLeagueTeams(params.id);
  return <CreateMatchForm leagueId={params.id} teams={teams} />;
};

export default CreateMatchPage;
