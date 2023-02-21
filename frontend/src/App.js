
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';
import Video from './components/VideoBackground/Video';
import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import GamePage from './components/GamePage/GamePage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import { getCurrentUser } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);
  return (
    <>
      <Video/>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <AuthRoute exact path="/play" component={GamePage} />
        <ProtectedRoute path="/profile/:userId" component={ProfilePage} />
        <AuthRoute exact path="/" component={MainPage} />
      </Switch>
    </>
  );
}

export default App;