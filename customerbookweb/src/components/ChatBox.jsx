import React, { useState, useEffect, useRef } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { CHAT_CONTRACT_ADDRESS } from "../addresses";
import SendIcon from "@mui/icons-material/Send";

function ChatBox({ sender }) {
  const [messages, setMessages] = useState([
    {
      sender: "Manager",
      content: "tes manager message",
    },
    {
      sender: "Operator",
      content: "tes",
    },
  ]);
  const logBoxContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (logBoxContainerRef.current) {
      logBoxContainerRef.current.scrollTop =
        logBoxContainerRef.current.scrollHeight;
    }
  };

  const handleMessageSend = () => {
    const inputMessage = document.getElementById("messageInput").value;
    if (inputMessage.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: sender,
          content: inputMessage,
        },
      ]);
      document.getElementById("messageInput").value = "";
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleMessageSend();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {sender === "Manager" ? (
        <div style={styles.chatBox} className="containerColor-2">
          <div
            style={styles.messageLogBox}
            className="containerColor"
            ref={logBoxContainerRef}
          >
            {messages.map((message, index) => (
              <>
                <div
                  key={index}
                  style={
                    message.sender === "Manager"
                      ? styles.messageBoxOnRight
                      : styles.messageBoxOnLeft
                  }
                >
                  <div
                    style={
                      message.sender === "Manager"
                        ? styles.managerImage
                        : styles.operatorImage
                    }
                  >
                    {message.sender[0]}
                  </div>
                  <p
                    style={
                      message.sender === "Manager"
                        ? styles.messageOnRight
                        : styles.messageOnLeft
                    }
                    className="containerColor-2"
                  >
                    {message.content}
                  </p>
                </div>
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
      ) : (
        <div style={styles.chatBoxOperator} className="containerColor-2">
          <div
            style={styles.messageLogBoxOperator}
            className="containerColor"
            ref={logBoxContainerRef}
          >
            {messages.map((message, index) => (
              <>
                <div
                  key={index}
                  style={
                    message.sender === "Operator"
                      ? styles.messageBoxOnRight
                      : styles.messageBoxOnLeft
                  }
                >
                  <div
                    style={
                      message.sender === "Manager"
                        ? styles.managerImage
                        : styles.operatorImage
                    }
                  >
                    {message.sender[0]}
                  </div>
                  <p
                    style={
                      message.sender === "Operator"
                        ? styles.messageOnRight
                        : styles.messageOnLeft
                    }
                    className="containerColor-2"
                  >
                    {message.content}
                  </p>
                </div>
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
      )}
    </>
  );
}

export default ChatBox;

const styles = {
  chatBox: {
    width: "100%",
    height: "100%",
    color: "white",
    borderRadius: "3px",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    gap: "10px",
  },
  messageLogBox: {
    padding: "15px",
    borderRadius: "3px",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "start",
    gap: "5px",
    overflow: "hidden",
    overflowY: "scroll",
    width: "100%",
    height: "100%",
  },
  chatBoxOperator: {
    width: "100%",
    height: "calc(100% - 360px)",
    color: "white",
    borderRadius: "3px",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    gap: "10px",
  },
  messageLogBoxOperator: {
    padding: "15px",
    borderRadius: "3px",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "start",
    gap: "5px",
    overflow: "hidden",
    overflowY: "scroll",
    width: "100%",
    height: "100%",
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
  messageBoxOnLeft: {
    display: "flex",
    alignItems: "end",
    justifyContent: "start",
    gap: "10px",
    width: "100%",
  },
  messageBoxOnRight: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "end",
    justifyContent: "end",
    gap: "10px",
    width: "100%",
  },
  messageOnLeft: {
    padding: "10px",
    borderRadius: "10px 10px 10px 0px",
    maxWidth: "250px",
    flex: "wrap",
  },
  messageOnRight: {
    padding: "10px",
    borderRadius: "10px 10px 0px 10px",
    maxWidth: "250px",
    flex: "wrap",
  },
  chatInputDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    gap: "15px",
  },
  chatInput: {
    padding: "15px 15px",
    borderRadius: "3px",
    fontSize: "14px",
    outline: "none",
    border: "none",
    width: "calc(100% - 50px)",
  },
};
