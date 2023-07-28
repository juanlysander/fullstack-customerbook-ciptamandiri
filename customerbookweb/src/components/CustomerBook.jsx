import React, { useState } from "react";
import TotalPaymentSearchBar from "./TotalPaymentSearchBar.jsx";
import RestPaymentSearchBar from "./RestPaymentSearchBar";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import { useAddress } from "@thirdweb-dev/react";
import OrderList from "./OrderList";
import DeleteModal from "./DeleteModal";

function CustomerBook() {
  // State Variable
  const [addOrderModal, setAddOrderModal] = useState(false);
  const [updateOrderModal, setUpdateOrderModal] = useState(false);
  const [deleteOrderModal, setDeleteOrderModal] = useState(false);

  const address = useAddress();

  return (
    <div id="customerBook" style={styles.content}>
      <div className="wrapper" style={styles.wrapper}>
        <img src="/cipman.png" alt="logo" style={styles.logo} />
        <div style={styles.headerSection}>
          <h3 style={styles.h3}>CUSTOMER BOOK</h3>
          <div style={styles.legendWrapper}>
            <p style={styles.desc}>
              DESIGN = Order is in design by design operator
              <br />
              PAPER = Preparing the paper for printing
              <br />
              PLATE = Ordering the offset alum plate
            </p>
            <p style={styles.desc}>
              PRINT = Order being printed
              <br />
              BLADE = Ordering the pond blade
              <br /> CUT = Order in being cut
            </p>
            <p style={styles.desc}>
              FINISHING = Order in finishing state
              <br />
              DONE = Order waiting for pickups
            </p>
          </div>
          {address && (
            <div className="spacebetween" style={styles.spaceBetween}>
              <div style={styles.inputWrapper}>
                <div>
                  <p style={styles.desc}>Check Total Payment</p>
                  <TotalPaymentSearchBar />
                </div>
                <div>
                  <p style={styles.desc}>Check Rest Payment</p>
                  <RestPaymentSearchBar />
                </div>
              </div>
              <div style={styles.inputWrapper}>
                <button
                  style={styles.button}
                  className="hover"
                  onClick={() => {
                    setAddOrderModal(true);
                  }}
                >
                  Add
                </button>
                <button
                  style={styles.button}
                  className="hover"
                  onClick={() => {
                    setUpdateOrderModal(true);
                  }}
                >
                  Update
                </button>
                <button
                  style={styles.button}
                  className="hover"
                  onClick={() => {
                    setDeleteOrderModal(true);
                  }}
                >
                  Delete
                </button>
                {addOrderModal && <AddModal closeModal={setAddOrderModal} />}
                {updateOrderModal && (
                  <UpdateModal closeModal={setUpdateOrderModal} />
                )}
                {deleteOrderModal && (
                  <DeleteModal closeModal={setDeleteOrderModal} />
                )}
              </div>
            </div>
          )}
        </div>
        <OrderList />
      </div>
    </div>
  );
}

export default CustomerBook;

const styles = {
  content: {
    backgroundColor: "#25242a",
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    padding: "30px",
    overflow: "hidden",
  },
  wrapper: {
    gap: "20px",
  },
  headerSection: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  legendWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "40px",
  },
  inputWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "20px",
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: "0px 2px",
  },
  table: {
    backgroundColor: "#34333B",
  },
  logo: {
    width: "200px",
    aspectRatio: "17/4",
    marginBottom: "20px",
    filter: "hue-rotate(-8deg) saturate(150%)",
  },
  h3: {
    fontSize: "24px",
    color: "white",
  },
  desc: {
    color: "#cfcfcf",
    lineHeight: "30px",
    fontSize: "14px",
  },
  button: {
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    border: "0px solid red",
    backgroundColor: "crimson",
    width: "80px",
    height: "40px",
    borderRadius: "3px",
    transition: "all 0.1s",
  },
};
