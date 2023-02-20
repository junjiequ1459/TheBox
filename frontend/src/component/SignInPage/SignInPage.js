import "./SignInPage.css";
import Video from "../VideoBackground/Video";
import SignInForm from "./SignInForm";
import { NavLink } from "react-router-dom";

function SignInPage() {
  return (
    <div>
      <div>
        <SignInForm id="form" />
      </div>
    </div>
  );
}

export default SignInPage;
