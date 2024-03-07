import Image from "next/image";
import Link from "next/link";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { auth } from "@clerk/nextjs";

import {
  getLeague,
  getLeagueMatches,
  getRemainingLeagueMatches,
  getTeamById,
  getLeagueStandings,
} from "@/utils/actions";
import { calculateForm } from "@/utils/calculateForm";
import { sortTeams } from "@/utils/sortTeams";
import { Match } from "@/components/Match";
import { MatchTile } from "@/components/MatchTile";

const TeamPage = async ({ params }) => {
  const team = await getTeamById(params.id);
  const { userId } = auth();

  if (!team) {
    return "Team doesn't exist";
  }
  const { name, leagueId, badge } = team;
  const { type } = await getLeague(leagueId);
  const gamesPlayed = await getLeagueMatches(leagueId, params.id);
  const form = calculateForm(params.id, gamesPlayed);
  const standings = await getLeagueStandings(leagueId);
  const teamStandingId = standings.find(
    (standing) => standing.team.id === params.id
  )?.teamStandingId;
  const position =
    sortTeams(standings).findIndex(
      (standing) => standing.team.id === params.id
    ) + 1;

  const remainingGames = await getRemainingLeagueMatches(
    leagueId,
    params.id,
    name
  );

  console.log(remainingGames);

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row justify-between items-center">
        <div className="grow w-full">
          <h2 className="text-md md:text-2xl mb-8 flex justify-start items-center">
            <span className="basis-20 md:basis-40 shrink-0">Team:</span>
            <kbd className="kbd kbd-md md:kbd-lg">{name}</kbd>
          </h2>
          <h2 className="text-md md:text-2xl mb-8 flex justify-start items-center capitalize">
            <span className="basis-20 md:basis-40 shrink-0">League:</span>
            <kbd className="kbd kbd-md md:kbd-lg">{type}</kbd>
          </h2>
          {position && (
            <h2 className="text-md md:text-2xl mb-8 flex justify-start items-center">
              <span className="basis-20 md:basis-40 shrink-0">Position:</span>
              <kbd className="kbd kbd-md md:kbd-lg">{position}</kbd>
            </h2>
          )}
          <h2 className="text-md md:text-2xl mb-8 flex justify-start items-center">
            <span className="basis-20 md:basis-40 shrink-0">Form:</span>
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
            className="rounded shrink-0 my-4"
            priority
            alt={`${name} badge`}
          />
        ) : (
          <VscWorkspaceUnknown size={160} className="mr-1 shrink-0 my-4" />
        )}
      </div>
      <div className="divider mb-10">
        <h2 className="text-md md:text-2xl">Matches</h2>
      </div>
      <ul className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {gamesPlayed.map((match) => (
          <Match match={match} showDeleteButton={false} key={match.id} />
        ))}
      </ul>

      <div className="divider my-10">
        <h2 className="text-md md:text-2xl">Remaining games</h2>
      </div>
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {remainingGames.map((match, index) => (
          <MatchTile match={match} teamId={params.id} key={index} />
        ))}
      </ul>

      {userId && teamStandingId && (
        <>
          <div className="divider mb-10"></div>
          <Link
            href={`/teams/${params.id}/standing/${teamStandingId}`}
            className="btn btn-accent"
          >
            Update Team Standing
          </Link>
        </>
      )}
    </>
  );
};

export default TeamPage;
