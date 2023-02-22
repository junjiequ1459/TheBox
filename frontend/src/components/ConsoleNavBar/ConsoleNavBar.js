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
          <button className="nav-bar-button" onClick={() => history.push("/")}>
            Home
          </button>
          <button
            className="nav-bar-button"
            onClick={() => history.push(`/profile/${currentUser._id}`)}
          >
            Profile
          </button>
          <button
            className="nav-bar-button"
            onClick={() => history.push("/play")}
          >
            Game
          </button>
          <button className="nav-bar-button" onClick={logoutUser}>
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

  function HandleAboutPage() {
    return (
      <NavLink to="about" id="navlink">
        <button className="nav-bar-button">About</button>
      </NavLink>
    );
  }

  return (
    <>
      <div className="console-navbar">
        <div className="nav-bar-name">
          <i className="fa-solid fa-terminal"></i> AA-Laptop: the-box/TheBox/{name}/
        </div>
        <HandleAboutPage />
        {getLinks()}

        <div className="name-container">
          <h1 className="user-console-name">
            {currentUser && currentUser.username}
          </h1>
        </div>
      </div>
    </>
  );
}

export default ConsoleNavBar;
