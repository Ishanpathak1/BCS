// contentScript.js
console.log("Content script running...");

// Example of attaching comment UI to a specific section of a webpage
const targetElement = document.querySelector('body'); // Example: Attach to the body or a specific section

if (targetElement) {
  const commentBox = document.createElement('div');
  commentBox.innerHTML = "<h3>Blockchain Comments</h3><div id='comments'></div>";
  commentBox.style.border = "1px solid #ccc";
  commentBox.style.padding = "10px";
  targetElement.appendChild(commentBox);
}

  
  