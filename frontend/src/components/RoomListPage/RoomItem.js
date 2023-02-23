import "./RoomList.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateRoom } from "../../store/rooms";

function RoomItem({ room }) {
  const dispatch = useDispatch();
  const linkRef = useRef();

  function handleDivClick(e) {
    dispatch(updateRoom(room))
  }
  
  return (
      <Link to={`/room/${room._id}`}>
        <div className="room-item-container" onClick={handleDivClick}>
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
      </div>
    </Link>
  );
}
export default RoomItem;
