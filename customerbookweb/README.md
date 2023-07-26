# CustomerBook Smart Contract

The CustomerBook smart contract is a decentralized application (DApp) designed to manage orders and payments for Cipta Mandiri Printing Business. It allows users to create, update, and delete orders, and tracks their status through various stages of completion. The smart contract is built on the Ethereum blockchain and is implemented in Solidity version 0.8.18.

## Features

1. Order Status Management
The smart contract defines an OrderStatus enum with different stages of an order, including DESIGN, MEDIAPREPARATION, PLATE, PRINTING, BLADE, CUTTING, FINISHING, and DONE. The status of each order is updated as it progresses through the production process.

2. Role-Based Access Control
The smart contract implements role-based access control to manage permissions for specific actions. There are four roles: Owner, Manager, Admin, and Operator. The Owner has full control over the contract, while Managers, Admins, and Operators have limited access based on their respective roles.

3. Order Creation and Modification
Authorized Admins can create new orders by providing relevant details such as order owner, order date, deadline date, order name, specifications, quantity, total price, and down payment. The smart contract ensures that the down payment is less than the total price and that the deadline is after the order date. Admins can also update existing orders with new information.

4. Order Deletion
The Owner can delete orders from the smart contract. This action permanently removes the order and associated data from the blockchain.

5. Order Payment Approval
Managers are responsible for approving orders for production and confirming payment status. Once an order is marked as DONE, it is ready for shipping. Managers can also mark orders as paid when payment is received.

6. Data Retrieval
The smart contract provides several getter functions to retrieve data about orders, including total price, remaining payment, unpaid orders, order status, and all orders.

7. Event Logging
The smart contract logs various events, such as order creation, order modification, order deletion, order readiness for shipping, and calls from operators.

## Getting Started
To interact with the CustomerBook smart contract, you will need an Ethereum wallet such as MetaMask. Ensure that you are connected to the correct Ethereum network (e.g., Ropsten, Rinkeby, or Mainnet) before proceeding.

Here are some examples of interactions you can perform:

1. Create a new order:

  Call the addOrder function with the required parameters.
  Update an existing order:

  Call the updateOrder function with the order ID and updated parameters.
  Delete an order:

  Call the deleteOrder function with the order ID.
  Approve an order for production:

  Call the approveMark function with the order ID.
  Mark an order as paid:

  Call the approvePaid function with the order ID.
  Retrieve order details:

  Call the getOrderById function with the order ID.
  Retrieve all orders:

  Call the getAllOrders function to get an array of all orders.
  Retrieve unpaid orders:

  Call the getUnpaidOrders function to get an array of unpaid order IDs.
  Retrieve admins, managers, and operators:

  Call the getAdmins, getManagers, or getOperators function to get an array of addresses.

## Disclaimer
Please note that this README provides a high-level overview of the CustomerBook smart contract. It is essential to review the contract code thoroughly and perform adequate testing before deploying it on the Ethereum blockchain. The contract's security and functionality are crucial considerations when using it in production.

For any questions or issues related to the smart contract, you can contact the contract owner or developer for support.

### License
This smart contract is licensed under the MIT License. See the LICENSE file for more details.
