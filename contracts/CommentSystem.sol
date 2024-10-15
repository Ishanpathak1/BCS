// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CommentSystem {

    // Mapping from a hashed URL to an array of comment hashes
    mapping(bytes32 => bytes32[]) public commentsByUrl;

    // Event to emit when a comment is added
    event CommentAdded(bytes32 indexed urlHash, bytes32 commentHash, address indexed commenter);

    // Function to add a comment to a URL
    function addComment(bytes32 _urlHash, bytes32 _commentHash) public {
        // Add the comment hash to the array of comments for the given URL hash
        commentsByUrl[_urlHash].push(_commentHash);

        // Emit an event for the new comment
        emit CommentAdded(_urlHash, _commentHash, msg.sender);
    }

    // Function to retrieve all comments for a URL hash
    function getComments(bytes32 _urlHash) public view returns (bytes32[] memory) {
        return commentsByUrl[_urlHash];
    }
}
