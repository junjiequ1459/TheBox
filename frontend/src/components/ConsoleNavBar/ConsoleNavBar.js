import "./ConsoleNavBar.css";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";

function ConsoleNavBar({ name }) {
  const loggedIn = useSelector((state) => !!state.session.user);
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  function getLinks() {
    if (loggedIn) {
      return (
        <div className="console-nav-link-container">
          <button
            className="nav-bar-button"
            onClick={() => history.push("/about")}
          >
            About
          </button>
          <button className="nav-bar-button" onClick={() => history.push("/")}>
            Home
          </button>
          <button
            className="nav-bar-button"
            onClick={() => history.push("/leaderboard")}
          >
            LeaderBoard
          </button>
          <button
            id="console-logout-button"
            className="nav-bar-button"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <div className="console-nav-link-container">
            <button
              className="nav-bar-button"
              onClick={() => history.push("/about")}
            >
              About
            </button>
            <button
              className="nav-bar-button"
              onClick={() => history.push("/leaderboard")}
            >
              LeaderBoard
            </button>
            <button
              className="nav-bar-button"
              onClick={() => history.push("/signup")}
            >
              Signup
            </button>
            <button
              className="nav-bar-button"
              onClick={() => history.push("/login")}
            >
              Login
            </button>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <div className="console-navbar">
        <div className="nav-bar-name">
          <i className="fa-solid fa-terminal"></i> AA-Laptop: the-box/TheBox/
          {name}/
        </div>
        {getLinks()}
        <div className="name-container">
          <h1
            className="user-console-name"
            onClick={() => history.push(`/profile/${currentUser._id}`)}
          >
            {currentUser && currentUser.username}
          </h1>
        </div>
      </div>
    </>
  );
}

export default ConsoleNavBar;
