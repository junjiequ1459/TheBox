import "./Game.css";
import { useSelector } from "react-redux";

function Game() {
  return (
    <div>
      <p>hello</p>
      <canvas id="game-canvas" width="600px" height="600px"></canvas>
    </div>
  );
}

export default Game;
