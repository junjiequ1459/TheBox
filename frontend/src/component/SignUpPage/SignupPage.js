import "./SignUpPage.css";
import React, { useState } from "react";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  return (
    <>
      <label>
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          placeholder="Repeat Password"
          type="password"
          value={password}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />
      </label>
      <button className="signup-button" type="submit">
        Sign Up
      </button>
      <button className="signup-button" type="submit">
        Demo Login
      </button>
    </>
  );
}

export default SignUpPage;
