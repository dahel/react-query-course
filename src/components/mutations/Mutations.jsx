import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function fetchLabels() {
  return fetch("https://ui.dev/api/courses/react-query/labels").then((res) =>
    res.json()
  );
}
function LabelList() {
  const labelsQuery = useQuery(["labels"], fetchLabels, {
    staleTime: 5 * 1000,
  });

  if (labelsQuery.isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Labels</h1>

      <ul>
        {labelsQuery.data.map((label) => (
          <li key={label.id}>
            <span style={{ color: label.color }}>{label.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AddLabelForm() {
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState("red");
  const queryClient = useQueryClient();

  const labelMutation = useMutation(
    () => {
      return fetch("https://ui.dev/api/courses/react-query/labels", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, color }),
      }).then((res) => res.json());
    },
    {
      onSuccess: (data) => {
        setName("");
        setColor("red");
        queryClient.setQueryData(["labels"], (state) => state.concat(data));
      },
      onSettled: () => {
        queryClient.invalidateQueries(["labels"]);
      },
    }
  );

  return (
    <div>
      <h1>Add Label</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (labelMutation.isLoading) return;
          labelMutation.mutate();
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="color">Color</label>
        <select
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </select>

        <button type="submit">
          {labelMutation.isLoading ? "Adding Label..." : "Add Label"}
        </button>
      </form>
    </div>
  );
}

export const Mutations = () => {
  return (
    <main>
      <LabelList />
      <AddLabelForm />
    </main>
  );
};
