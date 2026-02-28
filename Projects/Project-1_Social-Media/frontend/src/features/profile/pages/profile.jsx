import { useEffect } from "react";
import "../styles/profile.scss";
import { useProfile } from "../hook/useProfile.js";
import { useAuth } from "../../auth/Hooks/useAuth.js";

const Profile = () => {
  const { profile, posts, loading, error, fetchProfile } = useProfile();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user?.username) {
      fetchProfile(user.username);
    }
  }, [user, user?.username]);
  useEffect(() => {
    console.log("AUTH USER:", user);
  }, [user]);

  useEffect(() => {
    console.log("PROFILE STATE:", profile);
  }, [profile]);
  console.log("Profile from context:", profile);

  console.log("Username param:", user?.username);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!profile) return <h1 style={{ color: "black" }}>{error}</h1>;
  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={profile.profileImage} alt="profile" />
          </div>

          <div className="profile-info">
            <div className="profile-top">
              <h2>{profile.username}</h2>
              <button className="profile-btn">Edit Profile</button>
            </div>

            <div className="profile-stats">
              <div>
                <strong>{profile.count}</strong>
                <span>Posts</span>
              </div>

              <div>
                <strong>{profile.followerCount}</strong>
                <span>Followers</span>
              </div>

              <div>
                <strong>{profile.followingCount}</strong>
                <span>Following</span>
              </div>
            </div>

            <p className="profile-bio">
              {profile.bio
                ? profile.bio
                : " This is user bio section. Add user description here."}
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="profile-grid">
          {posts.map((item) => (
            <div key={item} className="grid-item">
              <img src={item.imgUrl} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
