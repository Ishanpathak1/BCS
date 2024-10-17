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

      const data = await response.json();  // Parse the response as JSON
      const pairingUri = data.uri;         // Extract the URI
      console.log(`Received pairing URI: ${pairingUri}`);

      // Detect if the user has a wallet installed (e.g., MetaMask)
      if (window.ethereum) {
          console.log('Wallet detected! Attempting direct connection...');
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log(`Connected wallet address: ${accounts[0]}`);
          document.getElementById('walletInfo').innerHTML = `Connected: <strong>${accounts[0]}</strong>`;
          document.getElementById('qrcode').style.display = 'none'; // Hide QR code if wallet is connected
      } else {
          console.log('No wallet detected, displaying QR code...');
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
  const connectWalletButton = document.getElementById('connectWallet');
  if (connectWalletButton) {
      connectWalletButton.addEventListener('click', connectWallet);
      console.log('Connect Wallet button event listener added.');
  } else {
      console.error('Connect Wallet button not found.');
  }
};


























