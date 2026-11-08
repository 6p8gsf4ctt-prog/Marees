(function () {
  'use strict';

  const weatherTab = document.querySelector('.tab[data-view="windguruView"]');
  const weatherView = document.getElementById('windguruView');
  const forecastFrame = document.getElementById('windguruFrame');
  const offlineMessage = document.getElementById('windguruOffline');
  if (!weatherTab || !weatherView || !forecastFrame || !offlineMessage) return;

  function updateForecastAvailability() {
    const offline = !navigator.onLine;
    forecastFrame.hidden = offline;
    offlineMessage.hidden = !offline;
    if (!offline && !forecastFrame.src) {
      forecastFrame.src = forecastFrame.dataset.src;
    }
  }

  function openWindguru(event) {
    event.stopImmediatePropagation();
    activeView = 'windguruView';

    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('active');
      tab.removeAttribute('aria-current');
    });
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));

    weatherTab.classList.add('active');
    weatherTab.setAttribute('aria-current', 'page');
    weatherView.classList.add('active');
    document.body.classList.add('windguru-active');

    document.getElementById('pageTitle').textContent = 'Windguru';
    document.querySelector('.eyebrow').textContent = 'ANGLET';
    document.getElementById('fullDate').textContent = 'Prévisions horaires';
    updateForecastAvailability();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  weatherTab.addEventListener('click', openWindguru, true);

  document.querySelectorAll('.tab:not([data-view="windguruView"])').forEach(tab => {
    tab.addEventListener('click', () => {
      document.body.classList.remove('windguru-active');
      document.querySelector('.eyebrow').textContent = 'TARNOS';
    }, true);
  });

  window.addEventListener('online', () => {
    if (document.body.classList.contains('windguru-active')) updateForecastAvailability();
  });
  window.addEventListener('offline', () => {
    if (document.body.classList.contains('windguru-active')) updateForecastAvailability();
  });
})();
