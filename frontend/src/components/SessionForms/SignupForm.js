import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signup, clearSessionErrors } from "../../store/session";
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";
import "./SessionForms.css";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();
  const emailInputRef = useRef(null);

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;

    switch (field) {
      case "email":
        setState = setEmail;
        break;
      case "username":
        setState = setUsername;
        break;
      case "password":
        setState = setPassword;
        break;
      case "password2":
        setState = setPassword2;
        break;
      default:
        throw Error("Unknown field in Signup Form");
    }

    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
    };

    dispatch(signup(user));
  };

  return (
    <>
      <ConsoleNavBar name={"signup"} />
      <div className="console-container">
        <img
          className="thebox-image"
          src="https://the-box-project.s3.amazonaws.com/final.png"
          alt="noimg"
        ></img>
        <form className="session-form" onSubmit={handleSubmit}>
          <div>
            <label>
              <span id="label-green">AA-Laptop</span>:
              <span id="label-blue">~/the-box/TheBox/SignUp/Email</span>${" "}
              <input
                type="text"
                value={email}
                onChange={update("email")}
                required
                ref={emailInputRef}
                autoComplete="off"
              />
            </label>
          </div>
          <div>
            <label>
              <span id="label-green">AA-Laptop</span>:
              <span id="label-blue">~/the-box/TheBox/SignUp/Username</span>${" "}
              <input
                type="text"
                value={username}
                onChange={update("username")}
                required
                autoComplete="off"
              />
            </label>
          </div>
          <div>
            <label>
              <span id="label-green">AA-Laptop</span>:
              <span id="label-blue">~/the-box/TheBox/SignUp/Password</span>${" "}
              <input
                type="password"
                value={password}
                onChange={update("password")}
                required
                autoComplete="off"
              />
            </label>
          </div>
          <div>
            <label>
              <span id="label-green">AA-Laptop</span>:
              <span id="label-blue">
                ~/the-box/TheBox/SignUp/ConfirmPassword
              </span>
              ${" "}
              <input
                type="password"
                value={password2}
                onChange={update("password2")}
                required
                autoComplete="off"
              />
            </label>
          </div>
          <input
            className="signup-button"
            type="submit"
            value="Sign Up"
            // disabled={
            //   !email || !username || !password || password !== password2
            // }
          />
        </form>
        <div className="errors">
          {errors?.username && <p>ERR: {errors?.username} </p>}
        </div>
        <div className="errors">
          {" "}
          {errors?.email && <p>ERR: {errors?.email} </p>}
        </div>
        <div className="errors">
          {" "}
          {errors?.password && <p>ERR: {errors?.password} </p>}
        </div>
        <div className="errors">
          {password !== password2 && (
            <p>
              {" "}
              ERR:{" "}
              {password !== password2 && "Confirm Password field must match"}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default SignupForm;
