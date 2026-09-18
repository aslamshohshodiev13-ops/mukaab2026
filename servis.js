/* NAVBAR */
window.addEventListener("scroll",()=>{
    const navbar=document.querySelector(".navbar");
    if(window.scrollY>40){ navbar.style.background="rgba(0,0,0,0.82)"; }
    else{ navbar.style.background="rgba(0,0,0,0.45)"; }
});

/* =========================
   LANGUAGE SWITCH
   ========================= */
const translations = {
    ru: {
        home: "Главная", interiors: "Интерьеры", architecture: "Архитектура",
        services: "Услуги", portfolio: "Портфолио", contacts: "Контакты",
        contactBtn: "Написать нам", servicesTitle: "Услуги", moreBtn: "Подробнее",
        footerContacts: "Контакты", socials: "Социальные сети",
        privacy: "Политика конфиденциальности", privacyTitle: "Политика конфиденциальности",
        general: "Общие положения"
    },
    en: {
        home: "Home", interiors: "Interiors", architecture: "Architecture",
        services: "Services", portfolio: "Portfolio", contacts: "Contacts",
        contactBtn: "Contact Us", servicesTitle: "Services", moreBtn: "More",
        footerContacts: "Contacts", socials: "Social Media",
        privacy: "Privacy Policy", privacyTitle: "Privacy Policy",
        general: "General Provisions"
    }
};

let lang = 'ru';

function setLang(l){
    lang = l;
    document.getElementById('btn-ru')?.classList.toggle('active', l==='ru');
    document.getElementById('btn-en')?.classList.toggle('active', l==='en');
    document.getElementById('mob-btn-ru')?.classList.toggle('active', l==='ru');
    document.getElementById('mob-btn-en')?.classList.toggle('active', l==='en');
    document.querySelectorAll("[data-i18n]").forEach(el=>{
        const key = el.getAttribute("data-i18n");
        if(translations[l][key]){ el.innerHTML = translations[l][key]; }
    });
    if (SERVICES.length) renderServices();
}

/* =========================
   MOBILE MENU
   ========================= */
function toggleMenu(){
    document.getElementById("mobileMenu").classList.toggle("active");
}
function toggleContacts(){
    document.getElementById("contactMenu").classList.toggle("active");
}
document.addEventListener("click", e => {
    const d = document.querySelector('.contact-dropdown');
    if (d && !d.contains(e.target)) document.getElementById('contactMenu')?.classList.remove('active');
});
function toggleMobileContacts(){
    document.getElementById("mobileContactMenu").classList.toggle("active");
}

/* ───────── PRIVACY MODAL ───────── */
function openPrivacy() {
    document.getElementById('privacyOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closePrivacy() {
    document.getElementById('privacyOverlay').classList.remove('open');
    document.body.style.overflow = '';
}
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePrivacy(); });

/* ══════════════════════════════════════════════════════════
   Карточки услуг подтягиваются из админ-панели (type=services)
   ══════════════════════════════════════════════════════════ */
const SERVICES_API = "mukaab-admin-backend/public/list.php?type=services";
let SERVICES = [];

function svEsc(s){return (s??'').toString().replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}

async function loadServices() {
    const grid = document.getElementById('servicesGrid');
    try {
        const res = await fetch(SERVICES_API, { cache: 'no-store' });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Request failed');
        SERVICES = data.items || [];
        renderServices();
    } catch (e) {
        grid.innerHTML = `<div style="grid-column:1/-1;padding:60px 0;text-align:center;color:rgba(255,255,255,.4);font-size:13px;">${lang==='ru'?'Не удалось загрузить услуги.':'Failed to load services.'}</div>`;
    }
}

function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!SERVICES.length) {
        grid.innerHTML = `<div style="grid-column:1/-1;padding:60px 0;text-align:center;color:rgba(255,255,255,.4);font-size:13px;">${lang==='ru'?'Пока нет опубликованных услуг.':'No published services yet.'}</div>`;
        return;
    }
    grid.innerHTML = SERVICES.map(x => {
        const size = ['large','medium','small'].includes(x.filter_cat) ? x.filter_cat : 'small';
        const title = svEsc(x['title_'+lang] || x.title_ru);
        const link = svEsc(x.location || '#');
        const img = svEsc(x.image || '');
        return `<div class="service-card ${size}">
            <img src="${img}" alt="">
            <div class="overlay"></div>
            <div class="service-content">
                <h3>${title}</h3>
                <a href="${link}" class="service-btn">${translations[lang].moreBtn}</a>
            </div>
        </div>`;
    }).join('');
}

loadServices();

// ── Подтягиваем футер (телефон/email/адрес) из настроек админки ──
fetch("mukaab-admin-backend/public/settings.php", { cache: 'no-store' })
  .then(r => r.json())
  .then(d => {
    const s = d && d.settings ? d.settings : {};
    if (s.contact_phone) { const el = document.getElementById('footerPhone'); if (el) el.textContent = s.contact_phone; }
    if (s.contact_email) { const el = document.getElementById('footerEmail'); if (el) el.textContent = s.contact_email; }
    if (s.address) { const el = document.getElementById('footerAddress'); if (el) el.textContent = s.address; }
    if (s.footer_ru) { const el = document.getElementById('footerCopyright'); if (el) el.textContent = s.footer_ru; }
    if (s.company_unp) { const el = document.getElementById('footerUnp'); if (el) el.textContent = s.company_unp; }
    const socialMap = {
      socialInstagram: s.social_instagram, socialBehance: s.social_behance,
      socialYoutube: s.social_youtube, socialVk: s.social_vk,
      socialPinterest: s.social_pinterest, socialLinkedin: s.social_linkedin,
      socialTelegram: s.social_telegram_channel || (s.telegram ? (/^https?:/.test(s.telegram) ? s.telegram : 'https://t.me/'+s.telegram.replace('@','')) : '')
    };
    Object.keys(socialMap).forEach(id => {
      const url = socialMap[id];
      if (url) { const el = document.getElementById(id); if (el) el.href = url; }
    });
  })
  .catch(() => {});
