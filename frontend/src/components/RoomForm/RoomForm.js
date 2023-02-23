import "./RoomForm.css";
import ConsoleNavBar from "../ConsoleNavBar/ConsoleNavBar";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRoom } from "../../store/rooms";
import { Redirect, useHistory } from "react-router-dom";

function RoomForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [size, setSize] = useState(4);
  const [room, setRoom] = useState(null)
  const createInputRef = useRef(null);

  useEffect(() => {
    createInputRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roomObj = {
      name,
      size,
    };
    dispatch(createRoom(roomObj))
    history.push(`/roomlist`)
  };

  if (!user) return <Redirect to="/login" />
  return (
    <div>
      <ConsoleNavBar name={"room-form"} />
      <div className="console-container">
        <div className="create-room-container">
          <form onSubmit={handleSubmit}>
            <label>
              <span id="label-green">AA-Laptop</span>:
              <span id="label-blue">~/the-box/TheBox/CreateRoom/name</span>${" "}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                required
                ref={createInputRef}
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
    </div>
  );
}

export default RoomForm;
