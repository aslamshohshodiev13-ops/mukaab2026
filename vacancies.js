/* ─── i18n ─── */
const T = {
    ru: {
        nav1:'Главная', nav2:'Интерьеры', nav3:'Архитектура', nav4:'Услуги', nav5m:'Портфолио',
        navCta:'Написать нам',
        heroLabel:'Команда', title:'Вакансии',
        subtitle:'Ищем талантливых людей, которые разделяют нашу страсть к архитектуре и деталям.',
        sec1:'Проектирование и дизайн', sec2:'Производство и надзор', sec3:'Стажировка',
        applyBtn:'Откликнуться',
        j8h:'Не нашли подходящую?',
        j8desc:'Отправьте резюме и портфолио — мы всегда открыты для талантливых людей. Рассмотрим возможности для вас лично.',
        j8btn:'Отправить резюме',
        ctah:'Готовы стать частью команды?', ctap:'Пишите — ответим в течение 24 часов', ctabtn:'Написать нам',
        privacyLink:'Политика конфиденциальности',
        pmLabel:'Документ', pmTitle:'Политика конфиденциальности'
    },
    en: {
        nav1:'Home', nav2:'Interiors', nav3:'Architecture', nav4:'Services', nav5m:'Portfolio',
        navCta:'Contact Us',
        heroLabel:'Team', title:'Careers',
        subtitle:'We are looking for talented people who share our passion for architecture and details.',
        sec1:'Design & Architecture', sec2:'Production & Supervision', sec3:'Internship',
        applyBtn:'Apply',
        j8h:"Didn't find a match?",
        j8desc:"Send your CV and portfolio — we're always open to talented people. We'll find the right opportunity for you.",
        j8btn:'Send CV',
        ctah:'Ready to join the team?', ctap:'Write to us — we reply within 24 hours', ctabtn:'Contact Us',
        privacyLink:'Privacy Policy',
        pmLabel:'Document', pmTitle:'Privacy Policy'
    }
};

const PM = {
    ru: { body: `<style>
#pmBody h2{font-size:22px;font-weight:800;margin-bottom:4px;}
#pmBody .pm-org{font-size:13px;color:rgba(255,255,255,.45);margin-bottom:28px;}
#pmBody h3{font-size:15px;font-weight:700;color:#fff;margin:26px 0 10px;padding-left:14px;border-left:2px solid #fff;}
#pmBody .pm-section:first-of-type h3{margin-top:0;}
#pmBody p{font-size:13px;color:rgba(255,255,255,.65);line-height:1.85;margin-bottom:10px;}
#pmBody ul{margin:8px 0 14px;list-style:none;}
#pmBody ul li{font-size:13px;color:rgba(255,255,255,.62);padding:6px 0 6px 18px;position:relative;border-bottom:1px solid rgba(255,255,255,.04);line-height:1.6;}
#pmBody ul li:last-child{border-bottom:none;}
#pmBody ul li::before{content:'—';position:absolute;left:0;color:#fff;font-size:11px;top:8px;}
#pmBody strong{color:#fff;font-weight:600;}
#pmBody .pm-section{margin-bottom:30px;padding-bottom:2px;border-bottom:1px solid rgba(255,255,255,.04);}
#pmBody .pm-contacts{padding:0;margin:14px 0 10px;display:flex;flex-direction:column;gap:8px;}
#pmBody .pm-contact-row{display:flex;align-items:center;gap:4px;padding:14px 16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;}
#pmBody .pm-key{min-width:110px;flex-shrink:0;color:rgba(255,255,255,.55);font-weight:600;letter-spacing:.04em;font-size:13px;}
#pmBody .pm-colon{width:12px;flex-shrink:0;color:rgba(255,255,255,.55);}
#pmBody .pm-contact-row strong,#pmBody .pm-contact-row a{flex:1;text-align:right;color:#fff;}
#pmBody a{color:#fff !important;text-decoration:underline;}
#pmBody a:hover{opacity:.8;}
</style>
<div class="pm-section"><h3>Общие положения</h3><p>Настоящая Политика конфиденциальности определяет порядок обработки персональных данных и меры по их защите, предпринимаемые <strong>ООО «Мукааб»</strong> (далее — Оператор), в соответствии с законодательством Республики Беларусь. Оператор уважает право пользователей на неприкосновенность частной жизни и обеспечивает защиту персональных данных при использовании сайта.</p></div>
<div class="pm-section"><h3>Основные понятия</h3><ul><li><strong>Персональные данные</strong> — любая информация, относящаяся к идентифицированному или идентифицируемому физическому лицу.</li><li><strong>Обработка персональных данных</strong> — любые действия с данными, включая сбор, хранение, использование, передачу и удаление.</li><li><strong>Пользователь</strong> — любое лицо, посещающее сайт.</li></ul></div>
<div class="pm-section"><h3>Персональные данные, которые мы собираем</h3><ul><li>Имя и фамилия</li><li>Номер телефона</li><li>Адрес электронной почты</li><li>Ссылки на социальные сети</li><li>Фотографии (при передаче)</li><li>IP-адрес, cookies, действия на сайте</li></ul></div>
<div class="pm-section"><h3>Цели обработки данных</h3><ul><li>Обработка заявок и обратная связь</li><li>Предоставление информации об услугах</li><li>Подготовка коммерческих предложений</li><li>Улучшение работы сайта</li><li>Маркетинговые коммуникации</li></ul></div>
<div class="pm-section"><h3>Правовые основания обработки</h3><ul><li>Согласие пользователя</li><li>Заключение и исполнение договора</li><li>Требования законодательства Республики Беларусь</li></ul></div>
<div class="pm-section"><h3>Условия обработки и передачи данных</h3><p>Данные не передаются третьим лицам без согласия пользователя. Исключение — сервисы аналитики и CRM, обеспечивающие работу сайта.</p></div>
<div class="pm-section"><h3>Срок хранения данных</h3><p>Персональные данные хранятся не дольше, чем необходимо для целей обработки, либо до момента отзыва согласия пользователем.</p></div>
<div class="pm-section"><h3>Права пользователя</h3><ul><li>Получать информацию о своих персональных данных</li><li>Требовать их изменения или удаления</li><li>Отозвать согласие на обработку</li><li>Ограничить обработку данных</li></ul><p style="margin-top:14px">Для реализации прав: <a href="mailto:mukaabcompany@gmail.com">mukaabcompany@gmail.com</a></p></div>
<div class="pm-section"><h3>Cookies и аналитика</h3><p>Сайт использует cookies для корректной работы, анализа поведения пользователей и персонализации контента. Пользователь может отключить cookies в настройках браузера.</p></div>
<div class="pm-section"><h3>Защита данных</h3><p>Оператор принимает необходимые организационные и технические меры для защиты персональных данных от несанкционированного доступа.</p></div>
<div class="pm-section"><h3>Изменение политики</h3><p>Оператор вправе вносить изменения в настоящую Политику. Актуальная версия всегда доступна на сайте.</p></div>
<div class="pm-section" style="border-bottom:none;margin-bottom:0"><h3>Контакты</h3><div class="pm-contacts">
<div class="pm-contact-row"><span class="pm-key">Организация</span><span class="pm-colon">:</span><strong>ООО «Мукааб»</strong></div>
<div class="pm-contact-row"><span class="pm-key">Email</span><span class="pm-colon">:</span><a href="mailto:mukaabcompany@gmail.com">mukaabcompany@gmail.com</a></div>
<div class="pm-contact-row"><span class="pm-key">Телефон</span><span class="pm-colon">:</span><a href="tel:+375339161111">+375 (33) 916-11-11</a></div>
<div class="pm-contact-row"><span class="pm-key">Адрес</span><span class="pm-colon">:</span><strong>Минск, Беларусь</strong></div>
</div></div>` },
    en: { body: `<style>
#pmBody h2{font-size:22px;font-weight:800;margin-bottom:4px;}
#pmBody .pm-org{font-size:13px;color:rgba(255,255,255,.45);margin-bottom:28px;}
#pmBody h3{font-size:15px;font-weight:700;color:#fff;margin:26px 0 10px;padding-left:14px;border-left:2px solid #fff;}
#pmBody .pm-section:first-of-type h3{margin-top:0;}
#pmBody p{font-size:13px;color:rgba(255,255,255,.65);line-height:1.85;margin-bottom:10px;}
#pmBody ul{margin:8px 0 14px;list-style:none;}
#pmBody ul li{font-size:13px;color:rgba(255,255,255,.62);padding:6px 0 6px 18px;position:relative;border-bottom:1px solid rgba(255,255,255,.04);line-height:1.6;}
#pmBody ul li:last-child{border-bottom:none;}
#pmBody ul li::before{content:'—';position:absolute;left:0;color:#fff;font-size:11px;top:8px;}
#pmBody strong{color:#fff;font-weight:600;}
#pmBody .pm-section{margin-bottom:30px;padding-bottom:2px;border-bottom:1px solid rgba(255,255,255,.04);}
#pmBody .pm-contacts{padding:0;margin:14px 0 10px;display:flex;flex-direction:column;gap:8px;}
#pmBody .pm-contact-row{display:flex;align-items:center;gap:4px;padding:14px 16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;}
#pmBody .pm-key{min-width:110px;flex-shrink:0;color:rgba(255,255,255,.55);font-weight:600;letter-spacing:.04em;font-size:13px;}
#pmBody .pm-colon{width:12px;flex-shrink:0;color:rgba(255,255,255,.55);}
#pmBody .pm-contact-row strong,#pmBody .pm-contact-row a{flex:1;text-align:right;color:#fff;}
#pmBody a{color:#fff !important;text-decoration:underline;}
#pmBody a:hover{opacity:.8;}
</style>
<div class="pm-section"><h3>General Provisions</h3><p>This Privacy Policy defines the procedure for processing personal data and the measures taken to protect it by <strong>Mukaab LLC</strong> (the Operator), in accordance with the legislation of the Republic of Belarus. The Operator respects users' right to privacy and ensures the protection of personal data when using the website.</p></div>
<div class="pm-section"><h3>Key Definitions</h3><ul><li><strong>Personal Data</strong> — any information relating to an identified or identifiable individual.</li><li><strong>Data Processing</strong> — any actions with data, including collection, storage, use, transfer and deletion.</li><li><strong>User</strong> — any person visiting the website.</li></ul></div>
<div class="pm-section"><h3>Data We Collect</h3><ul><li>Name and surname</li><li>Phone number</li><li>Email address</li><li>Social media links</li><li>Photos (if provided)</li><li>IP address, cookies, site activity</li></ul></div>
<div class="pm-section"><h3>Purposes of Processing</h3><ul><li>Processing requests and feedback</li><li>Providing information about services</li><li>Preparing commercial proposals</li><li>Improving website performance</li><li>Marketing communications</li></ul></div>
<div class="pm-section"><h3>Legal Grounds</h3><ul><li>User consent</li><li>Conclusion and execution of a contract</li><li>Requirements of Belarusian legislation</li></ul></div>
<div class="pm-section"><h3>Data Transfer</h3><p>Data is not transferred to third parties without user consent, except for analytics services and CRM systems supporting site operations.</p></div>
<div class="pm-section"><h3>Retention Period</h3><p>Personal data is stored no longer than necessary for processing purposes, or until the user withdraws consent.</p></div>
<div class="pm-section"><h3>User Rights</h3><ul><li>Access information about your personal data</li><li>Request its correction or deletion</li><li>Withdraw consent to processing</li><li>Restrict data processing</li></ul><p style="margin-top:14px">To exercise these rights: <a href="mailto:mukaabcompany@gmail.com">mukaabcompany@gmail.com</a></p></div>
<div class="pm-section"><h3>Cookies &amp; Analytics</h3><p>The website uses cookies for correct functioning, user behaviour analysis and content personalisation. Users can disable cookies in their browser settings.</p></div>
<div class="pm-section"><h3>Data Security</h3><p>The Operator takes the necessary organisational and technical measures to protect personal data from unauthorised access.</p></div>
<div class="pm-section"><h3>Policy Updates</h3><p>The Operator may amend this Policy. The current version is always available on the website.</p></div>
<div class="pm-section" style="border-bottom:none;margin-bottom:0"><h3>Contacts</h3><div class="pm-contacts">
<div class="pm-contact-row"><span class="pm-key">Company</span><span class="pm-colon">:</span><strong>Mukaab LLC</strong></div>
<div class="pm-contact-row"><span class="pm-key">Email</span><span class="pm-colon">:</span><a href="mailto:mukaabcompany@gmail.com">mukaabcompany@gmail.com</a></div>
<div class="pm-contact-row"><span class="pm-key">Phone</span><span class="pm-colon">:</span><a href="tel:+375339161111">+375 (33) 916-11-11</a></div>
<div class="pm-contact-row"><span class="pm-key">Address</span><span class="pm-colon">:</span><strong>Minsk, Belarus</strong></div>
</div></div>` }
};

let lang = 'ru';

function setLang(l) {
    lang = l;
    document.getElementById('btn-ru').classList.toggle('active', l==='ru');
    document.getElementById('btn-en').classList.toggle('active', l==='en');
    document.getElementById('mob-btn-ru').classList.toggle('active', l==='ru');
    document.getElementById('mob-btn-en').classList.toggle('active', l==='en');
    const merged = Object.assign({}, T[l], PM[l]);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.getAttribute('data-i18n');
        if (merged[k] !== undefined) el.innerHTML = merged[k];
    });
    const pov = document.getElementById('privacyOverlay');
    if (pov && pov.style.visibility === 'visible') document.getElementById('pmBody').innerHTML = PM[l].body;
    localStorage.setItem('lang', l);
}

function toggleContacts() { document.getElementById('contactMenu').classList.toggle('active'); }
document.addEventListener('click', e => {
    const d = document.querySelector('.contact-dropdown');
    if(d && !d.contains(e.target)) document.getElementById('contactMenu').classList.remove('active');
});

function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const burger = document.getElementById('burger');
    const open = menu.classList.toggle('open');
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
}
document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.remove('open');
        document.getElementById('burger').classList.remove('open');
        document.body.style.overflow = '';
    });
});
function toggleMobileContacts() { document.getElementById('mobileContactMenu').classList.toggle('active'); }

/* ─── APPLY MODAL ─── */
function openApply(position) {
    document.getElementById('applyTitle').textContent = position;
    document.getElementById('applyError').style.display = 'none';
    document.getElementById('applySuccess').style.display = 'none';
    document.getElementById('aName').value = '';
    document.getElementById('aContact').value = '';
    document.getElementById('aPortfolio').value = '';
    document.getElementById('aMessage').value = '';
    const ov = document.getElementById('applyOverlay');
    const mo = document.getElementById('applyModal');
    ov.style.opacity = '1'; ov.style.visibility = 'visible';
    mo.style.transform = 'translateY(0) scale(1)';
    document.body.style.overflow = 'hidden';
}
function closeApply() {
    const ov = document.getElementById('applyOverlay');
    const mo = document.getElementById('applyModal');
    ov.style.opacity = '0'; ov.style.visibility = 'hidden';
    mo.style.transform = 'translateY(24px) scale(.97)';
    document.body.style.overflow = '';
}
async function submitApply() {
    const name = document.getElementById('aName').value.trim();
    const contact = document.getElementById('aContact').value.trim();
    const portfolioLink = document.getElementById('aPortfolio').value.trim();
    const message = document.getElementById('aMessage').value.trim();
    const err = document.getElementById('applyError');
    const suc = document.getElementById('applySuccess');
    if (!name || !contact) { err.style.display = 'block'; return; }
    err.style.display = 'none';
    const position = document.getElementById('applyTitle').textContent || 'Вакансия';
    const fullMessage = [message, portfolioLink ? ('Портфолио: ' + portfolioLink) : ''].filter(Boolean).join(' · ');
    try {
        const res = await fetch("mukaab-admin-backend/public/apply.php", {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, contact, message: fullMessage, subject: position, source_page: 'Вакансии' })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'error');
        suc.style.display = 'block';
        setTimeout(() => closeApply(), 2500);
    } catch (e) {
        err.textContent = 'Ошибка отправки, попробуйте ещё раз';
        err.style.display = 'block';
    }
}
document.getElementById('applyOverlay').addEventListener('click', e => { if(e.target === document.getElementById('applyOverlay')) closeApply(); });

/* ─── PRIVACY MODAL ─── */
function openPrivacy() {
    document.getElementById('pmBody').innerHTML = PM[lang].body;
    const ov = document.getElementById('privacyOverlay');
    const mo = document.getElementById('privacyModal');
    ov.style.opacity = '1'; ov.style.visibility = 'visible';
    mo.style.transform = 'translateY(0) scale(1)';
    document.body.style.overflow = 'hidden';
}
function closePrivacy() {
    const ov = document.getElementById('privacyOverlay');
    const mo = document.getElementById('privacyModal');
    ov.style.opacity = '0'; ov.style.visibility = 'hidden';
    mo.style.transform = 'translateY(24px) scale(.97)';
    document.body.style.overflow = '';
}
document.getElementById('privacyOverlay').addEventListener('click', e => { if(e.target === document.getElementById('privacyOverlay')) closePrivacy(); });
document.addEventListener('keydown', e => { if(e.key==='Escape'){closePrivacy();closeApply();} });

window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

const saved = localStorage.getItem('lang');
if (saved) setLang(saved);

// ══════════════════════════════════════════════════════════
// Вакансии: подтягиваются из админ-панели (mukaab-admin-backend)
// ══════════════════════════════════════════════════════════
const VAC_API = "mukaab-admin-backend/public/list.php?type=vacancies";
const VAC_SECTION_LABELS = { design:{ru:'Проектирование и дизайн',en:'Design & Architecture'}, production:{ru:'Производство и надзор',en:'Production & Supervision'}, intern:{ru:'Стажировка',en:'Internship'} };
const VAC_SECTION_ORDER = ['design','production','intern'];
let VACANCIES = [];

function vEsc(s){return (s??'').toString().replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}

async function loadVacancies() {
  const panel = document.getElementById('vacanciesPanel');
  try {
    const res = await fetch(VAC_API, { cache: 'no-store' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    VACANCIES = data.items || [];
    renderVacancies();
  } catch (e) {
    panel.innerHTML = `<div style="grid-column:1/-1;padding:60px 0;text-align:center;color:rgba(255,255,255,.4);font-size:13px;">${lang==='ru'?'Не удалось загрузить вакансии.':'Failed to load vacancies.'}</div>`;
  }
}

function renderVacancies() {
  const panel = document.getElementById('vacanciesPanel');
  if (!VACANCIES.length) {
    panel.innerHTML = `<div style="grid-column:1/-1;padding:60px 0;text-align:center;color:rgba(255,255,255,.4);font-size:13px;">${lang==='ru'?'Сейчас открытых вакансий нет.':'No open positions right now.'}</div>`;
    return;
  }
  let html = '';
  VAC_SECTION_ORDER.forEach(sec => {
    const items = VACANCIES.filter(v => (v.filter_cat || 'production') === sec);
    if (!items.length) return;
    html += `<div class="panel-section-label"><span>${VAC_SECTION_LABELS[sec][lang]}</span></div>`;
    items.forEach(v => {
      const title = v['title_' + lang] || v.title_ru;
      const badge = v['badge_' + lang] || v['badge_ru'] || '';
      const desc = v['description_' + lang] || v.description_ru;
      const stats = v['stats_' + lang] || [];
      const reqs = v['requirements_' + lang] || [];
      const note = v['note_' + lang] || v.note_ru || '';
      const wideClass = v.featured ? ' wide featured' : '';
      const badgeClass = sec === 'intern' ? 'green' : (v.featured ? 'gold' : '');
      const statsHtml = stats.length ? `<div class="service-text">${stats.map(s=>`<div class="row"><span>${vEsc(s.label)}</span><span class="row-val">${vEsc(s.value)}</span></div>`).join('')}</div>` : '';
      const descHtml = (!stats.length && desc) ? `<div class="service-description"><p>${vEsc(desc)}</p></div>` : '';
      const reqsHtml = reqs.length ? `<ul${v.featured?' class="two-col-list"':''}>${reqs.map(r=>`<li>${vEsc(r)}</li>`).join('')}</ul>` : '';
      const noteHtml = note ? `<div class="premium-note">${vEsc(note)}</div>` : '';
      html += `<div class="service-box${wideClass}">
        <div class="service-top">
          <h2>${vEsc(title)}</h2>
          ${badge?`<span class="vac-badge ${badgeClass}">${vEsc(badge)}</span>`:''}
        </div>
        ${statsHtml}
        ${descHtml}
        ${reqsHtml}
        ${noteHtml}
        <button class="vac-apply" onclick="openApply('${vEsc(title).replace(/'/g,"\\'")}')">${lang==='ru'?'Откликнуться':'Apply'}</button>
      </div>`;
    });
  });
  panel.innerHTML = html;
}

// перерисовать при смене языка (после встроенного setLang)
const _origSetLangForVac = setLang;
window.setLang = function(l) { _origSetLangForVac(l); if (VACANCIES.length) renderVacancies(); };

loadVacancies();
