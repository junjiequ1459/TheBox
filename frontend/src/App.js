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
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";

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

  return (
    <>
      <audio id="bg-music" src={BackgroundMusic} autoPlay controls></audio>{" "}
      <div className="video-background">
        <Video />
      </div>
      {!loaded && <LoadingScreen />}
      {loaded && (
        <>
        <MusicPlayer />
          <Switch>
            <AuthRoute exact path="/login" component={LoginForm} />
            <AuthRoute exact path="/signup" component={SignupForm} />
            <Route exact path="/about" component={AboutPage} />
            <ProtectedRoute exact path="/roomform" component={RoomForm} />
            <ProtectedRoute exact path="/roomlist" component={RoomList} />
            <ProtectedRoute path="/room/:roomId" component={RoomShowPage} />
            <ProtectedRoute exact path="/play" component={GamePage} />
            <ProtectedRoute path="/profile/:userId" component={ProfilePage} />
            <ProtectedRoute path="/" component={MainPage} />
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
