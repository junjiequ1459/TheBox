import { useParams } from "react-router-dom";
import { useEffect } from "react";
import './ProfilePage.css'
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function ProfilePage() {
  const { userId } = useParams();


  socket.emit('join', `${userId}`);

  const handleClick = (e) => {
    e.preventDefault()
    socket.emit("send_message", {message: `hello from ${userId}`})
  }

  useEffect(() => {
    socket.on("receive_message", data => {
      alert(data.message)
    })
  }, [socket])

  //Start of a profile page, need users in the store
  return (
    <>
      <h1>Profile</h1>
      <button onClick={handleClick}>TESTING</button>
      <ConsoleNavBar name={"about"} />
      <div className="console-container"> </div>
    </>
  );
}

export default ProfilePage;
