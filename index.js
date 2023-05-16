function contactUsSection() {
  const textContainer = document.querySelector('scroll-effect');
  const textNodes = textContainer.querySelectorAll('p');

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
      menu.style.height = '';
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

// Add click event listener to the scroll-up button for desktop
const scrollUpButtonDesktop = document.getElementById('scrollUpButtonDesktop');
scrollUpButtonDesktop.addEventListener('click', () => {
  scrollToTop(500, easeOutQuad);
});

// Add click event listener to the scroll-up button for mobile
const scrollUpButtonMobile = document.getElementById('scrollUpButtonMobile');
scrollUpButtonMobile.addEventListener('click', () => {
  scrollToTop(500, easeOutQuad);
});

function scrollToTop(duration, easing) {
  const start = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  const to = 0;
  const startTime = performance.now();
  const scrollContainer = document.scrollingElement || document.documentElement;

  function scrollAnimation(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easing(progress);
    const scrollToTop = start + (to - start) * easeProgress;
    scrollContainer.scrollTop = scrollToTop;

    if (elapsed < duration) {
      requestAnimationFrame(scrollAnimation);
    }
  }

  requestAnimationFrame(scrollAnimation);
}

// Easing function: easeOutQuad
function easeOutQuad(t) {
  return t * (2 - t);
}


// Add your other JavaScript code here


  const wrapper = document.querySelector(".wrapper");
  const boxes = gsap.utils.toArray(".box");

  const loop = horizontalLoop(boxes, { paused: true });

  boxes.forEach((box, i) => box.addEventListener("click", () =>
    loop.toIndex(i, { duration: 0.8, ease: "power1.inOut" })
  ));

  document.querySelector(".toggle").addEventListener("click", () => wrapper.classList.toggle("show-overflow"));
  document.querySelector(".next").addEventListener("click", () => loop.next({ duration: 0.4, ease: "power1.inOut" }));
  document.querySelector(".prev").addEventListener("click", () => loop.previous({ duration: 0.4, ease: "power1.inOut" }));

  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      xPercents = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      totalWidth, curX, distanceToStart, distanceToLoop, item, i;
    gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
      xPercent: (i, el) => {
        let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
        xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
        return xPercents[i];
      }
    });
    gsap.set(items, {x: 0});
    totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
      item = items[i];
      curX = xPercents[i] / 100 * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
      tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
        .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
        .add("label" + i, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index, vars) {
      vars = vars || {};
      (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
        vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }
    tl.next = vars => toIndex(curIndex+1, vars);
    tl.previous = vars => toIndex(curIndex-1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    return tl;
  }