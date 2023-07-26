import React, { useState } from "react";
import {
  Web3Button,
  useContract,
  useContractRead,
  useAddress,
} from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../../env";

const OwnerDashboard = () => {
  const [addAdminAddress, setAddAdminAddress] = useState("");
  const [addManagerAddress, setAddManagerAddress] = useState("");
  const [addOperatorAddress, setAddOperatorAddress] = useState("");
  const [changeAdminAddress, setChangeAdminAddress] = useState("");
  const [changeManagerAddress, setChangeManagerAddress] = useState("");
  const [changeOperatorAddress, setChangeOperatorAddress] = useState("");
  const [adminId, setAdminId] = useState("");
  const [managerId, setManagerId] = useState("");
  const [operatorId, setOperatorId] = useState("");
  const address = useAddress();

  function resetForm() {
    setAddAdminAddress("");
    setAddManagerAddress("");
    setAddOperatorAddress("");
    setChangeAdminAddress("");
    setChangeManagerAddress("");
    setChangeOperatorAddress("");
  }
  const { contract } = useContract(CONTRACT_ADDRESS);

  const { data: admins } = useContractRead(contract, "getAdmins");
  const { data: managers } = useContractRead(contract, "getManagers");
  const { data: operators } = useContractRead(contract, "getOperators");

  console.log(admins);
  console.log(managers);
  console.log(operators);

  return (
    <div id="ownerDashboard" className="containerColor" style={styles.flexBox}>
      {address && (
        <div style={styles.rowContainerAdd} className="containerColor-2">
          <div style={styles.columnGap}>
            <div style={styles.inputField}>
              <label htmlFor="addAdmin">Add Admin:</label>
              <input
                type="text"
                id="addAdmin"
                style={styles.input}
                value={addAdminAddress}
                placeholder="0x00.."
                onChange={(e) => setAddAdminAddress(e.target.value)}
              />
              <div style={styles.buttonWrapper}>
                <Web3Button
                  className="hover"
                  contractAddress={CONTRACT_ADDRESS}
                  action={(contract) => {
                    contract.call("setAdmin", [addAdminAddress]);
                  }}
                  onSuccess={() => {
                    resetForm();
                  }}
                  onError={(error) => console.log(error)}
                  style={styles.blankButton}
                >
                  Add Admin
                </Web3Button>
              </div>
            </div>
            <div style={styles.listContainer}>
              <h4 className="white">Admin List:</h4>
              <ul>
                {admins?.map((admin, index) => (
                  <li key={index} style={styles.allList}>
                    {`${index}. ${admin.slice(0, 6)} . . . ${admin.slice(-4)}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={styles.columnGap}>
            <div style={styles.inputField}>
              <label htmlFor="addManager">Add Manager:</label>
              <input
                type="text"
                id="addManager"
                style={styles.input}
                value={addManagerAddress}
                placeholder="0x00.."
                onChange={(e) => setAddManagerAddress(e.target.value)}
              />
              <div style={styles.buttonWrapper}>
                <Web3Button
                  className="hover"
                  contractAddress={CONTRACT_ADDRESS}
                  action={(contract) => {
                    contract.call("setManager", [addManagerAddress]);
                  }}
                  onSuccess={() => {
                    resetForm();
                  }}
                  onError={(error) => console.log(error)}
                  style={styles.blankButton}
                >
                  Add Manager
                </Web3Button>
              </div>
            </div>
            <div style={styles.listContainer}>
              <h4 className="white">Manager List:</h4>
              <ul style={styles.ulist}>
                {managers?.map((manager, index) => (
                  <li key={index} style={styles.allList}>
                    {`${index}. ${manager.slice(0, 6)} . . . ${manager.slice(
                      -4
                    )}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={styles.columnGap}>
            <div style={styles.inputField}>
              <label htmlFor="addOperator">Add Operator:</label>
              <input
                type="text"
                id="addOperator"
                style={styles.input}
                value={addOperatorAddress}
                placeholder="0x00.."
                onChange={(e) => setAddOperatorAddress(e.target.value)}
              />
              <div style={styles.buttonWrapper}>
                <Web3Button
                  className="hover"
                  contractAddress={CONTRACT_ADDRESS}
                  action={(contract) => {
                    contract.call("setOperator", [addOperatorAddress]);
                  }}
                  onSuccess={() => {
                    resetForm();
                  }}
                  onError={(error) => console.log(error)}
                  style={styles.blankButton}
                >
                  Add Operator
                </Web3Button>
              </div>
            </div>
            <div style={styles.listContainer}>
              <h4 className="white">Operator List:</h4>
              <ul>
                {operators?.map((operator, index) => (
                  <li key={index} style={styles.allList}>
                    {`${index}. ${operator.slice(0, 6)} . . . ${operator.slice(
                      -4
                    )}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      {address && (
        <div style={styles.rowContainerChange} className="containerColor-2">
          <div style={styles.columnGap}>
            <div style={styles.inputField}>
              <div style={styles.flexRow}>
                <div style={styles.flexColumnId}>
                  <label htmlFor="adminId">Idx:</label>
                  <input
                    type="text"
                    id="adminId"
                    style={styles.input}
                    value={adminId}
                    placeholder="1.."
                    onChange={(e) => setAdminId(e.target.value)}
                  />
                </div>
                <div style={styles.flexColumn}>
                  <label htmlFor="changeAdmin">Change Admin:</label>
                  <input
                    type="text"
                    id="changeAdmin"
                    style={styles.input}
                    value={changeAdminAddress}
                    placeholder="0x00.."
                    onChange={(e) => setChangeAdminAddress(e.target.value)}
                  />
                </div>
              </div>
              <Web3Button
                className="hover"
                contractAddress={CONTRACT_ADDRESS}
                action={(contract) => {
                  contract.call("changeAdmin", [adminId, changeAdminAddress]);
                }}
                onSuccess={() => {
                  resetForm();
                }}
                onError={(error) => console.log(error)}
                style={styles.blankButton}
              >
                Change Admin
              </Web3Button>
            </div>
          </div>
          <div style={styles.columnGap}>
            <div style={styles.inputField}>
              <div style={styles.flexRow}>
                <div style={styles.flexColumnId}>
                  <label htmlFor="managerId">Idx:</label>
                  <input
                    type="text"
                    id="managerId"
                    style={styles.input}
                    value={managerId}
                    placeholder="1.."
                    onChange={(e) => setManagerId(e.target.value)}
                  />
                </div>
                <div style={styles.flexColumn}>
                  <label htmlFor="changeManager">Change Manager:</label>
                  <input
                    type="text"
                    id="changeManager"
                    style={styles.input}
                    value={changeManagerAddress}
                    placeholder="0x00.."
                    onChange={(e) => setChangeManagerAddress(e.target.value)}
                  />
                </div>
              </div>
              <Web3Button
                className="hover"
                contractAddress={CONTRACT_ADDRESS}
                action={(contract) => {
                  contract.call("changeManager", [
                    managerId,
                    changeManagerAddress,
                  ]);
                }}
                onSuccess={() => {
                  resetForm();
                }}
                onError={(error) => console.log(error)}
                style={styles.blankButton}
              >
                Change Manager
              </Web3Button>
            </div>
          </div>
          <div style={styles.columnGap}>
            <div style={styles.inputField}>
              <div style={styles.flexRow}>
                <div style={styles.flexColumnId}>
                  <label htmlFor="operatorId">Idx:</label>
                  <input
                    type="text"
                    id="operatorId"
                    style={styles.input}
                    value={operatorId}
                    placeholder="1.."
                    onChange={(e) => setOperatorId(e.target.value)}
                  />
                </div>
                <div style={styles.flexColumn}>
                  <label htmlFor="changeOperator">Change Operator:</label>
                  <input
                    type="text"
                    id="changeOperator"
                    style={styles.input}
                    value={changeOperatorAddress}
                    placeholder="0x00.."
                    onChange={(e) => setChangeOperatorAddress(e.target.value)}
                  />
                </div>
              </div>
              <Web3Button
                className="hover"
                contractAddress={CONTRACT_ADDRESS}
                action={(contract) => {
                  contract.call("changeOperator", [
                    operatorId,
                    changeOperatorAddress,
                  ]);
                }}
                onSuccess={() => {
                  resetForm();
                }}
                onError={(error) => console.log(error)}
                style={styles.blankButton}
              >
                Change Operator
              </Web3Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;

const styles = {
  flexBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "30px",
    width: "100%",
    height: "100vh",
    padding: "20px",
  },
  flexRow: {
    display: "flex",
    gap: "10px",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  flexColumnId: {
    display: "flex",
    flexDirection: "column",
    width: "20%",
  },

  rowContainerAdd: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: "30px",
    height: "100%",
    width: "100%",
    borderRadius: "6px",
    gap: "25px",
  },
  rowContainerChange: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: "30px",
    height: "50%",
    width: "100%",
    borderRadius: "6px",
    gap: "25px",
  },
  columnGap: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
  },
  inputField: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "10px",
    width: "100%",
    padding: "5px 0px",
  },
  input: {
    padding: "10px",
    outline: "none",
    width: "100%",
    borderRadius: "6px",
    border: "none",
  },
  buttonWrapper: {
    overflow: "hidden",
    width: "140px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "6px",
  },
  blankButton: {
    background: "crimson",
    width: "20px",
    color: "white",
    fontSize: "14px",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  allList: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "rgb(160, 160, 160)",
  },
  ulist: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
};
