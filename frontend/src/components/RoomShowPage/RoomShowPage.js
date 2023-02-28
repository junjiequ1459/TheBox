import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRoom } from "../../store/rooms";
import Chat from "../ChatBox/ChatBox";
import io from "socket.io-client";
import "./RoomShowPage.css";
import { updateRoom} from "../../store/rooms";
import GameModal from "../GamePage/GamePage.js";

const socket = io("http://localhost:3002");

function RoomShowPage() {
  const pics = ["chak", "manny", "rex", "wilson", "zahi"]
  const [gamePic, setGamePic] = useState(pics[Math.floor(Math.random()*pics.length)])
  const dispatch = useDispatch();
  const history = useHistory();
  const { roomId } = useParams();
  const user = useSelector((state) => state.session.user);
  const room = useSelector((state) => state.rooms[0]);
  const ifPlayer = room ? room.players : [];
  const players =
    ifPlayer.length === 0
      ? []
      : ifPlayer.map((player, i) => <li key={i}> {player.username} ({player.wins} {player.wins < 2 ? "win" : "wins"})</li>);
  const [socket2, setSocket] = useState(1);
  const [hidden, setHidden] = useState(true);
  const game = hidden ? null : <GameModal answer={gamePic} socket={socket} roomId={roomId}/>;
  socket.emit("join", roomId);
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchRoom(roomId));
      console.log("interval")
    }, 1000);
    socket.on("start-game", () => {
      setGamePic(pics[Math.floor(Math.random()*pics.length)]);
      setHidden(false);
      console.log("started game");
    });
    socket.on("end-game", () => {
      history.push("/roomlist");
    });

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (user === undefined) {
    return <>still loading...</>;
  }

  const handleStartGame = (e) => {
    e.preventDefault();
    socket.emit("start-game", roomId);
    setHidden(false);
    setSocket(socket2 + 1);
  };

  const handleLeave = (e) => {
    dispatch(updateRoom(room));
  };


  const hostStart =
    room.host._id === user._id ? (
      <button className="signup-button" onClick={handleStartGame}>
        START GAME
      </button>
    ) : null;

  const leaveOrDelete = room ? (
    <button
      className="signup-button"
      onClick={() => {
        handleLeave();
        history.push("/");
      }}
    >
      Leave Room
    </button>
  ) : null;

  return (
    <>
      <div>
        <div className="console-container">
          <div className="gameroom-container">
            <div className="info-div">
              <div className="room-show">
                <h1> {room ? room.name : null}</h1>
                <h2> Hosted by: {room ? room.host.username : null}</h2>
                <ul>
                  Players in room ({players ? players.length : null}/
                  {room ? room.size : null}){players ? players : null}
                </ul>
              </div>
              ;{hostStart}
              {leaveOrDelete}
            </div>
            <div className="socket-container">
              <Chat socket={socket} username={user.username} room={roomId} />
              {game}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomShowPage;
