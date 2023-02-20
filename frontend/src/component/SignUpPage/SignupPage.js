import "./SignUpPage.css";
import Video from "../VideoBackground/Video";
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";
import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit() {}

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ul className="errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <ConsoleNavBar name={"signup"} />
        <div className="sign-up-page-container">
          <img
            className="thebox-image"
            src="https://the-box-project.s3.amazonaws.com/final.png"
            alt="noimg"
          ></img>
          <div className="all-input-container">
            <div className="input-container">
              <label>
                {" "}
                <span id="label-green">AA-Laptop</span>:
                <span id="label-blue">~/the-box/TheBox/SignUp/Username</span>
                $
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="input-container">
              <label>
                {" "}
                <span id="label-green">AA-Laptop</span>:
                <span id="label-blue">~/the-box/TheBox/SignUp/Email</span>${" "}
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="input-container">
              <label>
                <span id="label-green">AA-Laptop</span>:
                <span id="label-blue">~/the-box/TheBox/SignUp/Password</span>${" "}
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="input-container">
              <label>
                <span id="label-green">AA-Laptop</span>:
                <span id="label-blue">
                  ~/the-box/TheBox/SignUp/RepeatPassword
                </span>
                ${" "}
                <input
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>

          <div className="buttons-container">
            <div>
              <button className="signup-button" type="submit">
                Sign Up
              </button>
            </div>
            <div>
              <button className="signup-button" type="submit">
                Demo Login
              </button>
            </div>
          </div>
          <div id="new">
            {" "}
            Already have an account?
            <br></br>
            <NavLink to="login" id="navlink">
              {" "}
              Login
            </NavLink>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignUpPage;
