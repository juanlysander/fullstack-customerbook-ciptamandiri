import React, { useState } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../../env";

function RestPaymentSearchBar() {
  const [id, setId] = useState("");

  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: restPayment } = useContractRead(contract, "getRestPayment", [
    id,
  ]);

  const formatCurrency = (amount) => {
    const formattedAmount = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);

    return formattedAmount.replace(/,(\d{2})$/, ",-");
  };

  return (
    <div className="containerColor-2" style={styles.restPaymentSearchBar}>
      <input
        style={styles.input}
        key="search-bar"
        value={id}
        placeholder={"enter ID"}
        onChange={(e) => setId(e.target.value)}
      />
      <p>{formatCurrency(restPayment?.toString())}</p>
    </div>
  );
}

export default RestPaymentSearchBar;

const styles = {
  restPaymentSearchBar: {
    padding: "0px 20px",
    border: "0px solid",
    borderRadius: "3px",
    width: "230px",
    height: "45px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    border: "0px solid",
    width: "70px",
    padding: "10px 0px",
    background: "none",
    color: "#fbfbfd",
    outline: "none",
    fontSize: "14px",
  },
};
