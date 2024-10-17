async function connectWallet() {
  try {
    console.log('Attempting to connect wallet...');
    
    // Fetch the pairing URI from the backend
    const response = await fetch('http://localhost:3000/pairing-uri');
    const data = await response.json();
    
    const pairingUri = data.uri;
    console.log(`Received pairing URI: ${pairingUri}`);

    // Detect if the user has a wallet installed (e.g., MetaMask)
    if (window.ethereum) {
      console.log('Wallet detected! Attempting direct connection...');
      // Requesting access to Ethereum accounts from the user's wallet (like MetaMask)
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log(`Connected wallet address: ${accounts[0]}`);
      // Display the connected wallet's address in the UI
      document.getElementById('walletInfo').innerHTML = `Connected: <strong>${accounts[0]}</strong>`;
      document.getElementById('qrcode').style.display = 'none'; // Hide the QR code if wallet is connected directly
    } else {
      console.log('No wallet detected, displaying QR code...');
      
      // If no wallet is detected, generate and display the QR code for the pairing URI
      const qrcodeDiv = document.getElementById('qrcode');
      qrcodeDiv.innerHTML = ''; // Clear previous QR code if any
      const qrCode = new QRCode(qrcodeDiv, {
        text: pairingUri,
        width: 300,
        height: 300
      });
    }
  } catch (error) {
    console.error('Error connecting wallet:', error);
  }
}

window.onload = function () {
  console.log('Page loaded. Setting up event listeners.');
  
  // Find the "Connect Wallet" button and set up an event listener for it
  const connectWalletButton = document.getElementById('connectWallet');
  if (connectWalletButton) {
    connectWalletButton.addEventListener('click', connectWallet);
    console.log('Connect Wallet button event listener added.');
  } else {
    console.error('Connect Wallet button not found.');
  }
};






















