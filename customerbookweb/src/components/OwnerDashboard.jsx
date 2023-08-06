import React, { useState } from "react";
import {
  Web3Button,
  useContract,
  useContractRead,
  useAddress,
} from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../addresses";

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

  const { data: admins, isLoading: isLoadingAdmins } = useContractRead(
    contract,
    "getAdmins"
  );
  const { data: managers, isLoading: isLoadingManagers } = useContractRead(
    contract,
    "getManagers"
  );
  const { data: operators, isLoading: isLoadingOperators } = useContractRead(
    contract,
    "getOperators"
  );

  return (
    <div id="ownerDashboard" className="containerColor" style={styles.flexBox}>
      <div style={styles.wrapperContainer}>
        {address && (
          <div style={styles.rowContainerAdd} className="containerColor-2">
            {/* ADD ADMIN */}
            <div style={styles.columnGap}>
              <div style={styles.inputField}>
                <label htmlFor="addAdmin">Add Admin:</label>
                <input
                  type="text"
                  id="addAdmin"
                  style={styles.input}
                  className="containerColor white"
                  value={addAdminAddress}
                  placeholder="0x00.."
                  onChange={(e) => setAddAdminAddress(e.target.value)}
                />
                <div style={styles.buttonWrapper}>
                  <Web3Button
                    className="hover"
                    contractAddress={CONTRACT_ADDRESS}
                    action={async (contract) => {
                      await contract.call("setAdmin", [addAdminAddress]);
                    }}
                    onSuccess={() => {
                      alert("Admin address has been added!");
                      resetForm();
                    }}
                    onError={(error) => {
                      alert("Something has gone wrong!");
                      console.log(error);
                    }}
                    style={styles.blankButton}
                  >
                    Add Admin
                  </Web3Button>
                </div>
              </div>
              <div style={styles.listContainer}>
                <h4 className="white">Admin List:</h4>
                <ul style={styles.ulist}>
                  {!isLoadingAdmins ? (
                    admins?.map((admin, index) => (
                      <li key={index} style={styles.allList}>
                        {`${index}. ${admin.slice(0, 6)} . . . ${admin.slice(
                          -4
                        )}`}
                      </li>
                    ))
                  ) : (
                    <div style={styles.spinnerDiv}>
                      <div className="spinner"></div>
                    </div>
                  )}
                </ul>
              </div>
            </div>

            {/* ADD MANAGER */}
            <div style={styles.columnGap}>
              <div style={styles.inputField}>
                <label htmlFor="addManager">Add Manager:</label>
                <input
                  type="text"
                  id="addManager"
                  style={styles.input}
                  className="containerColor white"
                  value={addManagerAddress}
                  placeholder="0x00.."
                  onChange={(e) => setAddManagerAddress(e.target.value)}
                />
                <div style={styles.buttonWrapper}>
                  <Web3Button
                    className="hover"
                    contractAddress={CONTRACT_ADDRESS}
                    action={async (contract) => {
                      await contract.call("setManager", [addManagerAddress]);
                    }}
                    onSuccess={() => {
                      alert("Manager address has been added!");
                      resetForm();
                    }}
                    onError={(error) => {
                      alert("Something has gone wrong!");
                      console.log(error);
                    }}
                    style={styles.blankButton}
                  >
                    Add Manager
                  </Web3Button>
                </div>
              </div>
              <div style={styles.listContainer}>
                <h4 className="white">Manager List:</h4>
                <ul style={styles.ulist}>
                  {!isLoadingManagers ? (
                    managers?.map((manager, index) => (
                      <li key={index} style={styles.allList}>
                        {`${index}. ${manager.slice(
                          0,
                          6
                        )} . . . ${manager.slice(-4)}`}
                      </li>
                    ))
                  ) : (
                    <div style={styles.spinnerDiv}>
                      <div className="spinner"></div>
                    </div>
                  )}
                </ul>
              </div>
            </div>

            {/* ADD OPERATOR */}
            <div style={styles.columnGap}>
              <div style={styles.inputField}>
                <label htmlFor="addOperator">Add Operator:</label>
                <input
                  type="text"
                  id="addOperator"
                  style={styles.input}
                  className="containerColor white"
                  value={addOperatorAddress}
                  placeholder="0x00.."
                  onChange={(e) => setAddOperatorAddress(e.target.value)}
                />
                <div style={styles.buttonWrapper}>
                  <Web3Button
                    className="hover"
                    contractAddress={CONTRACT_ADDRESS}
                    action={async (contract) => {
                      await contract.call("setOperator", [addOperatorAddress]);
                    }}
                    onSuccess={() => {
                      alert("Operator address has been added!");
                      resetForm();
                    }}
                    onError={(error) => {
                      alert("Something has gone wrong!");
                      console.log(error);
                    }}
                    style={styles.blankButton}
                  >
                    Add Operator
                  </Web3Button>
                </div>
              </div>
              <div style={styles.listContainer}>
                <h4 className="white">Operator List:</h4>
                <ul style={styles.ulist}>
                  {!isLoadingOperators ? (
                    operators?.map((operator, index) => (
                      <li key={index} style={styles.allList}>
                        {`${index}. ${operator.slice(
                          0,
                          6
                        )} . . . ${operator.slice(-4)}`}
                      </li>
                    ))
                  ) : (
                    <div style={styles.spinnerDiv}>
                      <div className="spinner"></div>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {
          /********************************/
          ////////// CHANGE SECTION ////////
          /********************************/
        }
        {address && (
          <div style={styles.rowContainerChange} className="containerColor-2">
            {/* CHANGE ADMIN */}
            <div style={styles.columnGap}>
              <div style={styles.inputField}>
                <div style={styles.flexRow}>
                  <div style={styles.flexColumnId}>
                    <label htmlFor="adminId">Idx:</label>
                    <input
                      type="text"
                      id="adminId"
                      style={styles.input}
                      className="containerColor white"
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
                      className="containerColor white"
                      value={changeAdminAddress}
                      placeholder="0x00.."
                      onChange={(e) => setChangeAdminAddress(e.target.value)}
                    />
                  </div>
                </div>
                <Web3Button
                  className="hover"
                  contractAddress={CONTRACT_ADDRESS}
                  action={async (contract) => {
                    await contract.call("changeAdmin", [
                      adminId,
                      changeAdminAddress,
                    ]);
                  }}
                  onSuccess={() => {
                    alert("Admin address has been changed!");
                    resetForm();
                  }}
                  onError={(error) => {
                    alert("Something has gone wrong!");
                    console.log(error);
                  }}
                  style={styles.blankButton}
                >
                  Change Admin
                </Web3Button>
              </div>
            </div>

            {/* CHANGE MANAGER */}
            <div style={styles.columnGap}>
              <div style={styles.inputField}>
                <div style={styles.flexRow}>
                  <div style={styles.flexColumnId}>
                    <label htmlFor="managerId">Idx:</label>
                    <input
                      type="text"
                      id="managerId"
                      style={styles.input}
                      className="containerColor white"
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
                      className="containerColor white"
                      value={changeManagerAddress}
                      placeholder="0x00.."
                      onChange={(e) => setChangeManagerAddress(e.target.value)}
                    />
                  </div>
                </div>
                <Web3Button
                  className="hover"
                  contractAddress={CONTRACT_ADDRESS}
                  action={async (contract) => {
                    await contract.call("changeManager", [
                      managerId,
                      changeManagerAddress,
                    ]);
                  }}
                  onSuccess={() => {
                    alert("Manager address has been changed!");
                    resetForm();
                  }}
                  onError={(error) => {
                    alert("Something has gone wrong!");
                    console.log(error);
                  }}
                  style={styles.blankButton}
                >
                  Change Manager
                </Web3Button>
              </div>
            </div>

            {/* CHANGE OPERATOR */}
            <div style={styles.columnGap}>
              <div style={styles.inputField}>
                <div style={styles.flexRow}>
                  <div style={styles.flexColumnId}>
                    <label htmlFor="operatorId">Idx:</label>
                    <input
                      type="text"
                      id="operatorId"
                      style={styles.input}
                      className="containerColor white"
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
                      className="containerColor white"
                      value={changeOperatorAddress}
                      placeholder="0x00.."
                      onChange={(e) => setChangeOperatorAddress(e.target.value)}
                    />
                  </div>
                </div>
                <Web3Button
                  className="hover"
                  contractAddress={CONTRACT_ADDRESS}
                  action={async (contract) => {
                    await contract.call("changeOperator", [
                      operatorId,
                      changeOperatorAddress,
                    ]);
                  }}
                  onSuccess={() => {
                    alert("Operator address has been changed!");
                    resetForm();
                  }}
                  onError={(error) => {
                    alert("Something has gone wrong!");
                    console.log(error);
                  }}
                  style={styles.blankButton}
                >
                  Change Operator
                </Web3Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;

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
  wrapperContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    height: "100%",
    maxWidth: "1440px",
    maxHeight: "920px",
  },
  flexRow: {
    display: "flex",
    gap: "10px",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "10px",
  },
  flexColumnId: {
    display: "flex",
    flexDirection: "column",
    width: "20%",
    gap: "10px",
  },

  rowContainerAdd: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: "30px",
    height: "100%",
    width: "100%",
    borderRadius: "3px",
    gap: "25px",
  },
  rowContainerChange: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: "30px",
    height: "50%",
    width: "100%",
    borderRadius: "3px",
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
    borderRadius: "3px",
    border: "none",
  },
  buttonWrapper: {
    overflow: "hidden",
    width: "140px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "3px",
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
  spinnerDiv: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
