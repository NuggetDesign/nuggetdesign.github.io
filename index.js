const textContainer = document.querySelector('.text-container');
const textNodes = textContainer.querySelectorAll('span');

// Clone the text elements and append them to the container
textNodes.forEach(node => textContainer.appendChild(node.cloneNode(true)));

// Start the animation
textContainer.style.animationPlayState = 'running';