import "./RoomList.css";
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchRooms } from "../../store/rooms";
import RoomItem from "./RoomItem";
import {
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";

function RoomList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const [searchValue, setSearchValue] = useState("");
  const rooms = useSelector((state) => Object.values(state.rooms));
  const roomItems = rooms.map((room, i) => <RoomItem key={i} room={room} />);

  useEffect(() => {
    dispatch(fetchRooms(searchValue));
  }, [dispatch, searchValue, rooms.length]);

  rooms.forEach((room) => {
    debugger;
    room.players.forEach((player) => {
      if (player.playerId === currentUser._id) {
        history.push(`/room/${room._id}`);
      }
    });
  });
  if (!currentUser) return <Redirect to="login"></Redirect>;
  return (
    <>
      <ConsoleNavBar name={"room-list"} />
      <div className="console-container">
        <div className="room-list-container">
          <div>
            <div className="roomlist-title">
              <h1>ROOMS</h1>
            </div>
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={"Search by lobby name"}
            />
            <div className="room-list-style">
              <ul className="rooms-list">{roomItems}</ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomList;
