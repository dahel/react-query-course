import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const useSearchIssues = (searchPhrase) => {
  const queryString =
    "q=" +
    encodeURIComponent(`${searchPhrase} is:issue repo:facebook/react-native`);

  const issuesQuery = useQuery(
    ["search", searchPhrase],
    () => {
      return fetch(`https://api.github.com/search/issues?${queryString}`).then(
        (response) => response.json()
      );
    },
    { enabled: searchPhrase.length > 0 }
  );

  return issuesQuery;
};

export const SearchIssues = () => {
  const [search, setSearch] = useState("");
  const issuesQuery = useSearchIssues(search);

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSearch(event.target.elements.search.value);
        }}
      >
        <input type="text" name="search" placeholder="Search for issues" />
      </form>
      {issuesQuery.fetchStatus === "idle" &&
      issuesQuery.isLoading ? null : issuesQuery.isLoading ? (
        <div>Loading issues</div>
      ) : (
        <>
          <div>Found issues:</div>
          <ul>
            {issuesQuery.data.items.map((issue) => {
              return <li key={issue.id}>{issue.title}</li>;
            })}
          </ul>
        </>
      )}
    </div>
  );
};
