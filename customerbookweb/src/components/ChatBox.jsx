import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

function ChatBox() {
  const [messages, setMessages] = useState([
    {
      sender: "Manager",
      content: "Hey Operator, please check ID 3",
    },
    {
      sender: "Operator",
      content: "Ay.. Ay.. Captain!!",
    },
  ]);

  const handleMessageSend = () => {
    // Get the message input value
    const inputMessage = document.getElementById("messageInput").value;
    if (inputMessage.trim() !== "") {
      // Append the new message to the messages state
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "Manager",
          content: inputMessage,
        },
      ]);
      // Clear the input field after sending the message
      document.getElementById("messageInput").value = "";
    }
  };

  const handleKeyDown = (event) => {
    // Check if the Enter key (key code 13) is pressed
    if (event.keyCode === 13) {
      handleMessageSend();
    }
  };
  return (
    <>
      {/* CHATBOX */}
      <div style={styles.chatBox} className="containerColor-2">
        <div style={styles.messageLogBox} className="containerColor">
          {messages.map((message, index) => (
            <>
              {message.sender === "Manager" ? (
                // Render Manager message
                <div style={styles.messageBox} key={index}>
                  <div style={styles.managerImage}>{message.sender[0]}</div>
                  <p style={styles.message} className="containerColor-2">
                    {message.content}
                  </p>
                </div>
              ) : (
                // Render Operator message
                <div style={styles.messageBoxOfSender} key={index}>
                  <p
                    style={styles.messageOfSender}
                    className="containerColor-2"
                  >
                    {message.content}
                  </p>
                  <div style={styles.operatorImage}>{message.sender[0]}</div>
                </div>
              )}
            </>
          ))}
        </div>

        <div style={styles.chatInputDiv}>
          <input
            type="text"
            placeholder="send message.."
            style={styles.chatInput}
            className="containerColor white"
            id="messageInput"
            onKeyDown={handleKeyDown}
          />
          <SendIcon onClick={handleMessageSend} />
        </div>
      </div>
    </>
  );
}

export default ChatBox;

const styles = {
  chatBox: {
    width: "100%",
    height: "100%",
    maxHeight: "calc(100% - 380px)",
    color: "white",
    borderRadius: "6px",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: "10px",
  },
  messageLogBox: {
    padding: "15px",
    borderRadius: "6px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    gap: "5px",
    overflow: "hidden",
    overflowY: "scroll",
    width: "100%",
    height: "360px",
  },
  managerImage: {
    borderRadius: "100px",
    width: "32px",
    height: "32px",
    backgroundColor: "#ff8800",
    fontWeight: "bold",
    display: "grid",
    placeItems: "center",
  },
  operatorImage: {
    borderRadius: "100px",
    width: "32px",
    height: "32px",
    backgroundColor: "#005eff",
    fontWeight: "bold",
    display: "grid",
    placeItems: "center",
  },
  messageBox: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    gap: "10px",
    width: "100%",
  },
  messageBoxOfSender: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    gap: "10px",
    width: "100%",
  },
  message: {
    padding: "10px",
    borderRadius: "10px 10px 10px 0px",
  },
  messageOfSender: {
    padding: "10px",
    borderRadius: "10px 10px 0px 10px",
  },
  chatInputDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "15px",
  },
  chatInput: {
    padding: "10px 15px",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    border: "none",
    width: "calc(100% - 50px)",
  },
};
