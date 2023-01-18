import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const useUserQuery = (userId) => {
  const fetchUser = ({ queryKey }) => {
    const [users, userId] = queryKey;

    return fetch(`https://ui.dev/api/courses/react-query/users/${userId}`).then(
      (response) => response.json()
    );
  };

  return useQuery(["users", userId], fetchUser, { enabled: !!userId });
};
export const UserPreview = () => {
  const [userId, setUserId] = useState("");
  const userQuery = useUserQuery(userId);

  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => setUserId("u_1")}>user 1</button>
        <button onClick={() => setUserId("u_2")}>user 2</button>
        <button onClick={() => setUserId("u_3")}>user 3</button>
        <button onClick={() => setUserId("u_4")}>user 4</button>
      </div>
      {userQuery.isLoading ? (
        <div>Loading....</div>
      ) : (
        <>
          <div>{userQuery?.data?.message && userQuery.data.message}</div>
          <div>user name: {userQuery?.data?.name}</div>
        </>
      )}
    </div>
  );
};
