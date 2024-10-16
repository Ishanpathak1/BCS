const projectId = 'YOUR_WALLET_CONNECT_PROJECT_ID'; // Replace with your WalletConnect Project ID

// Initialize Web3Modal
const web3Modal = new Web3Modal.default({
  cacheProvider: true, // Optional to keep the session
});

let provider;
let signer;
let commentContract;
let connectedWalletAddress = null;

// Replace the ABI and contract address with your values
const contractABI = [/* Your ABI goes here */];
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

async function connectWallet() {
  try {
    const instance = await web3Modal.connect();
    provider = new ethers.providers.Web3Provider(instance);
    signer = provider.getSigner();
    connectedWalletAddress = await signer.getAddress();

    // Update UI with wallet info
    document.getElementById('walletInfo').innerHTML = `Connected: <strong>${connectedWalletAddress}</strong>`;
    document.getElementById('commentSection').style.display = 'block';
    document.getElementById('commentInputSection').style.display = 'block';

    // Initialize the contract
    commentContract = new ethers.Contract(contractAddress, contractABI, signer);

    // Fetch comments
    await fetchComments();
  } catch (error) {
    console.error('Failed to connect wallet:', error);
  }
}

async function fetchComments() {
  try {
    const urlHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(window.location.href));
    const comments = await commentContract.getComments(urlHash);

    const commentSection = document.getElementById('commentSection');
    commentSection.innerHTML = '';  // Clear previous comments

    if (comments.length > 0) {
      comments.forEach((commentHash, index) => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `<p><strong>Comment ${index + 1}</strong>: ${commentHash}</p>`;
        commentSection.appendChild(commentDiv);
      });
    } else {
      commentSection.innerText = 'No comments for this page.';
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
}

async function submitComment() {
  const newComment = document.getElementById('newComment').value;
  if (newComment.trim() === "") return alert("Comment cannot be empty");

  const submitButton = document.getElementById('submitComment');
  submitButton.innerText = 'Submitting...'; // Loading state

  try {
    const urlHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(window.location.href));
    const commentHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(newComment));

    await commentContract.addComment(urlHash, commentHash);

    // Reset input
    document.getElementById('newComment').value = '';
    alert('Comment added successfully!');

    // Fetch updated comments
    await fetchComments();
  } catch (error) {
    console.error('Error submitting comment:', error);
    alert('Failed to submit the comment.');
  } finally {
    submitButton.innerText = 'Submit Comment';  // Reset button text
  }
}

window.onload = function() {
  document.getElementById('connectWallet').addEventListener('click', connectWallet);
  document.getElementById('submitComment').addEventListener('click', submitComment);
};





