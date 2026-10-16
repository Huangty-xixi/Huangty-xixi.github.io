(() => {
  const filterBar = document.querySelector('.filters');
  if (filterBar) {
    const buttons = [...filterBar.querySelectorAll('[data-filter]')];
    const videos = [...document.querySelectorAll('.video-card')];
    const status = document.querySelector('#video-status');
    filterBar.hidden = false;
    buttons.forEach(button => button.addEventListener('click', () => {
      const category = button.dataset.filter;
      buttons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      let count = 0;
      videos.forEach(video => {
        video.hidden = category !== 'all' && video.dataset.category !== category;
        const player = video.querySelector('iframe');
        if (video.hidden && player.hasAttribute('src')) {
          player.dataset.source = player.getAttribute('src');
          player.removeAttribute('src');
        } else if (!video.hidden && player.dataset.source && !player.hasAttribute('src')) {
          player.setAttribute('src', player.dataset.source);
        }
        if (!video.hidden) count++;
      });
      status.textContent = `当前显示 ${count} 段演示`;
    }));
  }
  const topLink = document.querySelector('.top-btn');
  if (topLink) {
    const update = () => { topLink.hidden = window.scrollY < 450; };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }
})();
