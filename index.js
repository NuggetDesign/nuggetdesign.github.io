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

  const tl = gsap.timeline({ paused: true });

  tl.to(menu, { height: '100%', duration: 0 });
  tl.fromTo(
    menu,
    { opacity: 0, paddingTop: 0, paddingBottom: 0 },
    { opacity: 1, paddingTop: '64px', paddingBottom: '16px', duration: 0.3, ease: 'power2.out' }
  );
  tl.fromTo(
    menu,
    { clipPath: 'inset(0 0 100% 0)' },
    { clipPath: 'inset(0 0 0% 0)', duration: 0.3, ease: 'power2.out' }
  );

  navButton.addEventListener('click', function() {
    navButton.classList.toggle('active');
    menu.classList.toggle('active');

    if (menu.classList.contains('active')) {
      menu.style.height = '0';
      menu.style.visibility = 'visible';
      menu.style.clipPath = 'inset(0 0 100% 0)';
      tl.play();
    } else {
      tl.reverse().then(() => {
        menu.style.height = '0';
        menu.style.visibility = 'hidden';
      });
    }
  });

  Array.from(links).forEach(function(link) {
    link.addEventListener('click', function() {
      navButton.classList.remove('active');
      menu.classList.remove('active');
      tl.reverse().then(() => {
        menu.style.height = '0';
        menu.style.visibility = 'hidden';
      });
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
  
  image.src = '/images/logo.png';

  function removePreloader() {
    // Remove the preloader
    preloader.remove();
  }
});
