import { Core } from '@walletconnect/core';
import { WalletKit } from '@reown/walletkit';

// Initialize Core with your WalletConnect Project ID from .env
const core = new Core({
  projectId: process.env.WALLET_CONNECT_PROJECT_ID, // Loaded from .env file using dotenv-webpack
});

// Metadata for your application
const metadata = {
  name: 'Blockchain Comment System',
  description: 'Decentralized comment system for websites',
  url: 'https://localhost', // Set as localhost for development or replace with your domain if hosted
  icons: ['images/BlockchainCommentIcon_128x128.png'], // Local icon image for the extension
};

// Initialize WalletKit
async function initWalletKit() {
  try {
    const walletKit = await WalletKit.init({
      core, // Pass the core instance
      metadata,
    });
    console.log('WalletKit initialized successfully:', walletKit);
    return walletKit;
  } catch (error) {
    console.error('Error initializing WalletKit:', error);
  }
}

// Connect to the wallet
async function connectWallet() {
  const walletKit = await initWalletKit();
  if (walletKit) {
    try {
      const walletConnection = await walletKit.connect(); // Initiates wallet connection
      console.log('Wallet connected:', walletConnection);
      document.getElementById('walletInfo').innerHTML = `Connected: <strong>${walletConnection.accounts[0].address}</strong>`;
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  }
}

// Event listener for the Connect Wallet button
window.onload = function () {
  document.getElementById('connectWallet').addEventListener('click', connectWallet);
};











