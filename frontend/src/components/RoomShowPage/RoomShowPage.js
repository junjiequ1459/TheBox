import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRoom } from "../../store/rooms";
import Chat from "../ChatBox/ChatBox";
import io from "socket.io-client";
const socket = io('http://localhost:3001');

function RoomShowPage() {
  const { roomId } = useParams();
  console.log(roomId)
  const user = useSelector((state) => state.session.user);
  console.log(user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRoom(roomId))
  }, [roomId])

  socket.emit("join", roomId)
  if (user === undefined) {
    return (
      <>still loading...</>
    )
  }

  return (
  <>
    <div>
      <h1>SHOW PAGE</h1>
    </div>;

    <Chat socket={socket} username={user.username} room={roomId}/>
  </>
  )
}

export default RoomShowPage;
