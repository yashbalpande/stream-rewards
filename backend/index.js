require('dotenv').config();
const express = require('express');
const Web3 = require('web3');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const web3 = new Web3(process.env.RPC_URL);
const tokenAbi = [
  // Minimal ERC20 ABI for transfer
  {
    constant: false,
    inputs: [{ name: "_to", type: "address" }, { name: "_value", type: "uint256" }],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  }
];

const tokenContract = new web3.eth.Contract(tokenAbi, process.env.TOKEN_ADDRESS);
const sender = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(sender);

app.post('/api/airdrop', async (req, res) => {
  const { address } = req.body;
  if (!web3.utils.isAddress(address)) {
    return res.status(400).json({ error: 'Invalid wallet address' });
  }

  try {
    const tx = await tokenContract.methods.transfer(address, web3.utils.toWei('1')).send({
      from: sender.address,
      gas: 100000,
    });

    res.json({ success: true, txHash: tx.transactionHash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('🚀 Airdrop server running on http://localhost:3001');
});
