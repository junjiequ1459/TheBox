import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./MainPage.css";
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";

function MainPage() {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  if (!user) {
    history.push("/login");
    return null;
  }
  return (
    <>
      <ConsoleNavBar name={"mainpage"} />
      <div className="console-container">
        <div className="create-game-container">
          <div className="main-page-button-container">
            <div>
              <button
                className="signup-button"
                onClick={() => history.push("/roomlist")}
              >
                Join Lobby
              </button>
            </div>
            <div>
              <button
                className="signup-button"
                onClick={() => history.push("/roomform")}
              >
                Create Lobby
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
