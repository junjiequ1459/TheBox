import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import "./ProfilePage.css";
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";
import io from "socket.io-client";
import { updateUser } from "../../store/users";
import jwtFetch from "../../store/jwt";

const socket = io("http://localhost:3001");

function ProfilePage() {
  const { userId } = useParams();
  const [image, setImage] = useState(null);
  const user = useSelector((state) => state.session.user);
  const fileInput = useRef(null);

  const [currentImageUrl, setcurrentImageUrl] = useState(user.profileImageUrl);

  const dispatch = useDispatch();

  socket.emit("join", `${userId}`);

  const handleClick = (e) => {
    e.preventDefault();
    socket.emit("send_message", { message: `hello from ${userId}` });
  };

  useEffect(() => {}, [currentImageUrl]);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      console.error("No file selected");
      return;
    }
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

  function updateFile(e) {
    if (e.target.files[0]) {
      var fileName = e.target.files[0].name;
      document.getElementById("file-name").textContent = fileName;
      setImage(e.target.files[0]);
    } else {
      document.getElementById("file-name").textContent = "";
      setImage(null);
    }
  }
  
  return (
    <>
      <h1>Profile</h1>
      <button onClick={handleClick}>TESTING</button>

      <ConsoleNavBar name={"profilePage"} />

      <div className="console-container">
        <div className="user-profile-container">
          <img
            className="profile-image"
            src={currentImageUrl}
            alt="noimg"
          ></img>
          <form onSubmit={handleImageUpload}>
            <label>
              <button
                className="signup-button"
                onClick={() => fileInput.current.click()}
              >
                Choose File
              </button>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                ref={fileInput}
                style={{ display: "none" }}
                onChange={updateFile}
              />
            </label>
            <button className="signup-button" type="submit">
              Upload
            </button>
          </form>
          <span id="file-name"></span>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
