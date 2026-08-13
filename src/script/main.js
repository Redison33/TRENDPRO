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
});
