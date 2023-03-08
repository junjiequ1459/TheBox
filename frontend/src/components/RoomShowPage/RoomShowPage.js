import { useHistory, useParams, Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRoom } from "../../store/rooms";
import Chat from "../ChatBox/ChatBox";
import io from "socket.io-client";
import "./RoomShowPage.css";
import { updateRoom } from "../../store/rooms";
import GameModal from "../GamePage/GamePage.js";
import { fetchGame } from "../../store/games";

const socket = io.connect("http://localhost:10000");

function RoomShowPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { roomId } = useParams();
  const user = useSelector((state) => state.session.user);
  const room = useSelector((state) => state.rooms[roomId]);
  const winner = useSelector((state) => state.games ? state.games.winner?.username : null)
  const ifPlayer = room ? room.players : [];
  const players =
    ifPlayer.length === 0
      ? []
      : ifPlayer.map((player, i) => (
          <li key={i}>
            {" "}
            {player.username} ({player.wins} {player.wins < 2 ? "win" : "wins"})
          </li>
        ));
  const [socket2, setSocket] = useState(1);
  const [hidden, setHidden] = useState(true);
  const [category, setCategory] = useState("");
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    let pics;
    switch (category) {
      case "Animals":
         pics = ["capybara","penguin","hedgehog","sloth","loris"];
         break;
      case "People":
        pics = ["chak", "manny", "rex", "wilson", "zahi"];
        break;
      case "Places":
         pics = ["paris","rome","newyorkcity","sydney","egypt"];
         break;
      default:
        pics = ["", "", "", "", ""];
        break;
    }
    const randomAnswer = pics[Math.floor(Math.random() * pics.length)];
    setAnswer(randomAnswer);
  }, [category]);

  const game = hidden ? null : (
    <GameModal
      answer={answer}
      socket={socket}
      roomId={roomId}
      category={category}
    />
  );

  socket.emit("join", roomId);
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchRoom(roomId));
    }, 1000);
    socket.on("start-game", (answer) => {
      setAnswer(answer);
      setHidden(false);
    });
    socket.on("end-game", () => {
      // history.push("/roomlist");
      window.location.reload();
    });
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(()=> {
    dispatch(fetchGame(room?.name))
  },[winner])

  if (user === undefined) {
    return <>still loading...</>;
  }

  if (!room?.players.find((p) => p._id.toString() === user._id.toString()))
    return <Redirect to="/roomlist" />;

  const handleStartGame = (e) => {
    e.preventDefault();
    socket.emit("start-game", roomId, answer);
    setHidden(false);
    setSocket(socket2 + 1);
  };

  const handleLeave = (e) => {
    dispatch(updateRoom(room));
  };

  const hostStart =
    room?.host._id === user._id ? (
      <div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">-- Select a category --</option>
          <option value="Animals">Animals</option>
          <option value="People">People</option>
          <option value="Places">Places</option>
        </select>
        {category != "" ? (
          <button className="signup-button" onClick={handleStartGame}>
            START GAME
          </button>
        ) : null}
      </div>
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
                { winner ? <h2> Previous Winner: { winner }</h2> : null}
                <ul>
                  Players in room ({players ? players.length : null}/
                  {room ? room.size : null}){players ? players : null}
                </ul>
              </div>
              {hostStart}
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
