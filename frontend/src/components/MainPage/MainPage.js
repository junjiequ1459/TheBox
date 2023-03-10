import { useHistory } from "react-router-dom";
import "./MainPage.css";
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";

function MainPage() {
  const history = useHistory();

  const handleJoinRoom = () => {
    history.push("/roomlist");
  };

  return (
    <>
      <ConsoleNavBar name={"mainpage"} />
      <div className="console-container">
        <div className="create-game-container">
          <div className="main-page-button-container">
            <div>
              <button
                id="join-lobby-button"
                className="signup-button"
                onClick={handleJoinRoom}
              >
                Join Lobby
              </button>
              <div className="ripple-join"></div>
            </div>
            <div>
              <button
                id="create-lobby-button"
                className="signup-button"
                onClick={() => history.push("/roomform")}
              >
                Create Lobby
              </button>
              <div className="ripple-create"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
