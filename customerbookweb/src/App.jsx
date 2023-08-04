import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/Home.css";
import CustomerBook from "./components/CustomerBook";
import OperatorDashboard from "./components/OperatorDasboard";
import ManagerDashboard from "./components/ManagerDashboard";
import OwnerDashboard from "./components/OwnerDashboard";
import ManagerChatBox from "./components/ManagerChatBox";

export default function Home() {
  return (
    <>
      <main className="main" style={styles.main}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<CustomerBook />} />
          <Route path="/operatorDashboard" element={<OperatorDashboard />} />
          <Route path="/managerDashboard" element={<ManagerDashboard />} />
          <Route path="/ownerDashboard" element={<OwnerDashboard />} />
          <Route path="/managerChatBox" element={<ManagerChatBox />} />
        </Routes>
      </main>
    </>
  );
}

const styles = {
  main: {
    display: "flex",
    alignItems: "center",
  },
};
