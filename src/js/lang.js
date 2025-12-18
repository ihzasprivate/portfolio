if (!window.__langInit__) {
  window.__langInit__ = true;

  let translations = {};
  let currentLang = 'en';

  initLang();

  function initLang() {
    const url = getLangJsonPath();
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
        return res.json();
      })
      .then(data => {
        translations = data;
        setLang(currentLang);
      })
      .catch(err => console.error('[i18n]', err));
  }

  window.setLang = function setLang(lang) {
    currentLang = lang;

    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key'); // contoh: "hero.title"

      // pecah "hero.title" jadi ["hero","title"]
      const text = key.split('.').reduce((obj, k) => obj && obj[k], translations[lang]);

      if (text != null) el.innerHTML = text;
    });

    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');
  };

  document.addEventListener('DOMContentLoaded', () => {
    setLang('en');
  });


  function getLangJsonPath() {
    // Sesuaikan jalur sesuai struktur folder kamu
    // Contoh: jika lang.json ada di /src/lang.json
    return '/src/js/lang.json';
  }
}