import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import "./ProfilePage.css";
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";
import io from "socket.io-client";
import { updateUser } from "../../store/users";
// import { getCurrentUser } from "../../store/session";
import jwtFetch from "../../store/jwt";
import { fetchGames } from "../../store/games";
import MatchItem from "./MatchItem";
import { fetchUser } from "../../store/users";

const socket = io("http://localhost:3002");

function ProfilePage() {
  const { userId } = useParams();
  const [image, setImage] = useState(null);
  const user = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.session.user);
  const games = useSelector((state) =>
    state.games ? Object.values(state.games) : []
  );
  const matchList = games.map((game, i) => (
    <MatchItem key={i} userId={userId} game={game} />
  ));
  const fileInput = useRef(null);

  const [currentImageUrl, setcurrentImageUrl] = useState(user.profileImageUrl);

  const dispatch = useDispatch();

  socket.emit("join", `${userId}`);

  const handleClick = (e) => {
    e.preventDefault();
    socket.emit("send_message", { message: `hello from ${userId}` });
  };

  // useEffect(() => dispatch(getCurrentUser()), []);

  useEffect(() => {
    dispatch(fetchUser(userId)).then(async()=>{
    await dispatch(fetchGames(userId));
  })
  }, [userId]);

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

  const imageForm =
    currentUser._id === user._id ? (
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
    ) : null;

  return (
    <>
      <ConsoleNavBar name={"profilePage"} />

      <div className="console-container">
        <div className="wins-and-losses">
          <div className="profile-username">
            <h1>{user.username}</h1>
          </div>
          <div className="win-losses-container">
            <h1 style={{ color: "#8eff1e" }}>WINS</h1>
            <h1>{user.wins}</h1>
            <h1 style={{ color: "red" }}>LOSSES</h1>
            <h1>{user.losses}</h1>
          </div>
          <div className="win-percent">
            <h1 style={{ color: "#008df8" }}>WIN PERCENTAGE</h1>
            <h1>
              {((user.wins / (user.losses + user.wins)) * 100).toFixed(2)}%
            </h1>
          </div>
          <div className="matchlist-container">
            <ul>{matchList}</ul>
          </div>
        </div>
        <div className="user-profile-container">
          <img
            className="profile-image"
            src={currentImageUrl}
            alt="noimg"
          ></img>
          {imageForm}
          <span id="file-name"></span>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
