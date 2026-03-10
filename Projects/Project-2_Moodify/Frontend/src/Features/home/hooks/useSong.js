import { useContext } from "react";
import { getSong } from "../services/song.api.js";
import { SongContext } from "../song.context.jsx";

export const useSong = () => {
  const context = useContext(SongContext);
  const { song, setSong, loading, setLoading } = context;

  const handleGetSong = async ({ mood }) => {
    setLoading(true);
    try {
      const data = await getSong({ mood });
      console.log("API DATA:", data);
      setSong(data.song);
      setLoading(false);
    } catch (err) {
      throw err;
    }
  };

  return {
    loading,
    song,
    handleGetSong,
  };
};
