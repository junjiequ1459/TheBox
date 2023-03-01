import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import Video from "./components/VideoBackground/Video";
import MainPage from "./components/MainPage/MainPage";
import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import GamePage from "./components/GamePage/GamePage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import { getCurrentUser } from "./store/session";
import AboutPage from "./components/AboutPage/AboutPage";
import RoomList from "./components/RoomListPage/RoomList";
import RoomForm from "./components/RoomForm/RoomForm";
import RoomShowPage from "./components/RoomShowPage/RoomShowPage";
import LoadingScreen from "./LoadingScreen/LoadingScreen";
import BackgroundMusic from "./assets/Arcade.mp3";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => {
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
    });
  }, [dispatch]);

  function toggleMute() {
    var audio = document.getElementById("bg-music");
    audio.muted = !audio.muted;
  }

  return (
    <>
      <audio id="bg-music" src={BackgroundMusic} autoplay controls></audio>{" "}
      <div className="video-background">
        <Video />
      </div>
      {!loaded && <LoadingScreen />}
      {loaded && (
        <>
          <Switch>
            <AuthRoute exact path="/login" component={LoginForm} />
            <AuthRoute exact path="/signup" component={SignupForm} />
            <Route exact path="/about" component={AboutPage} />
            <ProtectedRoute exact path="/roomform" component={RoomForm} />
            <ProtectedRoute exact path="/roomlist" component={RoomList} />
            <ProtectedRoute path="/room/:roomId" component={RoomShowPage} />
            <ProtectedRoute exact path="/" component={MainPage} />
            <ProtectedRoute exact path="/play" component={GamePage} />
            <ProtectedRoute path="/profile/:userId" component={ProfilePage} />
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
