import React from "react";

const UserCard = ({ user, onToggle }) => {
  return (
    <div className="user-card">
      <div className="user-info">
        <img src={user.profileImage} alt={user.username} className="avatar" />
        <div>
          <h4>{user.name}</h4>
          <p>@{user.username}</p>
        </div>
      </div>

      <button
        className={user.isFollowing ? "unfollow-btn" : "follow-btn"}
        onClick={() => onToggle(user.username)}
      >
        {user.isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default UserCard;
