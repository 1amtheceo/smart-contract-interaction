require('dotenv').config();
const { ethers } = require('ethers');

// Load environment variables
const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// ABI (Application Binary Interface) — интерфейс смарт-контракта
const CONTRACT_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address to, uint256 amount) public returns (bool)"
];

// Connect to the blockchain
const provider = new ethers.JsonRpcProvider(RPC_URL);

// Create a wallet instance
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Create a contract instance
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

async function main() {
    try {
        console.log(`Connected to: ${await provider.getNetwork()}`);
        console.log(`Wallet address: ${wallet.address}`);

        // Get balance of your wallet
        const balance = await contract.balanceOf(wallet.address);
        console.log(`Your balance: ${ethers.formatUnits(balance, 18)} tokens`);

        // Example: Sending tokens (replace address and amount)
        const recipient = "0xRecipientAddress";
        const amount = ethers.parseUnits("1.0", 18); // 1 token

        console.log(`Sending ${ethers.formatUnits(amount, 18)} tokens to ${recipient}...`);

        const tx = await contract.transfer(recipient, amount);
        console.log(`Transaction hash: ${tx.hash}`);

        await tx.wait();
        console.log("✅ Transfer completed!");

    } catch (error) {
        console.error("❌ Error:", error);
    }
}

main();
