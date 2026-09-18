/* ═══════════════════════════════════
   MUKAAB — Портфолио (динамически из админ-панели)
════════════════════════════════════ */

const API_BASE = "mukaab-admin-backend/public/list.php";

const CAT_LABELS = {
    interior:   { ru:'Интерьер',    en:'Interior' },
    arch:       { ru:'Архитектура', en:'Architecture' },
    furniture:  { ru:'Мебель',      en:'Furniture' },
    commercial: { ru:'Коммерческий',en:'Commercial' },
    '':         { ru:'Проект',      en:'Project' },
};
const SECTION_ORDER = ['interior','arch','furniture','commercial',''];
const SECTION_LABELS = {
    interior:   { ru:'Интерьерный дизайн', en:'Interior Design' },
    arch:       { ru:'Архитектура и фасады', en:'Architecture & Façades' },
    furniture:  { ru:'Мебель', en:'Furniture' },
    commercial: { ru:'Коммерческие объекты', en:'Commercial Projects' },
    '':         { ru:'Другие проекты', en:'More Projects' },
};

function isVideoSrc(src){ return /\.(mp4|webm|mov)(\?.*)?$/i.test(src||''); }

let PROJECTS = [];

let heroOverride = null;
let FILTER_CATS = null;

async function loadFilterCategories() {
    try {
        const res = await fetch(`${API_BASE}?type=portfolio_cat`, { cache: 'no-store' });
        const data = await res.json();
        FILTER_CATS = data.items || [];
        if (FILTER_CATS.length) renderFilterBar();
    } catch (e) { /* остаются статичные кнопки */ }
}

function renderFilterBar() {
    const bar = document.getElementById('filterBar');
    const label = bar.querySelector('.filter-label');
    const urlCat = new URLSearchParams(window.location.search).get('cat');
    bar.innerHTML = '';
    bar.appendChild(label);
    FILTER_CATS.forEach((c, i) => {
        const btn = document.createElement('button');
        const slug = c.location || 'all';
        const isActiveFromUrl = urlCat ? (slug === urlCat) : (i === 0);
        btn.className = 'filter-btn' + (isActiveFromUrl ? ' active' : '');
        btn.dataset.cat = slug;
        btn.textContent = (lang === 'en' && c.title_en) ? c.title_en : c.title_ru;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyActiveFilter();
        });
        bar.appendChild(btn);
    });
}

async function loadProjects() {
    const grid = document.getElementById('projectGrid');
    grid.innerHTML = `<div style="grid-column:1/-1;padding:60px 0;text-align:center;color:rgba(255,255,255,.4);font-size:13px;">${lang==='ru'?'Загрузка проектов…':'Loading projects…'}</div>`;
    try {
        const res = await fetch(`${API_BASE}?type=portfolio`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Request failed');
        const items = data.items || [];

        const heroItem = items.find(x => x.filter_cat === 'hero');
        if (heroItem) { heroOverride = heroItem; applyHeroOverride(); }

        PROJECTS = items.filter(x => x.filter_cat !== 'hero').map(mapItem);
        renderProjects();
    } catch (e) {
        grid.innerHTML = `<div style="grid-column:1/-1;padding:60px 0;text-align:center;color:rgba(255,255,255,.4);font-size:13px;">${lang==='ru'?'Не удалось загрузить проекты.':'Failed to load projects.'}</div>`;
    }
}

function applyHeroOverride() {
    if (!heroOverride) return;
    const t = heroOverride['title_' + lang] || heroOverride.title_ru;
    const d = heroOverride['description_' + lang] || heroOverride.description_ru;
    if (t) document.getElementById('heroTitle').textContent = t;
    if (d) document.getElementById('heroSub').textContent = d;
    if (heroOverride.image) document.getElementById('heroImg').src = heroOverride.image;
}

function mapItem(x) {
    const filterCat = x.filter_cat || '';
    const meta = [];
    if (x.location) meta.push({ ru:['Локация', x.location], en:['Location', x.location] });
    if (x.area) meta.push({ ru:['Площадь', x.area], en:['Area', x.area] });
    meta.push({ ru:['Тип', CAT_LABELS[filterCat].ru], en:['Type', CAT_LABELS[filterCat].en] });
    return {
        id: x.id,
        filterCat,
        cat:   { ru: x.category || CAT_LABELS[filterCat].ru, en: CAT_LABELS[filterCat].en },
        title: { ru: x.title_ru || '', en: x.title_en || x.title_ru || '' },
        desc:  { ru: x.description_ru || '', en: x.description_en || x.description_ru || '' },
        images: (x.gallery && x.gallery.length) ? x.gallery : (x.image ? [x.image] : []),
        meta,
        tags: x.tags || [],
        featured: !!x.featured,
    };
}

function renderProjects() {
    const grid = document.getElementById('projectGrid');
    if (!PROJECTS.length) {
        grid.innerHTML = `<div style="grid-column:1/-1;padding:60px 0;text-align:center;color:rgba(255,255,255,.4);font-size:13px;">${lang==='ru'?'Пока нет опубликованных проектов.':'No published projects yet.'}</div>`;
        return;
    }
    let html = '';
    SECTION_ORDER.forEach(cat => {
        const items = PROJECTS.map((p,i)=>({p,i})).filter(o => o.p.filterCat === cat);
        if (!items.length) return;
        html += `<div class="panel-section-label" style="grid-column:1/-1"><span>${SECTION_LABELS[cat][lang]}</span></div>`;
        items.forEach(({p,i}) => {
            const cover = p.images[0] || '';
            const coverIsVideo = isVideoSrc(cover);
            const coverHtml = coverIsVideo
                ? `<video src="${esc(cover)}" muted loop playsinline onmouseover="this.play()" onmouseout="this.pause()"></video>`
                : `<img src="${esc(cover)}" alt="" onerror="this.style.display='none'">`;
            const metaSpans = [
                p.meta.find(m=>m.ru[0]==='Локация') ? `<span>📍 ${esc(p.meta.find(m=>m.ru[0]==='Локация')[lang][1])}</span>` : '',
                p.meta.find(m=>m.ru[0]==='Площадь') ? `<span>📐 ${esc(p.meta.find(m=>m.ru[0]==='Площадь')[lang][1])}</span>` : '',
            ].join('');
            html += `<div class="project-card${p.featured?' featured':''}" data-cat="${p.filterCat}" data-project="${i}" onclick="openProject(${i})">
                <div class="card-thumb">
                    ${coverHtml}
                    ${coverIsVideo?'<div class="card-video-badge">▶</div>':''}
                    <div class="card-thumb-overlay">
                        <div class="open-label">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                            <span>${lang==='ru'?'Открыть проект':'Open project'}</span>
                        </div>
                    </div>
                    <div class="card-tag">${esc(p.cat[lang])}</div>
                </div>
                <div class="card-body">
                    <div class="card-title">${esc(p.title[lang])}</div>
                    <div class="card-meta">${metaSpans}</div>
                    <div class="card-desc">${esc(truncate(p.desc[lang], 140))}</div>
                </div>
            </div>`;
        });
    });
    grid.innerHTML = html;
    applyActiveFilter();
}

function esc(s){return (s??'').toString().replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function truncate(s,n){s=s||'';return s.length>n?s.slice(0,n).trim()+'…':s}

function applyActiveFilter() {
    const activeBtn = document.querySelector('.filter-btn.active');
    const cat = activeBtn ? activeBtn.dataset.cat : 'all';
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
    });
    document.querySelectorAll('.panel-section-label').forEach(label => {
        let sib = label.nextElementSibling;
        let anyVisible = false;
        while (sib && !sib.classList.contains('panel-section-label')) {
            if (sib.classList.contains('project-card') && sib.style.display !== 'none') anyVisible = true;
            sib = sib.nextElementSibling;
        }
        label.style.display = anyVisible ? '' : 'none';
    });
}

/* ════ GALLERY STATE ════ */
let galIdx = 0;
let galTotal = 0;

function openProject(idx) {
    const p = PROJECTS[idx];
    if (!p) return;
    const l = lang;

    galIdx = 0; galTotal = p.images.length || 1;
    const track = document.getElementById('galleryTrack');
    const strip = document.getElementById('thumbStrip');
    track.innerHTML = '';
    strip.innerHTML = '';
    const images = p.images.length ? p.images : [''];
    images.forEach((src, i) => {
        const video = isVideoSrc(src);
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        slide.innerHTML = video
            ? `<video src="${esc(src)}" controls playsinline style="width:100%;height:100%;object-fit:contain;background:#000"></video><div class="gallery-overlay"></div>`
            : `<img src="${esc(src)}" alt=""><div class="gallery-overlay"></div>`;
        track.appendChild(slide);

        const th = document.createElement('div');
        th.className = 'thumb-item' + (i===0?' active':'');
        th.innerHTML = video ? `<video src="${esc(src)}" muted></video><span class="thumb-play">▶</span>` : `<img src="${esc(src)}" alt="">`;
        th.onclick = () => goSlide(i);
        strip.appendChild(th);
    });
    updateGallery();

    document.getElementById('mCat').textContent   = p.cat[l];
    document.getElementById('mTitle').textContent  = p.title[l];
    document.getElementById('mDesc').textContent   = p.desc[l];

    const tags = document.getElementById('mTags');
    tags.innerHTML = p.tags.map(t=>`<span class="proj-tag">${esc(t)}</span>`).join('');

    const meta = document.getElementById('mMeta');
    meta.innerHTML = p.meta.map(m=>
        `<div class="proj-meta-row">
            <span class="proj-meta-key">${esc(m[l][0])}</span>
            <span class="proj-meta-val">${esc(m[l][1])}</span>
        </div>`
    ).join('');

    const ov = document.getElementById('projOverlay');
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeProject() {
    document.getElementById('projOverlay').classList.remove('open');
    document.body.style.overflow = '';
    document.querySelectorAll('#galleryTrack video').forEach(v=>v.pause());
}

function handleOverlayClick(e) {
    if (e.target === document.getElementById('projOverlay')) closeProject();
}

function goSlide(i) {
    document.querySelectorAll('#galleryTrack video').forEach(v=>v.pause());
    galIdx = i;
    updateGallery();
}

function galleryPrev() { goSlide((galIdx - 1 + galTotal) % galTotal); }
function galleryNext() { goSlide((galIdx + 1) % galTotal); }

function updateGallery() {
    document.getElementById('galleryTrack').style.transform = `translateX(-${galIdx*100}%)`;
    document.getElementById('galleryCounter').textContent = `${galIdx+1} / ${galTotal}`;
    document.querySelectorAll('.thumb-item').forEach((t,i)=>
        t.classList.toggle('active', i===galIdx));
}

document.addEventListener('keydown', e => {
    const ov = document.getElementById('projOverlay');
    if (ov.classList.contains('open')) {
        if (e.key==='ArrowRight') galleryNext();
        if (e.key==='ArrowLeft')  galleryPrev();
        if (e.key==='Escape') closeProject();
    } else {
        if (e.key==='Escape') closePrivacy();
    }
});

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        applyActiveFilter();
    });
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
function toggleContacts() { document.getElementById('contactMenu').classList.toggle('active'); }
document.addEventListener('click', e => {
    const d = document.querySelector('.contact-dropdown');
    if (d && !d.contains(e.target)) document.getElementById('contactMenu').classList.remove('active');
});
function toggleMobileContacts() { document.getElementById('mobileContactMenu').classList.toggle('active'); }
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

const T = {
    ru: {
        nav1:'Главная', nav2:'Интерьеры', nav3:'Архитектура', nav4:'Услуги', nav5m:'Вакансии',
        navCta:'Написать нам', heroLabel:'MUKAAB',
        title:'Портфолио',
        subtitle:'Реализованные проекты в области интерьерного дизайна, архитектуры и авторского надзора.',
        filterLabel:'Категория',
        catAll:'Все работы', catInt:'Интерьер', catArch:'Архитектура',
        catFurniture:'Мебель', catComm:'Коммерческие',
        ctah:'Обсудим ваш проект?',
        ctap:'Расскажите о задаче — ответим в течение часа',
        ctabtn:'Связаться с нами',
        footsub:'Premium Design Studio',
        privacyLink:'Политика конфиденциальности',
        pmLabel:'Документ', pmTitle:'Политика конфиденциальности',
    },
    en: {
        nav1:'Home', nav2:'Interiors', nav3:'Architecture', nav4:'Services', nav5m:'Vacancies',
        navCta:'Contact Us', heroLabel:'MUKAAB',
        title:'Portfolio',
        subtitle:'Completed projects in interior design, architecture and construction supervision.',
        filterLabel:'Category',
        catAll:'All works', catInt:'Interior', catArch:'Architecture',
        catFurniture:'Furniture', catComm:'Commercial',
        ctah:'Shall we discuss your project?',
        ctap:"Tell us about your task — we'll respond within the hour",
        ctabtn:'Contact us',
        footsub:'Premium Design Studio',
        privacyLink:'Privacy Policy',
        pmLabel:'Document', pmTitle:'Privacy Policy',
    }
};

let lang = 'ru';

function setLang(l) {
    lang = l;
    document.getElementById('btn-ru').classList.toggle('active', l==='ru');
    document.getElementById('btn-en').classList.toggle('active', l==='en');
    document.getElementById('mob-btn-ru').classList.toggle('active', l==='ru');
    document.getElementById('mob-btn-en').classList.toggle('active', l==='en');
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.getAttribute('data-i18n');
        if (T[l][k] !== undefined) el.innerHTML = T[l][k];
    });
    localStorage.setItem('lang', l);
    if (PROJECTS.length) renderProjects();
    applyHeroOverride();
    if (FILTER_CATS && FILTER_CATS.length) renderFilterBar();
}

const privBody = {
    ru:`<style>
#privBody h2{font-size:22px;font-weight:800;margin-bottom:4px;}
#privBody .pm-org{font-size:13px;color:rgba(255,255,255,.45);margin-bottom:28px;}
#privBody h3{font-size:15px;font-weight:700;color:#fff;margin:26px 0 10px;padding-left:14px;border-left:2px solid #fff;}
#privBody .pm-section:first-of-type h3{margin-top:0;}
#privBody p{font-size:13px;color:rgba(255,255,255,.65);line-height:1.85;margin-bottom:10px;}
#privBody ul{margin:8px 0 14px;list-style:none;}
#privBody ul li{font-size:13px;color:rgba(255,255,255,.62);padding:6px 0 6px 18px;position:relative;border-bottom:1px solid rgba(255,255,255,.04);line-height:1.6;}
#privBody ul li:last-child{border-bottom:none;}
#privBody ul li::before{content:'—';position:absolute;left:0;color:#fff;font-size:11px;top:8px;}
#privBody strong{color:#fff;font-weight:600;}
#privBody .pm-section{margin-bottom:30px;padding-bottom:2px;border-bottom:1px solid rgba(255,255,255,.04);}
#privBody .pm-contacts{padding:0;margin:14px 0 10px;display:flex;flex-direction:column;gap:8px;}
#privBody .pm-contact-row{display:flex;align-items:center;gap:4px;padding:14px 16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;}
#privBody .pm-key{min-width:110px;flex-shrink:0;color:rgba(255,255,255,.55);font-weight:600;letter-spacing:.04em;font-size:13px;}
#privBody .pm-colon{width:12px;flex-shrink:0;color:rgba(255,255,255,.55);}
#privBody .pm-contact-row strong,#privBody .pm-contact-row a{flex:1;text-align:right;color:#fff;}
#privBody a{color:#fff !important;text-decoration:underline;}
#privBody a:hover{opacity:.8;}
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
</div></div>`,
    en:`<style>
#privBody h2{font-size:22px;font-weight:800;margin-bottom:4px;}
#privBody .pm-org{font-size:13px;color:rgba(255,255,255,.45);margin-bottom:28px;}
#privBody h3{font-size:15px;font-weight:700;color:#fff;margin:26px 0 10px;padding-left:14px;border-left:2px solid #fff;}
#privBody .pm-section:first-of-type h3{margin-top:0;}
#privBody p{font-size:13px;color:rgba(255,255,255,.65);line-height:1.85;margin-bottom:10px;}
#privBody ul{margin:8px 0 14px;list-style:none;}
#privBody ul li{font-size:13px;color:rgba(255,255,255,.62);padding:6px 0 6px 18px;position:relative;border-bottom:1px solid rgba(255,255,255,.04);line-height:1.6;}
#privBody ul li:last-child{border-bottom:none;}
#privBody ul li::before{content:'—';position:absolute;left:0;color:#fff;font-size:11px;top:8px;}
#privBody strong{color:#fff;font-weight:600;}
#privBody .pm-section{margin-bottom:30px;padding-bottom:2px;border-bottom:1px solid rgba(255,255,255,.04);}
#privBody .pm-contacts{padding:0;margin:14px 0 10px;display:flex;flex-direction:column;gap:8px;}
#privBody .pm-contact-row{display:flex;align-items:center;gap:4px;padding:14px 16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;}
#privBody .pm-key{min-width:110px;flex-shrink:0;color:rgba(255,255,255,.55);font-weight:600;letter-spacing:.04em;font-size:13px;}
#privBody .pm-colon{width:12px;flex-shrink:0;color:rgba(255,255,255,.55);}
#privBody .pm-contact-row strong,#privBody .pm-contact-row a{flex:1;text-align:right;color:#fff;}
#privBody a{color:#fff !important;text-decoration:underline;}
#privBody a:hover{opacity:.8;}
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
</div></div>`
};

function openPrivacy() {
    document.getElementById('privBody').innerHTML = privBody[lang];
    document.getElementById('privOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closePrivacy() {
    document.getElementById('privOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

const saved = localStorage.getItem('lang');
if (saved) setLang(saved);
Promise.all([loadFilterCategories(), loadProjects()]).then(() => {
    applyActiveFilter();
});

// ── Футер (текст копирайта) из настроек админки ──
fetch("mukaab-admin-backend/public/settings.php", { cache: 'no-store' })
  .then(r => r.json())
  .then(d => {
    const s = d && d.settings ? d.settings : {};
    const footerText = lang === 'ru' ? s.footer_ru : (s.footer_en || s.footer_ru);
    if (footerText) { const el = document.getElementById('footerCopyright'); if (el) el.textContent = footerText; }
  })
  .catch(() => {});
