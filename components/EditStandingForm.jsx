import Link from "next/link";

import { getTeamStanding, updateStanding } from "@/utils/actions";
import { IoArrowBackOutline } from "react-icons/io5";

export const EditStandingForm = async ({ teamStandingId, teamId }) => {
  const standing = await getTeamStanding(teamStandingId);

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 mb-8 items-center">
        <Link
          href={`/teams/${teamId}`}
          className="btn btn-square btn-accent btn-outline"
        >
          <IoArrowBackOutline />
        </Link>
        <h2 className="text-2xl">{standing.team.name}</h2>
      </div>

      <form
        action={updateStanding}
        className="p-8 border border-neutral rounded-lg w-min"
      >
        <div className="w-full">
          <input type="hidden" name="teamStandingId" value={teamStandingId} />
          <input type="hidden" name="teamId" value={teamId} />
          <input type="hidden" name="leagueId" value={standing.team.leagueId} />

          <div className="flex items-end gap-4">
            <span className="pb-3 w-28 block text-right text-accent">
              Points
            </span>
            <label className="form-control w-full max-w-xs">
              <input
                defaultValue={standing.points}
                type="number"
                name="points"
                className="input input-bordered w-52"
                required
              />
            </label>
          </div>

          <div className="divider"></div>

          <div className="flex items-end gap-4">
            <span className="pb-3 w-28 block text-right text-accent">
              Matches
            </span>
            <label className="form-control max-w-xs">
              <div className="label">
                <span className="label-text">Played</span>
              </div>
              <input
                defaultValue={standing.played}
                type="number"
                name="played"
                className="input input-bordered w-52"
                required
              />
            </label>

            <label className="form-control max-w-xs">
              <div className="label">
                <span className="label-text">Won</span>
              </div>
              <input
                defaultValue={standing.won}
                type="number"
                name="won"
                className="input input-bordered w-52"
                required
              />
            </label>

            <label className="form-control max-w-xs">
              <div className="label">
                <span className="label-text">Lost</span>
              </div>
              <input
                defaultValue={standing.lost}
                type="number"
                name="lost"
                className="input input-bordered w-52"
                required
              />
            </label>
          </div>

          <div className="divider"></div>

          <div className="flex items-end gap-4">
            <span className="pb-3 w-28 block text-right text-accent">Sets</span>
            <label className="form-control max-w-xs">
              <div className="label">
                <span className="label-text">Won</span>
              </div>
              <input
                defaultValue={standing.setsFor}
                type="number"
                name="setsFor"
                className="input input-bordered w-52"
                required
              />
            </label>

            <label className="form-control max-w-xs">
              <div className="label">
                <span className="label-text">Lost</span>
              </div>
              <input
                defaultValue={standing.setsAgainst}
                type="number"
                name="setsAgainst"
                className="input input-bordered w-52"
                required
              />
            </label>
          </div>

          <div className="divider"></div>

          <div className="flex items-end gap-4">
            <span className="pb-3 w-28 block text-right text-accent">
              Points
            </span>
            <label className="form-control max-w-xs">
              <div className="label">
                <span className="label-text">Won</span>
              </div>
              <input
                defaultValue={standing.pointsFor}
                type="number"
                name="pointsFor"
                className="input input-bordered w-52"
                required
              />
            </label>

            <label className="form-control max-w-xs">
              <div className="label">
                <span className="label-text">Lost</span>
              </div>
              <input
                defaultValue={standing.pointsAgainst}
                type="number"
                name="pointsAgainst"
                className="input input-bordered w-52"
                required
              />
            </label>
          </div>

          <div className="divider"></div>

          <div className="flex items-end gap-4">
            <span className="pb-3 w-28 block text-right text-accent" />
            <button className="btn btn-active btn-primary" type="submit">
              Update Team Standing
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
