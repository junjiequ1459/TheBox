import "./RoomList.css";
import { Redirect } from "react-router";

function RoomItem({ room }) {
  const handleJoinRoom = () => {
    return <Redirect to={`/room/${room.id}`} />;
  };

  return (
    <li className="room-item" onClick={handleJoinRoom}>
      <div>
        <span>{room.name}</span>
        <br></br>
        <span>Hosted by: {room.host.username}</span>
      </div>
      <div>
        {room.players.length}/{room.size}
      </div>
    </li>
  );
}

export default RoomItem;
