import {
  Web3Button,
  useContract,
  useContractRead,
  useAddress,
} from "@thirdweb-dev/react";
import React, { useState } from "react";
import { CONTRACT_ADDRESS } from "../addresses";
import ChatBox from "./ChatBox";

function OperatorDashboard() {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const [id, setId] = useState("");
  const [idCheck, setIdCheck] = useState("");

  const address = useAddress();

  const { data: orders } = useContractRead(contract, "getOrderById", [idCheck]);

  const formatCurrency = (amount) => {
    const formattedAmount = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
    return formattedAmount.replace(/,(\d{2})$/, ",-");
  };

  const formatDate = (dateString) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${day}.${month}.${year}`;
  };

  const formatUnixTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  function resetForm() {
    setId("");
  }

  return (
    <>
      <div
        id="operatorDashboard"
        className="containerColor"
        style={styles.flexBox}
      >
        {address && (
          <div style={styles.allContainer}>
            <div style={styles.leftContainer}>
              {/* CHATBOX */}
              <ChatBox sender="Operator" />
              {/* ORDER CHECKER */}
              <div
                style={styles.orderCheckerContainer}
                className="containerColor-2"
              >
                <h3 className="white" style={styles.h3}>
                  Order Checker
                </h3>
                <input
                  type="number"
                  style={styles.input}
                  className="containerColor white"
                  value={idCheck}
                  placeholder={"enter ID"}
                  onChange={(e) => setIdCheck(e.target.value)}
                />
                {orders && (
                  <div style={styles.orderList}>
                    <p style={styles.list}>
                      Ownr: <b>{orders[1]}</b>
                    </p>
                    <p style={styles.list}>
                      Date: <b>{formatUnixTimestamp(orders[2].toString())}</b>
                    </p>
                    <p style={styles.list}>
                      Dead: <b>{formatDate(orders[3].toString())}</b>
                    </p>
                    <p style={styles.list}>
                      Name: <b>{orders[4]}</b>
                    </p>
                    <p style={styles.list}>
                      Spec: <b>{orders[5]}</b>
                    </p>
                    <p style={styles.list}>
                      Qnty: <b>{orders[6].toString()}</b>
                    </p>
                    <p style={styles.list}>
                      Prce: <b>{formatCurrency(orders[7].toString())}</b>
                    </p>
                    <p style={styles.list}>
                      Dpay: <b>{formatCurrency(orders[8].toString())}</b>
                    </p>
                    <p style={styles.list}>
                      Stat:{" "}
                      <b>
                        {orders[9] == 0
                          ? "DESIGN"
                          : orders[9] == 1
                          ? "PAPER"
                          : orders[9] == 2
                          ? "PLATE"
                          : orders[9] == 3
                          ? "PRINT"
                          : orders[9] == 4
                          ? "BLADE"
                          : orders[9] == 5
                          ? "CUT"
                          : orders[9] == 6
                          ? "FINISHING"
                          : "DONE"}
                      </b>
                    </p>
                    <p style={styles.list}>
                      Paid: <b>{orders[10] ? "Paid" : "Unpaid"}</b>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* BUTTON */}
            <div style={styles.buttonContainer}>
              <div style={styles.inputContainer}>
                <label htmlFor="id" className="white">
                  Call Manager to Mark
                </label>
                <input
                  type="number"
                  className="containerColor-2 white"
                  placeholder="enter ID"
                  id="id"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.circle} className="red outer">
                <Web3Button
                  contractAddress={CONTRACT_ADDRESS}
                  action={async (contract) => {
                    await contract.call("callToMark", [id]);
                  }}
                  onSuccess={() => {
                    alert("Call manager succeed!");
                    resetForm();
                  }}
                  onError={(error) => {
                    console.log(error);
                    alert("Something has gone wrong");
                  }}
                  style={styles.blankButton}
                >
                  CALL
                </Web3Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default OperatorDashboard;

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
  allContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    width: "100%",
    height: "100%",
    maxWidth: "1440px",
    maxHeight: "920px",
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    height: "100%",
    width: "calc(100% - 300px)",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "30px",
    width: "300px",
    height: "330px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    padding: "10px 15px",
    borderRadius: "3px",
    fontSize: "14px",
    outline: "none",
    border: "none",
    width: "140px",
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
  h3: {
    fontSize: "17px",
    width: "100%",
    textAlign: "left",
  },
  orderCheckerContainer: {
    borderRadius: "3px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    height: "350px",
    overflow: "hidden",
    overflowY: "scroll",
  },
  orderList: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  list: {
    fontSize: "14px",
  },
};
