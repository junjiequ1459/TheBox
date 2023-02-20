import React from "react";
import { Route, Switch } from "react-router-dom";
import SignUpPage from "./component/SignUpPage/SignupPage";
import SignInPage from "./component/SignInPage/SignInPage";
import Video from "./component/VideoBackground/Video";
import Game from "./component/GamePage/Game";
import AboutPage from "./component/AboutPage/AboutPage";
import SplashPage from "./SplashPage/SplashPage";

function App() {
  return (
    <>
      <Video />
      <Switch>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/login">
          <SignInPage />
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route>
        <Route path="/play">
          <Game />
        </Route>
        <Route exact path="/">
          <SplashPage />
        </Route>
      </Switch>
    </>
  );
}
export default App;