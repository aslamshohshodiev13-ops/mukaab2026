// ── TRANSLATIONS ──
const translations = {
  ru: {
    // Navbar
    'nav-portfolio':  'Портфолио',
    'nav-products':   'Изделия',
    'nav-about':      'О нас',
    'nav-services':   'Услуги',
    'nav-vacancies':  'Вакансии',
    'nav-contacts':   'Контакты',

    // Hero
    'hero-title':     'Создаём проекты как единое целое',
    'hero-sub':       'Чистая эстетика, продуманные решения и внимание к каждой детали.',
    'hero-btn':       'Оставить заявку',

    // Projects
    'projects-heading':   'Проекты',
    'label-interior':     'Дизайн интерьера',
    'label-products':     'Изделия',
    'label-arch':         'Архитектура',

    // Stats
    'stat-projects':  'Завершённых проектов',
    'stat-years':     'Лет опыта',
    'stat-clients':   'Довольных клиентов',
    'stat-support':   'Поддержка клиентов',

    // Services
    'services-heading':   'Услуги',
    'svc-arch':           'Архитектура',
    'svc-interior':       'Дизайн-проект интерьера',
    'svc-custom':         'Индивидуальные изделия',
    'svc-visual':         'Визуализация',
    'svc-btn':            'Оставить заявку',

    // About
    'about-label':    'О нас',
    'about-title':    'Мы создаём эмоции через дизайн',
    'about-desc':     '<strong>Mukaab</strong> — это команда опытных архитекторов и дизайнеров, специализирующихся на создании премиальных интерьеров. Каждый проект — это уникальное путешествие от идеи к реальности.',
    'check-1':        'Индивидуальный подход к каждому клиенту',
    'check-2':        'Гарантия качества и сроков выполнения',
    'check-3':        'Использование экологичных материалов',
    'check-4':        'Полный цикл от проектирования до сдачи',

    // Contacts
    'contacts-label':     'Контакты',
    'clabel-phone':       'Телефон',
    'clabel-email':       'Email',
    'clabel-address':     'Адрес',
    'clabel-social':      'Социальные сети',
    'address-val':        'Минск, Беларусь',
    'form-label':         'Оставить заявку',
    'ph-name':            'Имя',
    'ph-phone':           'Телефон',
    'opt-call':           'Позвонить',
    'opt-write':          'Написать',
  'agree-text':         'В соответствии с политикой обработки персональных данных и соответствии <a href="#" onclick="openPrivacy(); return false;">политикой конфиденциальности</a>',

    // Footer
    'footer-p': '© 2026 | ООО «Мукааб» УНП: 193790928',
     'footer-policy': 'Политика конфиденциальности',
  },

  en: {
    // Navbar
    'nav-portfolio':  'Portfolio',
    'nav-products':   'Products',
    'nav-about':      'About',
    'nav-services':   'Services',
    'nav-vacancies':  'Careers',
    'nav-contacts':   'Contacts',

    // Hero
    'hero-title':     'We Create Projects as a Unified Whole',
    'hero-sub':       'Pure aesthetics, thoughtful solutions and attention to every detail.',
    'hero-btn':       'Leave a Request',

    // Projects
    'projects-heading':   'Projects',
    'label-interior':     'Interior Design',
    'label-products':     'Products',
    'label-arch':         'Architecture',

    // Stats
    'stat-projects':  'Completed Projects',
    'stat-years':     'Years of Experience',
    'stat-clients':   'Satisfied Clients',
    'stat-support':   'Client Support',

    // Services
    'services-heading':   'Services',
    'svc-arch':           'Architecture',
    'svc-interior':       'Interior Design Project',
    'svc-custom':         'Custom Products',
    'svc-visual':         'Visualization',
    // About
    'about-label':    'About Us',
    'about-title':    'We Create Emotions Through Design',
    'about-desc':     '<strong>Mukaab</strong> is a team of experienced architects and designers specialising in creating premium interiors. Every project is a unique journey from idea to reality.',
    'agree-text':     'In accordance with the personal data processing policy and in accordance with the <a href="#" onclick="openPrivacy(); return false;">privacy policy</a>',
    'check-1':        'Individual approach to every client',
    'check-2':        'Quality and deadline guarantee',
    'check-3':        'Use of eco-friendly materials',
    'check-4':        'Full cycle from design to handover',

    // Contacts
    'contacts-label':     'Contacts',
    'clabel-phone':       'Phone',
    'clabel-email':       'Email',
    'clabel-address':     'Address',
    'clabel-social':      'Social Media',
    'address-val':        'Minsk, Belarus',
    'form-label':         'Leave a Request',
    'ph-name':            'Name',
    'ph-phone':           'Phone',
    'opt-call':           'Call me',
    'opt-write':          'Message me',
    'btn-submit':         'Send',

    // Footer
  'footer-p': '© 2026 | LLC "MUKAAB". Tax ID: 193790928',
'footer-policy': 'Privacy Policy',
  }
};

// ── APPLY LANGUAGE ──
function applyLang(lang) {
  const t = translations[lang];

  // helper: set innerText safely
  const setText = (sel, key) => {
    const el = document.querySelector(sel);
    if (el && t[key] !== undefined) el.textContent = t[key];
  };
  const setHTML = (sel, key) => {
    const el = document.querySelector(sel);
    if (el && t[key] !== undefined) el.innerHTML = t[key];
  };
  const setAttr = (sel, attr, key) => {
    const el = document.querySelector(sel);
    if (el && t[key] !== undefined) el.setAttribute(attr, t[key]);
  };

  // Navbar
  setText('[data-i18n="nav-portfolio"]',  'nav-portfolio');
  setText('[data-i18n="nav-products"]',   'nav-products');
  setText('[data-i18n="nav-about"]',      'nav-about');
  setText('[data-i18n="nav-services"]',   'nav-services');
  setText('[data-i18n="nav-vacancies"]',  'nav-vacancies');
  setText('[data-i18n="nav-contacts"]',   'nav-contacts');

  // Hero
  setText('[data-i18n="hero-title"]',     'hero-title');
  setText('[data-i18n="hero-sub"]',       'hero-sub');
  setText('[data-i18n="hero-btn"]',       'hero-btn');

  // Projects
  setText('[data-i18n="projects-heading"]', 'projects-heading');
  setText('[data-i18n="label-interior"]', 'label-interior');
  setText('[data-i18n="label-products"]', 'label-products');
  setText('[data-i18n="label-arch"]',     'label-arch');

  // Stats
  setText('[data-i18n="stat-projects"]',  'stat-projects');
  setText('[data-i18n="stat-years"]',     'stat-years');
  setText('[data-i18n="stat-clients"]',   'stat-clients');
  setText('[data-i18n="stat-support"]',   'stat-support');

  // Services
  setText('[data-i18n="services-heading"]', 'services-heading');
  setText('[data-i18n="svc-arch"]',       'svc-arch');
  setText('[data-i18n="svc-interior"]',   'svc-interior');
  setText('[data-i18n="svc-custom"]',     'svc-custom');
  setText('[data-i18n="svc-visual"]',     'svc-visual');
  document.querySelectorAll('[data-i18n="svc-btn"]').forEach(el => el.textContent = t['svc-btn']);

  // About
  setText('[data-i18n="about-label"]',    'about-label');
  setText('[data-i18n="about-title"]',    'about-title');
  setHTML('[data-i18n="about-desc"]',     'about-desc');
  setText('[data-i18n="check-1"]',        'check-1');
  setText('[data-i18n="check-2"]',        'check-2');
  setText('[data-i18n="check-3"]',        'check-3');
  setText('[data-i18n="check-4"]',        'check-4');

  // Contacts
  setText('[data-i18n="contacts-label"]', 'contacts-label');
  setText('[data-i18n="clabel-phone"]',   'clabel-phone');
  setText('[data-i18n="clabel-email"]',   'clabel-email');
  setText('[data-i18n="clabel-address"]', 'clabel-address');
  setText('[data-i18n="clabel-social"]',  'clabel-social');
  setText('[data-i18n="address-val"]',    'address-val');
  setText('[data-i18n="form-label"]',     'form-label');
  setAttr('[data-i18n="ph-name"]',   'placeholder', 'ph-name');
  setAttr('[data-i18n="ph-phone"]',  'placeholder', 'ph-phone');
  setText('[data-i18n="opt-call"]',       'opt-call');
  setText('[data-i18n="opt-write"]',      'opt-write');
  setHTML('[data-i18n="agree-text"]',     'agree-text');
  setText('[data-i18n="btn-submit"]',     'btn-submit');

  // Footer
  setHTML('[data-i18n="footer-copy"]',    'footer-copy');
  setText('[data-i18n="footer-policy"]',  'footer-policy');

  // ── html lang attribute (меняет язык документа) ──
  document.documentElement.lang = lang;

  
}

// ── LANGUAGE SWITCHER ──
function changeLanguage(lang) {
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  const active = document.querySelector(`.lang-btn[onclick="changeLanguage('${lang}')"]`);
  if (active) active.classList.add('active');
  applyLang(lang);
  applyPrivacyLang(lang);
  if (window._navHomeItems) renderNavHome(lang);
}

/* NAVBAR SCROLL */

const nav = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});
// ── HERO SLIDER ──
let current = 0;
const slides = document.getElementById('heroSlides');
const dots = document.querySelectorAll('.hero-dot');
function goSlide(n) {
  current = n;
  slides.style.transform = 'translateX(-' + (100 / 3 * n) + '%)';
  dots.forEach((d, i) => d.classList.toggle('active', i === n));
  scheduleNextSlide();
}
dots.forEach((dot, i) => dot.addEventListener('click', () => { clearTimeout(window._heroSlideTimer); goSlide(i); }));

function scheduleNextSlide() {
  clearTimeout(window._heroSlideTimer);
  const activeSlideEl = document.getElementById('heroSlide' + (current + 1));
  const video = activeSlideEl ? activeSlideEl.querySelector('video') : null;
  if (video) {
    // проигрываем с самого начала каждый раз, когда слайдер возвращается на этот слайд
    try { video.currentTime = 0; video.play().catch(()=>{}); } catch(e) {}
    // ждём, пока видео доиграет до конца, затем переключаем
    const onEnded = () => { video.removeEventListener('ended', onEnded); goSlide((current + 1) % 3); };
    video.addEventListener('ended', onEnded);
    // подстраховка на случай, если видео не сможет запуститься/зависнет
    window._heroSlideTimer = setTimeout(() => { video.removeEventListener('ended', onEnded); goSlide((current + 1) % 3); }, 20000);
  } else {
    window._heroSlideTimer = setTimeout(() => goSlide((current + 1) % 3), 5000);
  }
}
scheduleNextSlide();

// ── INIT ──
applyLang('ru');
/* ── BURGER MENU ── */
const burger = document.getElementById('burger');

const navLeft = document.querySelector('.nav-left');
const navRight = document.querySelector('.nav-right');

burger.addEventListener('click', () => {
  navLeft.classList.toggle('active');
  navRight.classList.toggle('active');
});
/* ── STATS ANIMATION ── */
window.addEventListener('load', () => {

  const stats = document.querySelectorAll('.stat-item');

  stats.forEach((item) => {

    item.classList.add('show');

  });

});
/* ----- STATS COUNTER ----- */

const counters = document.querySelectorAll('.stat-number');

function animateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  const duration = 1600; // мс
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.ceil(progress * target);

    counter.textContent = value;
    counter.classList.add('updated');

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      counter.textContent = target;
      counter.classList.remove('updated');
    }
  }

  requestAnimationFrame(step);
}

if (counters.length) {
  // ставим 0 сразу, чтобы не мелькали готовые цифры до старта анимации
  counters.forEach(counter => (counter.textContent = '0'));

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(counter => statsObserver.observe(counter));
}
function openPrivacy() {
  const overlay = document.getElementById('privacyOverlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePrivacy() {
  const overlay = document.getElementById('privacyOverlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePrivacy();
});

// ── PRIVACY TRANSLATIONS ──
const privacyTranslations = {
  ru: {
    'pp-label':       'Юридический документ',
    'pp-title':       'Политика конфиденциальности',
    'pp-s1-h':        'Общие положения',
    'pp-s1-p':        'Настоящая Политика определяет порядок обработки персональных данных <strong>ООО «Мукааб»</strong> в соответствии с законодательством Республики Беларусь.',
    'pp-s2-h':        'Основные понятия',
    'pp-s2-ul':       '<li><strong>Персональные данные</strong> — информация, относящаяся к физическому лицу.</li><li><strong>Обработка данных</strong> — сбор, хранение, использование, передача и удаление.</li><li><strong>Пользователь</strong> — любое лицо, посещающее сайт.</li>',
    'pp-s3-h':        'Данные, которые мы собираем',
    'pp-s3-ul':       '<li>Имя и фамилия</li><li>Номер телефона</li><li>Адрес электронной почты</li><li>Ссылки на социальные сети</li><li>Фотографии (при передаче)</li><li>IP-адрес, cookies, действия на сайте</li>',
    'pp-s4-h':        'Цели обработки',
    'pp-s4-ul':       '<li>Обработка заявок и обратная связь</li><li>Предоставление информации об услугах</li><li>Подготовка коммерческих предложений</li><li>Улучшение работы сайта</li><li>Маркетинговые коммуникации</li>',
    'pp-s5-h':        'Правовые основания',
    'pp-s5-ul':       '<li>Согласие пользователя</li><li>Заключение и исполнение договора</li><li>Требования законодательства РБ</li>',
    'pp-s6-h':        'Передача данных',
    'pp-s6-p':        'Данные не передаются третьим лицам без согласия пользователя. Исключение — сервисы аналитики и CRM, обеспечивающие работу сайта.',
    'pp-s7-h':        'Срок хранения',
    'pp-s7-p':        'Данные хранятся не дольше необходимого либо до отзыва согласия пользователем.',
    'pp-s8-h':        'Права пользователя',
    'pp-s8-ul':       '<li>Получать информацию о своих данных</li><li>Требовать изменения или удаления</li><li>Отозвать согласие на обработку</li><li>Ограничить обработку данных</li>',
    'pp-s9-h':        'Cookies',
    'pp-s9-p':        'Сайт использует cookies для работы, аналитики и персонализации. Можно отключить в настройках браузера.',
    'pp-s10-h':       'Защита данных',
    'pp-s10-p':       'Применяются организационные и технические меры защиты от несанкционированного доступа.',
    'pp-s11-h':       'Изменение политики',
    'pp-s11-p':       'Актуальная версия Политики всегда доступна на сайте.',
    'pp-s12-h':       'Контакты',
    'pp-org-label':   'Организация',
    'pp-org-val':     'ООО «Мукааб»',
    'pp-phone-label': 'Телефон',
    'pp-addr-label':  'Адрес',
    'pp-addr-val':    'Минск, Беларусь',
  },
  en: {
    'pp-label':       'Legal Document',
    'pp-title':       'Privacy Policy',
    'pp-s1-h':        'General Provisions',
    'pp-s1-p':        'This Policy defines the procedure for processing personal data by <strong>Mukaab LLC</strong> in accordance with the legislation of the Republic of Belarus.',
    'pp-s2-h':        'Key Definitions',
    'pp-s2-ul':       '<li><strong>Personal Data</strong> — information relating to an individual.</li><li><strong>Data Processing</strong> — collection, storage, use, transfer and deletion.</li><li><strong>User</strong> — any person visiting the website.</li>',
    'pp-s3-h':        'Data We Collect',
    'pp-s3-ul':       '<li>Name and surname</li><li>Phone number</li><li>Email address</li><li>Social media links</li><li>Photos (if provided)</li><li>IP address, cookies, site activity</li>',
    'pp-s4-h':        'Purposes of Processing',
    'pp-s4-ul':       '<li>Processing requests and feedback</li><li>Providing information about services</li><li>Preparing commercial proposals</li><li>Improving website performance</li><li>Marketing communications</li>',
    'pp-s5-h':        'Legal Grounds',
    'pp-s5-ul':       '<li>User consent</li><li>Conclusion and execution of a contract</li><li>Requirements of Belarusian legislation</li>',
    'pp-s6-h':        'Data Transfer',
    'pp-s6-p':        'Data is not transferred to third parties without user consent, except for analytics services and CRM systems supporting site operations.',
    'pp-s7-h':        'Retention Period',
    'pp-s7-p':        'Data is stored no longer than necessary or until the user withdraws consent.',
    'pp-s8-h':        'User Rights',
    'pp-s8-ul':       '<li>Access information about your data</li><li>Request correction or deletion</li><li>Withdraw consent to processing</li><li>Restrict data processing</li>',
    'pp-s9-h':        'Cookies',
    'pp-s9-p':        'The website uses cookies for functionality, analytics and personalisation. You can disable cookies in your browser settings.',
    'pp-s10-h':       'Data Security',
    'pp-s10-p':       'Organisational and technical measures are applied to protect data from unauthorised access.',
    'pp-s11-h':       'Policy Updates',
    'pp-s11-p':       'The current version of this Policy is always available on the website.',
    'pp-s12-h':       'Contacts',
    'pp-org-label':   'Company',
    'pp-org-val':     'Mukaab LLC',
    'pp-phone-label': 'Phone',
    'pp-addr-label':  'Address',
    'pp-addr-val':    'Minsk, Belarus',
  }
};
// ── APPLY PRIVACY MODAL LANGUAGE ──
function applyPrivacyLang(lang) {
  const t = privacyTranslations[lang];
  if (!t) return;

  const setText = (sel, key) => {
    const el = document.querySelector(sel);
    if (el && t[key] !== undefined) el.textContent = t[key];
  };
  const setHTML = (sel, key) => {
    const el = document.querySelector(sel);
    if (el && t[key] !== undefined) el.innerHTML = t[key];
  };

  Object.keys(t).forEach(key => {
    const el = document.querySelector(`#privacyOverlay [data-i18n="${key}"]`);
    if (!el) return;
    if (/<[a-z]+[\s>]/i.test(t[key])) {
      setHTML(`[data-i18n="${key}"]`, key);
    } else {
      setText(`[data-i18n="${key}"]`, key);
    }
  });
}

// ── INIT (privacy modal) ──
applyPrivacyLang('ru');

// ══════════════════════════════════════════════════════════
// Своё меню главной страницы (отдельное от общего сайта)
// ══════════════════════════════════════════════════════════
function hnEsc(s){return (s??'').toString().replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}

window._navHomeItems = null;

function renderNavHome(l){
  const items = window._navHomeItems;
  if (!items || !items.length) return;
  const build = arr => arr.map(x => `<a href="${hnEsc(x.location||'#')}">${hnEsc(x['title_'+l]||x.title_ru)}</a>`).join('');
  const left = document.getElementById('navLeftHomeCustom');
  const right = document.getElementById('navRightHomeCustom');
  if (left) left.innerHTML = build(items.slice(0, 4));
  if (right) right.innerHTML = build(items.slice(4));
}

fetch("mukaab-admin-backend/public/list.php?type=nav_home", { cache: 'no-store' })
  .then(r => r.json())
  .then(d => {
    window._navHomeItems = d.items || [];
    const activeBtn = document.querySelector('.lang-btn.active');
    const currentLang = (activeBtn && activeBtn.getAttribute('onclick') || '').includes("'en'") ? 'en' : 'ru';
    renderNavHome(currentLang);
  })
  .catch(() => {});

// ══════════════════════════════════════════════════════════
// Форма контактов: 3 способа связи (Telegram / WhatsApp / Заявка)
// Отправка идёт в mukaab-admin-backend/public/apply.php,
// заявка появляется в админ-панели в разделе "Заявки".
// ══════════════════════════════════════════════════════════
const CONTACT_APPLY_URL = "mukaab-admin-backend/public/apply.php";
const CONTACT_SETTINGS_URL = "mukaab-admin-backend/public/settings.php";
let contactChannels = { telegram: '', whatsapp: '' };

fetch(CONTACT_SETTINGS_URL, { cache: 'no-store' })
  .then(r => r.json())
  .then(d => {
    const s = d && d.settings ? d.settings : {};
    if (s.client_bot_username) contactChannels.telegram = 'https://t.me/' + s.client_bot_username.replace('@','');
    else if (s.telegram) contactChannels.telegram = /^https?:/.test(s.telegram) ? s.telegram : ('https://t.me/' + s.telegram.replace('@',''));
    if (s.whatsapp) contactChannels.whatsapp = /^https?:/.test(s.whatsapp) ? s.whatsapp : ('https://wa.me/' + s.whatsapp.replace(/[^\d]/g,''));
    if (contactChannels.telegram) { const el = document.getElementById('socialTelegramLinkHome'); if (el) el.href = contactChannels.telegram; }
    const socialMapHome = {
      socialInstagramHome: s.social_instagram, socialBehanceHome: s.social_behance,
      socialYoutubeHome: s.social_youtube, socialVkHome: s.social_vk,
      socialPinterestHome: s.social_pinterest, socialLinkedinHome: s.social_linkedin
    };
    Object.keys(socialMapHome).forEach(id => {
      const url = socialMapHome[id];
      if (url) { const el = document.getElementById(id); if (el) el.href = url; }
    });
    if (s.contact_email) { const el = document.getElementById('contactEmailLinkHome'); if (el) { el.textContent = s.contact_email; el.href = 'mailto:' + s.contact_email; } }
    applyHomeCmsOverrides(s);
  })
  .catch(() => {});

// ══════════════════════════════════════════════════════════
// Подтягиваем Hero / статистику / "О нас" / футер / SEO / политику
// из раздела "Настройки" и "Контакты" в админке (если заполнено).
// Пустое поле в админке = остаётся исходный текст со страницы.
// ══════════════════════════════════════════════════════════
const PRIVACY_DEFAULTS_HOME = [
  {ru:"Общие положения",en:"General Provisions",bru:"Настоящая Политика конфиденциальности определяет порядок обработки персональных данных и меры по их защите, предпринимаемые ООО «Мукааб» (далее — Оператор), в соответствии с законодательством Республики Беларусь.",ben:"This Privacy Policy defines the procedure for processing personal data and the measures taken to protect it by Mukaab LLC (the Operator), in accordance with the legislation of the Republic of Belarus."},
  {ru:"Основные понятия",en:"Key Definitions",bru:"Персональные данные — любая информация, относящаяся к идентифицированному или идентифицируемому физическому лицу.\nОбработка персональных данных — любые действия с данными: сбор, хранение, использование, передача и удаление.\nПользователь — любое лицо, посещающее сайт.",ben:"Personal Data — any information relating to an identified or identifiable individual.\nData Processing — any actions with data, including collection, storage, use, transfer and deletion.\nUser — any person visiting the website."},
  {ru:"Персональные данные, которые мы собираем",en:"Data We Collect",bru:"Имя и фамилия\nНомер телефона\nАдрес электронной почты\nСсылки на социальные сети\nФотографии (при передаче)\nIP-адрес, cookies, действия на сайте",ben:"Name and surname\nPhone number\nEmail address\nSocial media links\nPhotos (if provided)\nIP address, cookies, site activity"},
  {ru:"Цели обработки данных",en:"Purposes of Processing",bru:"Обработка заявок и обратная связь\nПредоставление информации об услугах\nПодготовка коммерческих предложений\nУлучшение работы сайта\nМаркетинговые коммуникации",ben:"Processing requests and feedback\nProviding information about services\nPreparing commercial proposals\nImproving website performance\nMarketing communications"},
  {ru:"Правовые основания обработки",en:"Legal Grounds",bru:"Согласие пользователя\nЗаключение и исполнение договора\nТребования законодательства Республики Беларусь",ben:"User consent\nConclusion and execution of a contract\nRequirements of Belarusian legislation"},
  {ru:"Условия обработки и передачи данных",en:"Data Transfer",bru:"Данные не передаются третьим лицам без согласия пользователя. Исключение — сервисы аналитики и CRM, обеспечивающие работу сайта.",ben:"Data is not transferred to third parties without user consent, except for analytics services and CRM systems supporting site operations."},
  {ru:"Срок хранения данных",en:"Retention Period",bru:"Персональные данные хранятся не дольше, чем необходимо для целей обработки, либо до момента отзыва согласия пользователем.",ben:"Personal data is stored no longer than necessary for processing purposes, or until the user withdraws consent."},
  {ru:"Права пользователя",en:"User Rights",bru:"Получать информацию о своих персональных данных\nТребовать их изменения или удаления\nОтозвать согласие на обработку\nОграничить обработку данных",ben:"Access information about your personal data\nRequest its correction or deletion\nWithdraw consent to processing\nRestrict data processing"},
  {ru:"Cookies и аналитика",en:"Cookies & Analytics",bru:"Сайт использует cookies для корректной работы, анализа поведения пользователей и персонализации контента. Пользователь может отключить cookies в настройках браузера.",ben:"The website uses cookies for correct functioning, user behaviour analysis and content personalisation. Users can disable cookies in their browser settings."},
  {ru:"Защита данных",en:"Data Security",bru:"Оператор принимает необходимые организационные и технические меры для защиты персональных данных от несанкционированного доступа.",ben:"The Operator takes the necessary organisational and technical measures to protect personal data from unauthorised access."},
  {ru:"Изменение политики",en:"Policy Updates",bru:"Оператор вправе вносить изменения в настоящую Политику. Актуальная версия всегда доступна на сайте.",ben:"The Operator may amend this Policy. The current version is always available on the website."},
];

function hpEsc(s){return (s??'').toString().replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}

function buildPrivacyBodyHome(s, l) {
  let html = `<h2 class="pm-title">${l==='ru'?'Политика конфиденциальности':'Privacy Policy'}</h2><p class="pm-org">ООО «Мукааб» · 2026</p>`;
  PRIVACY_DEFAULTS_HOME.forEach((def,i)=>{
    const n = i+1;
    const title = (l==='ru' ? s['privacy_s'+n+'_title_ru'] : s['privacy_s'+n+'_title_en']) || (l==='ru' ? def.ru : def.en);
    const text = (l==='ru' ? s['privacy_s'+n+'_text_ru'] : s['privacy_s'+n+'_text_en']) || (l==='ru' ? def.bru : def.ben);
    const lines = text.split('\n').map(x=>x.trim()).filter(Boolean);
    const body = lines.length > 1
      ? `<ul>${lines.map(x=>`<li>${hpEsc(x)}</li>`).join('')}</ul>`
      : `<p>${hpEsc(lines[0]||'')}</p>`;
    html += `<div class="pm-section"><h3>${hpEsc(title)}</h3>${body}</div>`;
  });
  html += `<div class="pm-section" style="border-bottom:none;margin-bottom:0"><h3>${l==='ru'?'Контакты':'Contacts'}</h3><div class="pm-contacts">
<div class="pm-contact-row"><span class="pm-key">${l==='ru'?'Организация':'Company'}</span><span class="pm-colon">:</span><strong>${l==='ru'?'ООО «Мукааб»':'Mukaab LLC'}</strong></div>
<div class="pm-contact-row"><span class="pm-key">Email</span><span class="pm-colon">:</span><a href="mailto:${hpEsc(s.contact_email||'mukaabcompany@gmail.com')}">${hpEsc(s.contact_email||'mukaabcompany@gmail.com')}</a></div>
<div class="pm-contact-row"><span class="pm-key">${l==='ru'?'Телефон':'Phone'}</span><span class="pm-colon">:</span><a href="tel:${hpEsc((s.contact_phone||'+375339161111').replace(/[^\d+]/g,''))}">${hpEsc(s.contact_phone||'+375 (33) 916-11-11')}</a></div>
<div class="pm-contact-row"><span class="pm-key">${l==='ru'?'Адрес':'Address'}</span><span class="pm-colon">:</span><strong>${hpEsc(s.address||(l==='ru'?'Минск, Беларусь':'Minsk, Belarus'))}</strong></div>
</div></div>`;
  return html;
}

function applyHomeCmsOverrides(s) {
  const map = [
    ['hero_title_ru','ru','hero-title'], ['hero_title_en','en','hero-title'],
    ['hero_sub_ru','ru','hero-sub'],     ['hero_sub_en','en','hero-sub'],
    ['hero_btn_ru','ru','hero-btn'],     ['hero_btn_en','en','hero-btn'],
    ['about_title_ru','ru','about-title'], ['about_title_en','en','about-title'],
    ['about_desc_ru','ru','about-desc'],   ['about_desc_en','en','about-desc'],
    ['check1_ru','ru','check-1'], ['check1_en','en','check-1'],
    ['check2_ru','ru','check-2'], ['check2_en','en','check-2'],
    ['check3_ru','ru','check-3'], ['check3_en','en','check-3'],
    ['check4_ru','ru','check-4'], ['check4_en','en','check-4'],
    ['stat1_label_ru','ru','stat-projects'], ['stat1_label_en','en','stat-projects'],
    ['stat2_label_ru','ru','stat-years'],    ['stat2_label_en','en','stat-years'],
    ['stat3_label_ru','ru','stat-clients'],  ['stat3_label_en','en','stat-clients'],
    ['stat4_label_ru','ru','stat-support'],  ['stat4_label_en','en','stat-support'],
    ['footer_ru','ru','footer-p'], ['footer_en','en','footer-p'],
    ['address','ru','address-val'], ['address_en','en','address-val'],
  ];
  map.forEach(([key,lng,tkey]) => { if (s[key] && translations[lng]) translations[lng][tkey] = s[key]; });

  const current = document.documentElement.lang || 'ru';
  applyLang(current);

  if (s.hero_btn_link) { const el = document.getElementById('heroBtnLink'); if (el) el.href = s.hero_btn_link; }

  // ── Слайды Hero (фон, 3 шт.) ──
  for (let n = 1; n <= 3; n++) {
    const src = s['hero_slide' + n];
    if (!src) continue;
    const el = document.getElementById('heroSlide' + n);
    if (!el) continue;
    if (/\.(mp4|webm|mov)$/i.test(src)) {
      el.style.backgroundImage = '';
      if (!el.querySelector('video')) {
        const v = document.createElement('video');
        v.src = src; v.autoplay = true; v.muted = true; v.loop = false; v.playsInline = true;
        v.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;';
        el.style.position = 'relative';
        el.appendChild(v);
      }
    } else {
      el.style.backgroundImage = `url('${src}')`;
    }
  }

  for (let n = 1; n <= 3; n++) {
    const numEl = document.getElementById('statNum' + n);
    const sufEl = document.getElementById('statSuffix' + n);
    const val = s['stat' + n + '_value'];
    const suf = s['stat' + n + '_suffix'];
    if (numEl && val) { numEl.setAttribute('data-target', val); if (numEl.textContent !== '0') numEl.textContent = val; }
    if (sufEl && suf !== undefined && suf !== '') sufEl.textContent = suf;
  }
  if (s.stat4_value) { const el = document.getElementById('stat4Value'); if (el) el.textContent = s.stat4_value; }

  if (s.seo_title) document.title = s.seo_title;
  if (s.seo_description) {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name','description'); document.head.appendChild(meta); }
    meta.setAttribute('content', s.seo_description);
  }

  window.applyPrivacyLang = function (l) {
    const content = document.getElementById('privacyContent');
    if (content) content.innerHTML = buildPrivacyBodyHome(s, l);
  };
  window.applyPrivacyLang(document.documentElement.lang || 'ru');

  // ── Плитки "Проекты" (3 шт.) ──
  for (let n = 1; n <= 3; n++) {
    const img = s['tile' + n + '_image'];
    const link = s['tile' + n + '_link'];
    const titleRu = s['tile' + n + '_title_ru'];
    const titleEn = s['tile' + n + '_title_en'];
    if (img) { const el = document.getElementById('tile' + n + 'Img'); if (el) el.src = img; }
    const labelEl = document.getElementById('tile' + n + 'Label');
    if (labelEl) {
      const l = current === 'en' ? titleEn : titleRu;
      if (l) labelEl.textContent = l;
    }
    if (link) {
      const card = document.getElementById('tile' + n);
      if (card) { card.style.cursor = 'pointer'; card.onclick = () => { window.location.href = link; }; }
    }
  }

  // ── Карточки "Услуги" на главной (4 шт.) ──
  for (let n = 1; n <= 4; n++) {
    const img = s['svc' + n + '_image'];
    const link = s['svc' + n + '_link'];
    const titleRu = s['svc' + n + '_title_ru'];
    const titleEn = s['svc' + n + '_title_en'];
    if (img) { const el = document.getElementById('svc' + n); if (el) el.style.backgroundImage = `url('${img}')`; }
    const titleEl = document.getElementById('svc' + n + 'Title');
    if (titleEl) {
      const l = current === 'en' ? titleEn : titleRu;
      if (l) titleEl.textContent = l;
    }
    if (link) {
      const card = document.getElementById('svc' + n);
      if (card) { card.style.cursor = 'pointer'; card.onclick = () => { window.location.href = link; }; }
    }
  }
}

function selectContactMethod(method) {
  const methodInput = document.getElementById("contactMethod");
  if (methodInput) methodInput.value = method;
  document.querySelectorAll(".contact-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.method === method);
  });
  const reqBtn = document.querySelector(".requests-button");
  if (reqBtn) reqBtn.classList.toggle("active", method === "request");
}

function openRequests() {
  selectContactMethod("request");
  const form = document.getElementById("contactForm");
  if (form) form.scrollIntoView({ behavior: "smooth", block: "center" });
}

function updateRequestsBadge(count) {
  const badge = document.getElementById("requestsBadge");
  if (!badge) return;
  if (count > 0) { badge.textContent = count; badge.classList.add("show"); }
  else { badge.textContent = "0"; badge.classList.remove("show"); }
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const methodInput = document.getElementById("contactMethod");
    const agreeInput = document.getElementById("agree");

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const method = methodInput ? methodInput.value : "request";

    if (!name) { alert("Введите ваше имя."); nameInput.focus(); return; }
    if (!phone) { alert("Введите номер телефона."); phoneInput.focus(); return; }
    if (agreeInput && !agreeInput.checked) { alert("Подтвердите политику конфиденциальности."); return; }

    const submitButton = contactForm.querySelector(".btn-submit");
    const oldText = submitButton ? submitButton.textContent : "";
    if (submitButton) { submitButton.disabled = true; submitButton.textContent = "Отправка..."; }

    const methodLabel = method === "telegram" ? "Telegram" : method === "whatsapp" ? "WhatsApp" : "Заявка (без мессенджера)";

    try {
      const response = await fetch(CONTACT_APPLY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, contact: phone, message: "", subject: "Способ связи: " + methodLabel, source_page: "Главная"
        })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Ошибка отправки заявки");

      alert("Заявка успешно отправлена!");
      contactForm.reset();
      selectContactMethod("telegram");

      if (method === "telegram" && contactChannels.telegram) {
        const text = encodeURIComponent(`Здравствуйте! Меня зовут ${name}, телефон: ${phone}. Хочу обсудить проект.`);
        window.open(contactChannels.telegram + "?text=" + text, "_blank");
      }
      if (method === "whatsapp" && contactChannels.whatsapp) {
        const text = encodeURIComponent(`Здравствуйте! Меня зовут ${name}, телефон: ${phone}. Хочу обсудить проект.`);
        window.open(contactChannels.whatsapp + "?text=" + text, "_blank");
      }

    } catch (error) {
      console.error("Ошибка отправки:", error);
      alert("Не удалось отправить заявку. Попробуйте ещё раз.");
    } finally {
      if (submitButton) { submitButton.disabled = false; submitButton.textContent = oldText || "Отправить"; }
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  selectContactMethod("telegram");
});
