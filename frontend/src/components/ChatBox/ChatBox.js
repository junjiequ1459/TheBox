import "./ChatBox.css";
import React, { useEffect } from "react";
import { useState } from "react";

function Chat({socket, username, room}) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [allMessages, setMessageArray] = useState([]);

  const sendMessage = () => {
    if (currentMessage !== "") {
      const message = {
        room: room,
        username: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      socket.emit("send_message", message);
      setMessageArray(array => [...array, message]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageArray((array) => [...array, data]);
    });
  }, [socket]);

  return (
    <div id="chat-div">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {/* <ScrollToBottom className="message-container"> */}
          {allMessages.map( eachMessage => {
            return (
              <div
                className="message"
                id={username === eachMessage.username ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{eachMessage.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{eachMessage.time}</p>
                    <p id="username">{eachMessage.username}</p>
                  </div>
                </div>
              </div>
            );
          })}
        {/* </ScrollToBottom> */}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Send a message"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
