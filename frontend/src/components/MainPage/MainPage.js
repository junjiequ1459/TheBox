import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./MainPage.css";
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";

function MainPage() {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  if (!user) {
    history.push("/login");
    return null;
  }

  const handleJoinRoom = () => {
    history.push("/roomlist");
    return <Redirect to="/roomlist" />;
  };

  return (
    <>
      <ConsoleNavBar name={"mainpage"} />
      <div className="console-container">
        <div className="create-game-container">
          <div className="main-page-button-container">
            <div>
              <button className="signup-button" onClick={handleJoinRoom}>
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
