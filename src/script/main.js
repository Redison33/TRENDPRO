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

  const FAQ = document.querySelector('.FAQ');

  if (FAQ) {
    const MAX_VISIBLE = 6;

    const tabs = FAQ.querySelectorAll('.FAQ__tabs .tab');
    const tabBlocks = FAQ.querySelectorAll('.FAQ__content .tab-block');
    const faqContent = FAQ.querySelector('.FAQ__content');
    const accordions = FAQ.querySelectorAll('.accordion');

    function getBaseHeight(tabBlock) {
      return tabBlock.scrollHeight;
    }

    function updateContentHeight(tabBlock) {
      faqContent.style.height = `${tabBlock.scrollHeight}px`;
    }

    function resetAccordions(tabBlock) {
      tabBlock.querySelectorAll('.accordion').forEach((accordion) => {
        accordion.classList.remove('accordion--active');

        accordion.querySelector('.accordion__button').classList.remove('accordion__button--active');

        accordion.querySelector('.accordion__content').removeAttribute('style');
      });
    }

    function resetMoreItems(tabBlock) {
      const items = tabBlock.querySelectorAll('ol > li');
      const button = tabBlock.querySelector('.button-more');

      items.forEach((item, index) => {
        item.style.display = index < MAX_VISIBLE ? '' : 'none';
      });

      if (button) {
        button.classList.remove('button-more--active');
      }
    }

    function toggleMoreItems(tabBlock) {
      const items = tabBlock.querySelectorAll('ol > li');
      const button = tabBlock.querySelector('.button-more');

      if (!button) return;

      const isExpanded = button.classList.contains('button-more--active');

      button.classList.toggle('button-more--active');

      items.forEach((item, index) => {
        item.style.display = !isExpanded || index < MAX_VISIBLE ? '' : 'none';
      });

      updateContentHeight(tabBlock);
    }

    tabBlocks.forEach((tabBlock) => {
      const button = tabBlock.querySelector('.button-more');

      if (!button) return;

      resetMoreItems(tabBlock);

      button.addEventListener('click', () => {
        toggleMoreItems(tabBlock);
      });
    });

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        const activeBlock = tabBlocks[index];

        tabs.forEach((item) => {
          item.classList.remove('tab--active');
        });

        tabBlocks.forEach((block) => {
          block.classList.remove('tab-block--active');
        });

        tab.classList.add('tab--active');
        activeBlock.classList.add('tab-block--active');

        resetMoreItems(activeBlock);
        resetAccordions(activeBlock);

        updateContentHeight(activeBlock);
      });
    });

    accordions.forEach((accordion) => {
      const button = accordion.querySelector('.accordion__button');
      const content = accordion.querySelector('.accordion__content');

      button.addEventListener('click', () => {
        const isActive = button.classList.contains('accordion__button--active');

        // Закрываем все аккордеоны
        accordions.forEach((item) => {
          item.classList.remove('accordion--active');

          item.querySelector('.accordion__button').classList.remove('accordion__button--active');

          item.querySelector('.accordion__content').removeAttribute('style');
        });

        // Если кликнули по открытому — оставляем всё закрытым
        if (isActive) {
          const activeBlock = accordion.closest('.tab-block');

          if (activeBlock) {
            updateContentHeight(activeBlock);
          }

          return;
        }

        // Открываем текущий аккордеон
        accordion.classList.add('accordion--active');
        button.classList.add('accordion__button--active');

        content.style.height = `${content.scrollHeight}px`;
        content.style.paddingTop = '5px';

        const activeBlock = accordion.closest('.tab-block');

        if (activeBlock) {
          updateContentHeight(activeBlock);
        }
      });
    });

    /**
     * Начальное состояние.
     */
    const activeTabIndex = [...tabs].findIndex((tab) => tab.classList.contains('tab--active'));

    const initialIndex = activeTabIndex >= 0 ? activeTabIndex : 0;
    const initialBlock = tabBlocks[initialIndex];

    if (initialBlock) {
      initialBlock.classList.add('tab-block--active');
      updateContentHeight(initialBlock);
    }
  }

  // const FAQ = document.querySelector('.FAQ');

  // if (FAQ) {
  //   const MAX_VISIBLE = 6;
  //   const tabs = FAQ.querySelector('.FAQ__tabs');
  //   const contents = FAQ.querySelector('.FAQ__content');
  //   const tabBlocks = contents.querySelectorAll('.tab-block');

  //   // Пересчитываем высоту контейнера под активный tab
  //   function updateContentHeight(tabBlock) {
  //     if (!tabBlock) return;

  //     // Даём браузеру сначала применить display / active-классы
  //     requestAnimationFrame(() => {
  //       contents.style.height = `${tabBlock.scrollHeight}px`;
  //     });
  //   }

  //   // Сбрасываем аккордеоны
  //   function resetAccordions(tabBlock) {
  //     tabBlock.querySelectorAll('.accordion').forEach((accordion) => {
  //       accordion.classList.remove('accordion--active');

  //       const button = accordion.querySelector('.accordion__button');
  //       const content = accordion.querySelector('.accordion__content');

  //       button?.classList.remove('accordion__button--active');
  //       content?.removeAttribute('style');
  //     });
  //   }

  //   // Настройка "Показать / Скрыть"
  //   function setupMoreButton(tabBlock) {
  //     const items = tabBlock.querySelectorAll('ol > li');
  //     const button = tabBlock.querySelector('.button-more');

  //     if (!button) return;

  //     // Если элементов недостаточно — кнопка не нужна
  //     if (items.length <= MAX_VISIBLE) {
  //       items.forEach((item) => {
  //         item.style.display = '';
  //       });

  //       button.style.display = 'none';
  //       return;
  //     }

  //     button.style.display = 'block';

  //     // Начальное состояние — скрыто
  //     let expanded = false;

  //     function updateItems() {
  //       items.forEach((item, index) => {
  //         item.style.display = expanded || index < MAX_VISIBLE ? 'block' : 'none';
  //       });

  //       // button.textContent = expanded ? 'Скрыть' : 'Показать ещё';

  //       updateContentHeight(tabBlock);
  //     }

  //     // Чтобы не навешивать обработчик несколько раз
  //     if (button.dataset.moreInitialized) {
  //       updateItems();
  //       return;
  //     }

  //     button.dataset.moreInitialized = 'true';

  //     button.addEventListener('click', () => {
  //       expanded = !expanded;
  //       updateItems();
  //     });

  //     updateItems();
  //   }

  //   // Инициализация каждого tab
  //   tabBlocks.forEach((tabBlock) => {
  //     setupMoreButton(tabBlock);
  //     resetAccordions(tabBlock);
  //   });

  //   // Начальный tab
  //   const activeIndex = [...tabs.querySelectorAll('.tab')].findIndex((tab) =>
  //     tab.classList.contains('tab--active'),
  //   );

  //   const initialIndex = activeIndex >= 0 ? activeIndex : 0;
  //   const initialBlock = tabBlocks[initialIndex];

  //   if (initialBlock) {
  //     initialBlock.classList.add('tab-block--active');
  //     updateContentHeight(initialBlock);
  //   }

  //   // Переключение tab
  //   tabs.querySelectorAll('.tab').forEach((tab, index) => {
  //     tab.addEventListener('click', () => {
  //       const activeBlock = tabBlocks[index];

  //       if (!activeBlock) return;

  //       // Переключаем табы
  //       tabs.querySelectorAll('.tab').forEach((item) => {
  //         item.classList.remove('tab--active');
  //       });

  //       tabBlocks.forEach((block) => {
  //         block.classList.remove('tab-block--active');
  //       });

  //       tab.classList.add('tab--active');
  //       activeBlock.classList.add('tab-block--active');

  //       // Сбрасываем аккордеоны нового таба
  //       resetAccordions(activeBlock);

  //       // ВАЖНО:
  //       // заново настраиваем состояние "Показать / Скрыть"
  //       setupMoreButton(activeBlock);

  //       // И только после изменения DOM пересчитываем высоту
  //       updateContentHeight(activeBlock);
  //     });
  //   });

  //   // Аккордеоны
  //   FAQ.querySelectorAll('.accordion').forEach((accordion) => {
  //     const button = accordion.querySelector('.accordion__button');
  //     const content = accordion.querySelector('.accordion__content');

  //     button.addEventListener('click', () => {
  //       const isActive = button.classList.contains('accordion__button--active');

  //       // Закрываем остальные аккордеоны
  //       FAQ.querySelectorAll('.accordion').forEach((item) => {
  //         item.classList.remove('accordion--active');

  //         item.querySelector('.accordion__button')?.classList.remove('accordion__button--active');

  //         item.querySelector('.accordion__content')?.removeAttribute('style');
  //       });

  //       // Если кликнули по уже открытому — просто закрываем
  //       if (isActive) {
  //         const activeBlock = accordion.closest('.tab-block');

  //         if (activeBlock) {
  //           updateContentHeight(activeBlock);
  //         }

  //         return;
  //       }

  //       // Открываем текущий
  //       accordion.classList.add('accordion--active');
  //       button.classList.add('accordion__button--active');

  //       content.style.height = `${content.scrollHeight}px`;
  //       content.style.paddingTop = '5px';

  //       const activeBlock = accordion.closest('.tab-block');

  //       if (activeBlock) {
  //         updateContentHeight(activeBlock);
  //       }
  //     });
  //   });
  // }
});
