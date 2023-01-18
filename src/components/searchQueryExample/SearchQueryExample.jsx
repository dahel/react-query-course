import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const useSearch = (searchPhrase) => {
  const searchQuery = useQuery(
    ["search", searchPhrase],
    () => {
      return fetch(
        `https://ui.dev/api/courses/react-query/search/issues?q=${searchPhrase}`
      ).then((response) => response.json());
    },
    { enabled: searchPhrase.length > 0 }
  );

  return searchQuery;
};

export const SearchQueryExample = () => {
  const [search, setSearch] = useState("");
  const searchQuery = useSearch(search);

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
      {searchQuery.fetchStatus === "idle" &&
      searchQuery.isLoading ? null : searchQuery.isLoading ? (
        <div>Loading issues</div>
      ) : (
        <>
          <div>Found issues:</div>
          <ul>
            {searchQuery.data.items.map((issue) => {
              return <li key={issue.id}>{issue.title}</li>;
            })}
          </ul>
        </>
      )}
    </div>
  );
};
