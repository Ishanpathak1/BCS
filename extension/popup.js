import { Core } from '@walletconnect/core';
import { WalletKit } from '@reown/walletkit';
import QRCode from 'qrcode';

let walletKit;

async function connectWallet() {
  try {
    console.log('Attempting to connect wallet...');

    // Fetch the pairing URI from the backend
    console.log('Fetching pairing URI from the backend...');
    const response = await fetch('http://localhost:3000/pairing-uri');
    if (!response.ok) {
      console.error(`Failed to fetch pairing URI. Status: ${response.status}`);
      return;
    }

    const data = await response.json();
    let pairingUri = data.uri;

    // Validate and trim the URI before processing
    if (typeof pairingUri !== 'string' || !pairingUri.trim()) {
      console.error('Invalid pairing URI:', pairingUri);
      return;
    }
    pairingUri = pairingUri.trim(); // Ensure there's no extra whitespace
    console.log(`Received pairing URI: ${pairingUri}`);

    // Detect if the user has a wallet installed (e.g., MetaMask)
    if (window.ethereum) {
      console.log('Wallet detected! Attempting direct connection...');
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log(`Connected wallet address: ${accounts[0]}`);
      document.getElementById('walletInfo').innerHTML = `Connected: <strong>${accounts[0]}</strong>`;
      document.getElementById('qrcode').style.display = 'none'; // Hide the QR code if wallet is connected directly
    } else {
      console.log('No wallet detected, displaying QR code...');

      // Create a canvas element for the QR code
      const qrcodeCanvas = document.createElement('canvas');
      const qrcodeDiv = document.getElementById('qrcode');
      qrcodeDiv.innerHTML = ''; // Clear any existing QR code content
      qrcodeDiv.appendChild(qrcodeCanvas); // Append the canvas to the div

      // Generate the QR code on the canvas
      QRCode.toCanvas(qrcodeCanvas, pairingUri, (error) => {
        if (error) {
          console.error('Error generating QR code:', error);
        } else {
          console.log('QR code generated and displayed successfully.');
        }
      });

      // WalletConnect session events
      walletKit.on('session_proposal', (proposal) => {
        console.log('Session proposal received:', proposal);
        // Log the details of the session proposal
        console.log(`Proposal ID: ${proposal.id}`);
        console.log('Proposed namespaces:', proposal.params.namespaces);
      });

      walletKit.on('session_approved', (session) => {
        console.log('Session approved:', session);
        // Log the approved session details
        console.log('Approved namespaces:', session.namespaces);
        console.log('Session accounts:', session.namespaces.eip155.accounts);
      });

      walletKit.on('session_rejected', (session) => {
        console.error('Session rejected:', session);
      });

      walletKit.on('session_connected', (session) => {
        console.log('Session connected:', session);
      });

      walletKit.on('session_disconnected', (session) => {
        console.error('Session disconnected:', session);
      });

      walletKit.on('session_error', (error) => {
        console.error('Session error:', error);
      });
    }
  } catch (error) {
    console.error('Error connecting wallet:', error);
  }
}

async function initWalletKit() {
  try {
    console.log('Initializing WalletKit...');
    const core = new Core({
      projectId: process.env.WALLET_CONNECT_PROJECT_ID, // Replace with your projectId
    });

    walletKit = await WalletKit.init({
      core,
      metadata: {
        name: 'Demo App',
        description: 'Demo Client as Wallet',
        url: 'https://yourapp.com', // Replace with your actual app URL or extension URL
        icons: [],
      },
    });

    console.log('WalletKit initialized successfully.');
  } catch (error) {
    console.error('Error initializing WalletKit:', error);
  }
}

window.onload = function () {
  console.log('Page loaded. Setting up event listeners.');
  const connectWalletButton = document.getElementById('connectWallet');
  if (connectWalletButton) {
    connectWalletButton.addEventListener('click', connectWallet);
    console.log('Connect Wallet button event listener added.');
  } else {
    console.error('Connect Wallet button not found.');
  }

  // Initialize WalletKit when the page loads
  initWalletKit();
};








































