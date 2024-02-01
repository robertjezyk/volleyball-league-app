"use client";
import { useState } from "react";
import { Match } from "@/components/Match";
import { CreateMatchButton } from "@/components/CreateMatchButton";

export const GamesSection = ({ matches, teams, userId }) => {
  const [selectedTeamId, setSelectedTeamId] = useState(undefined);

  const handleOnChange = (e) => setSelectedTeamId(e.target.value);

  const filteredMatches = selectedTeamId
    ? matches.filter((match) => {
        return (
          match.homeTeamId === selectedTeamId ||
          match.awayTeamId === selectedTeamId
        );
      })
    : matches;

  return (
    <>
      <div className="flex flex-col gap-4 mt-16 mb-8 justify-between md:items-center md:flex-row">
        <h2 className="text-2xl">Games ({filteredMatches.length})</h2>
        <span className="flex gap-4 justify-end items-end">
          {userId && <CreateMatchButton />}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Filter games by team</span>
            </div>
            <select
              className="select select-bordered"
              onChange={handleOnChange}
            >
              <option value="">All teams</option>
              {teams
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((team) => (
                  <option value={team.id} key={team.id}>
                    {team.name}
                  </option>
                ))}
            </select>
          </label>
        </span>
      </div>
      <ul className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {filteredMatches.map((match) => (
          <Match match={match} showDeleteButton={userId} key={match.id} />
        ))}
      </ul>
    </>
  );
};
