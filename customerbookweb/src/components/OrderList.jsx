import { useContract, useContractRead } from "@thirdweb-dev/react";
import React from "react";
import { Spinner } from "@chakra-ui/react";
import { CONTRACT_ADDRESS } from "../../env";

const OrderList = () => {
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

  const { contract } = useContract(CONTRACT_ADDRESS);

  const { data: orders } = useContractRead(contract, "getAllOrders");

  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.id}>ID</th>
            <th style={styles.customer}>Customer</th>
            <th style={styles.date}>Date</th>
            <th style={styles.deadline}>Deadline</th>
            <th style={styles.name}>Name</th>
            <th style={styles.specs}>Specs</th>
            <th style={styles.qty}>Qty</th>
            <th style={styles.total}>Total</th>
            <th style={styles.dp}>DP</th>
            <th style={styles.state}>Status</th>
            <th style={styles.paid}>Paid</th>
          </tr>
        </thead>
        <tbody style={styles.tbody}>
          {orders?.map((order, index) => (
            <tr key={index}>
              <td style={styles.idData}>{index + 1}</td>
              <td style={styles.customerData}>{order.orderOwner}</td>
              <td style={styles.dateData}>
                {formatDate(order.orderDate.toString())}
              </td>
              <td style={styles.deadlineData}>
                {formatDate(order.deadlineDate.toString())}
              </td>
              <td style={styles.nameData}>{order.orderName}</td>
              <td style={styles.specsData}>{order.specs}</td>
              <td style={styles.qtyData}>{order.orderQuantity}</td>
              <td style={styles.totalData}>
                {formatCurrency(order.totalPrice.toString())}
              </td>
              <td style={styles.dpData}>
                {formatCurrency(order.downPayment.toString())}
              </td>
              <td
                style={
                  order.orderStatus == 7
                    ? styles.stateDataDone
                    : styles.stateData
                }
              >
                {order.orderStatus == 0
                  ? "DESIGN"
                  : order.orderStatus == 1
                  ? "PAPER"
                  : order.orderStatus == 2
                  ? "PLATE"
                  : order.orderStatus == 3
                  ? "PRINT"
                  : order.orderStatus == 4
                  ? "BLADE"
                  : order.orderStatus == 5
                  ? "CUT"
                  : order.orderStatus == 6
                  ? "FINISHING"
                  : "DONE"}
              </td>
              <td style={order.isPaid ? styles.paidData : styles.unpaidData}>
                {order.isPaid ? "PAID" : "UNPAID"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;

const styles = {
  tableWrapper: {
    height: "calc(100vh - 400px)",
    overflow: "hidden",
    overflowY: "scroll",
    marginTop: "30px",
  },
  table: {
    width: "100%",
    padding: "0px 0px 30px 0px",
  },
  id: {
    width: "4%",
    backgroundColor: "#34333b",
    border: "1px solid #25242a",
    padding: "15px 0px",
    fontSize: "14px",
    borderLeft: "none",
    borderRadius: "6px",
  },
  customer: {
    width: "7%",
    backgroundColor: "#34333b",
    border: "1px solid #25242a",
    padding: "15px 0px",
    fontSize: "14px",
    borderLeft: "none",
    borderRadius: "6px",
  },
  date: {
    width: "9%",
    backgroundColor: "#34333b",
    border: "1px solid #25242a",
    padding: "15px 0px",
    fontSize: "14px",
    borderRadius: "6px",
  },
  deadline: {
    width: "9%",
    backgroundColor: "#34333b",
    border: "1px solid #25242a",
    padding: "15px 0px",
    fontSize: "14px",
    borderRadius: "6px",
  },
  name: {
    width: "10%",
    backgroundColor: "#34333b",
    border: "1px solid #25242a",
    padding: "15px 0px",
    fontSize: "14px",
    borderRadius: "6px",
  },
  specs: {
    width: "19%",
    backgroundColor: "#34333b",
    border: "1px solid #25242a",
    padding: "15px 0px",
    fontSize: "14px",
    borderRadius: "6px",
  },
  qty: {
    width: "6%",
    backgroundColor: "#34333b",
    border: "1px solid #25242a",
    padding: "15px 0px",
    fontSize: "14px",
    borderRadius: "6px",
  },
  total: {
    width: "11%",
    backgroundColor: "#34333b",
    border: "1px solid #25242a",
    padding: "15px 0px",
    fontSize: "14px",
    borderRadius: "6px",
  },
  dp: {
    width: "9%",
    backgroundColor: "#34333b",
    border: "1px solid #25242a",
    padding: "15px 0px",
    fontSize: "14px",
    borderRadius: "6px",
  },
  state: {
    width: "8%",
    backgroundColor: "#34333b",
    border: "1px solid #25242a",
    padding: "15px 0px",
    fontSize: "14px",
    borderRadius: "6px",
  },
  paid: {
    width: "8%",
    backgroundColor: "#34333b",
    border: "1px solid #25242a",
    padding: "15px 0px",
    fontSize: "14px",
    borderRight: "none",
    borderRadius: "6px",
  },
  idData: {
    padding: "8px 4px",
    fontSize: "14px",
    borderBottom: "1px solid #4a4a4a",
    textAlign: "center",
  },
  customerData: {
    padding: "8px 4px",
    fontSize: "14px",
    borderBottom: "1px solid #4a4a4a",
  },
  dateData: {
    padding: "8px 4px",
    fontSize: "14px",
    textAlign: "center",
    borderBottom: "1px solid #4a4a4a",
  },
  deadlineData: {
    padding: "8px 4px",
    fontSize: "14px",
    textAlign: "center",
    borderBottom: "1px solid #4a4a4a",
  },
  nameData: {
    padding: "8px 4px",
    fontSize: "14px",
    borderBottom: "1px solid #4a4a4a",
  },
  specsData: {
    padding: "8px 4px",
    fontSize: "14px",
    borderBottom: "1px solid #4a4a4a",
  },
  qtyData: {
    padding: "8px 4px",
    fontSize: "14px",
    textAlign: "center",
    borderBottom: "1px solid #4a4a4a",
  },
  totalData: {
    padding: "8px 4px",
    fontSize: "14px",
    color: "#79ff40",
    borderBottom: "1px solid #4a4a4a",
  },
  dpData: {
    padding: "8px 4px",
    fontSize: "14px",
    borderBottom: "1px solid #4a4a4a",
  },
  stateData: {
    padding: "8px 4px",
    fontSize: "14px",
    textAlign: "center",
    borderBottom: "1px solid #4a4a4a",
  },
  stateDataDone: {
    padding: "8px 4px",
    fontSize: "14px",
    textAlign: "center",
    borderBottom: "1px solid #4a4a4a",
    backgroundColor: "#469937",
    fontWeight: "bold",
  },
  paidData: {
    padding: "8px 4px",
    fontSize: "14px",
    textAlign: "center",
    borderBottom: "1px solid #4a4a4a",
    backgroundColor: "#469937",
    fontWeight: "bold",
  },
  unpaidData: {
    padding: "8px 4px",
    fontSize: "14px",
    textAlign: "center",
    borderBottom: "1px solid #4a4a4a",
  },
};
