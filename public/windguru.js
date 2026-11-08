/* Windguru — extension de navigation pour Marées Tarnos V4.3.
   Les calculs, l'API et les préférences existants restent inchangés. */
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
    // Charger le widget tiers uniquement lorsque l'onglet est réellement ouvert.
    if (!offline && !forecastFrame.src) {
      forecastFrame.src = forecastFrame.dataset.src;
    }
  }

  function openWindguru(event) {
    // Evite que l'ancien gestionnaire d'onglets traite Windguru comme « Réglages ».
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
    document.getElementById('fullDate').textContent = 'Plage du Métro · Tarnos';
    updateForecastAvailability();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Le traitement d'origine écoute les clics en phase « bubble ».
  // Le nouveau bouton est traité en phase « capture », sans altérer app.js.
  weatherTab.addEventListener('click', openWindguru, true);

  // En quittant Windguru, laisser les trois onglets existants reprendre leur fonctionnement.
  document.querySelectorAll('.tab:not([data-view="windguruView"])').forEach(tab => {
    tab.addEventListener('click', () => {
      document.body.classList.remove('windguru-active');
    }, true);
  });

  window.addEventListener('online', () => {
    if (document.body.classList.contains('windguru-active')) updateForecastAvailability();
  });
  window.addEventListener('offline', () => {
    if (document.body.classList.contains('windguru-active')) updateForecastAvailability();
  });
})();
