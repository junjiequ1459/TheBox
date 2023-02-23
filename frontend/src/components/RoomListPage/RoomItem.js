import "./RoomList.css";
import { useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateRoom } from "../../store/rooms";

function RoomItem({ room }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const linkRef = useRef();
  const currentUser = useSelector((state) => state.session.user);

  function handleDivClick(e) {
    dispatch(updateRoom(room));
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
