import "./SignInPage.css";
import SignInForm from "./SignInForm";
import { NavLink } from "react-router-dom";

function SignInPage() {
  return (
    <div>
      <div>
        <SignInForm id="form" />
      </div>
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
  );
}

export default SignInPage;
