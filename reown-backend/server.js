require('dotenv').config();
const { Core } = require('@walletconnect/core');
const express = require('express');
const cors = require('cors'); // Enable CORS for the frontend requests

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Access the project ID from environment variables
const projectId = process.env.WALLET_CONNECT_PROJECT_ID;

if (!projectId) {
    throw new Error('Missing WALLET_CONNECT_PROJECT_ID in environment variables');
}

// Initialize the Core with your projectId
const core = new Core({
    projectId: projectId
});

// Properly initialize the core instance before generating the pairing URI
async function initializeCore() {
    try {
        await core.start(); // Ensure the core is initialized
        console.log('Core initialized successfully');
    } catch (error) {
        console.error('Error initializing Core:', error);
    }
}

// Generate a pairing URI
async function generatePairingURI() {
    try {
        const { uri } = await core.pairing.create();
        console.log('Pairing URI generated:', uri);  // Log the pairing URI in the terminal
        return uri;
    } catch (error) {
        console.error('Error generating pairing URI:', error);
    }
}

app.get('/pairing-uri', async (req, res) => {
    const pairingUri = await generatePairingURI();
    if (pairingUri) {
        console.log('Sent pairing URI to client.');
        res.json({ uri: pairingUri });  // Send as JSON
    } else {
        console.error('Failed to generate pairing URI.');
        res.status(500).json({ error: 'Failed to generate pairing URI' });
    }
});

// Start the server
app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
    // Initialize the Core before trying to create a pairing
    await initializeCore();
    // Call the function to generate and log the pairing URI
    await generatePairingURI();
});





