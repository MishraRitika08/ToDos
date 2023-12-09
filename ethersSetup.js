// // ethersSetup.js

// const { ethers } = require('ethers');

// // Provider pointing to Ganache
// const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545'); // Replace with your Ganache host and port

// // Example usage: Retrieve network information
// provider.getNetwork().then(network => {
//   console.log('Connected to network:', network);
// }).catch(err => {
//   console.error('Error fetching network:', err);
// });

// Use the provider for interacting with contracts, sending transactions, etc.
// For example:
// const contract = new ethers.Contract(contractAddress, abi, provider);
// contract.someFunction();
