import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div id="sideBar" style={styles.sideBar} className="containerColor-2">
      <div style={styles.sideBarWrapper}>
        <div id="stockLogo" style={styles.userContainer}>
          <img src="/cipman.png" style={styles.userPhoto} />
          <div className="connect">
            <ConnectWallet
              style={styles.walletButton}
              dropdownPosition={{
                side: "bottom",
                align: "center",
              }}
              auth={{
                loginOptional: false,
              }}
            />
          </div>
        </div>
        <div id="layouts" style={styles.navigation}>
          <div style={styles.userSection} className="wrapper">
            <p style={styles.lead}>Admin Section</p>
            <Link to="/" style={styles.links} className="hover">
              <MenuBookOutlinedIcon className="white" />
              <p className="pFont white">Customer Books</p>
            </Link>
          </div>
          <div style={styles.userSection} className="wrapper">
            <p style={styles.lead}>Operator Section</p>
            <Link
              to="/operatorDashboard"
              style={styles.links}
              className="hover"
            >
              <PrecisionManufacturingOutlinedIcon className="white" />
              <p className="pFont white">Operator Dashboard</p>
            </Link>
          </div>
          <div style={styles.userSection} className="wrapper">
            <p style={styles.lead}>Manager Section</p>
            <Link to="/managerDashboard" style={styles.links} className="hover">
              <ManageAccountsIcon className="white" />
              <p className="pFont white">Manager Dashboard</p>
            </Link>
          </div>
          <div style={styles.userSection} className="wrapper">
            <p style={styles.lead}>Owner Section</p>
            <Link to="/ownerDashboard" style={styles.links} className="hover">
              <LockIcon className="white" />
              <p className="pFont white">Owner Dashboard</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

const styles = {
  sideBar: {
    width: "320px",
    height: "100vh",
    padding: "30px 20px",
  },
  sideBarWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
  },
  userContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
  },
  userPhoto: {
    width: "210px",
    filter: "hue-rotate(-8deg) saturate(150%)",
  },
  userInfo: {
    gap: "7px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: "26px",
    fontWeight: "600",
  },
  walletButton: {
    padding: "12px 20px",
    color: "white",
    fontSize: "12px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#25242a",
  },
  layoutsDiv: {
    display: "flex",
  },
  navigation: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    gap: "30px",
    width: "100%",
  },
  lead: {
    fontSize: "14px",
    color: "#a3a3a3",
  },
  userSection: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "10px",
  },
  links: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "20px",
  },
};
