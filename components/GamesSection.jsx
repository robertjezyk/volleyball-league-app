"use client";
import { useState } from "react";
import { Match } from "@/components/Match";

export const GamesSection = ({ matches, teams }) => {
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
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Filter games by team</span>
          </div>
          <select className="select select-bordered" onChange={handleOnChange}>
            <option value="">All teams</option>
            {teams.map((team) => (
              <option value={team.id} key={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <ul className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {filteredMatches.map((match) => (
          <Match match={match} key={match.id} />
        ))}
      </ul>
    </>
  );
};
