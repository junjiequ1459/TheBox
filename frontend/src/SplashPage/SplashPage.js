import ConsoleNavBar from "../component/ConsoleNavBar/ConsoleNavBar";
import { NavLink } from "react-router-dom";
import "./SplashPage.css";
function SplashPage() {
  return (
    <>
      <ConsoleNavBar name={"Home"} />
      <div className="sign-up-page-container">
        <div className="log-out-button-container">
          <NavLink to="login" id="navlink">
            <button>Log Out</button>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default SplashPage;
