import "./RoomList.css";
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRooms } from "../../store/rooms";
import RoomItem from "./RoomItem";

function RoomList() {
  const dispatch = useDispatch();

  const rooms = useSelector((state) => Object.values(state.rooms));
  const roomItems = rooms.map((room, i) => <RoomItem key={i} room={room} />);

  useEffect(() => {
      dispatch(fetchRooms());
  }, [dispatch]);

  return (
    <>
      {/* <ConsoleNavBar name={"room-list"} /> */}
      <div className="console-container">
        <ul className="rooms-list">{roomItems}</ul>
      </div>
    </>
  );
}

export default RoomList;
