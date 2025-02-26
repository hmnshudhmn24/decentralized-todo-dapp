
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ToDoListABI from "./ToDoList.json";

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        async function loadBlockchainData() {
            if (window.ethereum) {
                const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = web3Provider.getSigner();
                const toDoListContract = new ethers.Contract(CONTRACT_ADDRESS, ToDoListABI.abi, signer);
                setProvider(web3Provider);
                setContract(toDoListContract);
                fetchTasks(toDoListContract);
            }
        }
        loadBlockchainData();
    }, []);

    async function fetchTasks(contract) {
        const taskCount = await contract.taskCount();
        let tasksArray = [];
        for (let i = 1; i <= taskCount; i++) {
            const task = await contract.tasks(i);
            if (task.content) {
                tasksArray.push(task);
            }
        }
        setTasks(tasksArray);
    }

    async function createTask() {
        if (!taskInput || !contract) return;
        const tx = await contract.createTask(taskInput);
        await tx.wait();
        setTaskInput("");
        fetchTasks(contract);
    }

    async function toggleTask(id) {
        const tx = await contract.toggleCompleted(id);
        await tx.wait();
        fetchTasks(contract);
    }

    async function deleteTask(id) {
        const tx = await contract.deleteTask(id);
        await tx.wait();
        fetchTasks(contract);
    }

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">Decentralized To-Do List</h1>
            <div className="mb-4">
                <input 
                    type="text" 
                    value={taskInput} 
                    onChange={(e) => setTaskInput(e.target.value)} 
                    placeholder="Enter task" 
                    className="border p-2 rounded w-full" 
                />
                <button 
                    onClick={createTask} 
                    className="bg-blue-500 text-white p-2 rounded mt-2 w-full">
                    Add Task
                </button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="border p-2 rounded mb-2 flex justify-between">
                        <span className={task.completed ? "line-through" : ""}>{task.content}</span>
                        <div>
                            <button onClick={() => toggleTask(task.id)} className="bg-green-500 text-white p-1 rounded mr-2">
                                {task.completed ? "Undo" : "Complete"}
                            </button>
                            <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white p-1 rounded">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
