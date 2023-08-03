// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract InternalChat {
    struct Message {
        address sender;
        string content;
        uint256 timestamp;
    }

    Message[] private messages;

    event MessageSent(
        address indexed _sender,
        string content,
        uint256 timestamp
    );

    function sendMessage(string memory _content) public {
        Message memory newMessage = Message({
            sender: msg.sender,
            content: _content,
            timestamp: block.timestamp
        });
        messages.push(newMessage);
        emit MessageSent(msg.sender, _content, block.timestamp);
    }

    function getMessageCount() public view returns (uint256) {
        return messages.length;
    }

    function getAllMessages() public view returns (Message[] memory) {
        return messages;
    }
}
