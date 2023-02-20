import React from "react";
import { Route, Switch } from "react-router-dom";
import SignUpPage from "./component/SignUpPage/SignupPage";
import SignInPage from "./component/SignInPage/SignInPage";
import Game from "./component/GamePage/Game";

function App() {
  return (
    <>
      <Switch>
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
          <div> landing page here</div>
        </Route>
      </Switch>
    </>
  );
}

export default App;
