import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

async function fetchIssues(queryClient) {
  const results = await fetch(
    `https://ui.dev/api/courses/react-query/issues`
  ).then((res) => res.json());
  results.forEach((issue) => {
    queryClient.setQueryData(["issues", issue.number], issue);
  });
  return results;
}
async function fetchIssueDetails(issueNumber) {
  return fetch(
    `https://ui.dev/api/courses/react-query/issues/${issueNumber}`
  ).then((res) => res.json());
}
async function fetchIssueComments(issueNumber) {
  return fetch(
    `https://ui.dev/api/courses/react-query/issues/${issueNumber}/comments`
  ).then((res) => res.json());
}

function Issues({ setIssueNumber }) {
  const queryClient = useQueryClient();
  const issuesQuery = useQuery(["issues"], () => fetchIssues(queryClient));

  return (
    <div>
      <h1>Issues</h1>
      <ul>
        {issuesQuery.isLoading ? (
          <p>Loading...</p>
        ) : (
          issuesQuery.data.map((issue) => (
            <li key={issue.id}>
              <a
                href="#"
                onClick={() => setIssueNumber(issue.number)}
                onMouseEnter={() => {
                  queryClient.prefetchQuery(
                    ["issues", issue.number, "comments"],
                    () => fetchIssueComments(issue.number)
                  );
                }}
              >
                {issue.title}
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

function IssueDetails({ issueNumber, setIssueNumber }) {
  // Implement the query here
  const issueQuery = useQuery(["issues", issueNumber], () =>
    fetchIssueDetails(issueNumber)
  );

  return (
    <div>
      <h1>Issue Details</h1>
      <a href="#" onClick={() => setIssueNumber(null)}>
        Back to issues
      </a>
      {issueQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>
          #{issueQuery.data.number} {issueQuery.data.title}
        </p>
      )}
      <IssueComments issueNumber={issueNumber} />
    </div>
  );
}

function IssueComments({ issueNumber }) {
  // Implement the query here
  const commentsQuery = useQuery(["issues", issueNumber, "comments"], () =>
    fetchIssueComments(issueNumber)
  );

  return (
    <div>
      <h2>Comments</h2>
      {commentsQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {commentsQuery.data.map((comment) => (
            <li key={comment.id}>{comment.comment}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const PreloadingData = () => {
  const [issueNumber, setIssueNumber] = React.useState(null);
  if (issueNumber === null) {
    return <Issues setIssueNumber={setIssueNumber} />;
  } else {
    return (
      <IssueDetails issueNumber={issueNumber} setIssueNumber={setIssueNumber} />
    );
  }
};
