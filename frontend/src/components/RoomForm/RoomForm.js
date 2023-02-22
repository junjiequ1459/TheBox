import "./RoomForm.css";
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import createRoom from "../../store/rooms";

function RoomForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [size, setSize] = useState(4);

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomObj = {
      name,
      size,
      host: user._id,
    };
    // dispatch(createRoom(roomObj));
  };
  return (
    <div>
      {/* <ConsoleNavBar name={"room-form"} /> */}
      <div className="console-container">
        <form>
          <label>
            <span id="label-green">AA-Laptop</span>:
            <span id="label-blue">~/the-box/TheBox/CreateRoom/name</span>${" "}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              required
            />
            Size:
            <label>
              2
              <input type="radio" name="size" onClick={() => setSize(2)} />
            </label>
            <label>
              3
              <input type="radio" name="size" onClick={() => setSize(3)} />
            </label>
            <label>
              4
              <input type="radio" name="size" onClick={() => setSize(4)} />
            </label>
            <button type="submit" className="signup-button">
              {" "}
              Create Room{" "}
            </button>
          </label>
        </form>
      </div>
    </div>
  );
}

export default RoomForm;
