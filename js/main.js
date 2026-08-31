// ============ MOT D'ACCUEIL ANIMÉ (page d'accueil uniquement) ============
const morphWord = document.getElementById('morphWord');
const langOrder = ['en', 'ar', 'fr', 'rw', 'sw'];
let morphIndex = 0;

function cycleGreeting() {
  morphWord.style.opacity = '0';
  morphWord.style.transform = 'translateY(8px)';

  setTimeout(() => {
    morphIndex = (morphIndex + 1) % langOrder.length;
    const lang = langOrder[morphIndex];
    morphWord.textContent = GREETINGS[lang];
    morphWord.style.fontFamily = lang === 'ar'
      ? "'Noto Naskh Arabic', serif"
      : "'Fraunces', serif";
    morphWord.style.opacity = '1';
    morphWord.style.transform = 'translateY(0)';
  }, 320);
}

// Cette animation n'existe que sur index.html — sur les autres pages,
// morphWord est absent, donc on ne lance rien (évite de bloquer le
// reste du script, notamment le sélecteur de langue).
if (morphWord) {
  morphWord.style.transition = 'opacity 0.32s ease, transform 0.32s ease';
  setInterval(cycleGreeting, 2600);
}

// ============ SÉLECTEUR DE LANGUE ============
const langSwitcher = document.querySelector('.lang-switcher');
const langCurrentBtn = document.getElementById('langCurrent');
const langCurrentLabel = document.getElementById('langCurrentLabel');
const langOptions = document.getElementById('langOptions');

langCurrentBtn.addEventListener('click', () => {
  langSwitcher.classList.toggle('open');
  langCurrentBtn.setAttribute('aria-expanded', langSwitcher.classList.contains('open'));
});

document.addEventListener('click', (e) => {
  if (!langSwitcher.contains(e.target)) langSwitcher.classList.remove('open');
});

langOptions.querySelectorAll('li').forEach((item) => {
  item.addEventListener('click', () => {
    const lang = item.getAttribute('data-lang');
    setLanguage(lang);
    langSwitcher.classList.remove('open');
  });
});

function setLanguage(lang) {
  const isRtl = RTL_LANGS.includes(lang);
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');

  langCurrentLabel.textContent = lang.toUpperCase();

  // Applique les traductions à tous les éléments marqués data-i18n
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  // Mémorise le choix pour la prochaine visite
  localStorage.setItem('dd_lang', lang);
}

// Charge la langue sauvegardée au démarrage (sinon anglais par défaut)
const savedLang = localStorage.getItem('dd_lang') || 'en';
if (savedLang !== 'en') setLanguage(savedLang);

// ============ DONS ============
// Les dons sont désormais gérés entièrement par Zeffy (widget intégré
// directement dans index.html, section #donate). Zeffy s'occupe du
// paiement, des montants suggérés et des reçus — aucun code JS requis ici.
