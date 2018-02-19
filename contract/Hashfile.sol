pragma solidity ^0.4.18;

contract HashFile {
    struct FileEvidence {
        uint timestamp;
        bytes32 name;
        bytes32 hash;
    }

    mapping(address => FileEvidence[]) addressToFileMapping;

    function addHashFile(bytes32 name, bytes32 md5Hash) public {
        FileEvidence[] storage userFileHashes = addressToFileMapping[msg.sender];

        FileEvidence memory evidence = FileEvidence(block.timestamp, name, md5Hash);
        userFileHashes.push(evidence);
    }

    function getUserHashFile() view public returns (uint[], bytes32[], bytes32[]) {
        uint length = addressToFileMapping[msg.sender].length;

        uint[] memory timestamps = new uint[](length);
        bytes32[] memory names = new bytes32[](length);
        bytes32[] memory hashes = new bytes32[](length);

        for(uint i = 0; i < length ; i++) {
            FileEvidence memory evidence = addressToFileMapping[msg.sender][i];
            timestamps[i] = evidence.timestamp;
            names[i] = evidence.name;
            hashes[i] = evidence.hash;
        }

        return (timestamps, names, hashes);
    }
}
