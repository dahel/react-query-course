import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { getData } from "./getData";
import { useRenderCount } from "./useRenderCount";

export const RenderOptimizations = () => {
  const renderCount = useRenderCount();
  const query = useQuery(["data"], getData, {
    // Don't change this option
    refetchInterval: 1000,
    notifyOnChangeProps: ["isLoading", "data"],
    select: (data) => data.randomInteger,
  });
  return (
    <div>
      <h1>Render Count: {renderCount}</h1>
      {query.isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>Random Integer: {query.data}</p>
      )}
      <button onClick={() => window.location.reload()}>Reload the page</button>
    </div>
  );
};
