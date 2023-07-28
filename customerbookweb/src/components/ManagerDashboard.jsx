import React, { useState } from "react";
import {
  useContractEvents,
  useContract,
  Web3Button,
  useAddress,
  useContractRead,
} from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../../env";

function ManagerDashboard() {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const [id, setId] = useState("");
  const [idPaid, setIdPaid] = useState("");
  const [idCheck, setIdCheck] = useState("");

  const address = useAddress();

  function resetForm() {
    setId("");
    setIdPaid("");
  }

  const { data: events } = useContractEvents(contract, "CallFromOperator");
  console.log(events);

  const { data: unpaids } = useContractRead(contract, "getUnpaidOrders");

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
  return (
    <div
      id="managerDashboard"
      className="containerColor"
      style={styles.flexBox}
    >
      <div style={styles.chatBox} className="containerColor-2">
        Chat Box
      </div>
      {address && (
        <div style={styles.buttonBox}>
          {/* UNPAID CHECKER */}
          <div
            style={styles.unpaidCheckerContainer}
            className="containerColor-2"
          >
            <h3 className="white" style={styles.h3}>
              Unpaid Orders
            </h3>
            {unpaids &&
              unpaids?.map((id) => (
                <div key={id} style={styles.unpaidId}>
                  Id. <b>{id.toString()}</b>
                </div>
              ))}
          </div>

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
                  Date: <b>{formatDate(orders[2].toString())}</b>
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

          {/* BUTTON STATUS */}
          <div style={styles.buttonContainer}>
            <div style={styles.inputContainer}>
              <label htmlFor="id" className="white">
                <b>Approve Order State</b>
              </label>
              <input
                type="number"
                className="containerColor-2 white"
                value={id}
                style={styles.input}
                placeholder="enter ID"
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

          {/* BUTTON PAID */}
          <div style={styles.buttonContainer}>
            <div style={styles.inputContainer}>
              <label htmlFor="id" className="white">
                <b>Mark As Paid</b>
              </label>
              <input
                type="number"
                className="containerColor-2 white"
                value={idPaid}
                style={styles.input}
                placeholder="enter ID"
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
  chatBox: {
    width: "100%",
    height: "30%",
    color: "white",
    borderRadius: "6px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  buttonBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "20px",
    width: "100%",
    height: "100%",
  },
  h3: {
    fontSize: "17px",
    width: "100%",
    textAlign: "left",
  },
  unpaidCheckerContainer: {
    borderRadius: "6px",
    padding: "20px 7px 20px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "5px",
    width: "120px",
    height: "100%",
    overflow: "hidden",
    overflowY: "scroll",
  },
  unpaidId: {
    borderRadius: "6px",
    width: "100%",
    padding: "5px",
    backgroundColor: "#3d0d17",
    textAlign: "center",
  },
  orderCheckerContainer: {
    borderRadius: "6px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "calc(100% - 660px)",
    height: "100%",
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
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "30px",
    width: "260px",
    height: "400px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
  },
  input: {
    padding: "10px 15px",
    borderRadius: "10px",
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
    background: "none",
    width: "20px",
    color: "white",
    fontWeight: "bold",
    fontSize: "40px",
  },
};
