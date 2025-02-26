
const hre = require("hardhat");

async function main() {
    const ToDoList = await hre.ethers.getContractFactory("ToDoList");
    const toDoList = await ToDoList.deploy();

    await toDoList.deployed();
    console.log("ToDoList deployed to:", toDoList.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
