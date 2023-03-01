import "./Leaderboard.css";
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";
import { useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/users";

function Leaderboard() {
  const dispatch = useDispatch();
  const users = useSelector((state) =>
    state.users ? Object.values(state.users) : []
  );
  const userItems = users.map((user, i) => (
    <li key={i}>
      {" "}
      {user.username} : {user.wins}{" "}
    </li>
  ));
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <ConsoleNavBar name={"leaderboard"} />
      <ul>{userItems}</ul>
    </>
  );
}

export default Leaderboard;
