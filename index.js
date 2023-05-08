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

window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  const logo = document.getElementById('logo');
  const image = new Image();
  
  image.onload = function() {
    const timeline = gsap.timeline({ onComplete: removePreloader });
    
    timeline
      .from(preloader, { opacity: 1, duration: 1, ease: 'power2.out' })
      .to(preloader, { opacity: 0, duration: 0.5 }, '-=0.5')
      .from(logo, { opacity: 0, scale: 0.5, duration: 0.5 });
    
    preloader.style.display = 'flex';
  };
  
  image.src = 'images/logo.png';

  function removePreloader() {
    // Remove the preloader
    preloader.remove();
  }
});
