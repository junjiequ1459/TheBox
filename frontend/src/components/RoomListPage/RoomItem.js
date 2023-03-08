import "./RoomList.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateRoom } from "../../store/rooms";

function RoomItem({ room }) {
  const dispatch = useDispatch();

  function handleDivClick(e) {
    dispatch(updateRoom(room));
  }

  const fullroom = room.players.length < room.size ? `/room/${room._id}` : `/roomlist`

  return (
    <Link to={fullroom}>
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
