document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.footer__nav')) {
    const accordions = document.querySelector('.footer__nav').querySelectorAll('.accordion');

    accordions.forEach((accordion) => {
      const button = accordion.querySelector('.accordion__button');
      const content = accordion.querySelector('.accordion__content');

      button.addEventListener('click', () => {
        const isActive = button.classList.contains('accordion__button--active');

        accordions.forEach((item) => {
          item.classList.remove('accordion--active');

          item.querySelector('.accordion__button').classList.remove('accordion__button--active');

          item.querySelector('.accordion__content').removeAttribute('style');
        });

        if (!isActive) {
          accordion.classList.add('accordion--active');
          button.classList.add('accordion__button--active');
          content.style.height = `${content.scrollHeight}px`;
        }
      });
    });
  }

  if (document.querySelector('.header__burger')) {
    document.querySelector('.header__burger').addEventListener('click', () => {
      document.body.style.overflow = 'hidden';
      document.querySelector('.burger-menu').style.transform = 'scale(1, 1)';
    });
  }

  if (document.querySelector('.burger-menu')) {
    const accordions = document.querySelector('.burger-menu').querySelectorAll('.accordion');

    document
      .querySelector('.burger-menu')
      .querySelector('.burger-menu__close')
      .addEventListener('click', () => {
        document.body.removeAttribute('style');
        document.querySelector('.burger-menu').removeAttribute('style');
      });

    accordions.forEach((accordion) => {
      const button = accordion.querySelector('.accordion__button');
      const content = accordion.querySelector('.accordion__content');

      accordions[0].classList.add('accordion--active');
      accordions[0].querySelector('.accordion__button').classList.add('accordion__button--active');
      accordions[0].querySelector('.accordion__content').style.height = `${content.scrollHeight}px`;

      button.addEventListener('click', () => {
        const isActive = button.classList.contains('accordion__button--active');

        accordions.forEach((item) => {
          item.classList.remove('accordion--active');

          item.querySelector('.accordion__button').classList.remove('accordion__button--active');

          item.querySelector('.accordion__content').removeAttribute('style');
        });

        if (!isActive) {
          accordion.classList.add('accordion--active');
          button.classList.add('accordion__button--active');
          content.style.height = `${content.scrollHeight}px`;
        }
      });
    });
  }

  for (const openPopup of document.querySelectorAll('.open-popup')) {
    openPopup.addEventListener('click', () => {
      document.querySelector('.popup').style.display = 'flex';
    });
  }

  if (document.querySelector('.popup')) {
    document.querySelector('.popup .popup__close').addEventListener('click', () => {
      document.querySelector('.popup').removeAttribute('style');
    });
  }

  if (document.querySelector('.cookie')) {
    for (const cookieClose of document.querySelectorAll('.cookie-close')) {
      cookieClose.addEventListener('click', () => {
        document.querySelector('.cookie').remove();
      });
    }
  }

  const sections = document.querySelectorAll(
    '.tools, .questions, .team, .plan, .social, .practical',
    'policy',
  );

  if (!sections.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    sections.forEach((section) => {
      section.classList.add('is-visible');
    });

    return;
  }

  const isMobile = window.matchMedia('(max-width: 700px)');

  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const section = entry.target;
        section.classList.add('is-visible');
        observer.unobserve(section);
      });
    },
    {
      threshold: isMobile.matches ? 0.2 : 0.3,
      rootMargin: '0px 0px -5% 0px',
    },
  );

  const practicalSection = document.querySelector('.practical');

  if (practicalSection) {
    const practicalCounters = practicalSection.querySelectorAll('.practical__info li p');

    const counterValues = [120, 15, 250];
    const counterSuffixes = ['+', '', '+'];

    let countersStarted = false;

    const animateCounter = (element, target, suffix = '', duration = 1100) => {
      const startTime = performance.now();

      const easeOutCubic = (progress) => {
        return 1 - Math.pow(1 - progress, 3);
      };

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);

        const currentValue = Math.floor(target * easedProgress);

        element.textContent = `${currentValue}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = `${target}${suffix}`;
        }
      };

      requestAnimationFrame(updateCounter);
    };

    const startPracticalCounters = () => {
      if (countersStarted) return;

      countersStarted = true;

      practicalCounters.forEach((counter, index) => {
        animateCounter(counter, counterValues[index], counterSuffixes[index], 1100);
      });
    };

    const practicalObserver = new MutationObserver(() => {
      if (!practicalSection.classList.contains('is-visible')) return;

      practicalObserver.disconnect();

      setTimeout(() => {
        startPracticalCounters();
      }, 1000);
    });

    practicalObserver.observe(practicalSection, {
      attributes: true,
      attributeFilter: ['class'],
    });

    if (practicalSection.classList.contains('is-visible')) {
      setTimeout(() => {
        startPracticalCounters();
      }, 1000);
    }
  }

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
});
