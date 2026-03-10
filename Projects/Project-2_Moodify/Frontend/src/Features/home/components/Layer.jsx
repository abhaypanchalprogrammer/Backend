import React, { useState, useRef, useEffect, useContext } from "react";
import "./Layer.scss";
import { useSong } from "../hooks/useSong.js";

const Layer = () => {
  const { song, handleGetSong } = useSong();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.error("Playback error:", err));
      }
    }
  }, [song?.url]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((err) => console.error("Playback error:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const dur = audioRef.current.duration;
    setProgress((current / dur) * 100 || 0);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  const skipForward = () => {
    audioRef.current.currentTime = Math.min(
      audioRef.current.currentTime + 5,
      duration,
    );
  };

  const skipBackward = () => {
    audioRef.current.currentTime = Math.max(
      audioRef.current.currentTime - 5,
      0,
    );
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  useEffect(() => {
    handleGetSong({ mood: "sad" });
  }, []);

  return (
    <div className="player-layer">
      <audio
        ref={audioRef}
        src={song?.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="song-info">
        <img src={song?.posterUrl} alt={song?.title} className="poster" />
        <div className="details">
          <h4>{song?.title}</h4>
          <p>{song?.mood} mood</p>
        </div>
      </div>

      <div className="controls-center">
        <div className="main-btns">
          <button onClick={skipBackward} title="Backward 5s">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.5 3v18L2 12l10.5-9zm.5 9l10.5 9V3L13 12z" />
            </svg>
          </button>

          <button className="play-pause-btn" onClick={togglePlay}>
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button onClick={skipForward} title="Forward 5s">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.5 3v18L22 12 11.5 3zm-.5 9L.5 21V3L11 12z" />
            </svg>
          </button>
        </div>

        <div className="progress-container">
          <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="options-right">
        <select
          className="speed-selector"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
        >
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>
    </div>
  );
};

export default Layer;
