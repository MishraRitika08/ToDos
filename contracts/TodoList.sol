// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoList {
    struct Task {
        string description;
        bool completed;
    }
    
    Task[] public tasks;

    // Adds a new task to the to-do list
    function addTask(string memory _description) public {
        tasks.push(Task(_description, false));
    }

    // Removes a specified task from the to-do list
    function removeTask(uint256 _index) public {
        require(_index < tasks.length, "Task index out of bounds");
        tasks[_index] = tasks[tasks.length - 1];
        tasks.pop();
    }

    // Marks a task as completed
    function completeTask(uint256 _index) public {
        require(_index < tasks.length, "Task index out of bounds");
        tasks[_index].completed = true;
    }

    // Retrieves a list of completed tasks
    function getCompletedTasks() public view returns (Task[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < tasks.length; i++) {
            if (tasks[i].completed) {
                count++;
            }
        }
        
        Task[] memory completedTasks = new Task[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < tasks.length; i++) {
            if (tasks[i].completed) {
                completedTasks[index] = tasks[i];
                index++;
            }
        }
        return completedTasks;
    }

    // Retrieves a list of pending (incomplete) tasks
    function getPendingTasks() public view returns (Task[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < tasks.length; i++) {
            if (!tasks[i].completed) {
                count++;
            }
        }
        
        Task[] memory pendingTasks = new Task[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < tasks.length; i++) {
            if (!tasks[i].completed) {
                pendingTasks[index] = tasks[i];
                index++;
            }
        }
        return pendingTasks;
    }

    // Removes all completed tasks from the list
    function clearCompletedTasks() public {
        for (uint256 i = 0; i < tasks.length; i++) {
            if (tasks[i].completed) {
                tasks[i] = tasks[tasks.length - 1];
                tasks.pop();
                i--;
            }
        }
    }

    // Clears the entire to-do list
    function clearAllTasks() public {
        delete tasks;
    }
}