# 💸 SavingsVault – A Simple ETH Savings Vault on Flow

**Network:** Flow Testnet  
**Contract Address:** [`0xFe2D59D9F92A3959a44e9E5F5f1612b2BA697922`](https://testnet.flowscan.org/account/0xFe2D59D9F92A3959a44e9E5F5f1612b2BA697922)  
**Language:** Solidity `^0.8.20` (EVM-compatible)  
**License:** MIT  

---

## 📘 Project Overview

**SavingsVault** is a decentralized vault contract designed to let users **securely deposit and withdraw ETH** without any complex setup or external dependencies.  
This project demonstrates a **minimalistic vault architecture** that prioritizes simplicity, transparency, and user control over funds.

Built on **Flow’s EVM-compatible environment**, the vault provides a simple user flow:
- Deposit ETH directly or through a function call.
- Withdraw your full vault balance at any time.
- View your personal and total vault balances securely.

---

## 🔗 Deployed Contract(s)

| Environment | Network | Contract Address | Description |
|--------------|----------|------------------|-------------|
| Testnet | Flow Testnet | [`0xFe2D59D9F92A3959a44e9E5F5f1612b2BA697922`](https://testnet.flowscan.org/account/0xFe2D59D9F92A3959a44e9E5F5f1612b2BA697922) | Main SavingsVault contract (ETH vault) |

---

## ⚙️ Key Features

- 🔐 **Self-custodial vault** – each user controls their own funds  
- 💰 **Deposit and withdraw ETH** (no input parameters)  
- 🧱 **No constructors / no imports** – fully standalone Solidity contract  
- 🧾 **Emits events** for all deposits and withdrawals  
- 🚫 **Reentrancy protection** for secure withdrawals  
- 🌍 **Tested and deployed on Flow Testnet**

---

## 🧩 Core Functions

| Function | Description |
|-----------|-------------|
| `deposit()` | Deposit ETH into your personal vault balance. |
| `withdrawAll()` | Withdraw your entire saved balance in one transaction. |
| `getMyBalance()` | View your saved balance in wei. |
| `totalVaultBalance()` | Check total ETH held by the contract. |
| `renounceOwnership()` | Owner can remove themselves (optional). |

---

## 🧠 Technical Details

- **Solidity Version:** `^0.8.20`  
- **Dependencies:** None (no imports)  
- **Constructor:** None (owner initialized inline)  
- **Reentrancy Protection:** Implemented via `locked` state variable  
- **Pattern Used:** Checks-Effects-Interactions  

---

## 🧾 Events

| Event | Parameters | Description |
|--------|-------------|-------------|
| `Deposit(address indexed user, uint256 amount)` | `user`, `amount` | Emitted when a user deposits ETH. |
| `Withdraw(address indexed user, uint256 amount)` | `user`, `amount` | Emitted when a user withdraws ETH. |

---

## 🚀 Quick Start (Testnet)

1. Connect to **Flow Testnet**.  
2. Fund your wallet with testnet FLOW/ETH (depending on environment).  
3. Interact with the contract using:
   - Remix IDE  
   - Flow CLI  
   - Flow Playground (EVM mode)  

### Example (via Remix)
```solidity
// Deposit 1 ETH
SavingsVault.deposit{value: 1 ether}();

// Withdraw all funds
SavingsVault.withdrawAll();

// Check your vault balance
SavingsVault.getMyBalance();
