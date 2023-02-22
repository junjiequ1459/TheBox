import "./RoomList.css";
function RoomItem({ room }) {
  return (
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
  );
}

export default RoomItem;
