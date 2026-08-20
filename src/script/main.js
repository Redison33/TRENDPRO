document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll(
    '.tools, .questions, .team, .plan, .social, .practical',
  );

  if (!sections.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    sections.forEach((section) => {
      section.classList.add('is-visible');
    });

    return;
  }

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
      threshold: 0.3,
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

  if (document.querySelector('.header__burger')) {
    document.querySelector('.header__burger').addEventListener('click', () => {
      document.querySelector('.burger-menu').style.transform = 'scale(1)';
    });
  }

  if (document.querySelector('.burger-menu')) {
    const accordions = document.querySelector('.burger-menu').querySelectorAll('.accordion');

    document
      .querySelector('.burger-menu')
      .querySelector('.burger-menu__close')
      .addEventListener('click', () =>
        document.querySelector('.burger-menu').removeAttribute('style'),
      );

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

  if (document.querySelector('.tools')) {
    const tools = document.querySelector('.tools');
    const decorLarge = tools.querySelector('.tools__decor-2');
    const decorCube = tools.querySelector('.tools__decor-1');

    if (decorLarge && decorCube) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

      if (!prefersReducedMotion.matches) {
        let targetX = 0;
        let targetY = 0;

        let currentLargeX = 0;
        let currentLargeY = 0;

        let currentCubeX = 0;
        let currentCubeY = 0;

        let animationFrame = null;

        const animate = () => {
          currentLargeX += (targetX * 10 - currentLargeX) * 0.08;
          currentLargeY += (targetY * 10 - currentLargeY) * 0.08;

          currentCubeX += (targetX * 15 - currentCubeX) * 0.08;
          currentCubeY += (targetY * 15 - currentCubeY) * 0.08;

          decorLarge.style.transform = `translate3d(${currentLargeX}px, ${currentLargeY}px, 0)`;
          decorCube.style.transform = `translate3d(${currentCubeX}px, ${currentCubeY}px, 0)`;

          const isMoving =
            Math.abs(targetX * 10 - currentLargeX) > 0.01 ||
            Math.abs(targetY * 10 - currentLargeY) > 0.01 ||
            Math.abs(targetX * 15 - currentCubeX) > 0.01 ||
            Math.abs(targetY * 15 - currentCubeY) > 0.01;

          if (isMoving) {
            animationFrame = requestAnimationFrame(animate);
          } else {
            animationFrame = null;
          }
        };

        const handleMouseMove = (event) => {
          const rect = tools.getBoundingClientRect();

          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;

          targetX = (x - 0.5) * 2;
          targetY = (y - 0.5) * 2;

          if (!animationFrame) {
            animationFrame = requestAnimationFrame(animate);
          }
        };

        const resetParallax = () => {
          targetX = 0;
          targetY = 0;

          if (!animationFrame) {
            animationFrame = requestAnimationFrame(animate);
          }
        };

        tools.addEventListener('mousemove', handleMouseMove);
        tools.addEventListener('mouseleave', resetParallax);
      }
    }
  }

  if (document.querySelector('.team')) {
    const team = document.querySelector('.team');

    const details = document.querySelectorAll('.card__profile');
    const tabs = document.querySelectorAll('.slide__profile');

    tabs.forEach((tab, index) => {
      tab.querySelector('.img-container').addEventListener('click', () => {
        tabs.forEach((tab) => {
          tab.classList.remove('slide__profile--active');
        });

        details.forEach((detail) => {
          detail.classList.remove('profile--active');
        });

        tab.classList.add('slide__profile--active');

        if (details[index]) {
          details[index].classList.add('profile--active');
        }
      });
    });
  }

  if (document.querySelector('.questions')) {
    const questions = document.querySelector('.questions');
    const tabs = questions.querySelector('.questions__tabs');
    const contents = questions.querySelector('.questions__content');

    for (const [index, tab] of tabs.querySelectorAll('.tab').entries()) {
      tab.addEventListener('click', () => {
        for (const ostTab of tabs.querySelectorAll('.tab')) {
          ostTab.classList.remove('tab--active');
        }

        for (const block of contents.querySelectorAll('.tab-block')) {
          block.classList.remove('tab-block--active');
        }

        tab.classList.add('tab--active');
        contents.querySelectorAll('.tab-block')[index].classList.add('tab-block--active');
      });
    }
  }

  if (document.querySelector('.video')) {
    const contents = document.querySelector('.video');

    contents.querySelector('.video-play').addEventListener('click', () => {
      contents.querySelector('video').play();
      contents.querySelector('.video-play').style.display = 'none';
      contents.querySelector('.video-preview').style.display = 'none';
      contents.querySelector('.video-info').style.display = 'none';
    });
  }

  const swiper = new Swiper('.swiper', {
    loop: false,
    slidesPerView: 3,
    spaceBetween: 4,

    pagination: {
      el: '.swiper-pagination',
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  const FAQ = document.querySelector('.FAQ');

  if (FAQ) {
    const MAX_VISIBLE = 5;

    const tabs = FAQ.querySelector('.FAQ__tabs');
    const contents = FAQ.querySelector('.FAQ__content');
    const accordions = FAQ.querySelectorAll('.accordion');

    FAQ.querySelectorAll('.tab-block').forEach((tabBlock) => {
      const items = tabBlock.querySelectorAll('ol > li');
      const button = tabBlock.querySelector('.button-more');

      if (items.length <= 6) {
        button.style.display = 'none';
      }

      items.forEach((item, index) => {
        item.style.display = index < MAX_VISIBLE ? 'block' : 'none';
      });
    });

    const baseHeight = contents.querySelector('.tab-block').scrollHeight;

    contents.style.height = `${baseHeight}px`;

    function resetMoreAccordions(tabBlock) {
      const items = tabBlock.querySelectorAll('ol > li');
      const button = tabBlock.querySelector('.button-more');

      items.forEach((item, index) => {
        item.style.display = index < MAX_VISIBLE ? 'block' : 'none';
      });

      if (items.length > MAX_VISIBLE) {
        button.style.display = 'flex';
      }

      button.classList.remove('button-more--active');
      button.querySelector('span').textContent = 'Развернуть еще 5+ вопросов и ответов';

      tabBlock.querySelectorAll('.accordion').forEach((accordion) => {
        accordion.classList.remove('accordion--active');
        accordion.querySelector('.accordion__button').classList.remove('accordion__button--active');
        accordion.querySelector('.accordion__content').removeAttribute('style');
      });
    }

    FAQ.querySelectorAll('.tab-block').forEach((tabBlock) => {
      const items = tabBlock.querySelectorAll('ol > li');
      const button = tabBlock.querySelector('.button-more');

      button.addEventListener('click', () => {
        if (button.classList.contains('button-more--active')) {
          items.forEach((item, index) => {
            if (index > 5) {
              item.style.display = 'none';
              resetMoreAccordions(tabBlock);
            }
          });

          contents.style.height = baseHeight + 'px';

          button.classList.remove('button-more--active');
          button.querySelector('span').textContent = 'Развернуть еще 5+ вопросов и ответов';
        } else {
          button.classList.add('button-more--active');
          button.querySelector('span').textContent = 'Скрыть';

          items.forEach((item) => {
            item.style.display = 'block';
          });

          contents.style.height = `${tabBlock.scrollHeight}px`;
        }
      });
    });

    for (const [index, tab] of tabs.querySelectorAll('.tab').entries()) {
      tab.addEventListener('click', () => {
        for (const ostTab of tabs.querySelectorAll('.tab')) {
          ostTab.classList.remove('tab--active');
        }

        for (const block of contents.querySelectorAll('.tab-block')) {
          block.classList.remove('tab-block--active');
        }

        contents.style.height = `${baseHeight}px`;

        tab.classList.add('tab--active');

        contents.querySelectorAll('.tab-block')[index].classList.add('tab-block--active');

        const activeBlock = contents.querySelectorAll('.tab-block')[index];

        resetMoreAccordions(activeBlock);
      });
    }

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
          content.style.paddingTop = '5px';
          content.style.height = `${content.scrollHeight}px`;

          contents.style.height = `${accordion.closest('.tab-block').scrollHeight + content.scrollHeight}px`;
        } else {
          contents.style.height = `${accordion.closest('.tab-block').scrollHeight - content.scrollHeight}px`;
        }
      });
    });
  }
});
