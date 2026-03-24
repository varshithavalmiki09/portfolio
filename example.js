(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear() + ' |';

  const nav = document.querySelector('nav');
  if (nav) {
    const toggleScrolled = () => nav.classList.toggle('scrolled', window.scrollY > 18);
    toggleScrolled();
    window.addEventListener('scroll', toggleScrolled, { passive: true });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'example.html';
  document.querySelectorAll('nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  const revealNodes = document.querySelectorAll('.reveal');
  if (prefersReducedMotion) {
    revealNodes.forEach((node) => node.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealNodes.forEach((node, index) => {
      node.style.setProperty('--reveal-delay', `${Math.min(index * 45, 260)}ms`);
      observer.observe(node);
    });
  }

  if (!prefersReducedMotion && window.innerWidth > 900) {
    const interactiveCards = document.querySelectorAll('.card, .list-card, .about-panel, .softskill-card, .focus-card');
    interactiveCards.forEach((card) => {
      card.classList.add('card-interactive');

      card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rx = ((y / rect.height) - 0.5) * -6;
        const ry = ((x / rect.width) - 0.5) * 8;
        card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    const orbs = document.querySelectorAll('.orb');
    if (orbs.length) {
      window.addEventListener('mousemove', (event) => {
        const nx = (event.clientX / window.innerWidth) - 0.5;
        const ny = (event.clientY / window.innerHeight) - 0.5;
        orbs.forEach((orb, idx) => {
          const factor = idx === 0 ? 16 : 10;
          orb.style.transform = `translate(${(nx * factor).toFixed(1)}px, ${(ny * factor).toFixed(1)}px)`;
        });
      }, { passive: true });
    }
  }

  const typewriterEl = document.querySelector('.typewriter');
  if (typewriterEl) {
    const fullText = 'Data Scientist Enthusiast';
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseDelay = 900;
    let index = 0;
    let forward = true;

    const tick = () => {
      typewriterEl.textContent = fullText.slice(0, index);

      if (forward) {
        if (index < fullText.length) {
          index += 1;
          setTimeout(tick, typeSpeed);
        } else {
          forward = false;
          setTimeout(tick, pauseDelay);
        }
      } else {
        if (index > 0) {
          index -= 1;
          setTimeout(tick, deleteSpeed);
        } else {
          forward = true;
          setTimeout(tick, pauseDelay);
        }
      }
    };

    tick();
  }
})();
