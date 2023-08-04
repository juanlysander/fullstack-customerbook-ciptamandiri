import React from "react";
import CheckIcon from "@mui/icons-material/Check";

function ReceiverCard({ color, icons, name, lastMessage }) {
  return (
    <>
      <div style={styles.container} className="containerColor">
        <div
          style={{
            backgroundColor: color,
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
          }}
        >
          {icons}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            color: "rgb(150,150,150)",
          }}
        >
          <p style={styles.receiverName} className="white">
            {name}
          </p>
          <div style={{ display: "flex", gap: "6px" }}>
            <CheckIcon style={{ fontSize: "18px" }} />
            <p style={{ fontSize: "14px" }}>{lastMessage}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReceiverCard;

const styles = {
  container: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    padding: "10px 15px",
    width: "250px",
    borderRadius: "6px",
  },
  receiverName: {
    fontWeight: "bold",
  },
};
