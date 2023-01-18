import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

async function randomDecimal() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Math.random();
}
async function randomInteger() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Math.floor(Math.random() * 100);
}
async function randomString() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Math.random().toString(36).substring(7);
}

export const QueryFilters = () => {
  const decimalQuery = useQuery(["random", "decimal"], randomDecimal, {
    staleTime: 3000,
  });
  const integerQuery = useQuery(["random", "integer"], randomInteger, {
    staleTime: 5000,
  });
  const stringQuery = useQuery(["random", "string"], randomString, {
    staleTime: 10000,
  });
  return (
    <div>
      <p>
        <strong>Random Decimal:</strong>{" "}
        {decimalQuery.isLoading ? "Loading..." : decimalQuery.data}{" "}
        <button
          onClick={() => {
            decimalQuery.refetch();
          }}
        >
          Invalidate
        </button>
      </p>
      <p>
        <strong>Random Integer:</strong>{" "}
        {integerQuery.isLoading ? "Loading..." : integerQuery.data}{" "}
        <button
          onClick={() => {
            integerQuery.refetch();
          }}
        >
          Invalidate
        </button>
      </p>
      <p>
        <strong>Random String:</strong>{" "}
        {stringQuery.isLoading ? "Loading..." : stringQuery.data}{" "}
        <button
          onClick={() => {
            stringQuery.refetch();
          }}
        >
          Invalidate
        </button>
      </p>
      <InvalidateButton />
    </div>
  );
};

function InvalidateButton() {
  const queryClient = useQueryClient();
  return (
    <button
      onClick={() => {
        queryClient.invalidateQueries(["random"]);
      }}
    >
      Invalidate All
    </button>
  );
}
