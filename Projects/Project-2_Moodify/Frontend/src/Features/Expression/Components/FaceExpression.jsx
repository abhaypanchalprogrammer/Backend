import React, { useEffect, useRef, useState } from "react";
import { detect, initialize } from "../Utils/utils.js";
import "../../shared/styles/global.scss";
export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const [expression, setExpression] = useState("Initializing...");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = async () => {
      await initialize({
        faceLandmarkerRef,
        videoRef,
        setExpression,
        setReady,
      });
    };

    start();
  }, []);

  const handleDetect = () => {
    const expression = detect({
      faceLandmarkerRef,
      videoRef,
      setExpression,
    });
    onClick(expression);
  };

  return (
    <div className="detect-face">
      <video ref={videoRef} width="500" autoPlay playsInline muted />
      <h2>Expression: {expression}</h2>
      <button className="button" onClick={handleDetect} disabled={!ready}>
        Detect Expression
      </button>
    </div>
  );
}
