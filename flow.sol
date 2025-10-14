// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title Simple Savings Vault (no imports, no constructor, no input params)
/// @notice Deposit ETH and withdraw your entire saved balance. All functions use no parameters.
contract SavingsVault {
    // owner is set at contract creation time (inline assignment uses the deployer's msg.sender)
    address public owner = msg.sender;

    // user balances inside the vault (tracked in wei)
    mapping(address => uint256) private balances;

    // simple reentrancy guard
    bool private locked;

    // Events
    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);

    // Modifier: prevent reentrancy
    modifier nonReentrant() {
        require(!locked, "Reentrant call");
        locked = true;
        _;
        locked = false;
    }

    // Modifier: only owner (owner set inline, no constructor)
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    /// @notice Deposit ETH into the vault (no input params). Use payable.
    function deposit() external payable {
        require(msg.value > 0, "Send ETH to deposit");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    /// @notice Withdraw your entire saved balance (no input params).
    /// Uses checks-effects-interactions and nonReentrant guard.
    function withdrawAll() external nonReentrant {
        uint256 userBal = balances[msg.sender];
        require(userBal > 0, "No balance to withdraw");

        // effects
        balances[msg.sender] = 0;

        // interaction
        (bool sent, ) = payable(msg.sender).call{value: userBal}("");
        require(sent, "ETH transfer failed");

        emit Withdraw(msg.sender, userBal);
    }

    /// @notice Payable receive: accept direct ETH transfers and credit sender's vault balance
    receive() external payable {
        require(msg.value > 0, "No ETH sent");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    /// @notice Fallback: reject non-empty calls without data
    fallback() external {
        revert("Use deposit() or send ETH directly");
    }

    /// @notice View your vault balance (no input params) — balance tracked in contract mapping
    function getMyBalance() external view returns (uint256) {
        return balances[msg.sender];
    }

    /// @notice View total ETH held by the vault (contract balance)
    function totalVaultBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /// @notice Optional: let owner change ownership (no constructor, but this function has no input params,
    /// so it transfers ownership to the caller — which must already be owner; this allows "renounce" style)
    /// NOTE: This function intentionally takes no inputs — it simply renounces ownership by setting owner to address(0).
    function renounceOwnership() external onlyOwner {
        owner = address(0);
    }
}
