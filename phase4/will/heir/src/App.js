import './App.css';
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

// 스마트 계약의 ABI 배열
const abi = [{"inputs":[],"stateMutability":"payable","type":"constructor"},{"inputs":[{"internalType":"address payable","name":"wallet","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setInheritance","outputs":[],"stateMutability":"nonpayable","type":"function"}];

function App() {
  const [contract, setContract] = useState(undefined);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(undefined);
  const [currentBalance, setCurrentBalance] = useState(undefined);
  const [inheritanceWallet, setInheritanceWallet] = useState("");
  const [inheritanceAmount, setInheritanceAmount] = useState("");

  const contractAddress = "0x716CbE5E0DA18fC75A607f3589D1b967106B94c1"; // 스마트 계약의 주소

  const connectWallet = useCallback(async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        setContract(contract);
        const address = await signer.getAddress();
        setWalletAddress(address);
        const balance = await provider.getBalance(address);
        setCurrentBalance(balance);
      } else {
        alert("Please install MetaMask");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setInheritance = async () => {
    try {
      const wallet = inheritanceWallet.trim(); // 상속할 가족의 지갑 주소
      const amount = ethers.utils.parseEther(inheritanceAmount.trim()); // 상속할 금액
      const tx = await contract.setInheritance(wallet, amount);
      await tx.wait();
      console.log("Inheritance set successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      setInheritance();
    }
  }, [isConnected]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Inheritance Contract</h1>
        {isConnected ? (
          <div>
            <p>Connected Wallet: {walletAddress}</p>
            <p>Current Balance: {currentBalance && ethers.utils.formatEther(currentBalance)} ETH</p>
            <input
              type="text"
              value={inheritanceWallet}
              onChange={(e) => setInheritanceWallet(e.target.value)}
              placeholder="Enter inheritance wallet address"
            />
            <p></p>
            <input
              type="text"
              value={inheritanceAmount}
              onChange={(e) => setInheritanceAmount(e.target.value)}
              placeholder="Enter inheritance amount"
            />
            <p></p>
            <button onClick={setInheritance}>Set Inheritance</button>
          </div>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </header>
    </div>
  );
}

export default App;
