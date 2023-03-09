import React from "react";
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";
import "./HowToPage.css";

function HowToPage() {
  return (
    <>
      <ConsoleNavBar name={"howto"} />
      <div className="console-container">
        <div className="howto-container">
          <h1 id="howto-header">How To:</h1>
          <div className="about-description" id="howto-description">
            <ul id="howto-ul">
              <li key={0}>Login or Sign up</li>
              <li key={1}>Click Home to Join or Create a room</li>
              <li key={2}>Chat with people in a room</li>
              <li key={3}>Room host chooses a category and starts game</li>
              <li key={4}>
                1st person to guess name of picture or answer to trivia
                correctly wins
              </li>
              <li key={5}>
                Click name in corner to see profile and change profile picture
              </li>
              <li key={6}>
                Can view leaderboard and click on any user's name to view their
                profile
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default HowToPage;
