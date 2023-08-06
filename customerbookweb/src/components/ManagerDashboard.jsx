import React, { useState } from "react";
import {
  useContract,
  Web3Button,
  useAddress,
  useContractRead,
} from "@thirdweb-dev/react";
import SendIcon from "@mui/icons-material/Send";
import { CONTRACT_ADDRESS } from "../addresses";

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

  const { data: unpaids } = useContractRead(contract, "getUnpaidOrders");

  const { data: orders, isLoading: isLoadingOrders } = useContractRead(
    contract,
    "getOrderById",
    [idCheck]
  );

  const { data: callMessages, isLoading: isLoadingCallMessage } =
    useContractRead(contract, "getCallMessagesFromOperator");

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

  return (
    <div
      id="managerDashboard"
      className="containerColor"
      style={styles.flexBox}
    >
      {address && (
        <div style={styles.allContainer}>
          <div style={styles.leftContainer}>
            {/* LOGBOX */}
            <div
              className="logBox f-16 containerColor-2"
              style={styles.logBoxContainer}
            >
              <div style={styles.logBox} className="containerColor">
                {callMessages?.map((callMessage, index) => (
                  <div key={index} style={styles.ulLog}>
                    <p>{callMessage}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.leftDataBoxWrapper}>
              {/* UNPAID CHECKER */}
              <div
                style={styles.unpaidCheckerContainer}
                className="containerColor-2"
              >
                <h3 className="white" style={styles.h3}>
                  Unpaid Orders
                </h3>
                {!isLoadingOrders ? (
                  unpaids?.map((id) => (
                    <div key={id} style={styles.unpaidId}>
                      Id. <b>{id.toString()}</b>
                    </div>
                  ))
                ) : (
                  <div style={styles.spinnerDiv}>
                    <div className="spinner"></div>
                  </div>
                )}
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
                  style={styles.inputChecker}
                  className="containerColor white"
                  value={idCheck}
                  placeholder={"enter ID"}
                  onChange={(e) => setIdCheck(e.target.value)}
                />
                {orders && (
                  <div style={styles.orderList}>
                    <p style={styles.list}>
                      Owner: <b>{orders[1]}</b>
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
                      Qty: <b>{orders[6].toString()}</b>
                    </p>
                    <p style={styles.list}>
                      Price: <b>{formatCurrency(orders[7].toString())}</b>
                    </p>
                    <p style={styles.list}>
                      DP: <b>{formatCurrency(orders[8].toString())}</b>
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
          </div>

          <div style={styles.rightContainer}>
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
                  action={async (contract) => {
                    await contract.call("approveMark", [id]);
                  }}
                  onSuccess={() => {
                    alert("Order status has been changed");
                    resetForm();
                  }}
                  onError={(error) => {
                    console.log(error);
                    alert("Something has gone wrong!");
                  }}
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
                  action={async (contract) => {
                    await contract.call("approvePaid", [idPaid]);
                  }}
                  onSuccess={() => {
                    alert("Order success marked as PAID");
                    resetForm();
                  }}
                  onError={(error) => {
                    alert("Something has gone wrong!");
                    console.log(error);
                  }}
                  style={styles.blankButton}
                >
                  PAID
                </Web3Button>
              </div>
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    padding: "30px",
  },
  allContainer: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    width: "100%",
    height: "100%",
    maxWidth: "1440px",
    maxHeight: "920px",
  },
  leftContainer: {
    height: "100%",
    width: "calc(100% - 300px)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  leftDataBoxWrapper: {
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    gap: "10px",
    width: "100%",
    height: "calc(100% - 250px)",
  },
  h3: {
    fontSize: "17px",
    textAlign: "left",
  },
  logBoxContainer: {
    padding: "10px",
    borderRadius: "3px",
  },
  logBox: {
    height: "200px",
    overflow: "hidden",
    overflowY: "scroll",
    display: "flex",
    borderRadius: "5px",
    flexDirection: "column",
    justifyContent: "start",
    padding: "10px",
  },
  ulLog: {
    padding: "2px 0px",
  },
  unpaidCheckerContainer: {
    borderRadius: "3px",
    padding: "20px 7px 20px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    gap: "5px",
    width: "200px",
    height: "100%",
    overflow: "hidden",
    overflowY: "scroll",
  },
  unpaidId: {
    borderRadius: "3px",
    width: "100%",
    padding: "5px",
    backgroundColor: "crimson",
    textAlign: "center",
  },
  orderCheckerContainer: {
    borderRadius: "3px",
    padding: "20px 30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: "10px",
    width: "calc(100% - 210px)",
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
    justifyContent: "start",
    alignItems: "center",
    gap: "30px",
    width: "300px",
    height: "330px",
  },
  rightContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "100%",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  input: {
    padding: "10px 15px",
    borderRadius: "3px",
    fontSize: "14px",
    outline: "none",
    border: "none",
    width: "140px",
  },
  inputChecker: {
    padding: "10px 15px",
    borderRadius: "3px",
    fontSize: "14px",
    outline: "none",
    border: "none",
    width: "100%",
    maxWidth: "200px",
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
  spinnerDiv: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
