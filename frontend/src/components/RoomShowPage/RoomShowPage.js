import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRoom } from "../../store/rooms";
import Chat from "../ChatBox/ChatBox";
import io from "socket.io-client";
import "./RoomShowPage.css";
import { updateRoom, deleteRoom, fetchRooms } from "../../store/rooms";
import { Link } from "react-router-dom";
import GameModal from "../GamePage/GamePage.js";
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";

const socket = io("http://localhost:3001");

function RoomShowPage() {
  const history = useHistory();
  const { roomId } = useParams();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const room = useSelector((state) => state.rooms[0]);
  const ifPlayer = room ? room.players : [];

  const players =
    ifPlayer.length === 0
      ? []
      : ifPlayer.map((player, i) => <li key={i}> {player.username} </li>);
  const [socket2, setSocket] = useState(1);
  const [hidden, setHidden] = useState(true);
  const game = hidden ? null : <GameModal />;

  socket.emit("join", roomId);
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchRoom(roomId));
    }, 500);
    socket.on("start-game", () => {
      setHidden(false);
      console.log("started game");
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

  const handleDelete = (e) => {
    dispatch(deleteRoom(room));
    dispatch(fetchRooms());
  };

  const leaveOrDelete = room ? (
    room.host._id === user._id ? (
      <button
        className="signup-button"
        onClick={() => {
          handleDelete();
          history.push("/");
        }}
      >
        Delete Room
      </button>
    ) : (
      <button
        className="signup-button"
        onClick={() => {
          handleLeave();
          history.push("/");
        }}
      >
        Leave Room
      </button>
    )
  ) : null;

  return (
    <>
      <div>
        <ConsoleNavBar name="gameroom" />
        <div className="console-container">
          <div className="gameroom-container">
            <div>
              <div className="room-show">
                <h1> {room ? room.name : null}</h1>
                <h2> Hosted by: {room ? room.host.username : null}</h2>
                <ul>
                  Players in room ({players ? players.length : null}/
                  {room ? room.size : null}){players ? players : null}
                </ul>
              </div>
              ;
              <button className="signup-button" onClick={handleStartGame}>
                START GAME
              </button>
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
