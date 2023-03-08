import "./GamePage.css";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveGame } from "../../store/games";

function GameModal({ answer, socket, roomId }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const room = useSelector((state) => state.rooms[roomId]);
  const user = useSelector((state) => state.session.user);
  const [time, setTime] = useState(20);
  let interval;
  const [image, setImage] = useState(null);
  const answerInputRef = useRef(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [gameAnswer, setGameAnswer] = useState(null);
  useEffect(() => {
    answerInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (userAnswer === gameAnswer) {
      dispatch(
        saveGame({
          roomName: room.name,
          winner: user._id,
          players: room.players,
        })
      );
      socket.emit("end-game", roomId);
      // history.push("/roomlist");
      window.location.reload();
    }
    if (time === 0) {
      dispatch(
        saveGame({ roomName: room.name, winner: null, players: room.players })
      );
      socket.emit("end-game", roomId);
      // history.push("/roomlist");
      window.location.reload();
    }
  }, [userAnswer, time]);

  useEffect(() => {
    const img = new Image(50, 50);
    img.src = `../../${answer}.png`;
    img.onload = () => {
      setImage(img);
      setGameAnswer(answer);
    };
    img.onerror = () => {
      console.error("Error loading image");
    };
    interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    return () => clearInterval(interval);
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
        scale -= 0.04; //ZOOM SPEED
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
    <div id="canvas-div">
      {time > 10 ? (
        <h1 id="game-timer">{time}</h1>
      ) : (
        <h1 id="game-timer" style={{ color: "red" }}>
          {time}
        </h1>
      )}
      <canvas ref={canvasRef} className="canvas" />
      <form id="answer-div" onSubmit={handleSubmit}>
        <input
          id="game-input"
          type="text"
          ref={answerInputRef}
          onChange={(e) => setUserAnswer(e.target.value)}
        ></input>
      </form>
    </div>
  );
}

export default GameModal;
