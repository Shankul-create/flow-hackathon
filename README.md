# 🏦 SavingsVault - Decentralized Savings on Flow

> **A simple, secure, self-custodial savings vault built on Flow's EVM-compatible testnet**

[![Flow Testnet](https://img.shields.io/badge/Network-Flow%20Testnet-blue)](https://flow.com)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-orange)](https://soliditylang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[🎥 Demo Video](#) | [🚀 Live Demo](#) | [📜 Contract](https://testnet.flowscan.io/address/0xFe2D59D9F92A3959a44e9E5F5f1612b2BA697922)

---

## 🎯 Problem Statement

Traditional savings solutions either:
- Require complex DeFi protocols with steep learning curves
- Lock your funds with centralized entities
- Expose users to smart contract vulnerabilities through complex dependencies

**SavingsVault** solves this by providing a **minimalist, zero-dependency vault** where users maintain complete control of their funds with maximum transparency.

---

## ✨ What Makes This Unique?

### 🔐 Zero-Dependency Security
- **No imports, no external libraries** - reduces attack surface to near-zero
- Every line of code is visible and auditable
- Reentrancy protection built-in without OpenZeppelin

### 🎨 Minimal Complexity
- No constructor dependencies
- No complex setup or initialization
- Works immediately after deployment

### 💎 Flow EVM Integration
- Leverages Flow's scalability and low transaction costs
- EVM-compatible for easy Web3 integration
- Perfect for Web2 users transitioning to Web3

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| 💰 **Deposit** | Securely deposit ETH into your personal vault |
| 🏦 **Withdraw** | Withdraw your full balance anytime, instantly |
| 👀 **View Balance** | Check your savings and total vault holdings |
| 🔒 **Self-Custodial** | You control your keys, you control your funds |
| 🛡️ **Reentrancy Safe** | Built-in protection against reentrancy attacks |
| 📢 **Event Logging** | All transactions emit events for transparency |

---

## 📊 Architecture

```
┌─────────────┐
│   User UI   │
│  (Frontend) │
└──────┬──────┘
       │
       ↓
┌─────────────────────┐
│  Web3 Provider      │
│  (MetaMask/Wallet)  │
└──────┬──────────────┘
       │
       ↓
┌─────────────────────────────┐
│   SavingsVault Contract     │
│   (Flow EVM Testnet)        │
│                             │
│  • balances[address]        │
│  • deposit()                │
│  • withdrawAll()            │
│  • getMyBalance()           │
└─────────────────────────────┘
```

---

## 🛠️ Tech Stack

- **Blockchain**: Flow Testnet (EVM-compatible)
- **Smart Contract**: Solidity ^0.8.20
- **Frontend**: React + Ethers.js
- **Wallet**: MetaMask
- **Styling**: Tailwind CSS

---

## 📦 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v16+
- [MetaMask](https://metamask.io/) browser extension
- Flow Testnet ETH ([Get testnet tokens](https://testnet-faucet.onflow.org/))

### Installation

```bash
# Clone the repository
git clone https://github.com/Shankul-create/flow-hackathon.git
cd flow-hackathon

# Install dependencies
npm install

# Start the frontend
npm run dev
```

### Configure MetaMask for Flow Testnet

1. Open MetaMask
2. Add Network with these details:
   - **Network Name**: Flow Testnet
   - **RPC URL**: `https://testnet.evm.nodes.onflow.org`
   - **Chain ID**: `545`
   - **Currency Symbol**: `FLOW`
   - **Block Explorer**: `https://testnet.flowscan.io`

3. Get test tokens from the [Flow Faucet](https://testnet-faucet.onflow.org/)

---

## 🎮 Usage

### Using the Web Interface

1. **Connect Wallet**: Click "Connect Wallet" and approve MetaMask connection
2. **Deposit**: Enter amount and click "Deposit" to save ETH
3. **View Balance**: Your savings are displayed in real-time
4. **Withdraw**: Click "Withdraw All" to retrieve your funds

### Using Remix IDE

1. Go to [Remix IDE](https://remix.ethereum.org/)
2. Load the contract at `0xFe2D59D9F92A3959a44e9E5F5f1612b2BA697922`
3. Connect to Flow Testnet via Injected Provider
4. Interact with functions directly

### Using Code

```javascript
// Connect to contract
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(
  "0xFe2D59D9F92A3959a44e9E5F5f1612b2BA697922",
  ABI,
  provider.getSigner()
);

// Deposit 1 ETH
await contract.deposit({ value: ethers.utils.parseEther("1.0") });

// Check balance
const balance = await contract.getMyBalance();

// Withdraw all
await contract.withdrawAll();
```

---

## 📝 Smart Contract Reference

### Core Functions

#### `deposit()`
```solidity
function deposit() external payable
```
Deposit ETH into your vault. Amount is specified via `msg.value`.

**Emits**: `Deposit(address indexed user, uint256 amount)`

---

#### `withdrawAll()`
```solidity
function withdrawAll() external
```
Withdraw your entire vault balance in one transaction.

**Emits**: `Withdraw(address indexed user, uint256 amount)`

---

#### `getMyBalance()`
```solidity
function getMyBalance() external view returns (uint256)
```
Returns your current vault balance in wei.

---

#### `totalVaultBalance()`
```solidity
function totalVaultBalance() external view returns (uint256)
```
Returns the total ETH held by the contract.

---

## 🔒 Security Features

### Reentrancy Protection
```solidity
bool private locked;

modifier nonReentrant() {
    require(!locked, "Reentrancy detected");
    locked = true;
    _;
    locked = false;
}
```

### Checks-Effects-Interactions Pattern
1. ✅ Verify user has sufficient balance
2. ✅ Update state before external call
3. ✅ Transfer funds last

### No External Dependencies
- Zero imports = minimal attack surface
- No constructor = no initialization vulnerabilities
- Standalone code = complete auditability

---

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core vault functionality
- ✅ Flow Testnet deployment
- ✅ Web interface
- ✅ Event logging

### Phase 2 (Next)
- 🔄 Partial withdrawal support
- 🔄 Savings goals with progress tracking
- 🔄 Interest/yield generation
- 🔄 Multi-signature support

### Phase 3 (Future)
- 📅 Time-locked savings
- 📅 Social savings (vault sharing)
- 📅 Mainnet deployment
- 📅 Mobile app

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run coverage
npm run coverage

# Deploy to testnet
npm run deploy:testnet
```

---

## 📜 Contract Details

| Property | Value |
|----------|-------|
| **Network** | Flow Testnet |
| **Contract Address** | `0xFe2D59D9F92A3959a44e9E5F5f1612b2BA697922` |
| **Compiler Version** | `0.8.20` |
| **License** | MIT |
| **Optimization** | Enabled |

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## ⚠️ Disclaimer

**This is a testnet deployment for hackathon/educational purposes.**

- DO NOT use with real funds on mainnet without a professional audit
- Smart contracts carry inherent risks
- Always verify contract addresses before interacting
- Test thoroughly on testnet before mainnet deployment

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

Built with ❤️ by [Your Name/Team] for the Flow Hackathon

---

## 📞 Contact & Links

- **GitHub**: [github.com/Shankul-create/flow-hackathon](https://github.com/Shankul-create/flow-hackathon)
- **Flow Testnet Explorer**: [testnet.flowscan.io](https://testnet.flowscan.io)
- **Documentation**: [Flow EVM Docs](https://developers.flow.com/evm/about)

---

## 🙏 Acknowledgments

- Flow Team for EVM compatibility
- Open source community
- Hackathon organizers and judges

---

**⭐ If you find this project useful, please consider giving it a star!**
