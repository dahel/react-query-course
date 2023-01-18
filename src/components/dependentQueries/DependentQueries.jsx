import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const useDependentQueries = (phrase) => {
  const magicNumberQuery = useQuery(
    ["magicNumberQuery", phrase],
    () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(phrase.length), 2000);
      });
    },
    { enabled: phrase.length > 0 }
  );

  const magicNumber = magicNumberQuery.data;

  const deferredShitQuery = useQuery(
    ["deferredShitQuery", magicNumber],
    () => {
      return new Promise((resolve) => {
        setTimeout(
          () =>
            resolve(
              `${magicNumber} - ${magicNumber} - ${magicNumber} - ${magicNumber}`
            ),
          2000
        );
      });
    },
    { enabled: !!magicNumber }
  );

  return [magicNumberQuery, deferredShitQuery];
};

export const DependentQueries = () => {
  const [search, setSearch] = useState("");
  const [magicNumberQuery, deferredShitQuery] = useDependentQueries(search);

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSearch(event.target.elements.search.value);
        }}
      >
        <input
          type="text"
          name="search"
          placeholder="enter some text and hit enter"
        />
      </form>
      <div>
        {magicNumberQuery.fetchStatus === "idle" &&
        magicNumberQuery.isLoading ? null : magicNumberQuery.isLoading ? (
          <div>Loading magic number</div>
        ) : (
          <>
            <div>Magic number is: {magicNumberQuery.data}</div>
          </>
        )}
      </div>
      <div>
        {deferredShitQuery.fetchStatus === "idle" &&
        deferredShitQuery.isLoading ? null : deferredShitQuery.isLoading ? (
          <div>Loading deferred shit</div>
        ) : (
          <>
            <div>Deferred shit is: {deferredShitQuery.data}</div>
          </>
        )}
      </div>
    </div>
  );
};
