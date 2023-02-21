import { useParams } from "react-router-dom";

function ProfilePage () {
  const { userId } = useParams();
  //Start of a profile page, need users in the store
  return (
    <>
      <h1>Profile</h1>
    </>
  );
}

export default ProfilePage;