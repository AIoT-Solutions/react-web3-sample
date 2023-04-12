import React from "react";
import "./dashboard.css";
const Dashboard = () => {
  // Example data, replace with actual data from your smart contract or backend API
  const totalNFTsMinted = 100;
  const totalTokinTokensLoaded = 5000;
  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <h2>{totalNFTsMinted}</h2>
          <p>Total NFTs Minted</p>
        </div>

        <div className="dashboard-stat">
          <h2>{totalTokinTokensLoaded}</h2>
          <p>Total Tokin Tokens Loaded</p>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
