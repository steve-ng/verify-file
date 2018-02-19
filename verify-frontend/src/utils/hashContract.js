import Web3 from 'web3';
import config from 'config';

let hashContract;
let myWeb3;

export function getOrInitializeWeb3(web3) {
  if (typeof myWeb3 !== 'undefined') {
    return myWeb3;
  }

  if (typeof web3 !== 'undefined') {
    myWeb3 = new Web3(web3.currentProvider);
  } else {
    // set the provider you want from Web3.providers
    console.log('No Web3 Detected... using HTTP Provider'); /* eslint-disable-line */
    return null;
  }

  const { hashContractAddress = '' } = config;
  /* eslint-disable */

  hashContract = new myWeb3.eth.Contract([
      {
        "constant": true,
        "inputs": [],
        "name": "getUserHashFile",
        "outputs": [
          {
            "name": "",
            "type": "uint256[]"
          },
          {
            "name": "",
            "type": "bytes32[]"
          },
          {
            "name": "",
            "type": "bytes32[]"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "name",
            "type": "bytes32"
          },
          {
            "name": "md5Hash",
            "type": "bytes32"
          }
        ],
        "name": "addHashFile",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    hashContractAddress,
    );
  /* eslint-disable */

  return myWeb3;
}

export function getUserHashFile(address) {
  if (!hashContract) {
    getOrInitializeWeb3(web3);
  }

  return hashContract.methods.getUserHashFile().call({from: address});
}

export function addUserFile(fileName, fileMd5, address) {
  if (!hashContract) {
    getOrInitializeWeb3(web3);
  }

  if (fileName.length > 16) {
    fileName = fileName.substring(0, 16);
  }

  const nameHash = Web3.utils.asciiToHex(fileName);
  const hexHash = Web3.utils.asciiToHex(fileMd5);

  return hashContract.methods.addHashFile(nameHash, hexHash).send({from: address});
}
