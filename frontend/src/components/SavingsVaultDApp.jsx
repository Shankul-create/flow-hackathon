import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Wallet, TrendingUp, ArrowDownCircle, ArrowUpCircle, AlertCircle, CheckCircle } from 'lucide-react';

const SavingsVaultDApp = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('0');
  const [totalVault, setTotalVault] = useState('0');
  const [depositAmount, setDepositAmount] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const CONTRACT_ADDRESS = '0xFe2D59D9F92A3959a44e9E5F5f1612b2BA697922';
  const CONTRACT_ABI = [
    "function deposit() external payable",
    "function withdrawAll() external",
    "function getMyBalance() external view returns (uint256)",
    "function totalVaultBalance() external view returns (uint256)"
  ];

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      setStatus({ type: 'error', message: 'MetaMask not detected. Please install MetaMask.' });
      return;
    }

    try {
      setIsLoading(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      setIsConnected(true);
      setStatus({ type: 'success', message: 'Wallet connected successfully!' });
      await loadBalances(accounts[0]);
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to connect wallet: ' + error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const loadBalances = async (userAccount) => {
    if (!window.ethereum) return;

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

      const userBalance = await contract.getMyBalance();
      const vaultTotal = await contract.totalVaultBalance();

      setBalance(ethers.utils.formatEther(userBalance));
      setTotalVault(ethers.utils.formatEther(vaultTotal));
    } catch (error) {
      console.error('Error loading balances:', error);
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      setStatus({ type: 'error', message: 'Please enter a valid amount' });
      return;
    }

    try {
      setIsLoading(true);
      setStatus({ type: 'info', message: 'Processing deposit...' });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.deposit({ value: ethers.utils.parseEther(depositAmount) });
      setStatus({ type: 'info', message: 'Transaction submitted. Waiting for confirmation...' });
      
      await tx.wait();
      setStatus({ type: 'success', message: `Successfully deposited ${depositAmount} ETH!` });
      setDepositAmount('');
      await loadBalances(account);
    } catch (error) {
      setStatus({ type: 'error', message: 'Deposit failed: ' + error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (parseFloat(balance) <= 0) {
      setStatus({ type: 'error', message: 'No funds to withdraw' });
      return;
    }

    try {
      setIsLoading(true);
      setStatus({ type: 'info', message: 'Processing withdrawal...' });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.withdrawAll();
      setStatus({ type: 'info', message: 'Transaction submitted. Waiting for confirmation...' });
      
      await tx.wait();
      setStatus({ type: 'success', message: `Successfully withdrew ${balance} ETH!` });
      await loadBalances(account);
    } catch (error) {
      setStatus({ type: 'error', message: 'Withdrawal failed: ' + error.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          loadBalances(accounts[0]);
        } else {
          setIsConnected(false);
          setAccount('');
        }
      });
    }
  }, );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wallet className="w-12 h-12 text-blue-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              SavingsVault
            </h1>
          </div>
          <p className="text-gray-300 text-lg">Secure, Simple, Self-Custodial Savings on Flow</p>
          <div className="mt-2 text-sm text-gray-400">
            Contract: {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}
          </div>
        </div>

        {/* Status Messages */}
        {status.message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            status.type === 'error' ? 'bg-red-500/20 border border-red-500' :
            status.type === 'success' ? 'bg-green-500/20 border border-green-500' :
            'bg-blue-500/20 border border-blue-500'
          }`}>
            {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span>{status.message}</span>
          </div>
        )}

        {/* Connect Wallet */}
        {!isConnected ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20">
            <Wallet className="w-16 h-16 mx-auto mb-4 text-blue-400" />
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-300 mb-6">Connect to Flow Testnet to start saving</p>
            <button
              onClick={connectWallet}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-3 rounded-lg font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Connecting...' : 'Connect Wallet'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Account Info */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Connected Account</span>
                <span className="text-sm font-mono bg-blue-500/20 px-3 py-1 rounded">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </span>
              </div>
            </div>

            {/* Balance Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-300">Your Savings</span>
                </div>
                <div className="text-4xl font-bold">{parseFloat(balance).toFixed(4)} ETH</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <Wallet className="w-6 h-6 text-purple-400" />
                  <span className="text-gray-300">Total Vault</span>
                </div>
                <div className="text-4xl font-bold">{parseFloat(totalVault).toFixed(4)} ETH</div>
              </div>
            </div>

            {/* Deposit Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <ArrowDownCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold">Deposit ETH</h3>
              </div>
              <div className="flex gap-3">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Amount in ETH"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleDeposit}
                  disabled={isLoading}
                  className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Deposit'}
                </button>
              </div>
            </div>

            {/* Withdraw Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <ArrowUpCircle className="w-6 h-6 text-red-400" />
                <h3 className="text-xl font-bold">Withdraw All</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Withdraw your entire balance of {parseFloat(balance).toFixed(4)} ETH
              </p>
              <button
                onClick={handleWithdraw}
                disabled={isLoading || parseFloat(balance) <= 0}
                className="w-full bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Withdraw All'}
              </button>
            </div>

            {/* Info Banner */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-sm text-gray-300">
              <strong className="text-blue-400">Note:</strong> This is a testnet deployment on Flow. Make sure you're connected to Flow Testnet and have test ETH.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavingsVaultDApp;