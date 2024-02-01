"use client";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus, useFormState } from "react-dom";
import toast from "react-hot-toast";
import { createMatch } from "@/utils/actions";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary uppercase float-right"
      disabled={pending}
    >
      {pending ? "Please wait..." : "create match"}
    </button>
  );
};

const initialState = {
  message: null,
};

export const CreateMatchForm = ({ leagueId, teams = [] }) => {
  const [state, formAction] = useFormState(createMatch, initialState);
  const [selectedHomeTeamId, setSelectedHomeTeamId] = useState(undefined);
  const [selectedAwayTeamId, setSelectedAwayTeamId] = useState(undefined);
  const router = useRouter();

  const handleHomeTeamOnChange = (e) => setSelectedHomeTeamId(e.target.value);
  const handleAwayTeamOnChange = (e) => setSelectedAwayTeamId(e.target.value);

  const sortedTeams = teams.sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    if (!state.message) return;
    if (state.message !== "success") {
      toast.error(state.message);
      return;
    }
    if (state.message === "success") {
      toast.success("match created");
    }
  }, [state]);

  return (
    <div className="flex flex-col">
      <button
        className="btn btn-square btn-accent btn-outline mb-8"
        onClick={() => router.back()}
      >
        <IoArrowBackOutline />
      </button>
      <form
        action={formAction}
        className="p-8 border border-neutral rounded-lg w-min"
      >
        <div className="w-full">
          <input type="hidden" name="leagueId" value={leagueId} />
          <input type="hidden" name="homeTeamId" value={selectedHomeTeamId} />
          <input type="hidden" name="awayTeamId" value={selectedAwayTeamId} />

          <div className="flex items-end gap-4">
            <span className="pb-3 w-28 block text-right text-accent">
              Match date
            </span>
            <div className="flex gap-4">
              <input
                type="date"
                name="date"
                className="input input-bordered w-52"
                required
              />
            </div>
          </div>

          <div className="divider"></div>

          <div className="flex items-end gap-4">
            <span className="pb-3 w-28 block text-right text-accent">
              Teams
            </span>
            <div className="flex gap-4">
              <select
                className="select select-bordered w-52"
                required
                onChange={handleHomeTeamOnChange}
              >
                <option value="">Select Home team</option>
                {sortedTeams.map((team) => (
                  <option
                    value={team.id}
                    key={team.id}
                    disabled={team.id === selectedAwayTeamId}
                  >
                    {team.name}
                  </option>
                ))}
              </select>

              <select
                className="select select-bordered w-52"
                required
                onChange={handleAwayTeamOnChange}
              >
                <option value="">Select Away Team</option>
                {sortedTeams.map((team) => (
                  <option
                    value={team.id}
                    key={team.id}
                    disabled={team.id === selectedHomeTeamId}
                  >
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="divider"></div>

          <div className="flex items-end gap-4">
            <span className="pb-3 w-28 block text-right text-accent">
              Sets won
            </span>
            <div className="flex gap-4">
              <input
                placeholder="Home"
                type="number"
                name="setsHome"
                className="input input-bordered w-52"
                min="0"
                max="3"
              />

              <input
                placeholder="Away"
                type="number"
                name="setsAway"
                className="input input-bordered w-52"
                min="0"
                max="3"
              />
            </div>
          </div>

          <div className="divider"></div>

          <div className="flex items-end gap-4">
            <span className="pb-3 w-28 block text-right text-accent">
              Points won
            </span>
            <div className="flex gap-4">
              <input
                placeholder="Home"
                type="number"
                name="pointsHome"
                className="input input-bordered w-52"
                min="0"
              />

              <input
                placeholder="Away"
                type="number"
                name="pointsAway"
                className="input input-bordered w-52"
                min="0"
              />
            </div>
          </div>

          <div className="divider"></div>

          <SubmitButton />
        </div>
      </form>
    </div>
  );
};
