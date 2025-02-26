
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ToDoList {
    struct Task {
        uint id;
        string content;
        bool completed;
    }
    
    mapping(uint => Task) public tasks;
    uint public taskCount;

    event TaskCreated(uint id, string content, bool completed);
    event TaskCompleted(uint id, bool completed);
    event TaskDeleted(uint id);

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
    }

    function toggleCompleted(uint _id) public {
        Task storage task = tasks[_id];
        task.completed = !task.completed;
        emit TaskCompleted(_id, task.completed);
    }

    function deleteTask(uint _id) public {
        delete tasks[_id];
        emit TaskDeleted(_id);
    }
}
