import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const QueryingFilteredData = () => {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const labelsQuery = useQuery(["labels"], () =>
    fetch("https://ui.dev/api/courses/react-query/labels").then((res) =>
      res.json()
    )
  );
  const issuesQuery = useQuery(
    ["issues", { selectedLabel }],
    () =>
      fetch(
        `https://ui.dev/api/courses/react-query/issues?labels[]=${selectedLabel}`
      ).then((res) => res.json()),
    {
      enabled: !!selectedLabel,
    }
  );
  return (
    <div>
      <h2>Labels</h2>
      {labelsQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {labelsQuery.data.map((label) => (
            <li key={label.id}>
              <button
                style={{
                  fontWeight: label.id === selectedLabel ? 900 : 200,
                }}
                onClick={() => setSelectedLabel(label.id)}
              >
                {label.name}
              </button>
            </li>
          ))}
        </ul>
      )}
      {issuesQuery.status === "loading" &&
      issuesQuery.fetchStatus === "idle" ? null : (
        <>
          <h2>Issues</h2>
          {issuesQuery.isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {issuesQuery.data.map((issue) => (
                <li key={issue.id}>{issue.title}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};
