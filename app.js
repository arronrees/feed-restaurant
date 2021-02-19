//
// nav slide
//
let navOpen = false;
function navSlide() {
  const burger = document.querySelector('.header__burger');
  const nav = document.querySelector('.navbar');
  const navItems = document.querySelectorAll('.nav__item');
  const body = document.body;
  const lines = gsap.utils.toArray('.burger__line');

  // sets nav off screen initally
  gsap.set(nav, { xPercent: -100 });
  gsap.set(navItems, { xPercent: -100 });

  // call function depending on navOpen state
  burger.addEventListener('click', () => {
    if (!navOpen) {
      body.style.overflowY = 'hidden';
      openNav(nav, navItems, lines);
    } else {
      body.style.overflowY = 'auto';
      closeNav(nav, navItems, lines);
    }
  });
}
function openNav(nav, navItems, lines) {
  navOpen = !navOpen;
  const openTl = gsap.timeline({
    defaults: { duration: 1, ease: 'power1.inOut' },
  });

  openTl
    .to(nav, { xPercent: 0 })
    .to(navItems, { stagger: 0.2, xPercent: 0 }, 0.2)
    .to(
      lines[0],
      {
        duration: 0.2,
        rotate: -45,
        translateY: 12.5,
      },
      0
    )
    .to(
      lines[2],
      {
        duration: 0.2,
        rotate: 45,
        translateY: -12.5,
      },
      0
    )
    .to(
      lines[1],
      {
        duration: 0.2,
        autoAlpha: 0,
        xPercent: 100,
      },
      0
    );
}
function closeNav(nav, navItems, lines) {
  navOpen = !navOpen;
  const closeTl = gsap.timeline({
    defaults: { duration: 0.8, ease: 'power1.inOut' },
  });

  closeTl
    .to(navItems, { stagger: 0.05, xPercent: -50 })
    .to(nav, { xPercent: -100 }, 0.3)
    .to(
      lines[0],
      {
        duration: 0.2,
        rotate: 0,
        translateY: 0,
      },
      0
    )
    .to(
      lines[2],
      {
        duration: 0.2,
        rotate: 0,
        translateY: -0,
      },
      0
    )
    .to(
      lines[1],
      {
        duration: 0.2,
        autoAlpha: 1,
        xPercent: 0,
      },
      0
    );
}
if (window.innerWidth < 1024) {
  navSlide();
}
//
// nav underline on hover
//
function navItemUnderline() {
  const navItems = gsap.utils.toArray('.nav__menu a');
  navItems.forEach((item) => {
    item.addEventListener('mouseleave', (e) => {
      // Add class
      item.classList.add('animate-out');
    });
    // Remove class
    item.ontransitionend = () => {
      //remove class
      item.classList.remove('animate-out');
    };
  });
}
navItemUnderline();
//
// image parallaxscroll
//
function imageParallaxScroll() {
  const images = gsap.utils.toArray('img');

  images.forEach((img) => {
    gsap.to(img, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        scrub: true,
      },
    });
  });
}
imageParallaxScroll();
//
// reveal items on scroll
//
function revealScroll() {
  const triggers = document.querySelectorAll('.trigger');

  triggers.forEach((el) => {
    if (!el.className.includes('btn--menu')) {
      gsap.set(el, { y: 50, autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(el, { y: 0, autoAlpha: 1, ease: 'none' });
        },
      });
    } else if (window.innerWidth < 1024) {
      gsap.set(el, { y: 50, autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(el, { y: 0, autoAlpha: 1, ease: 'none' });
        },
      });
    }
  });
}
revealScroll();
