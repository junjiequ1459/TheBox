import "./RoomList.css";
import { Link } from "react-router-dom";

function RoomItem({ room }) {
  debugger;

  return (
    <Link to={`/room/${room._id}`}>
      <li className="room-item">
        <div>
          <span>{room.name}</span>
          <br></br>
          <span>Hosted by: {room.host.username}</span>
        </div>
        <div>
          {room.players.length}/{room.size}
        </div>
      </li>
    </Link>
  );
}

export default RoomItem;
