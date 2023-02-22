import "./Video.css";
import React, { useRef, useEffect } from "react";

function Video() {
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current.autoplay = true;
    videoRef.current.loop = true;
    videoRef.current.muted = true;
  }, []);

  return (
    <div id="video-container">
      <video
        ref={videoRef}
        className="video-background"
        src="https://the-box-project.s3.amazonaws.com/network-80645.mp4"
      ></video>
    </div>
  );
}

export default Video;
