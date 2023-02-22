import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ProfilePage.css";
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";
import io from "socket.io-client";
import { updateUser } from "../../store/users";
import jwtFetch from "../../store/jwt";

const socket = io("http://localhost:3001");
function ProfilePage() {
  const { userId } = useParams();
  const [image, setImage] = useState(null);
  const [currentImageUrl, setcurrentImageUrl] = useState("");

  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  socket.emit("join", `${userId}`);

  const handleClick = (e) => {
    e.preventDefault();
    socket.emit("send_message", { message: `hello from ${userId}` });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    });
  }, [socket]);

  useEffect(() => {}, [currentImageUrl]);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await jwtFetch(`/api/users/${userId}/profile-image`, {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(updateUser(data.user));
        setImage(null);
        setcurrentImageUrl(data.user.profileImageUrl);
      } else {
        console.log(data.errors);
      }
    } catch (e) {
      console.error(e);
    }
  };

  //Start of a profile page, need users in the store
  const updateFile = (e) => setImage(e.target.files[0]);
  return (
    <>
      <h1>Profile</h1>
      <button onClick={handleClick}>TESTING</button>
      <ConsoleNavBar name={"about"} />
      <div className="console-container">
        <div className="user-profile-container">
          <img
            className="profile-image"
            src={currentImageUrl}
            alt="noimg"
          ></img>
          <form onSubmit={handleImageUpload}>
            <label>
              Profile Image
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={updateFile}
              />
            </label>
            <button type="submit">Upload</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
