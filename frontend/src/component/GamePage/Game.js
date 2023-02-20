import "./Game.css";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Chat from "../ChatBox/ChatBox";

function Game() {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = new Image(50, 50);
    img.src = "chak.png";
    console.log(img);
    img.onload = () => {
      setImage(img);
    };
    img.onerror = () => {
      console.error("Error loading image");
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;
    if (image) {
      const draw = (scale) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const width = image.width * scale;
        const height = image.height * scale;
        const x = (canvas.width - width) / 2;
        const y = (canvas.height - height) / 2;
        ctx.drawImage(image, x, y, width, height);
      };

      let scale = 40;
      const interval = setInterval(() => {
        scale -= 0.01;
        if (scale <= 3) {
          clearInterval(interval);
        }
        draw(scale);
      }, 10);
    }
  }, [image]);

  return (
    <div id="canvas-div">
      <canvas ref={canvasRef} className="canvas" />
      <Chat />
    </div>
  );
}

export default Game;
