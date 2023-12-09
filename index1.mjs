//import { ethers } from 'ethers';
//const { ethers } = require('ethers');

//import { ethers } from 'https://cdn.ethers.io/lib/ethers-5.0.umd.min.js';

document.addEventListener('DOMContentLoaded', async function () {
    // Connect to MetaMask
    await connectToMetamask();

  
    // Bind click event to add-item button
    document.getElementById('add-item').addEventListener('click', addTask);
    
    // Bind click event to get-pending button
    document.getElementById('get-pending').addEventListener('click', getPendingTasks);
    
    // Bind click event to get-completed button
    document.getElementById('get-completed').addEventListener('click', getCompletedTasks);
    
    // Bind click event to delete-all button
    document.getElementById('delete-all').addEventListener('click', clearAllTasks);
  });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // Provider pointing to Ganache
 // const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545'); // Replace with your Ganache host and port
  
  // Define TodoList contract ABI and address
  const todoListAddress = '0x79b4782c2bDda34e951E69A51538CcbAAaD516Eb';
  const todoListABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "tasks",
        "outputs": [
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "completed",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_description",
            "type": "string"
          }
        ],
        "name": "addTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "removeTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "completeTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getCompletedTasks",
        "outputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "description",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "completed",
                "type": "bool"
              }
            ],
            "internalType": "struct TodoList.Task[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "getPendingTasks",
        "outputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "description",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "completed",
                "type": "bool"
              }
            ],
            "internalType": "struct TodoList.Task[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "clearCompletedTasks",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "clearAllTasks",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];

  // Function to connect to MetaMask using ethers.js
  async function connectToMetamask() {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected to MetaMask');
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      console.error('MetaMask not found');
    }
  }
  
  // Function to add a task
  async function addTask() {
    const taskDescription = document.getElementById('input-tasks').value;
    
    // Check if the task description is not empty
    if (taskDescription.trim() === '') {
      console.error('Task description cannot be empty');
      return;
    }
    // Get the connected Ethereum provider (MetaMask)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    // Get signer (account)
    const signer = provider.getSigner();
  
    // Create a contract instance
    const todoListContract = new ethers.Contract(todoListAddress, todoListABI, signer);
  
    try {
      // Call the addTask function in the TodoList contract
      const tx = await todoListContract.addTask(taskDescription);
      console.log('Transaction hash:', tx.hash);
      // Update UI or perform other actions after adding task successfully
      createNewTask(taskDescription);
      document.getElementById('input-tasks').value = '';
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }
  
  // Function to get pending tasks
  async function getPendingTasks() {
    // Get the connected Ethereum provider (MetaMask)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    // Get signer (account)
    const signer = provider.getSigner();
  
    // Create a contract instance
    const todoListContract = new ethers.Contract(todoListAddress, todoListABI, signer);
  
    try {
      // Call the getPendingTasks function in the TodoList contract
      const pendingTasks = await todoListContract.getPendingTasks();
      // Process the pending tasks, update UI, etc.
      console.log('Pending Tasks:', pendingTasks);
      // Implement UI update or other actions here
    } catch (error) {
      console.error('Error getting pending tasks:', error);
    }
  }
  
  // Function to clear all tasks
  async function clearAllTasks() {
    // Get the connected Ethereum provider (MetaMask)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    // Get signer (account)
    const signer = provider.getSigner();
  
    // Create a contract instance
    const todoListContract = new ethers.Contract(todoListAddress, todoListABI, signer);
  
    try {
      // Call the clearAllTasks function in the TodoList contract
      const tx = await todoListContract.clearAllTasks();
      console.log('Transaction hash:', tx.hash);
      // Update UI or perform other actions after clearing all tasks successfully
      // For example, clear the task list in the UI
      const todoList = document.getElementById('todo-list');
      todoList.innerHTML = ''; // Clear the task list in the UI
    } catch (error) {
      console.error('Error clearing all tasks:', error);
    }
  }
  // Function to get completed tasks
async function getCompletedTasks() {
    // Get the connected Ethereum provider (MetaMask)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    // Get signer (account)
    const signer = provider.getSigner();
  
    // Create a contract instance
    const todoListContract = new ethers.Contract(todoListAddress, todoListABI, signer);
  
    try {
      // Call the getCompletedTasks function in the TodoList contract
      const completedTasks = await todoListContract.getCompletedTasks();
      // Process the completed tasks, update UI, etc.
      console.log('Completed Tasks:', completedTasks);
      // Implement UI update or other actions here
    } catch (error) {
      console.error('Error getting completed tasks:', error);
    }
  }
  
  
  // Function to create new task element and add it to the UI
  function createNewTask(taskText) {
    const todoList = document.getElementById('todo-list');
    const newTask = document.createElement('div');
    newTask.classList.add('todolist-items');
  
    const taskName = document.createElement('h3');
    taskName.textContent = taskText;
    newTask.appendChild(taskName);
  
    // ... other elements or functionalities for the task display ...
  
    todoList.appendChild(newTask);
  }
  