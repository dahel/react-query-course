import { useQuery } from "@tanstack/react-query";

export const useUserData = (userId) => {
  return useQuery(
    ["users", userId],
    ({ signal }) =>
      fetch(`/api/users/${userId}`, { signal }).then((res) => res.json()),
    { enabled: !!userId, staleTime: 1000 * 10 }
  );
};
