import React from "react";
import { Route, Switch } from "react-router-dom";
import SignUpPage from "./component/SignUpPage/SignupPage";
import SignInPage from "./component/SignInPage/SignInPage";

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
      </Switch>
    </>
  );
}

export default App;
