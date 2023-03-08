import "./GamePage.css";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { saveGame } from "../../store/games";

function GameModal({ question, answer, socket, roomId }) {
  // const history = useHistory();
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const room = useSelector((state) => state.rooms[roomId]);
  const user = useSelector((state) => state.session.user);
  const answerInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [time, setTime] = useState(20);
  const [userAnswer, setUserAnswer] = useState("");
  const [gameAnswer, setGameAnswer] = useState(null);
  const [gameQuestion, setGameQuestion] = useState(null);
  let interval;

  useEffect(() => {
    answerInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (userAnswer.split(" ").join("").toLowerCase() === gameAnswer) {
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

  useEffect(() => { //Loads image
    if (!question) {
      const img = new Image(50, 50);
      img.src = `../../${answer}.png`;
      img.onload = () => {
        setImage(img);
      };
      img.onerror = () => {
        console.error("Error loading image");
      };
    }
    if (question) {
      setGameQuestion(question)
    }
    setGameAnswer(answer);
    interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    //DRAWS THE CANVAS
    //DRAWS IMAGE

    if (image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = 500;
      canvas.height = 500;
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

  useEffect(() => {
    if (gameQuestion) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = 500;
      canvas.height = 500;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "40px Orbitron";
      ctx.fillStyle = 'blanchedalmond';
      var words = gameQuestion.split(' ');
      var line = '';
      var x = 50;
      var y = 50;
      for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > canvas.width && n > 0) {
          ctx.fillText(line, x, y);
          line = words[n] + ' ';
          y += 50;
        }
        else {
          line = testLine;
        }
      }
      ctx.fillText(line, 0, y);
    }
  }, [time, gameQuestion])

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
      <form id="answer-div" autoComplete="off" onSubmit={handleSubmit}>
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
