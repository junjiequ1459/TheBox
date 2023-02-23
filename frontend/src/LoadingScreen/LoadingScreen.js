import React from "react";
import "./LoadingScreen.css";

function LoadingScreen() {
  return (
    <div className="loading-screen-container">
      <div>
        <img
          className="thebox-image"
          src="https://the-box-project.s3.amazonaws.com/final.png"
          alt="noimg"
        ></img>
        <div className="loading-screen-shape-container">
          <div className="loading-screen-shape"></div>
          <div className="loading-screen-shape2"></div>
          <div className="loading-screen-shape3"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
