import { useContract, useContractRead } from "@thirdweb-dev/react";
import React from "react";
import { CONTRACT_ADDRESS } from "../../env";
import { Spinner } from "@chakra-ui/react";

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

  const formatUnixTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const { contract } = useContract(CONTRACT_ADDRESS);

  const { data: orders, isLoading: isLoadingOrders } = useContractRead(
    contract,
    "getAllOrders"
  );

  return (
    <div style={styles.tableWrapper}>
      <div style={styles.headerWrapper}>
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
        </table>
      </div>
      <div style={styles.bodyWrapper}>
        {!isLoadingOrders ? (
          <table style={styles.table}>
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
                  <td
                    style={order.isPaid ? styles.paidData : styles.unpaidData}
                  >
                    {order.isPaid ? "PAID" : "UNPAID"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={styles.spinnerDiv}>
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;

const styles = {
  tableWrapper: {
    height: "calc(100vh - 400px)",
    marginTop: "30px",
  },
  table: {
    width: "100%",
    tableLayout: "fixed",
  },
  headerWrapper: {
    overflow: "hidden",
    position: "sticky",
    top: 0,
    padding: "0px 6px 0px 0px",
    zIndex: 1,
  },
  bodyWrapper: {
    height: "calc(100vh - 400px)",
    overflowY: "scroll",
  },
  spinnerDiv: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    width: "8%",
    backgroundColor: "#34333b",
    border: "1px solid #25242a",
    padding: "15px 0px",
    fontSize: "14px",
    borderRadius: "6px",
  },
  deadline: {
    width: "8%",
    backgroundColor: "#34333b",
    border: "1px solid #25242a",
    padding: "15px 0px",
    fontSize: "14px",
    borderRadius: "6px",
  },
  name: {
    width: "12%",
    backgroundColor: "#34333b",
    border: "1px solid #25242a",
    padding: "15px 0px",
    fontSize: "14px",
    borderRadius: "6px",
  },
  specs: {
    width: "17%",
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
    width: "10%",
    backgroundColor: "#34333b",
    border: "1px solid #25242a",
    padding: "15px 0px",
    fontSize: "14px",
    borderRadius: "6px",
  },
  state: {
    width: "7%",
    backgroundColor: "#34333b",
    border: "1px solid #25242a",
    padding: "15px 0px",
    fontSize: "14px",
    borderRadius: "6px",
  },
  paid: {
    width: "7%",
    backgroundColor: "#34333b",
    border: "1px solid #25242a",
    padding: "15px 0px",
    fontSize: "14px",
    borderRight: "none",
    borderRadius: "6px",
  },
  idData: {
    padding: "8px 4px",
    width: "4%",
    fontSize: "14px",
    borderBottom: "1px solid #4a4a4a",
    textAlign: "center",
  },
  customerData: {
    width: "7%",
    padding: "8px 4px",
    fontSize: "14px",
    borderBottom: "1px solid #4a4a4a",
  },
  dateData: {
    width: "8%",
    padding: "8px 4px",

    fontSize: "14px",
    textAlign: "center",
    borderBottom: "1px solid #4a4a4a",
  },
  deadlineData: {
    width: "8%",
    padding: "8px 4px",
    fontSize: "14px",
    textAlign: "center",
    borderBottom: "1px solid #4a4a4a",
  },
  nameData: {
    width: "12%",
    padding: "8px 4px",
    fontSize: "14px",
    borderBottom: "1px solid #4a4a4a",
  },
  specsData: {
    width: "17%",
    padding: "8px 4px",
    fontSize: "14px",
    borderBottom: "1px solid #4a4a4a",
  },
  qtyData: {
    width: "6%",
    padding: "8px 4px",
    fontSize: "14px",
    textAlign: "center",
    borderBottom: "1px solid #4a4a4a",
  },
  totalData: {
    width: "11%",
    padding: "8px 4px",
    fontSize: "14px",
    color: "#79ff40",
    borderBottom: "1px solid #4a4a4a",
  },
  dpData: {
    width: "10%",
    padding: "8px 4px",
    fontSize: "14px",
    borderBottom: "1px solid #4a4a4a",
  },
  stateData: {
    width: "7%",
    padding: "8px 4px",
    fontSize: "14px",
    textAlign: "center",
    borderBottom: "1px solid #4a4a4a",
  },
  stateDataDone: {
    width: "7%",
    padding: "8px 4px",
    fontSize: "14px",
    textAlign: "center",
    borderBottom: "1px solid #4a4a4a",
    backgroundColor: "#469937",
    fontWeight: "bold",
  },
  paidData: {
    width: "7%",
    padding: "8px 4px",
    fontSize: "14px",
    textAlign: "center",
    borderBottom: "1px solid #4a4a4a",
    backgroundColor: "#469937",
    fontWeight: "bold",
  },
  unpaidData: {
    width: "7%",
    padding: "8px 4px",
    fontSize: "14px",
    textAlign: "center",
    borderBottom: "1px solid #4a4a4a",
  },
};
