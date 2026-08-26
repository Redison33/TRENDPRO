document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.policy')) {
    const accordions = document.querySelector('.policy').querySelectorAll('.accordion');

    console.log(accordions);

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
});
