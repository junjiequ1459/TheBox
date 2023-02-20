import "./SignUpPage.css";
import React, { useState, useRef, useEffect } from "react";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current.autoplay = true;
    videoRef.current.loop = true;
    videoRef.current.muted = true;
  }, []);

  return (
    <>
      <div id="video-container">
        <video
          ref={videoRef}
          className="video-background"
          src="https://the-box-project.s3.amazonaws.com/network-80645.mp4"
        ></video>
      </div>
      <div className="signup-navbar">
        <div className="nav-bar-name">
          <i class="fa-solid fa-terminal"></i> AA-Laptop:
          the-box/TheBox/SignUp/:
        </div>
        <button class="nav-bar-button">+</button>
      </div>

      <div className="sign-up-page-container">
        <img className="thebox-image" src="https://the-box-project.s3.amazonaws.com/output-onlineasciitools.png" alt="noimg"></img>
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
      </div>
    </>
  );
}

export default SignUpPage;
