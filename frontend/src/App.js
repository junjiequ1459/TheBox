import React from "react";
import { Route, Switch } from "react-router-dom";
import SignUpPage from "./component/SignUpPage/SignupPage";

function App() {
  return (
    <>
      <Switch>
        {/* <Route path="/login">
          <LoginFormPage />
        </Route> */}
        <Route path="/signup">
          <SignUpPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
