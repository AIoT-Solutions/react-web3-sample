import React, { useState } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import "./mint.css";
const ethers = require("ethers");

// Replace with your smart contract ABI
const contractABI = [];
// Replace with your smart contract address
const contractAddress = "0x...";
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        137: "https://matic-mainnet.chainstacklabs.com",
      },
      infuraId: "YOUR_INFURA_ID", // Replace with your Infura project ID
    },
  },
};
const web3Modal = new Web3Modal({
  network: "matic",
  cacheProvider: true,
  providerOptions,
});
const MintNFT = () => {
  const [provider, setProvider] = useState(null);
  const [customerWalletID, setCustomerWalletID] = useState("");
  const [referralWalletID, setReferralWalletID] = useState("");
  const [tokinTokenAmount, setTokinTokenAmount] = useState(0);
  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      setProvider(new ethers.providers.Web3Provider(provider));
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };
  const mintToken = async () => {
    if (!provider) {
      console.error("Connect a wallet first.");
      return;
    }
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    try {
      const transaction = await contract.mint_token(
        customerWalletID,
        referralWalletID,
        tokinTokenAmount
      );
      await transaction.wait();
      console.log("NFT minted successfully");
    } catch (error) {
      console.error("Failed to mint NFT:", error);
    }
  };
  return (
    <div>
      <h1>Mint NFT</h1>
      {!provider && (
        <button onClick={connectWallet}>
          Connect Wallet (MetaMask or WalletConnect)
        </button>
      )}{" "}
      {provider && (
        <>
          <label>
            {" "}
            Customer Wallet ID:
            <input
              type="text"
              value={customerWalletID}
              onChange={(e) => setCustomerWalletID(e.target.value)}
            />
          </label>
          <label>
            {" "}
            Referral Wallet ID:
            <input
              type="text"
              value={referralWalletID}
              onChange={(e) => setReferralWalletID(e.target.value)}
            />
          </label>
          <label>
            {" "}
            Tokin Token Amount:
            <input
              type="number"
              value={tokinTokenAmount}
              onChange={(e) => setTokinTokenAmount(parseInt(e.target.value))}
            />
          </label>
          <button onClick={mintToken}>Mint NFT</button>
        </>
      )}{" "}
    </div>
  );
};
export default MintNFT;
