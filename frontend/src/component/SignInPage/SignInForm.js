import "./SignInPage.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";
import { NavLink } from "react-router-dom";
import { login, clearSessionErrors } from '../../store/session';

function SignInForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const errors = useSelector(state => state.errors.session);

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(login({email: "zaus@zaus.zaus", password: "zausbaus"}))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
  };

  return (
    <div>
      <ConsoleNavBar name={"login"} />
      <form onSubmit={handleSubmit}>
      <div className="errors">{errors?.email}</div>

        <div className="sign-up-page-container">
          <img
            className="thebox-image"
            src="https://the-box-project.s3.amazonaws.com/final.png"
            alt="noimg"
          ></img>
          <div className="all-input-container">
            <div className="input-container">
              <label>
                <span id="label-green">Email for</span>:
                <span id="label-blue">~https://the-box.com</span>${" "}
                <input
                  className="input"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="input-container">
              <label>
                <span id="label-green">Password for</span>:
                <span id="label-blue">~https://the-box.com</span>${" "}
                <input
                  className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            <button className="signin-button" type="submit">
              {" "}
              Login
            </button>
            <button className="signin-button" onClick={demoLogin}>
              {" "}
              Demo Login{" "}
            </button>
            <div id="new">
              {" "}
              New to theBox?
              <br></br>
              <NavLink to="signup" id="navlink">
                {" "}
                Create an account
              </NavLink>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
