import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, clearSessionErrors } from "../../store/session";
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";
import "./SessionForms.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.errors.session);
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
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email: "zaus@zaus.zaus", password: "zausbaus" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <>
      <ConsoleNavBar name={"login"} />
      <div className="console-container">
        <img
          className="thebox-image"
          src="https://the-box-project.s3.amazonaws.com/final.png"
          alt="noimg"
        ></img>
        <form className="session-form" onSubmit={handleSubmit}>
          <div>
            <label>
              <span id="label-green">Email for</span>:
              <span id="label-blue">~https://the-box.com</span>${" "}
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
              <span id="label-green">Password for</span>:
              <span id="label-blue">~https://the-box.com</span>${" "}
              <input
                type="password"
                value={password}
                onChange={update("password")}
                autoComplete="off"
                required
              />
            </label>
          </div>
          <input
            className="signin-button"
            type="submit"
            value="Log In"
            // disabled={!email || !password}
          />
          <button className="signin-button" onClick={demoLogin}>
            {" "}
            Demo Login{" "}
          </button>
        </form>
        <div className="errors">
          {" "}
          {errors?.email && <p>ERR: {errors?.email} </p>}
        </div>{" "}
        <div className="errors">
          {" "}
          {errors?.password && <p>ERR: {errors?.password} </p>}
        </div>{" "}
      </div>
    </>
  );
}

export default LoginForm;
