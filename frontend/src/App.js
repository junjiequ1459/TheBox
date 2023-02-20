<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';

import { getCurrentUser } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
=======
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
>>>>>>> 9c8d6369bee46a0cdd61f9ee978744aad1ffcd7c
      </Switch>
    </>
  );
}

export default App;