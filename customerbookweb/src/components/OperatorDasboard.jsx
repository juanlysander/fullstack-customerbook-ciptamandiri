import {
  Web3Button,
  useContract,
  useContractRead,
  useAddress,
} from "@thirdweb-dev/react";
import React, { useState } from "react";
import { CONTRACT_ADDRESS } from "../../env";

function OperatorDashboard() {
  const [id, setId] = useState("");
  const address = useAddress();

  function resetForm() {
    setId("");
  }
  return (
    <div
      id="operatorDashboard"
      className="containerColor"
      style={styles.flexBox}
    >
      <div style={styles.logBox} className="containerColor-2"></div>
      {address && (
        <div style={styles.buttonBox}>
          <div style={styles.buttonContainer}>
            <div style={styles.inputContainer}>
              <label htmlFor="id" className="white">
                Order ID
              </label>
              <input
                type="number"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.circle} className="red outer">
              <Web3Button
                contractAddress={CONTRACT_ADDRESS}
                action={(contract) => {
                  contract.call("callToMark", [id]);
                }}
                onSuccess={() => {
                  resetForm();
                }}
                onError={(error) => console.log(error)}
                style={styles.blankButton}
              >
                CALL
              </Web3Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OperatorDashboard;

const styles = {
  flexBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "30px",
    width: "100%",
    height: "100vh",
    padding: "50px",
  },
  logBox: {
    width: "100%",
    height: "30%",
    color: "white",
    borderRadius: "6px",
  },
  buttonBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "100px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "30px",
    width: "400px",
    height: "400px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "18px",
    outline: "none",
  },
  circle: {
    width: "200px",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    cursor: "pointer",
  },
  blankButton: {
    border: "none",
    background: "none",
    color: "white",
    fontWeight: "bold",
    fontSize: "40px",
  },
};
