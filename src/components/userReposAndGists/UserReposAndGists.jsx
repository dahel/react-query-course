import { useState } from "react";
import { useQueries } from "@tanstack/react-query";

const useUserReposAndGists = (username) => {
  const [reposQuery, gistQuery] = useQueries({
    queries: [
      {
        queryKey: ["repos", username],
        queryFn: () => {
          return fetch(`https://api.github.com/users/${username}/repos`).then(
            (res) => res.json()
          );
        },
        enabled: !!username,
      },
      {
        queryKey: ["gists", username],
        queryFn: () => {
          return fetch(`https://api.github.com/users/${username}/gists`).then(
            (res) => res.json()
          );
        },
        enabled: !!username,
      },
    ],
  });

  return [reposQuery, gistQuery];
};

export const UserReposAndGists = () => {
  const [username, setUsername] = useState("dahel");
  const [reposQuery, gistsQuery] = useUserReposAndGists(username);

  return (
    <div>
      Enter username
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <div>
        <p>Repos</p>
        {reposQuery.isLoading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {reposQuery.data.map((repo, index) => {
              return <li key={index}>{repo.name}</li>;
            })}
          </ul>
        )}

        <p>Gists</p>
        {gistsQuery.isLoading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {gistsQuery.data.map((gist, index) => {
              return <li key={index}>{gist.description}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
