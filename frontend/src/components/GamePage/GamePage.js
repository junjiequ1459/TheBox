import "./GamePage.css";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Chat from "../ChatBox/ChatBox";

function GamePage() {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = new Image(50, 50);
    img.src = "chak.png"; // EVENTUALLY USE AWS HERE TO PULL RANDOM IMAGE
    console.log(img);
    img.onload = () => {
      setImage(img);
    };
    img.onerror = () => {
      console.error("Error loading image");
    };
  }, []);

  useEffect(() => {
    //DRAWS THE CANVAS
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;

    //DRAWS IMAGE
    if (image) {
      const draw = (scale) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const width = image.width * scale;
        const height = image.height * scale;
        const x = (canvas.width - width) / 2;
        const y = (canvas.height - height) / 2;
        ctx.drawImage(image, x, y, width, height);
      };

      let scale = 80; //START SCALE
      const interval = setInterval(() => {
        scale -= 0.02; //ZOOM SPEED
        if (
          image.width * scale <= canvas.width ||
          image.height * scale <= canvas.height
        ) {
          clearInterval(interval);
        }
        draw(scale);
      }, 10); //ZOOM SPEED
    }
  }, [image]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="console-container">
      <div className="game-container">
        <div id="game-page">
          <div id="canvas-div">
            <canvas ref={canvasRef} className="canvas" />
            <form id="answer-div" onSubmit={handleSubmit}>
              <input type="text"></input>
              <button> Submit Answer</button>
            </form>
          </div>
          {/* <Chat /> */}
        </div>
      </div>
    </div>
  );
}

export default GamePage;
