import "./GamePage.css";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveGame } from "../../store/games";

function GameModal({answer ,socket, roomId}) {

  const history = useHistory();
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const room = useSelector((state) => state.rooms[roomId]);
  const user = useSelector((state) => state.session.user);
  const [image, setImage] = useState(null);
  const answerInputRef = useRef(null);
  const [userAnswer, setUserAnswer] = useState('')
  useEffect(() => {
    answerInputRef.current.focus();
  }, []);
  useEffect(() => {
    if (userAnswer === answer) {
      dispatch(saveGame({roomName: room.name, winnerId: user._id, players: room.players}))
      socket.emit("end-game", roomId)
      history.push("/roomlist")
    };
  }, [userAnswer]);

  useEffect(() => {
    const img = new Image(50, 50);
    img.src = `../../${answer}.png`;
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
        <canvas ref={canvasRef} className="canvas" />
        <form id="answer-div" onSubmit={handleSubmit}>
          <input type="text" ref={answerInputRef} onChange={(e) => setUserAnswer(e.target.value)}></input>
          <button className="signup-button"> Submit Answer</button>
        </form>
      </div>
  );
}

export default GameModal;
