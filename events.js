document.addEventListener('DOMContentLoaded', () => {
  const DEBOUNCE_DELAY = 200;

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), delay);
    };
  };

  const initPreloader = () => {
    if (sessionStorage.getItem('preloaderShown') !== 'true') {
      const preloader = document.querySelector('.preloader');
      if (preloader) {
        document.body.classList.add('preloading');
        document.querySelectorAll('.site-header, .hero-section, section, footer').forEach((el) => {
          el.style.display = 'none';
        });

        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          if (progress >= 100) {
            clearInterval(interval);
            preloader.style.opacity = '0';
            setTimeout(() => {
              preloader.style.display = 'none';
              document.body.classList.remove('preloading');
              document.querySelectorAll('.site-header, .hero-section, section, footer').forEach((el) => {
                el.style.display = '';
              });
              sessionStorage.setItem('preloaderShown', 'true');
            }, 300);
          }
        }, 50);
      }
    } else {
      const preloader = document.querySelector('.preloader');
      if (preloader) preloader.style.display = 'none';
      document.body.classList.remove('preloading');
      document.querySelectorAll('.site-header, .hero-section, section, footer').forEach((el) => {
        el.style.display = '';
      });
    }
  };

  const preloadImages = (container) => {
    if (!container) return;
    const images = container.querySelectorAll('img');
    images.forEach((img) => {
      const preloadImg = new Image();
      preloadImg.src = img.src;
      preloadImg.onerror = () => {
        console.warn(`Failed to preload image: ${img.src}`);
        img.src = 'images/fallback.jpg';
      };
    });
  };

  const initMobileMenu = () => {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav-container');
    const dropdowns = document.querySelectorAll('.has-dropdown');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    dropdowns.forEach((dropdown) => {
      const link = dropdown.querySelector('a');
      if (!link) return;

      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('active');
          const submenu = dropdown.querySelector('.dropdown-menu');
          if (submenu) {
            submenu.style.display = dropdown.classList.contains('active') ? 'flex' : 'none';
          }
        }
      });
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && !link.parentElement.classList.contains('has-dropdown')) {
          toggle.classList.remove('active');
          nav.classList.remove('active');
          document.body.classList.remove('no-scroll');
        }
      });
    });
  };

  const initHeaderScroll = () => {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', debounce(() => {
      const currentScroll = window.pageYOffset;
      header.classList.toggle('scrolled', currentScroll > 50);
    }, 50));
  };

  const initSmoothScroll = () => {
    const exploreSpaces = document.querySelector('.hero-content .btn-primary');
    if (exploreSpaces) {
      exploreSpaces.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(exploreSpaces.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    }
  };

  const initTableHighlight = () => {
    const rows = document.querySelectorAll('.capacity-table tbody tr');
    rows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        row.style.background = '#f0f4f8';
      });
      row.addEventListener('mouseleave', () => {
        row.style.background = '';
      });
    });
  };

  const animatedElements = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  animatedElements.forEach(element => observer.observe(element));

  initPreloader();
  preloadImages(document.querySelector('.event-spaces-section'));
  preloadImages(document.querySelector('.amenities-section'));
  initMobileMenu();
  initHeaderScroll();
  initSmoothScroll();
  initTableHighlight();
});

document.body.classList.add('no-scroll');
setTimeout(() => {
  if (!document.body.classList.contains('preloading')) {
    document.body.classList.remove('no-scroll');
  }
}, 1000);