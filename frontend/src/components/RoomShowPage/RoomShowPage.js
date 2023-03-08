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

const socket = io();

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
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    let pics;
    switch (category) {
      case "Animals":
         pics = ["capybara","penguin","hedgehog","sloth","loris"];
         var randomAnswer = pics[Math.floor(Math.random() * pics.length)];
         setAnswer(randomAnswer);
         break;
      case "People":
        pics = ["chak", "manny", "rex", "wilson", "zahi"];
          var randomAnswer = pics[Math.floor(Math.random() * pics.length)];
          setAnswer(randomAnswer);
        break;
      case "Places":
         pics = ["paris","rome","newyorkcity","sydney","egypt"];
         var randomAnswer = pics[Math.floor(Math.random() * pics.length)];
         setAnswer(randomAnswer);
         break;
      case "Quiz":
         var randomAnswer = bank[Math.floor(Math.random() * bank.length)]
         setAnswer(randomAnswer.answer);
         setQuestion(randomAnswer.question);
      default:
        pics = ["", "", "", "", ""];
        break;
    }
  }, [category]);

  const game = hidden ? null : (
    <GameModal
      answer={answer}
      question={question}
      socket={socket}
      roomId={roomId}
    />
  );

  socket.emit("join", roomId);
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchRoom(roomId));
    }, 1000);
    socket.on("start-game", (answer, question) => {
      setQuestion(question);
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
    socket.emit("start-game", roomId, answer, question);
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
          <option value="Quiz">Quiz</option>
        </select>
        {(category != ""  && room.players.length > 1) ? (
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
