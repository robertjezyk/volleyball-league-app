import { EditStandingForm } from "@/components/EditStandingForm";

const TeamStanding = ({ params }) => {
  return (
    <EditStandingForm
      teamStandingId={params.teamStandingId}
      teamId={params.id}
    />
  );
};

export default TeamStanding;
