import "./RoomList.css";
import { useRef } from "react";
import { Link } from "react-router-dom";

function RoomItem({ room }) {
  const linkRef = useRef();

  function handleDivClick() {
    linkRef.current.click();
  }
  return (
    <div className="room-item-container" onClick={handleDivClick}>
      <Link to={`/room/${room._id}`} ref={linkRef}>
        <ul className="room-item">
          <div>
            <span>{room.name}</span>
            <br></br>
            <span>Hosted by: {room.host.username}</span>
          </div>
          <div>
            {room.players.length}/{room.size}
          </div>
        </ul>
      </Link>
    </div>
  );
}
export default RoomItem;
