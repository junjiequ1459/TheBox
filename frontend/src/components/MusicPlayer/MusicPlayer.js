import { useEffect, useState } from "react";
import "./MusicPlayer.css";
import BackgroundMusic from "../../assets/Arcade.mp3";

function MusicPlayer() {
  const [playing, setPlaying] = useState(false);

  const togglePlayback = () => {
    const audio = document.getElementById("bg-music");
    if (audio) {
      if (audio.paused) {
        audio.play();
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    }
  };

  return (
    <div className="music-player">
      <button className="music-player-button" onClick={togglePlayback}>
        {playing ? (
          <i className="fa-solid fa-volume-high"></i>
        ) : (
          <i className="fa-solid fa-volume-xmark"></i>
        )}
      </button>
      <audio id="bg-music" src={BackgroundMusic} loop />
    </div>
  );
}

export default MusicPlayer;
