import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard.jsx";
import "./style.scss";

const Follow = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/users`,
          { withCredentials: true },
        );
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleFollowToggle = async (username) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/follow/${username}`,
        {},
        { withCredentials: true },
      );

      setUsers((prev) =>
        prev.map((user) =>
          user.username === username
            ? { ...user, isFollowing: res.data.following }
            : user,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="discover-page">
      <h2>Discover People</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        users.map((user) => (
          <UserCard
            key={user.username}
            user={user}
            onToggle={handleFollowToggle}
          />
        ))
      )}
    </div>
  );
};

export default Follow;
