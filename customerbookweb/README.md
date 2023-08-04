# README

The CustomerBook smart contract is a decentralized application (DApp) designed to manage orders and payments for Cipta Mandiri Printing Business. It allows users to create, update, and delete orders, and tracks their status through various stages of completion. The smart contract is built on the Ethereum blockchain and is implemented in Solidity version 0.8.18.

#### Private Keys
use this private key to act as Owner and grant access to all features. See Features below
`9547ea0525129fe30bb94719608629c75ff9f6104117b9d6a2501724580cb18a`


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
To interact with the CustomerBook smart contract, you will need an Ethereum wallet such as MetaMask. Ensure that you are connected to the Sepolia test network, if you dont have the network, follow this guide
[Sepolia](https://www.datawallet.com/crypto/add-sepolia-to-metamask)

Here are some examples of interactions you can perform:

1. First of all, you can set other wallets to become administrators, operators, or managers in the user authorization section. These features can only be accessed by the owner (using the private key mentioned above).

2. You can add and update orders in the customer book section. The delete function can only be accessed by the Owner.

3. The data inputted is immutable. The owner and admin can change the order, but there will always be an event emitted when some order is changed. Even if you delete some orders, the trace of the ID will still exist, but with empty information.

4. In the Manager dashboard, you can approve the state to change the order status by entering the order ID. You can also mark an order as paid by entering the order ID in the second red button.

5. There are some order checkers in the Manager dashboard, as well as a list of unpaid orders. On the top section of the Manager dashboard, there is a large log box that returns messages from the operator. In this case, the operator cannot change the order status; only the manager can do it. This ensures that orders are always checked by the manager when called by the operator via the log box.

6. In the Operator dashboard, there is an order checker that allows entering the same ID as in the Manager dashboard, as well as a call button that emits a message to the manager's log box, as mentioned in point no. 5.

7. Lastly, there is a chat box still in development in case managers and operators need to coordinate about the orders. The front-end has already been developed, but the backend is still under concept development to choose the most efficient way to execute it.

### License
This smart contract is licensed under the MIT License. See the LICENSE file for more details.
