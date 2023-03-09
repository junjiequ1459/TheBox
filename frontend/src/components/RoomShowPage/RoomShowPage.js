import { useHistory, useParams, Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRoom } from "../../store/rooms";
import Chat from "../ChatBox/ChatBox";
import io from "socket.io-client";
import { bank } from "../GamePage/QuestionBank";
import "./RoomShowPage.css";
import { updateRoom } from "../../store/rooms";
import GameModal from "../GamePage/GamePage.js";
import { fetchGame } from "../../store/games";

const socket = io("http://localhost:3002");

function RoomShowPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { roomId } = useParams();
  const user = useSelector((state) => state.session.user);
  const room = useSelector((state) => state.rooms[roomId]);
  const gameinfo = useSelector((state) => (state.games ? state.games : null));
  const winner = gameinfo?.winner?.username;
  const prevAnswer = gameinfo?.answer;
  const ifPlayer = room ? room.players : [];
  const players =
    ifPlayer.length === 0
      ? []
      : ifPlayer.map((player, i) => (
          <li
            key={i}
            style={user?._id === player._id ? { color: "#008df8" } : {}}
          >
            {" "}
            {player.username} ({player.wins} {player.wins < 2 ? "win" : "wins"})
          </li>
        ));
  const [socket2, setSocket] = useState(1);
  const [hidden, setHidden] = useState(true);
  const [category, setCategory] = useState("");
  const [gameCategory, setGameCategory] = useState("");
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    let pics;
    let randomAnswer = null;
    switch (category) {
      case "Animals":
        pics = ["capybara", "penguin", "hedgehog", "sloth", "loris"];
        randomAnswer = pics[Math.floor(Math.random() * pics.length)];
        setAnswer(randomAnswer);
        setQuestion(null);
        break;
      case "People":
        pics = ["chak", "manny", "rex", "wilson", "zahi"];
        randomAnswer = pics[Math.floor(Math.random() * pics.length)];
        setAnswer(randomAnswer);
        setQuestion(null);
        break;
      case "Places":
        pics = ["paris", "rome", "newyorkcity", "sydney", "egypt"];
        randomAnswer = pics[Math.floor(Math.random() * pics.length)];
        setAnswer(randomAnswer);
        setQuestion(null);
        break;
      case "Quiz":
        if (!question) {
          randomAnswer = bank[Math.floor(Math.random() * bank.length)];
          setAnswer(randomAnswer.answer);
          setQuestion(randomAnswer.question);
        } 
        break;
      default:
        pics = ["", "", "", "", ""];
        break;
    }
  }, [category]);

  const game = hidden ? null : (
    <GameModal
      category={gameCategory}
      answer={answer}
      question={question}
      socket={socket}
      roomId={roomId}
    />
  );

  useEffect(() => {
    socket.emit("join", roomId);
    const intervalId = setInterval(() => {
      dispatch(fetchRoom(roomId));
    }, 1000);
    socket.on("start-game", (payload) => {
      if (payload) {
        setQuestion(payload.question);
        setAnswer(payload.answer);
        setGameCategory(payload.category);
      }
      // setCategory(category);
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

  useEffect(() => {
    dispatch(fetchGame(room?.name));
  }, [winner, prevAnswer]);

  if (user === undefined) {
    return <>still loading...</>;
  }

  if (!room?.players.find((p) => p._id.toString() === user._id.toString()))
    return <Redirect to="/roomlist" />;

  const handleStartGame = (e) => {
    e.preventDefault();
    const payload = {
      answer,
      question,
      category
    }
    socket.emit("start-game", roomId, payload);
    setHidden(false);
    setSocket(socket2 + 1);
  };

  const handleLeave = (e) => {
    socket.emit("leave", roomId)
    dispatch(updateRoom(room));
  };

  const hostStart =
    room?.host._id === user._id ? (
      <div>
        <select value={category} onChange={(e) => {
        setCategory(e.target.value);
        setGameCategory(e.target.value);
        }}>
          <option value="">-- Select a category --</option>
          <option value="Animals">Animals</option>
          <option value="People">People</option>
          <option value="Places">Places</option>
          <option value="Quiz">Quiz</option>
        </select>
        {category != "" && room.players.length > 1 ? (
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

  const gamedata = (
    <>
      {!winner && prevAnswer ? <h2> Draw </h2> : null}
      {winner ? <h2> Previous Winner : {winner} </h2> : null}
      {prevAnswer ? <h2> Previous Answer : {prevAnswer} </h2> : null}
    </>
  );

  return (
    <>
      <div>
        <div className="console-container">
          <div className="gameroom-container">
            <div className="info-div">
              <div className="room-show">
                <h1> {room ? room.name : null}</h1>
                <h2> Hosted by: {room ? room.host.username : null}</h2>
                {gamedata}
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
