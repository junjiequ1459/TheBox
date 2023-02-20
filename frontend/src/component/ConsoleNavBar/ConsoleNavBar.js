import "./ConsoleNavBar.css";
import { NavLink } from "react-router-dom";

function ConsoleNavBar({ name }) {
  function HandleAboutPage() {
    
    return (
      <NavLink to="about" id="navlink">
        <button className="nav-bar-button">+</button>
      </NavLink>
    );
  }

  return (
    <>
      <div className="signup-navbar">
        <div className="nav-bar-name">
          <i class="fa-solid fa-terminal"></i> AA-Laptop: the-box/TheBox/{name}
          /:
        </div>
        <HandleAboutPage />
      </div>
    </>
  );
}

export default ConsoleNavBar;
