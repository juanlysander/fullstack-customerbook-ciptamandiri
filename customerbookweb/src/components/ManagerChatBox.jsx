import React from "react";
import ChatBox from "./ChatBox";
import ReceiverCard from "./ReceiverCard";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import BrushIcon from "@mui/icons-material/Brush";
import PrintIcon from "@mui/icons-material/Print";
import CarpenterIcon from "@mui/icons-material/Carpenter";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";

function ManagerChatBox() {
  return (
    <>
      <div
        id="managerChatBox"
        className="containerColor"
        style={styles.flexBox}
      >
        <div style={styles.allContainerWrapper}>
          <div
            className="receiver containerColor-2"
            style={styles.receiverContainer}
          >
            <ReceiverCard
              color="#e6c229"
              name="Design Operator"
              icons={<BrushIcon />}
              lastMessage="Right now?"
            />
            <ReceiverCard
              color="#f17105"
              name="Cutting Operator"
              icons={<ContentCutIcon />}
              lastMessage="Oke!"
            />
            <ReceiverCard
              color="#d11149"
              name="Print Operator"
              icons={<PrintIcon />}
              lastMessage="See you there!"
            />
            <ReceiverCard
              color="#6610f2"
              name="Pond Operator"
              icons={<CarpenterIcon />}
              lastMessage="hmm.."
            />
            <ReceiverCard
              color="#1a8fe3"
              name="Finishing Operator"
              icons={<AppShortcutIcon />}
              lastMessage="i will work on it"
            />
            <ArrowUpwardIcon />
            <p>Multi Admin Chat</p>
            <p>In Development</p>
          </div>
          <ChatBox sender="Manager" />
        </div>
      </div>
    </>
  );
}

export default ManagerChatBox;

const styles = {
  flexBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    width: "100%",
    height: "100vh",
    padding: "30px",
  },
  allContainerWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    width: "100%",
    height: "100%",
    maxWidth: "1440px",
    maxHeight: "920px",
  },
  receiverContainer: {
    display: "flex",
    padding: "15px 0px 15px 15px",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    gap: "10px",
    width: "300px",
    height: "100%",
  },
};
