import React, { useState } from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Web3Button } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../../env";

function AddModal({ closeModal }) {
  const [customer, setCustomer] = useState("");
  const [date, setDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [name, setName] = useState("");
  const [specs, setSpecs] = useState("");
  const [quantity, setQuantity] = useState("");
  const [total, setTotal] = useState("");
  const [downPayment, setDownPayment] = useState("");

  function resetForm() {
    setCustomer("");
    setDate("");
    setDeadline("");
    setName("");
    setSpecs("");
    setQuantity("");
    setTotal("");
    setDownPayment("");
  }

  return (
    <div style={styles.backgroundBlur}>
      <div style={styles.container} className="glassmorphism">
        <div style={styles.wrapper}>
          <ClearOutlinedIcon
            style={styles.icon}
            onClick={() => closeModal(false)}
          />
          <div style={styles.flex}>
            <h3 className="white">ADD ORDER</h3>
          </div>
          <form style={styles.form}>
            <div style={styles.unitContainer}>
              <label htmlFor="customer">Customer:</label>
              <input
                type="text"
                id="customer"
                placeholder="Asep ..."
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.unitContainer}>
              <label htmlFor="date">Date:</label>
              <input
                type="text"
                id="date"
                placeholder="20230709"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.unitContainer}>
              <label htmlFor="deadline">Deadline:</label>
              <input
                type="text"
                id="deadline"
                placeholder="20230723"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.unitContainer}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                placeholder="lunch box M ..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.unitContainer}>
              <label htmlFor="specs">Specs:</label>
              <input
                type="text"
                id="specs"
                placeholder="Art Paper 260gr 4/0 15x26 ..."
                value={specs}
                onChange={(e) => setSpecs(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.unitContainer}>
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                placeholder="5000"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.unitContainer}>
              <label htmlFor="total">Total:</label>
              <input
                type="number"
                id="total"
                placeholder="500000"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.unitContainer}>
              <label htmlFor="downPayment">Down Payment:</label>
              <input
                type="number"
                id="downPayment"
                placeholder="200000"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                style={styles.input}
              />
            </div>
            <Web3Button
              contractAddress={CONTRACT_ADDRESS}
              action={(contract) => {
                contract.call("addOrder", [
                  customer,
                  date,
                  deadline,
                  name,
                  specs,
                  quantity,
                  total,
                  downPayment,
                ]);
              }}
              onSuccess={() => {
                resetForm();
                closeModal(false);
              }}
              onError={(error) => console.log(error)}
              style={styles.addOrderButton}
            >
              Add Order
            </Web3Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddModal;

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
    height: "650px",
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
  input: {
    padding: "5px 10px",
    borderRadius: "5px",
    outline: "none",
  },
  addOrderButton: {
    padding: "10px 20px",
    backgroundColor: "#fe2a2a",
    borderRadius: "5px",
    color: "white",
    fontSize: "16px",
    width: "150px",
  },
};
