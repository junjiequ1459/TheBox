import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import NavBar from "./components/NavBar/NavBar";
import Video from "./components/VideoBackground/Video";
import MainPage from "./components/MainPage/MainPage";
import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import GamePage from "./components/GamePage/GamePage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import { getCurrentUser } from "./store/session";
import AboutPage from "./components/AboutPage/AboutPage";
import RoomListPage from "./components/RoomListPage/RoomList";
import RoomForm from "./components/RoomForm/RoomForm";
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);
  return (
    <>
      <Video />
      <NavBar />
      <Switch>
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/roomform" component={RoomForm} />
        <Route exact path="/roomlist" component={RoomListPage} />
        <Route exact path="/" component={MainPage} />
        <ProtectedRoute exact path="/play" component={GamePage} />
        <ProtectedRoute path="/profile/:userId" component={ProfilePage} />
      </Switch>
    </>
  );
}

export default App;
