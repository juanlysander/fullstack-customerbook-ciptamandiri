import React, { useState, useEffect } from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Web3Button } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../addresses";

function UpdateModal({ closeModal }) {
  const [id, setId] = useState("");
  const [customer, setCustomer] = useState("");
  const [date, setDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [name, setName] = useState("");
  const [specs, setSpecs] = useState("");
  const [quantity, setQuantity] = useState("");
  const [total, setTotal] = useState("");
  const [downPayment, setDownPayment] = useState("");

  function resetForm() {
    setId("");
    setCustomer("");
    setDate("");
    setDeadline("");
    setName("");
    setSpecs("");
    setQuantity("");
    setTotal("");
    setDownPayment("");
  }

  useEffect(() => {
    const handleEscKeyPress = (event) => {
      if (event.key === "Escape") {
        closeModal(false);
      }
    };

    window.addEventListener("keydown", handleEscKeyPress);

    return () => {
      window.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [closeModal]);

  return (
    <div style={styles.backgroundBlur}>
      <div style={styles.container} className="glassmorphism">
        <div style={styles.wrapper}>
          <ClearOutlinedIcon
            style={styles.icon}
            onClick={() => closeModal(false)}
          />
          <div style={styles.flex}>
            <h3 className="white">UPDATE ORDER</h3>
            <h3 className="white">
              <label htmlFor="id">ID:</label>
              <input
                type="number"
                id="id"
                placeholder="1"
                value={id}
                onChange={(e) => setId(e.target.value)}
                style={styles.inputId}
              />
            </h3>
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
                contract.call("updateOrder", [
                  id,
                  customer,
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
              onError={(error) => {
                console.log(error);
              }}
              style={styles.updateOrderButton}
            >
              Update Order
            </Web3Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateModal;

const styles = {
  backgroundBlur: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100vh",
    width: "100vw",
    position: "fixed",
    top: "0",
    left: "0",
    filter: "blur(40%)",
    zIndex: "1",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    color: "white",
    fontSize: "40px",
    cursor: "pointer",
  },
  container: {
    backgroundColor: "#1e1e21",
    borderRadius: "3px",
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
  inputId: {
    padding: "8px 20px",
    borderRadius: "3px",
    outline: "none",
    width: "100px",
  },
  input: {
    padding: "5px 10px",
    borderRadius: "3px",
    outline: "none",
  },
  updateOrderButton: {
    padding: "10px 20px",
    backgroundColor: "crimson",
    borderRadius: "3px",
    color: "white",
    fontSize: "14px",
    width: "150px",
  },
};
