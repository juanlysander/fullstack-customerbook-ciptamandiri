import React, { useState } from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Web3Button } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../../env";

function DeleteModal({ closeModal }) {
  const [id, setId] = useState("");

  function resetForm() {
    setId("");
  }

  return (
    <div style={styles.backgroundBlur}>
      <div style={styles.container} className="glassmorphism">
        <div style={styles.wrapper}>
          <ClearOutlinedIcon
            style={styles.icon}
            onClick={() => closeModal(false)}
          />
          <form style={styles.form}>
            <div style={styles.unitContainer}>
              <label htmlFor="id">Customer Id:</label>
              <input
                type="text"
                id="id"
                placeholder="1 ..."
                value={id}
                onChange={(e) => setId(e.target.value)}
                style={styles.input}
              />
            </div>
            <Web3Button
              contractAddress={CONTRACT_ADDRESS}
              action={(contract) => {
                contract.call("deleteOrder", [id]);
              }}
              onSuccess={() => {
                resetForm();
                closeModal(false);
              }}
              onError={(error) => console.log(error)}
              style={styles.deleteButton}
            >
              Delete Order
            </Web3Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;

const styles = {
  backgroundBlur: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100vh",
    width: "100vw",
    position: "fixed",
    top: "0",
    left: "0",
    filter: "blur(40%)",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    color: "white",
    fontSize: "40px",
    cursor: "pointer",
  },
  container: {
    backgroundColor: "#1e1e21",
    borderRadius: "5px",
    padding: "30px",
    width: "450px",
    height: "200px",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1",
  },
  wrapper: {
    gap: "10px",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  form: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "flex-end",
  },
  unitContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "2px",
  },
  inputId: {
    padding: "8px 20px",
    borderRadius: "5px",
    outline: "none",
    width: "100px",
  },
  input: {
    padding: "5px 10px",
    borderRadius: "5px",
    outline: "none",
  },
  deleteButton: {
    padding: "10px 20px",
    backgroundColor: "#fe2a2a",
    borderRadius: "5px",
    color: "white",
    fontSize: "16px",
    width: "150px",
  },
};
