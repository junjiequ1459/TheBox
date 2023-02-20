import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";
import { NavLink } from "react-router-dom";
import "./AboutPage.css";

function AboutPage() {
  return (
    <>
      <ConsoleNavBar name={"About"} />

      <div className="sign-up-page-container">
        <div className="about-nav-link-container">
          <NavLink to="/" id="about-navlink">
            <button id="about-nav-button">HomePage</button>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
