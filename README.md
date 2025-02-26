# Decentralized To-Do List (Dapp)

This is a decentralized task manager built on Ethereum, utilizing Solidity for smart contracts and React for the frontend.

## Features
- Add tasks to the blockchain
- Mark tasks as completed
- Delete tasks

## Setup Instructions

### 1. Install Dependencies
```sh
npm install
```

### 2. Compile & Deploy the Smart Contract
```sh
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```

### 3. Start React Frontend
```sh
npm start
```

## Requirements
- Node.js & npm
- Hardhat
- MetaMask Wallet
- React.js

## License
MIT
