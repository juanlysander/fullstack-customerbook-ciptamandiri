// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CustomerBookV2 {
    error CustomerBook__HigherDownPaymentValue();
    error CustomerBook__IsNotOwner();
    error CustomerBook__ZeroAddressGiven();

    enum OrderStatus {
        DESIGN, // 0
        MEDIAPREPARATION, // 1
        PLATE, // 2
        PRINTING, // 3
        BLADE, // 4
        CUTTING, // 5
        FINISHING, // 6
        DONE // 7
    }

    struct Order {
        string orderOwner;
        uint256 orderDate;
        uint256 deadlineDate;
        string orderName;
        string specs;
        uint32 orderQuantity;
        uint64 totalPrice;
        uint64 downPayment;
        OrderStatus orderStatus;
        bool isPaid;
    }

    mapping(uint256 => Order) private idToOrders;
    mapping(uint128 => bool) private idToIsDeleted;

    uint128 private orderId;
    address public owner;
    address[] private admins;
    address[] private operators;
    address[] private managers;
    string[] private callMessagesFromOperator;

    event OrderCreated(
        uint128 indexed orderId,
        string orderOwner,
        uint256 orderDate,
        uint256 deadlineDate,
        string orderName,
        string specs,
        uint32 orderQuantity,
        uint64 totalPrice,
        uint64 downPayment,
        OrderStatus orderStatus,
        bool isPaid
    );

    event OrderChanged(
        uint128 indexed orderId,
        string orderOwner,
        uint256 orderDate,
        uint256 deadlineDate,
        string orderName,
        string specs,
        uint32 orderQuantity,
        uint64 totalPrice,
        uint64 downPayment
    );

    event OrderDeleted(uint256 indexed orderId);

    event OrderReadyToShip(
        uint128 indexed orderId,
        string orderOwner,
        string orderName,
        bool isPaid
    );

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert CustomerBook__IsNotOwner();
        }
        _;
    }

    modifier onlyManager() {
        bool isManager = false;
        for (uint256 i = 0; i < managers.length; i++) {
            if (msg.sender == managers[i]) {
                isManager = true;
                break;
            }
        }
        require(isManager || msg.sender == owner, "not authorized person");
        _;
    }

    modifier onlyAdmin() {
        bool isAdmin = false;
        for (uint256 i = 0; i < admins.length; i++) {
            if (msg.sender == admins[i]) {
                isAdmin = true;
                break;
            }
        }
        require(isAdmin || msg.sender == owner, "not authorized person");
        _;
    }

    modifier onlyOperator() {
        bool isOperator = false;
        for (uint256 i = 0; i < operators.length; i++) {
            if (msg.sender == operators[i]) {
                isOperator = true;
                break;
            }
        }
        require(isOperator || msg.sender == owner, "not authorized person");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function setManager(address _newManager) public onlyOwner {
        if (_newManager == address(0)) {
            revert CustomerBook__ZeroAddressGiven();
        }
        managers.push(_newManager);
    }

    function setAdmin(address _newAdmin) public onlyOwner {
        if (_newAdmin == address(0)) {
            revert CustomerBook__ZeroAddressGiven();
        }
        admins.push(_newAdmin);
    }

    function setOperator(address _newOperator) public onlyOwner {
        if (_newOperator == address(0)) {
            revert CustomerBook__ZeroAddressGiven();
        }
        operators.push(_newOperator);
    }

    function changeManager(
        uint256 _managerIndex,
        address _newManager
    ) public onlyOwner {
        if (_newManager == address(0)) {
            revert CustomerBook__ZeroAddressGiven();
        }
        require(_managerIndex < managers.length, "Invalid manager index");

        for (uint256 i = _managerIndex; i < managers.length - 1; i++) {
            managers[i] = managers[i + 1];
        }

        managers.pop();
        managers.push(_newManager);
    }

    function changeOperator(
        uint256 _operatorIndex,
        address _newOperator
    ) public onlyOwner {
        if (_newOperator == address(0)) {
            revert CustomerBook__ZeroAddressGiven();
        }
        require(_operatorIndex < operators.length, "Invalid operator index");

        for (uint256 i = _operatorIndex; i < operators.length - 1; i++) {
            operators[i] = operators[i + 1];
        }

        operators.pop();
        operators.push(_newOperator);
    }

    function changeAdmin(
        uint256 _adminIndex,
        address _newAdmin
    ) public onlyOwner {
        if (_newAdmin == address(0)) {
            revert CustomerBook__ZeroAddressGiven();
        }
        require(_adminIndex < admins.length, "Invalid admin index");

        for (uint256 i = _adminIndex; i < admins.length - 1; i++) {
            admins[i] = admins[i + 1];
        }

        admins.pop();
        admins.push(_newAdmin);
    }

    function addOrder(
        string memory _orderOwner,
        uint256 _deadlineDate,
        string memory _orderName,
        string memory _specs,
        uint32 _orderQuantity,
        uint64 _totalPrice,
        uint64 _downPayment
    ) public onlyAdmin {
        orderId++;
        Order storage newOrder = idToOrders[orderId];
        newOrder.orderOwner = _orderOwner;
        newOrder.orderDate = block.timestamp;
        newOrder.deadlineDate = _deadlineDate;
        newOrder.orderName = _orderName;
        newOrder.specs = _specs;
        newOrder.orderQuantity = _orderQuantity;
        newOrder.totalPrice = _totalPrice;
        newOrder.downPayment = _downPayment;
        newOrder.orderStatus = OrderStatus.DESIGN;
        if (_downPayment > _totalPrice) {
            revert CustomerBook__HigherDownPaymentValue();
        } else if (_downPayment == _totalPrice) {
            newOrder.isPaid = true;
        } else {
            newOrder.isPaid = false;
        }

        emit OrderCreated(
            orderId,
            _orderOwner,
            newOrder.orderDate,
            _deadlineDate,
            _orderName,
            _specs,
            _orderQuantity,
            _totalPrice,
            _downPayment,
            newOrder.orderStatus,
            newOrder.isPaid
        );
    }

    function updateOrder(
        uint128 _orderId,
        string memory _orderOwner,
        uint256 _deadlineDate,
        string memory _orderName,
        string memory _specs,
        uint32 _orderQuantity,
        uint64 _totalPrice,
        uint64 _downPayment
    ) public onlyAdmin {
        require(_orderId <= orderId, "Invalid order ID");
        require(
            !idToIsDeleted[_orderId],
            "Order with the given ID has been deleted and cannot be updated"
        );

        Order storage existingOrder = idToOrders[_orderId];
        existingOrder.orderOwner = _orderOwner;
        existingOrder.orderDate = block.timestamp;
        existingOrder.deadlineDate = _deadlineDate;
        existingOrder.orderName = _orderName;
        existingOrder.specs = _specs;
        existingOrder.orderQuantity = _orderQuantity;
        existingOrder.totalPrice = _totalPrice;
        existingOrder.downPayment = _downPayment;
        if (_downPayment > _totalPrice) {
            revert CustomerBook__HigherDownPaymentValue();
        } else if (_downPayment == _totalPrice) {
            existingOrder.isPaid = true;
        } else {
            existingOrder.isPaid = false;
        }

        emit OrderChanged(
            orderId,
            _orderOwner,
            block.timestamp,
            _deadlineDate,
            _orderName,
            _specs,
            _orderQuantity,
            _totalPrice,
            _downPayment
        );
    }

    function deleteOrder(uint128 _orderId) public onlyOwner {
        require(_orderId <= orderId, "Invalid order ID");
        require(
            !idToIsDeleted[_orderId],
            "Order with the given ID has already been deleted"
        );

        idToIsDeleted[_orderId] = true;
        delete idToOrders[_orderId];

        emit OrderDeleted(orderId);
    }

    function _uintToString(
        uint256 _value
    ) private pure returns (string memory) {
        if (_value == 0) {
            return "0";
        }
        uint256 temp = _value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (_value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(_value % 10)));
            _value /= 10;
        }
        return string(buffer);
    }

    function callToMark(uint128 _orderId) public onlyOperator {
        require(_orderId <= orderId, "Invalid order ID");
        string memory orderIdStr = _uintToString(_orderId);
        string memory message = string(
            abi.encodePacked(
                "Order Id ",
                orderIdStr,
                " is done, ready to be approved"
            )
        );
        callMessagesFromOperator.push(message);
    }

    function approveMark(uint256 _orderId) public onlyManager {
        require(_orderId <= orderId, "Invalid order ID");
        Order storage existingOrder = idToOrders[_orderId];
        require(
            existingOrder.orderStatus != OrderStatus.DONE,
            "Order is already in DONE status"
        );
        existingOrder.orderStatus = OrderStatus(
            uint256(existingOrder.orderStatus) + 1
        );

        if (existingOrder.orderStatus == OrderStatus.DONE) {
            emit OrderReadyToShip(
                orderId,
                existingOrder.orderOwner,
                existingOrder.orderName,
                existingOrder.isPaid
            );
        }
    }

    function approvePaid(uint256 _orderId) public onlyManager {
        require(_orderId <= orderId, "Invalid order ID");
        Order storage existingOrder = idToOrders[_orderId];
        require(existingOrder.isPaid == false, "Order is already Paid");
        existingOrder.isPaid = true;
    }

    function getTotalPrice(uint256 _orderId) public view returns (uint256) {
        require(_orderId <= orderId, "Invalid order ID");
        return idToOrders[_orderId].totalPrice;
    }

    function getRestPayment(uint256 _orderId) public view returns (uint256) {
        require(_orderId <= orderId, "Invalid order ID");
        return
            idToOrders[_orderId].totalPrice - idToOrders[_orderId].downPayment;
    }

    function getUnpaidOrders() public view returns (uint256[] memory) {
        uint256 unpaidCount = 0;

        for (uint256 i = 1; i <= orderId; i++) {
            if (
                !idToOrders[i].isPaid &&
                bytes(idToOrders[i].orderName).length > 0
            ) {
                unpaidCount++;
            }
        }

        uint256[] memory unpaidOrderIds = new uint256[](unpaidCount);
        uint256 currentIndex = 0;

        for (uint256 i = 1; i <= orderId; i++) {
            if (
                !idToOrders[i].isPaid &&
                bytes(idToOrders[i].orderName).length > 0
            ) {
                unpaidOrderIds[currentIndex] = i;
                currentIndex++;
            }
        }

        return unpaidOrderIds;
    }

    function getOrderById(
        uint128 _orderId
    )
        public
        view
        returns (
            uint128,
            string memory,
            uint256,
            uint256,
            string memory,
            string memory,
            uint32,
            uint64,
            uint64,
            OrderStatus,
            bool
        )
    {
        require(_orderId <= orderId, "Invalid order ID");
        Order storage order = idToOrders[_orderId];
        return (
            _orderId,
            order.orderOwner,
            order.orderDate,
            order.deadlineDate,
            order.orderName,
            order.specs,
            order.orderQuantity,
            order.totalPrice,
            order.downPayment,
            order.orderStatus,
            order.isPaid
        );
    }

    function getAllOrders() public view returns (Order[] memory) {
        Order[] memory allOrders = new Order[](orderId);

        for (uint256 i = 1; i <= orderId; i++) {
            allOrders[i - 1] = idToOrders[i];
        }

        return allOrders;
    }

    function getAdmins() public view returns (address[] memory) {
        return admins;
    }

    function getManagers() public view returns (address[] memory) {
        return managers;
    }

    function getOperators() public view returns (address[] memory) {
        return operators;
    }

    function getCallMessagesFromOperator()
        public
        view
        returns (string[] memory)
    {
        return callMessagesFromOperator;
    }
}
