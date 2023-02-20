import "./SignInPage.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function SignInForm() {
  // const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const demoLogin = (e) => {
    e.preventDefault();
    // dispatch(sessionActions.login({email: "demo@user.io", password: "password"}))
  };

  const handleSubmit = (e) => {
    //   e.preventDefault();
    //   setErrors([]);
    //   return dispatch(sessionActions.login({ username, password }))
    //     .catch(async (res) => {
    //       let data;
    //       try {
    //         data = await res.clone().json();
    //       } catch {
    //         data = await res.text(); // Will hit this case if the server is down
    //       }
    //       if (data?.errors) setErrors(data.errors);
    //       else if (data) setErrors([data]);
    //       else setErrors([res.statusText]);
    //     });
  };

  return (
    <div>
      <button onClick={demoLogin}> Demo Login </button>
      <form onSubmit={handleSubmit}>
        <ul className="errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <label>
          Username for 'https://the-box.com':
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Password for 'https://the-box.com':
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit"> Login </button>
      </form>
    </div>
  );
}

export default SignInForm;
