import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

async function fetchIssues(page = 1) {
  return fetch(
    `https://ui.dev/api/courses/react-query/issues?limit=10&page=${page}`
  ).then((res) => res.json());
}

export const Pagination = () => {
  const [page, setPage] = React.useState(1);
  const issuesQuery = useQuery(["issues", { page }], () => fetchIssues(page), {
    keepPreviousData: true,
  });

  const queryClient = useQueryClient();
  React.useEffect(() => {
    queryClient.prefetchQuery(["issues", { page: page + 1 }], () =>
      fetchIssues(page + 1)
    );
  }, [page, queryClient]);
  return (
    <div>
      <h1>Issues</h1>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {issuesQuery.data.map((issue) => (
            <li key={issue.id}>{issue.title}</li>
          ))}
        </ul>
      )}
      <div className="pagination">
        <button
          onClick={() => setPage((page) => page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <p>
          Page {page}
          {issuesQuery.isFetching ? "..." : ""}
        </p>
        <button
          onClick={() => setPage((page) => page + 1)}
          disabled={issuesQuery.data?.length < 10}
        >
          Next
        </button>
      </div>
    </div>
  );
};
