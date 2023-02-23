import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRoom } from "../../store/rooms";
import Chat from "../ChatBox/ChatBox";
import io from "socket.io-client";
import './RoomShowPage.css'
import { updateRoom, deleteRoom } from "../../store/rooms";
import { Link } from "react-router-dom";

const socket = io('http://localhost:3001');

function RoomShowPage() {
  const history = useHistory()
  const { roomId } = useParams();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch()
  const room = useSelector((state) => state.rooms[0])
  const players = room.players.map((player) => <li> {player.username} </li>)
  const [socket2, setSocket] = useState(1)

  useEffect(() => {
    dispatch(fetchRoom(roomId))
    socket.emit("join", roomId)
    socket.on("start-game", () => {
      history.push("/play")
      console.log("started game")
    })

    // listen for player-joined event to receive updated room data
    socket.on("player-joined", (updatedRoom) => {
      dispatch(updateRoom(updatedRoom)); // update room state with updated data
    });

    // clean up WebSocket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [roomId, socket, socket2])
  
  

  if (user === undefined) {
    return (
      <>still loading...</>
    )
  }
  
  const handleStartGame = (e) => {
    e.preventDefault()
    socket.emit('start-game', roomId)
    history.push("/play")
    setSocket(socket2+1)
  }

  const handleLeave = (e) => {
    dispatch(updateRoom(room))
  }

  const handleDelete = (e) => {
    dispatch(deleteRoom(room))
  }

  return (
  <>
    <div className='room-show'>
      <h1> {room.name}</h1>
      <h1> Hosted by: {room.host.username}</h1>
      <ul>Players in room ({players.length}/{room.size})
        {players}
      </ul>
    </div>;
    <button onClick={handleStartGame}>START GAME</button>
    <Link to="/roomlist" onClick={handleLeave}> Leave Room </Link>
    <Link to="/roomlist" onClick={handleDelete}> Delete Room </Link>
    <Chat socket={socket} username={user.username} room={roomId}/>
  </>
  )
}

export default RoomShowPage;
