import React from "react";
import FaceExpression from "../../Expression/Components/FaceExpression.jsx";
import Layer from "../components/Layer.jsx";
import { useSong } from "../hooks/useSong.js";
const Home = () => {
  const { handleGetSong } = useSong();
  return (
    <div className="home">
      <FaceExpression
        onClick={(mood) => {
          handleGetSong({ mood });
        }}
      />
      <Layer />
    </div>
  );
};

export default Home;
