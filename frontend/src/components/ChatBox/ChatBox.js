import "./ChatBox.css";
import React, { useEffect, useRef } from "react";
import { useState } from "react";

function Chat({ socket, username, room}) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [allMessages, setMessageArray] = useState([]);
  const messageUlRef = useRef(null);

  const sendMessage = () => {
    if (currentMessage !== "") {
      const message = {
        room: room,
        username: username,
        message: currentMessage,
      };

      socket.emit("send_message", message);
      setMessageArray((array) => [...array, message]);
      setCurrentMessage("");
      scrollToBottom();
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageArray((array) => [...array, data]);
      scrollToBottom();
    });
  }, [socket]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messageUlRef.current.scrollTo(0, messageUlRef.current.scrollHeight);
    }, 10);
  };

  return (
    <div id="chat-div">
      <div className="chat-header">
        <h3 style={{ fontWeight: "bold" }}>Live Chat</h3>
      </div>
      <div className="chat-body" ref={messageUlRef}>
        {/* <ScrollToBottom className="message-container"> */}
        {allMessages.map((eachMessage) => {
          return (
            <div
              className="message"
              id={username === eachMessage.username ? "you" : "other"}
            >
              <div className="message-meta">
                <p id="time">{eachMessage.time}</p>
                <p id="chat-username">{eachMessage.username}</p>
              </div>
              <div>
                <div className="message-content">
                  <p>{eachMessage.message}</p>
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
          value={currentMessage}
          placeholder="Send a message"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button className="chat-submit-button" onClick={sendMessage}>
          &#9658;
        </button>
      </div>
    </div>
  );
}

export default Chat;
