import Image from "next/image";
import { VscWorkspaceUnknown } from "react-icons/vsc";

import {
  getLeague,
  getLeagueMatches,
  getTeamById,
  getLeagueStandings,
} from "@/utils/actions";
import { calculateForm } from "@/utils/calculateForm";
import { sortTeams } from "@/utils/sortTeams";
import { Match } from "@/components/Match";

const TeamPage = async ({ params }) => {
  const team = await getTeamById(params.id);

  if (!team) {
    return "Team doesn't exist";
  }
  const { name, leagueId, badge } = team;
  const { type } = await getLeague(leagueId);
  const gamesPlayed = await getLeagueMatches(leagueId, params.id);
  const form = calculateForm(params.id, gamesPlayed);
  const standings = await getLeagueStandings(leagueId);
  const position =
    sortTeams(standings).findIndex(
      (standing) => standing.team.id === params.id
    ) + 1;

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="grow">
          <h2 className="text-2xl mb-8 flex justify-start items-center">
            <span className="basis-40">Team:</span>
            <kbd className="kbd kbd-lg">{name}</kbd>
          </h2>
          <h2 className="text-2xl mb-8 flex justify-start items-center capitalize">
            <span className="basis-40">League:</span>
            <kbd className="kbd kbd-lg">{type}</kbd>
          </h2>
          {position && (
            <h2 className="text-2xl mb-8 flex justify-start items-center">
              <span className="basis-40">Position:</span>
              <kbd className="kbd kbd-lg">{position}</kbd>
            </h2>
          )}
          <h2 className="text-2xl mb-8 flex justify-start items-center">
            <span className="basis-40">Form:</span>
            <div className="inline-flex gap-3">
              {form &&
                form.map((result, index) => (
                  <span
                    key={index}
                    className={`flex justify-center items-center w-8 h-8 rounded-full text-base text-white ${
                      result === "W" ? "bg-lime-500" : "bg-rose-600"
                    }`}
                  >
                    {result}
                  </span>
                ))}
            </div>
          </h2>
        </div>
        {badge ? (
          <Image
            src={badge}
            width={160}
            height={160}
            className="rounded shrink-0"
            priority
            alt={`${name} badge`}
          />
        ) : (
          <VscWorkspaceUnknown size={160} className="mr-1 shrink-0" />
        )}
      </div>
      <div className="divider mb-10">
        <h2 className="text-2xl">Matches</h2>
      </div>
      <ul className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {gamesPlayed.map((match) => (
          <Match match={match} showDeleteButton={false} key={match.id} />
        ))}
      </ul>
    </>
  );
};

export default TeamPage;
