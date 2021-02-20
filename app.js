//
// loader
//
function initLoader() {
  const loader = document.querySelector('.loader');
  const loaderInner = document.querySelector('.loader .inner');
  const progressBar = document.querySelector('.loader .progress');
  const loaderMask = document.querySelector('.loader__mask');
  // Show loader on page load
  gsap.set(loader, { autoAlpha: 1 });
  // Scale loader down
  gsap.set(loaderInner, { scaleY: 0.005, transformOrigin: 'bottom' });

  const tlLoaderIn = gsap.timeline({
    defaults: {
      duration: 1.1,
      ease: 'power2.out',
    },
    onComplete: () =>
      document.querySelector('body').classList.remove('is--loading'),
  });

  const image = document.querySelector('.loader__image img');
  const mask = document.querySelector('.loader__image--mask');
  const line1 = document.querySelector(
    '.loader__title--mask:nth-child(1) span'
  );
  const line2 = document.querySelector(
    '.loader__title--mask:nth-child(2) span'
  );
  const lines = document.querySelectorAll('.loader__title--mask');
  const loaderContent = document.querySelector('.loader__content');

  tlLoaderIn
    .set(loaderContent, { autoAlpha: 1 })
    .to(
      loaderInner,
      {
        scaleY: 1,
        transformOrigin: 'bottom',
        ease: 'power1.inOut',
      },
      0.2
    )
    .addLabel('revealImage')
    .from(mask, { yPercent: 100 }, 'revealImage-=0.6')
    .to(image, { yPercent: 0 }, 'revealImage-=0.6')
    .from([line1, line2], { yPercent: 100, stagger: 0.1 }, 'revealImage-=0.6');

  const tlLoaderOut = gsap.timeline({
    defaults: {
      duration: 1.2,
      ease: 'power2.inOut',
    },
    delay: 0.2,
    onComplete: () => {
      console.log('yes');
    },
  });

  const tlLoader = gsap.timeline();
  tlLoader.add(tlLoaderIn);
  tlLoader.add(tlLoaderOut);

  tlLoaderOut.to(lines, { yPercent: -500, stagger: 0.1 }, 0);
  tlLoaderOut
    .to([loader, loaderContent], { yPercent: -100 }, 0.2)
    .from('#main-content', { y: 150 }, 0);
}
initLoader();
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
        start: 'top 80%',
        onEnter: () => {
          gsap.to(el, { y: 0, autoAlpha: 1, ease: 'none' });
        },
      });
    } else if (window.innerWidth < 1024) {
      gsap.set(el, { y: 50, autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',

        onEnter: () => {
          gsap.to(el, { y: 0, autoAlpha: 1, ease: 'none' });
        },
      });
    }
  });
}
revealScroll();
