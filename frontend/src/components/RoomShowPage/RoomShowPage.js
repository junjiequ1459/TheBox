import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRoom } from "../../store/rooms";
import Chat from "../ChatBox/ChatBox";
import io from "socket.io-client";
import './RoomShowPage.css'
import { updateRoom } from "../../store/rooms";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const socket = io('http://localhost:3001');

function RoomShowPage() {
  const { roomId } = useParams();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch()
  const room = useSelector((state) => state.rooms[0])
  const players = room.players.map((player) => <li> {player.username} </li>)
  useEffect(() => {
    dispatch(fetchRoom(roomId))
  }, [roomId])

  socket.emit("join", roomId)
  if (user === undefined) {
    return (
      <>still loading...</>
    )
  }

  const handleLeave = (e) => {
    dispatch(updateRoom(room))
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
    <Link to="/roomlist" onClick={handleLeave}> Leave Room </Link>
    <Chat socket={socket} username={user.username} room={roomId}/>
  </>
  )
}

export default RoomShowPage;
