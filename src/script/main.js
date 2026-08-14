document.addEventListener('DOMContentLoaded', () => {
  // for (const tab of document.querySelector('.questions__tabs').querySelectorAll('.tab')) {

  // }

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
    loop: true,

    pagination: {
      el: '.swiper-pagination',
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // FAQ

  // const MAX_VISIBLE = 6;

  // document
  //   .querySelector('.FAQ')
  //   .querySelectorAll('.tab-block')
  //   .forEach((tabBlock) => {
  //     const items = tabBlock.querySelectorAll('ol > li');
  //     const button = tabBlock.querySelector('.button-more');

  //     items.forEach((item, index) => {
  //       item.style.display = index < MAX_VISIBLE ? '' : 'none';
  //     });

  //     button.addEventListener('click', () => {
  //       if (button.classList.contains('button-more--active')) {
  //         items.forEach((item, index) => {
  //           if (index > 5) {
  //             item.style.display = 'none';
  //           }
  //         });

  //         const faqContent = tabBlock.closest('.FAQ__content');
  //         faqContent.style.height = `601px`; // Тут должен быть baseHeight
  //       } else {
  //         button.classList.add('button-more--active');

  //         items.forEach((item) => {
  //           item.style.display = 'block';
  //         });

  //         const faqContent = tabBlock.closest('.FAQ__content');
  //         faqContent.style.height = `${tabBlock.scrollHeight}px`;
  //       }
  //     });
  //   });

  // function resetMoreAccordions(tabBlock) {
  //   const items = tabBlock.querySelectorAll('ol > li');
  //   const button = tabBlock.querySelector('button');

  //   items.forEach((item, index) => {
  //     item.style.display = index < MAX_VISIBLE ? 'block' : 'none';
  //   });

  //   if (items.length > MAX_VISIBLE) {
  //     button.style.display = '';
  //   }

  //   // Если был открыт какой-то аккордеон
  //   tabBlock.querySelectorAll('.accordion').forEach((accordion) => {
  //     accordion.classList.remove('accordion--active');
  //     accordion.querySelector('.accordion__button').classList.remove('accordion__button--active');
  //     accordion.querySelector('.accordion__content').removeAttribute('style');
  //   });
  // }

  const FAQ = document.querySelector('.FAQ');

  if (FAQ) {
    const MAX_VISIBLE = 6;

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
        } else {
          button.classList.add('button-more--active');

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
