function contactUsSection() {
    const textContainer = document.querySelector('.text-container');
    const textNodes = textContainer.querySelectorAll('span');
  
    // Clone the text elements and append them to the container
    textNodes.forEach(node => textContainer.appendChild(node.cloneNode(true)));
  
    // Start the animation
    textContainer.style.animationPlayState = 'running';
  }
  
  function navigationButton() {
    const navButton = document.getElementById('navButton');
    const menu = document.getElementById('menu');
    const links = menu.getElementsByTagName('a');
  
    navButton.addEventListener('click', function() {
      navButton.classList.toggle('active');
      menu.classList.toggle('active');
    });
  
    Array.from(links).forEach(function(link) {
      link.addEventListener('click', function() {
        navButton.classList.remove('active');
        menu.classList.remove('active');
      });
    });
  }
  
  navigationButton();