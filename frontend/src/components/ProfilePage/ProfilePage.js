import { useParams } from "react-router-dom";
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";
function ProfilePage() {
  const { userId } = useParams();
  //Start of a profile page, need users in the store
  return (
    <>
      <ConsoleNavBar name={"about"} />
      <div className="console-container"> </div>
    </>
  );
}

export default ProfilePage;
