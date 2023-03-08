import "./Leaderboard.css";
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";
import { useEffect } from "react";
import { Link } from "react-router-dom";
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
      <div className="ranking-username"><Link to={`/profile/${user._id}`}>
      {user.username}
      </Link>
      </div>
      <div className="ranking-wins">{user.wins}</div>{" "}
    </li>
  ));

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <ConsoleNavBar name={"leaderboard"} />
      <div className="console-container">
        <h1 className="leaderboard-title">LeaderBoards</h1>
        <div className="leaderboards-container">
          <div className="ranking-container">
            <div>
              <div className="ranking-heading">
                <p>Rank</p>
                <p>Player</p>
                <p>Wins</p>
              </div>
              <div className="list-overflow">
                <ol>{userItems}</ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Leaderboard;
