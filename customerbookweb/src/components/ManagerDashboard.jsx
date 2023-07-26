import React, { useState } from "react";
import {
  useContractEvents,
  useContract,
  Web3Button,
  useAddress,
} from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../../env";

function ManagerDashboard() {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const [id, setId] = useState("");
  const [idPaid, setIdPaid] = useState("");

  const address = useAddress();

  function resetForm() {
    setId("");
    setIdPaid("");
  }

  const { data: events } = useContractEvents(contract, "CallFromOperator");
  console.log(events);
  return (
    <div
      id="managerDashboard"
      className="containerColor"
      style={styles.flexBox}
    >
      <div style={styles.logBox} className="containerColor-2">
        {/**************
        ///// BUG //////
        ***************/}
        {/* {events?.map((event) => (
          <div key={event.id}>
            {events.map((event) => (
              <div key={event.orderId}>
                <div>Order ID: {event.orderId}</div>
                <div>Message: {event.message}</div>
              </div>
            ))}
          </div>
        ))} */}
      </div>
      {address && (
        <div style={styles.buttonBox}>
          <div style={styles.buttonContainer}>
            <div style={styles.inputContainer}>
              <label htmlFor="id" className="white">
                Order ID
              </label>
              <input
                type="number"
                value={id}
                style={styles.input}
                placeholder={"change status"}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div style={styles.circle} className="red outer">
              <Web3Button
                contractAddress={CONTRACT_ADDRESS}
                action={(contract) => {
                  contract.call("approveMark", [id]);
                }}
                onSuccess={() => {
                  resetForm();
                }}
                onError={(error) => console.log(error)}
                style={styles.blankButton}
              >
                DONE
              </Web3Button>
            </div>
          </div>
          <div style={styles.buttonContainer}>
            <div style={styles.inputContainer}>
              <label htmlFor="id" className="white">
                Order ID
              </label>
              <input
                type="number"
                value={idPaid}
                style={styles.input}
                placeholder={"mark paid"}
                onChange={(e) => setIdPaid(e.target.value)}
              />
            </div>
            <div style={styles.circle} className="red outer">
              <Web3Button
                contractAddress={CONTRACT_ADDRESS}
                action={(contract) => {
                  contract.call("approvePaid", [idPaid]);
                }}
                onSuccess={() => {
                  resetForm();
                }}
                onError={(error) => console.log(error)}
                style={styles.blankButton}
              >
                PAID
              </Web3Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManagerDashboard;

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
    fontSize: "14px",
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
    background: "none",
    width: "20px",
    color: "white",
    fontWeight: "bold",
    fontSize: "40px",
  },
};
