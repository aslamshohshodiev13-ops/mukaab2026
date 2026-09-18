const $=id=>document.getElementById(id);

// Путь к папке с backend относительно admin.html. Поправьте, если разместите папку иначе.
const API = "mukaab-admin-backend/";

async function api(path, opts) {
  const res = await fetch(API + path, { credentials: "same-origin", ...opts });
  let data;
  try { data = await res.json(); } catch (e) { data = {}; }
  if (!res.ok) { throw new Error(data.error || "Ошибка запроса"); }
  return data;
}
function apiGet(path) { return api(path, { method: "GET" }); }
function apiPost(path, body) { return api(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); }

const pages={dashboard:["Главная","Обзор содержимого сайта"],homepage:["Главная страница","Hero, статистика, плитки, услуги, SEO — mukaab.html"],portfolio:["Портфолио","Управление проектами и публикациями"],services:["Услуги","Управление услугами компании"],architecture:["Архитектура","Содержимое страницы архитектуры"],interior:["Дизайн интерьера","Содержимое страницы дизайна интерьера"],furniture:["Мебель","Коллекции и мебельные решения"],viz:["3D-визуализация","Услуги визуализации"],supervision:["Авторский надзор","Этапы и описание услуги"],designer:["Designer Day","Информация о проекте Designer Day"],vacancies:["Вакансии","Управление вакансиями"],media:["Медиа","Изображения и файлы сайта"],nav:["Навигация","Пункты верхнего меню сайта"],applications:["Заявки","Сообщения и отклики с сайта"],contacts:["Контакты","Telegram, WhatsApp, email, телефон, футер"],settings:["Настройки","SEO, hero, статистика"]};

function toast(t){let d=document.createElement("div");d.className="toast";d.textContent=t;$("toastRoot").appendChild(d);setTimeout(()=>d.remove(),2500)}
function closeModal(){$("modalRoot").innerHTML=""}
function modal(title,body,wide){$("modalRoot").innerHTML=`<div class="modal-overlay"><div class="modal-box${wide?" wide":""}"><div class="modal-head"><div class="modal-title">${title}</div><button class="modal-close" onclick="closeModal()">×</button></div>${body}</div></div>`}
function esc(s){return (s??"").toString().replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function statVal(statsText,label){
  const lines=(statsText||"").replace(/\\n/g,"\n").split("\n");
  for(const l of lines){const p=l.split("|");if(p[0]&&p[0].trim()===label) return (p[1]||"").trim();}
  return "";
}

async function dashboard(){
  $("pageContent").innerHTML=`<div class="stats" id="statsRow"><div class="stat"><span>Загрузка…</span></div></div><div class="card"><div class="section-head"><div><h2>Быстрые действия</h2><p>Часто используемые функции</p></div></div><div class="quick-grid"><button class="quick" onclick="editor('portfolio')"><strong>+ Добавить проект</strong><span>Новое портфолио</span></button><button class="quick" onclick="editor('services')"><strong>+ Добавить услугу</strong><span>Новая услуга</span></button><button class="quick" onclick="editor('vacancies')"><strong>+ Добавить вакансию</strong><span>Новая вакансия</span></button><button class="quick" onclick="upload()"><strong>↑ Загрузить медиа</strong><span>Изображения сайта</span></button></div></div>`;
  try{
    const {counts}=await apiGet("api/items.php?action=counts");
    const {items:mediaItems}=await apiGet("api/media.php");
    const portfolio=counts.portfolio||0, services=counts.services||0, vacancies=counts.vacancies||0, mediaCount=(mediaItems||[]).length;
    $("statsRow").innerHTML=`<div class="stat"><span>Проекты</span><b>${portfolio}</b><small>Портфолио</small></div><div class="stat"><span>Услуги</span><b>${services}</b><small>Все разделы</small></div><div class="stat"><span>Вакансии</span><b>${vacancies}</b><small>Открытые и закрытые</small></div><div class="stat"><span>Медиа</span><b>${mediaCount}</b><small>Файлов загружено</small></div>`;
    updateSidebarCounts(counts);
  }catch(e){$("statsRow").innerHTML=`<div class="stat"><span>Ошибка загрузки данных</span></div>`}
}

function updateSidebarCounts(counts){
  document.querySelectorAll(".nav-item").forEach(x=>{
    const t=x.dataset.page, b=x.querySelector("b");
    if(b && counts[t]!==undefined) b.textContent=counts[t];
  });
}

let currentType=null, currentItems=[];

async function list(type){
  if(type==="media"){media();return}
  currentType=type;
  const navCardHtml = type==="vacancies" ? `<div class="card" id="vacNavCard" style="margin-bottom:14px"><div class="section-head"><div><h2>Верхняя навигация</h2><p>Только для страницы «Вакансии»</p></div><button class="small-btn" onclick="editor('nav_vacancies')">+ Добавить пункт</button></div><div class="table" id="vacNavList">Загрузка…</div></div>` : "";
  $("pageContent").innerHTML=`${navCardHtml}<div class="pane-tools"><input class="search-box" placeholder="Поиск..." oninput="filterRows(this.value)"><button class="btn-gold" onclick="editor('${type}')">+ Добавить</button></div><div class="table" id="listRows"><div class="row"><div class="row-main">Загрузка…</div></div></div>`;
  if(type==="vacancies"){
    apiGet("api/items.php?action=list&type=nav_vacancies").then(({items:navItems})=>{
      $("vacNavList").innerHTML = navItems.map(n=>`<div class="row"><div class="row-main"><div class="row-title">${esc(n.title_ru)}</div><div class="row-meta">${esc(n.location||"")} · ${esc(n.title_en||"")}</div></div><span class="badge ${n.status}">${n.status==="published"?"Показан":"Скрыт"}</span><div class="row-actions"><button class="small-btn" onclick="editor('nav_vacancies',${n.id})">Редактировать</button></div></div>`).join("")||'<p class="settings-hint">Пусто</p>';
    }).catch(()=>{ const el=$("vacNavList"); if(el) el.innerHTML="Ошибка загрузки"; });
  }
  try{
    const {items}=await apiGet(`api/items.php?action=list&type=${encodeURIComponent(type)}`);
    currentItems=items;
    renderRows(items,type);
  }catch(e){$("listRows").innerHTML=`<div class="row"><div class="row-main">Ошибка загрузки: ${esc(e.message)}</div></div>`}
}

function renderRows(items,type){
  if(!items.length){$("listRows").innerHTML=`<div class="row"><div class="row-main">Пока ничего нет. Нажмите «+ Добавить».</div></div>`;return}
  $("listRows").innerHTML=items.map((x,i)=>{
    const meta=type==="nav"?(x.location||"—"):[x.category,x.location,x.area].filter(Boolean).join(" · ");
    return `<div class="row" data-search="${esc((x.title_ru+" "+(x.category||"")+" "+(x.location||"")).toLowerCase())}">
      ${type==="nav"?"":`<div class="thumb"><img src="${esc(x.image||'')}" onerror="this.style.display='none'"></div>`}
      <div class="row-main"><div class="row-title">${esc(x.title_ru)}</div><div class="row-meta">${esc(meta||type)}</div></div>
      <span class="badge ${x.status}">${x.status==="published"?"Опубликовано":x.status==="hidden"?"Скрыто":"Черновик"}</span>
      <div class="row-actions">
        <button class="small-btn" onclick="moveItem(${x.id},${i},-1)" ${i===0?"disabled":""} title="Выше">▲</button>
        <button class="small-btn" onclick="moveItem(${x.id},${i},1)" ${i===items.length-1?"disabled":""} title="Ниже">▼</button>
        <button class="small-btn" onclick="editor('${type}',${x.id})">Редактировать</button><button class="small-btn" onclick="removeItem(${x.id})">Удалить</button>
      </div>
    </div>`;
  }).join("");
}

async function moveItem(id,index,dir){
  const other=currentItems[index+dir];
  if(!other)return;
  const a=currentItems[index], b=other;
  try{
    await apiPost("api/items.php",{action:"save",type:currentType,id:a.id,title_ru:a.title_ru,title_en:a.title_en,category:a.category,location:a.location,area:a.area,status:a.status,sort_order:b.sort_order,description_ru:a.description_ru,description_en:a.description_en,image:a.image,featured:a.featured,filter_cat:a.filter_cat,tags:a.tags,gallery:a.gallery,badge_ru:a.badge_ru,badge_en:a.badge_en,stats_ru:a.stats_ru,stats_en:a.stats_en,requirements_ru:a.requirements_ru,requirements_en:a.requirements_en,note_ru:a.note_ru,note_en:a.note_en});
    await apiPost("api/items.php",{action:"save",type:currentType,id:b.id,title_ru:b.title_ru,title_en:b.title_en,category:b.category,location:b.location,area:b.area,status:b.status,sort_order:a.sort_order,description_ru:b.description_ru,description_en:b.description_en,image:b.image,featured:b.featured,filter_cat:b.filter_cat,tags:b.tags,gallery:b.gallery,badge_ru:b.badge_ru,badge_en:b.badge_en,stats_ru:b.stats_ru,stats_en:b.stats_en,requirements_ru:b.requirements_ru,requirements_en:b.requirements_en,note_ru:b.note_ru,note_en:b.note_en});
    list(currentType);
  }catch(e){toast("Ошибка: "+e.message)}
}

function filterRows(q){q=q.toLowerCase();document.querySelectorAll("#listRows .row").forEach(r=>r.style.display=(!r.dataset.search||r.dataset.search.includes(q))?"flex":"none")}

async function removeItem(id){
  if(!confirm("Удалить запись?"))return;
  try{await apiPost("api/items.php",{action:"delete",id});toast("Удалено");list(currentType)}
  catch(e){toast("Ошибка: "+e.message)}
}

async function media(){
  $("pageContent").innerHTML=`<div class="pane-tools"><input class="search-box" placeholder="Поиск изображения..." oninput="filterMedia(this.value)"><button class="btn-gold" onclick="upload()">+ Загрузить</button></div><div class="gallery-grid" id="mediaGrid"><div class="gallery-card"><div class="gallery-body">Загрузка…</div></div></div>`;
  try{
    const {items}=await apiGet("api/media.php");
    renderMedia(items);
  }catch(e){$("mediaGrid").innerHTML=`<div class="gallery-card"><div class="gallery-body">Ошибка загрузки</div></div>`}
}

function isVideoFile(name){return /\.(mp4|webm|mov)$/i.test(name||"")}
function renderMedia(items){
  if(!items.length){$("mediaGrid").innerHTML=`<div class="gallery-card"><div class="gallery-body">Файлов пока нет</div></div>`;return}
  $("mediaGrid").innerHTML=items.map(x=>`<div class="gallery-card" data-search="${esc(x.filename.toLowerCase())}">
    <div class="gallery-thumb">${isVideoFile(x.filename)?`<video src="${esc(x.url)}" muted></video>`:`<img src="${esc(x.url)}" onerror="this.style.display='none'">`}</div>
    <div class="gallery-body"><div class="gallery-name">${esc(x.filename)}${isVideoFile(x.filename)?" 🎬":""}</div>
    <div class="gallery-actions"><button class="small-btn" onclick="copyPath('${esc(x.url)}')">Копировать</button><button class="small-btn" onclick="deleteMedia(${x.id})">Удалить</button></div></div>
  </div>`).join("");
}
function filterMedia(q){q=q.toLowerCase();document.querySelectorAll("#mediaGrid .gallery-card").forEach(c=>c.style.display=(!c.dataset.search||c.dataset.search.includes(q))?"block":"none")}
function copyPath(url){navigator.clipboard?.writeText(url).then(()=>toast("Путь скопирован")).catch(()=>toast(url))}
async function deleteMedia(id){
  if(!confirm("Удалить файл?"))return;
  try{await apiPost("api/media.php",{action:"delete",id});toast("Удалено");media()}
  catch(e){toast("Ошибка: "+e.message)}
}

/* ══════════════ НАСТРОЙКИ (главная страница целиком) ══════════════
   Каждое поле помечено class="settings-field" data-key="...".
   saveSettings() собирает их все и одним запросом сохраняет в таблицу settings.
   Оставленное пустым поле = на сайте используется исходный текст по умолчанию. */

function sf(key,val,placeholder){return `<input class="settings-field" data-key="${key}" value="${esc(val)}" placeholder="${esc(placeholder||'')}">`}
function sfArea(key,val,placeholder){return `<textarea class="settings-field" data-key="${key}" placeholder="${esc(placeholder||'')}">${esc(val)}</textarea>`}

const PRIVACY_DEFAULTS = [
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

function privacySectionFields(s){
  let html = `<p class="settings-hint">Каждый пункт можно отредактировать отдельно. Пустое поле — останется текст по умолчанию (показан как подсказка). Для списка — каждая строка станет отдельным пунктом.</p>
  <div class="priv-lang-tabs" style="grid-column:1/-1;display:flex;gap:8px;margin-bottom:14px">
    <button type="button" class="priv-tab active" data-lang="ru" onclick="switchPrivacyLangTab('ru')">RU (Русский)</button>
    <button type="button" class="priv-tab" data-lang="en" onclick="switchPrivacyLangTab('en')">EN (Английский)</button>
  </div>`;
  PRIVACY_DEFAULTS.forEach((def,i)=>{
    const n=i+1;
    html += `<div class="settings-subhead">${n}. ${esc(def.ru)}</div>
    <div class="form-grid">
      <label class="form-label wide priv-field priv-field-ru">Заголовок RU${sf("privacy_s"+n+"_title_ru",s["privacy_s"+n+"_title_ru"],def.ru)}</label>
      <label class="form-label wide priv-field priv-field-en" style="display:none">Заголовок EN${sf("privacy_s"+n+"_title_en",s["privacy_s"+n+"_title_en"],def.en)}</label>
      <label class="form-label wide priv-field priv-field-ru">Текст RU${sfArea("privacy_s"+n+"_text_ru",s["privacy_s"+n+"_text_ru"],def.bru)}</label>
      <label class="form-label wide priv-field priv-field-en" style="display:none">Текст EN${sfArea("privacy_s"+n+"_text_en",s["privacy_s"+n+"_text_en"],def.ben)}</label>
    </div>`;
  });
  return html;
}

function switchPrivacyLangTab(lang){
  document.querySelectorAll(".priv-tab").forEach(b=>b.classList.toggle("active",b.dataset.lang===lang));
  document.querySelectorAll(".priv-field-ru").forEach(el=>el.style.display=lang==="ru"?"":"none");
  document.querySelectorAll(".priv-field-en").forEach(el=>el.style.display=lang==="en"?"":"none");
}

const SETTINGS_SECTIONS = {
  basic:{title:"Основное",fields:(s)=>`
    <label class="form-label">Название сайта${sf("site_name",s.site_name)}</label>
    <label class="form-label">Язык по умолчанию${sf("lang",s.lang||"RU")}</label>
    <label class="form-label">Адрес RU${sf("address",s.address)}</label>
    <label class="form-label">Адрес EN${sf("address_en",s.address_en)}</label>`,
    preview:(s)=>s.site_name||"MUKAAB"},
  seo:{title:"SEO",fields:(s)=>`
    <label class="form-label wide">Title${sf("seo_title",s.seo_title)}</label>
    <label class="form-label wide">Description${sfArea("seo_description",s.seo_description)}</label>`,
    preview:(s)=>s.seo_title||"(не задано)"},
  hero:{title:"Hero (главный экран)",fields:(s)=>`
    <label class="form-label">Заголовок RU${sf("hero_title_ru",s.hero_title_ru,"по умолчанию: текст из HTML")}</label>
    <label class="form-label">Заголовок EN${sf("hero_title_en",s.hero_title_en)}</label>
    <label class="form-label wide">Подзаголовок RU${sf("hero_sub_ru",s.hero_sub_ru)}</label>
    <label class="form-label wide">Подзаголовок EN${sf("hero_sub_en",s.hero_sub_en)}</label>
    <label class="form-label">Текст кнопки RU${sf("hero_btn_ru",s.hero_btn_ru)}</label>
    <label class="form-label">Текст кнопки EN${sf("hero_btn_en",s.hero_btn_en)}</label>
    <label class="form-label wide">Ссылка кнопки${sf("hero_btn_link",s.hero_btn_link,"#contacts")}</label>
    <label class="form-label wide">Слайд 1 — фото/видео${sf("hero_slide1",s.hero_slide1,"images/1.png.jpg")}</label>
    <label class="form-label wide">Слайд 2 — фото/видео${sf("hero_slide2",s.hero_slide2,"images/2.jpg")}</label>
    <label class="form-label wide">Слайд 3 — фото/видео${sf("hero_slide3",s.hero_slide3,"images/3.jpg")}</label>`,
    preview:(s)=>s.hero_title_ru||"(текст по умолчанию из HTML)",img:(s)=>s.hero_slide1},
  stats:{title:"Статистика (4 блока)",fields:(s)=>[1,2,3,4].map(n=>`
    <label class="form-label">Стат ${n} — значение${sf("stat"+n+"_value",s["stat"+n+"_value"],n<4?"150":"24/7")}</label>
    <label class="form-label">Стат ${n} — суффикс${sf("stat"+n+"_suffix",s["stat"+n+"_suffix"],n===3?"%":"+")}</label>
    <label class="form-label">Стат ${n} — подпись RU${sf("stat"+n+"_label_ru",s["stat"+n+"_label_ru"])}</label>
    <label class="form-label">Стат ${n} — подпись EN${sf("stat"+n+"_label_en",s["stat"+n+"_label_en"])}</label>`).join(""),
    preview:(s)=>[1,2,3,4].map(n=>s["stat"+n+"_value"]).filter(Boolean).join(" · ")||"(по умолчанию из HTML)"},
  about:{title:"О нас",fields:(s)=>`
    <label class="form-label">Заголовок RU${sf("about_title_ru",s.about_title_ru)}</label>
    <label class="form-label">Заголовок EN${sf("about_title_en",s.about_title_en)}</label>
    <label class="form-label wide">Описание RU${sfArea("about_desc_ru",s.about_desc_ru,"HTML разрешён, напр. <strong>Mukaab</strong> — ...")}</label>
    <label class="form-label wide">Описание EN${sfArea("about_desc_en",s.about_desc_en)}</label>
    ${[1,2,3,4].map(n=>`
    <label class="form-label">Пункт ${n} RU${sf("check"+n+"_ru",s["check"+n+"_ru"])}</label>
    <label class="form-label">Пункт ${n} EN${sf("check"+n+"_en",s["check"+n+"_en"])}</label>`).join("")}`,
    preview:(s)=>s.about_title_ru||"(текст по умолчанию из HTML)"},
  social:{title:"Соцсети (профили, для футера)",fields:(s)=>`
    <label class="form-label">Instagram${sf("social_instagram",s.social_instagram)}</label>
    <label class="form-label">Behance${sf("social_behance",s.social_behance)}</label>
    <label class="form-label">YouTube${sf("social_youtube",s.social_youtube)}</label>
    <label class="form-label">VKontakte${sf("social_vk",s.social_vk)}</label>
    <label class="form-label">Pinterest${sf("social_pinterest",s.social_pinterest)}</label>
    <label class="form-label">LinkedIn${sf("social_linkedin",s.social_linkedin)}</label>`,
    preview:(s)=>[s.social_instagram,s.social_behance,s.social_youtube].filter(Boolean).length+" заполнено"},
  privacy:{title:"Политика конфиденциальности",fields:(s)=>privacySectionFields(s),
    preview:(s)=>PRIVACY_DEFAULTS.some((_,i)=>s["privacy_s"+(i+1)+"_title_ru"])?"Часть текста изменена вручную":"Текст по умолчанию"},
  tile1:{title:"Плитка «Проекты» 1",fields:(s)=>sf3TileFields(s,1),preview:(s)=>s.tile1_title_ru||"(текст по умолчанию)",img:(s)=>s.tile1_image},
  tile2:{title:"Плитка «Проекты» 2",fields:(s)=>sf3TileFields(s,2),preview:(s)=>s.tile2_title_ru||"(текст по умолчанию)",img:(s)=>s.tile2_image},
  tile3:{title:"Плитка «Проекты» 3",fields:(s)=>sf3TileFields(s,3),preview:(s)=>s.tile3_title_ru||"(текст по умолчанию)",img:(s)=>s.tile3_image},
  svc1:{title:"Карточка «Услуги» 1",fields:(s)=>sfSvcFields(s,1),preview:(s)=>s.svc1_title_ru||"(текст по умолчанию)",img:(s)=>s.svc1_image},
  svc2:{title:"Карточка «Услуги» 2",fields:(s)=>sfSvcFields(s,2),preview:(s)=>s.svc2_title_ru||"(текст по умолчанию)",img:(s)=>s.svc2_image},
  svc3:{title:"Карточка «Услуги» 3",fields:(s)=>sfSvcFields(s,3),preview:(s)=>s.svc3_title_ru||"(текст по умолчанию)",img:(s)=>s.svc3_image},
  svc4:{title:"Карточка «Услуги» 4",fields:(s)=>sfSvcFields(s,4),preview:(s)=>s.svc4_title_ru||"(текст по умолчанию)",img:(s)=>s.svc4_image},
};

function sf3TileFields(s,n){return `
  <label class="form-label">Заголовок RU${sf("tile"+n+"_title_ru",s["tile"+n+"_title_ru"])}</label>
  <label class="form-label">Заголовок EN${sf("tile"+n+"_title_en",s["tile"+n+"_title_en"])}</label>
  <label class="form-label wide">Картинка (путь из «Медиа»)${sf("tile"+n+"_image",s["tile"+n+"_image"],"images/photo.jpg")}</label>
  <label class="form-label wide">Ссылка (куда ведёт плитка)${sf("tile"+n+"_link",s["tile"+n+"_link"],"portfolio.html")}</label>`}

function sfSvcFields(s,n){return `
  <label class="form-label">Заголовок RU${sf("svc"+n+"_title_ru",s["svc"+n+"_title_ru"])}</label>
  <label class="form-label">Заголовок EN${sf("svc"+n+"_title_en",s["svc"+n+"_title_en"])}</label>
  <label class="form-label wide">Картинка (путь из «Медиа»)${sf("svc"+n+"_image",s["svc"+n+"_image"],"images/photo.jpg")}</label>
  <label class="form-label wide">Ссылка (куда ведёт карточка)${sf("svc"+n+"_link",s["svc"+n+"_link"],"servis.html")}</label>`}

/* ══════════════ ГЛАВНАЯ СТРАНИЦА (mukaab.html) — отдельный раздел с превью ══════════════ */

const HOMEPAGE_SECTIONS = ["hero","stats","about","tile1","tile2","tile3","svc1","svc2","svc3","svc4","seo","privacy"];

async function homepageDashboard(){
  $("pageContent").innerHTML=`<div style="display:flex;justify-content:flex-end;gap:8px;margin-bottom:16px">
    <button class="btn-ghost" onclick="window.open('mukaab.html','_blank')">👁 Просмотреть сайт</button>
    <button class="btn-gold" onclick="saveHomepageAll()">Сохранить изменения</button>
  </div><div id="homepageForm">Загрузка…</div>`;
  try{
    const [{settings:s},navHomeRes]=await Promise.all([apiGet("api/settings.php"),apiGet("api/items.php?action=list&type=nav_home")]);
    window._sdSettings=s;
    let html="";

    html+=`<div class="card" style="margin-bottom:14px"><div class="section-head"><div><h2>1. Меню главной страницы</h2><p>Своё, только для mukaab.html — работает и на десктопе, и на мобильном</p></div><button class="small-btn" onclick="editor('nav_home')">+ Добавить пункт</button></div>
      <div class="table">${navHomeRes.items.map(n=>`<div class="row"><div class="row-main"><div class="row-title">${esc(n.title_ru)}</div><div class="row-meta">${esc(n.location||"")} · ${esc(n.title_en||"")}</div></div><span class="badge ${n.status}">${n.status==="published"?"Показан":"Скрыт"}</span><div class="row-actions"><button class="small-btn" onclick="editor('nav_home',${n.id})">Редактировать</button></div></div>`).join("")||'<p class="settings-hint">Пусто</p>'}</div>
    </div>`;

    let n=2;
    HOMEPAGE_SECTIONS.forEach(key=>{
      const sec=SETTINGS_SECTIONS[key];
      const img = sec.img ? sec.img(s) : null;
      const isVid = img && /\.(mp4|webm|mov)$/i.test(img);
      const thumb = img ? `<div class="hp-thumb">${isVid?`<video src="${esc(img)}" muted controls></video>`:`<img src="${esc(img)}" onerror="this.style.display='none'">`}</div>` : "";
      html+=`<div class="card" style="margin-bottom:14px">
        <div class="section-head"><div><h2>${n}. ${esc(sec.title)}</h2></div></div>
        <div style="display:grid;grid-template-columns:${thumb?"260px 1fr":"1fr"};gap:20px;align-items:start">
          ${thumb}
          <div class="form-grid">${sec.fields(s)}</div>
        </div>
      </div>`;
      n++;
    });

    html+=`<div class="card" style="margin-bottom:14px"><div class="section-head"><div><h2>${n}. Контакты и Footer</h2><p>Общие для всего сайта</p></div></div>
      <div class="form-grid">
        <label class="form-label">Telegram${sf("telegram",s.telegram)}</label>
        <label class="form-label">WhatsApp${sf("whatsapp",s.whatsapp)}</label>
        <label class="form-label">Email${sf("contact_email",s.contact_email)}</label>
        <label class="form-label">Телефон${sf("contact_phone",s.contact_phone)}</label>
        <label class="form-label wide">Footer (копирайт) RU${sf("footer_ru",s.footer_ru,"© 2026 MUKAAB")}</label>
      </div>
    </div>`;

    $("homepageForm").innerHTML=html;
  }catch(e){$("homepageForm").innerHTML="Ошибка загрузки: "+esc(e.message)}
}

async function saveHomepageAll(){
  const payload={};
  document.querySelectorAll("#homepageForm .settings-field").forEach(el=>{ payload[el.dataset.key]=el.value; });
  try{await apiPost("api/settings.php",payload);toast("Сохранено");homepageDashboard()}
  catch(e){toast("Ошибка: "+e.message)}
}

async function settingsDashboard(){
  $("pageContent").innerHTML=`<div class="dash-grid" id="dashGrid">Загрузка…</div>`;
  try{
    const {settings:s}=await apiGet("api/settings.php");
    window._sdSettings=s;
    const keys=["basic","seo","hero","stats","about","social","privacy"];
    $("dashGrid").innerHTML=keys.map(key=>{
      const sec=SETTINGS_SECTIONS[key];
      return `<div class="card sd-card">
        <div class="section-head"><div><h2>${esc(sec.title)}</h2></div><button class="small-btn" onclick="editSettingsSection('${key}')">Редактировать</button></div>
        <p class="settings-hint" style="margin:0">${esc(sec.preview(s))}</p>
      </div>`;
    }).join("");
  }catch(e){$("dashGrid").innerHTML="Ошибка загрузки: "+esc(e.message)}
}

function editSettingsSection(key){
  const sec=SETTINGS_SECTIONS[key];
  const s=window._sdSettings||{};
  modal(sec.title,`<form id="editorForm"><div class="form-grid">${sec.fields(s)}</div>
    <div class="form-actions"><button type="button" class="btn-ghost" onclick="closeModal()">Отмена</button><button class="btn-gold">Сохранить</button></div>
  </form>`,true);
  $("editorForm").onsubmit=async e=>{
    e.preventDefault();
    const payload={};
    document.querySelectorAll("#editorForm .settings-field").forEach(el=>{ payload[el.dataset.key]=el.value; Object.assign(window._sdSettings,{[el.dataset.key]:el.value}); });
    try{await apiPost("api/settings.php",payload);closeModal();toast("Сохранено");settingsDashboard()}
    catch(err){toast("Ошибка: "+err.message)}
  };
}

async function saveSettings(){
  const payload={};
  document.querySelectorAll(".settings-field").forEach(el=>{ payload[el.dataset.key]=el.value; });
  try{await apiPost("api/settings.php",payload);toast("Настройки сохранены")}
  catch(e){toast("Ошибка: "+e.message)}
}

/* ══════════════ КОНТАКТЫ САЙТА + FOOTER (отдельный раздел) ══════════════ */

function sfCheck(key,val,label){return `<label class="check"><input type="checkbox" class="settings-field" data-key="${key}" data-bool="1" ${val==='1'?'checked':''}> ${label||'Показывать'}</label>`}

async function contactsPage(){
  $("pageContent").innerHTML=`<div class="card"><div class="section-head"><div><h2>Контакты сайта</h2><p>Telegram, WhatsApp, email, телефон — с текстом кнопки и порядком показа в шапке сайта</p></div><button class="btn-gold" onclick="saveContacts()">Сохранить всё</button></div><div id="contactsForm">Загрузка…</div></div>`;
  try{
    const {settings:s}=await apiGet("api/settings.php");
    const chans=[
      {key:'telegram',label:'Telegram',ph:'@mukaab_company или ссылка t.me/...'},
      {key:'whatsapp',label:'WhatsApp',ph:'+375 XX XXX XX XX'},
      {key:'contact_email',label:'Email',ph:'mukaabcompany@gmail.com'},
      {key:'contact_phone',label:'Телефон',ph:'+375 (33) 916-11-11'},
    ];
    $("contactsForm").innerHTML=chans.map(c=>`
      <div class="settings-subhead">${c.label}</div>
      <div class="form-grid">
        <label class="form-label">Значение (номер/ссылка)${sf(c.key,s[c.key],c.ph)}</label>
        <label class="form-label">Текст кнопки RU${sf(c.key+"_btn_ru",s[c.key+"_btn_ru"],c.label)}</label>
        <label class="form-label">Текст кнопки EN${sf(c.key+"_btn_en",s[c.key+"_btn_en"],c.label)}</label>
        <label class="form-label">Порядок показа${sf(c.key+"_order",s[c.key+"_order"]||"1","1")}</label>
        <label class="form-label">${sfCheck(c.key+"_enabled",s[c.key+"_enabled"]===undefined?'1':s[c.key+"_enabled"])}</label>
      </div>`).join("")
      + `<div class="settings-subhead">Футер</div>
      <div class="form-grid">
        <label class="form-label wide">Текст копирайта RU${sf("footer_ru",s.footer_ru,"© 2026 MUKAAB")}</label>
        <label class="form-label wide">Текст копирайта EN${sf("footer_en",s.footer_en)}</label>
      </div>
      <div class="settings-subhead">Telegram-бот для заявок (надёжная доставка)</div>
      <div class="form-grid">
        <p class="settings-hint">Впиши токен бота, полученный от @BotFather, и Chat ID — заявки с сайта будут приходить прямо в Telegram, без ограничений браузера. Оставь пустым, если не используешь бота.</p>
        <label class="form-label wide">Токен бота${sf("telegram_bot_token",s.telegram_bot_token,"123456789:ABCdefGhIJKlmNoPQRstuVWXyz")}</label>
        <label class="form-label">Chat ID${sf("telegram_bot_chat_id",s.telegram_bot_chat_id,"например 123456789")}</label>
        <label class="form-label">${sfCheck("telegram_bot_enabled",s.telegram_bot_enabled===undefined?'0':s.telegram_bot_enabled,"Включить бота")}</label>
      </div>
      <div class="form-grid">
        <button type="button" class="btn-ghost" style="grid-column:1/-1;justify-self:start" onclick="testTelegramBot()">Отправить тестовое сообщение</button>
      </div>
      <div class="settings-subhead">Telegram-бот для клиентов (пересылка сообщений админу)</div>
      <div class="form-grid">
        <p class="settings-hint">Отдельный бот, которому пишут клиенты. Сообщения автоматически пересылаются тебе через бота выше. Требует, чтобы сайт был доступен по HTTPS из интернета — на localhost работать не будет.</p>
        <label class="form-label wide">Токен клиентского бота${sf("client_bot_token",s.client_bot_token,"123456789:ABCdefGhIJKlmNoPQRstuVWXyz")}</label>
        <label class="form-label wide">Юзернейм клиентского бота (без @) — на него будет вести кнопка «Telegram» на сайте${sf("client_bot_username",s.client_bot_username,"mukaab_support_bot")}</label>
      </div>
      <div class="form-grid">
        <button type="button" class="btn-ghost" style="grid-column:1/-1;justify-self:start" onclick="connectClientBot()">Подключить (настроить Webhook)</button>
      </div>`;
  }catch(e){$("contactsForm").innerHTML="Ошибка загрузки: "+esc(e.message)}
}

async function connectClientBot(){
  await saveContacts();
  try{
    const r=await apiPost("api/applications.php",{action:"connect_client_bot"});
    toast(r.ok?"Готово! Бот подключён и слушает сообщения":"Не удалось подключить: "+(r.error||""));
  }catch(e){toast("Ошибка: "+e.message)}
}

async function testTelegramBot(){
  await saveContacts();
  try{
    const r=await apiPost("api/applications.php",{action:"test_telegram"});
    toast(r.ok?"Тестовое сообщение отправлено — проверь Telegram":"Не удалось отправить: "+(r.error||""));
  }catch(e){toast("Ошибка: "+e.message)}
}

async function saveContacts(){
  const payload={};
  document.querySelectorAll("#contactsForm .settings-field").forEach(el=>{
    payload[el.dataset.key]= el.dataset.bool ? (el.checked?'1':'0') : el.value;
  });
  try{await apiPost("api/settings.php",payload);toast("Контакты сохранены")}
  catch(e){toast("Ошибка: "+e.message)}
}

async function editor(type,id){
  let item={title_ru:"",title_en:"",status:"draft",sort_order:1,description_ru:"",description_en:"",image:"",featured:0,category:"",location:"",area:"",filter_cat:"",tags:"",gallery:"",badge_ru:"",badge_en:"",stats_ru:"",stats_en:"",requirements_ru:"",requirements_en:"",note_ru:"",note_en:""};
  if(id){
    try{const r=await apiGet(`api/items.php?action=get&id=${id}`);item=r.item;
      ["stats_ru","stats_en","requirements_ru","requirements_en","gallery"].forEach(k=>{ if(item[k]) item[k]=item[k].replace(/\\n/g,"\n"); });
    }
    catch(e){toast("Ошибка загрузки записи");return}
  }
  const isPortfolio=type==="portfolio";
  let pfCatsForForm=PF_CATS&&PF_CATS.length?PF_CATS:null;
  if(isPortfolio&&!pfCatsForForm){
    try{const r=await apiGet("api/items.php?action=list&type=portfolio_cat");pfCatsForForm=r.items}catch(e){pfCatsForForm=[]}
  }
  const isVacancy=type==="vacancies";
  const isServicePage=["architecture","interior","furniture","viz","supervision","designer"].includes(type);
  const isServicesHub=type==="services";
  const isNav=type==="nav"||type==="portfolio_cat"||type.startsWith("nav_");
  if(isNav){
    const isCat=type==="portfolio_cat";
    modal(id?"Редактировать":"Добавить",`<form id="editorForm">
      <div class="form-grid">
      <label class="form-label">${isCat?"Название RU":"Текст RU"}<input id="f_title_ru" value="${esc(item.title_ru)}" required></label>
      <label class="form-label">${isCat?"Название EN":"Текст EN"}<input id="f_title_en" value="${esc(item.title_en)}"></label>
      <label class="form-label wide">${isCat?"Slug (значение фильтра, латиницей, без пробелов)":"Ссылка"}<input id="f_location" value="${esc(item.location)}" placeholder="${isCat?'interior':'mukaab.html или #contacts или https://...'}"></label>
      <label class="form-label">Показывать<select id="f_status"><option value="published" ${item.status==="published"?"selected":""}>Да</option><option value="hidden" ${item.status==="hidden"?"selected":""}>Скрыто</option></select></label>
      <label class="form-label">Порядок<input id="f_sort_order" type="number" value="${item.sort_order??1}"></label>
      </div>
      <div class="form-actions"><button type="button" class="btn-ghost" onclick="closeModal()">Отмена</button><button class="btn-gold">Сохранить</button></div>
    </form>`);
    $("editorForm").onsubmit=async e=>{
      e.preventDefault();
      const payload={action:"save",type,id:id||0,title_ru:$("f_title_ru").value,title_en:$("f_title_en").value,location:$("f_location").value,status:$("f_status").value,sort_order:$("f_sort_order").value,category:"",area:"",description_ru:"",description_en:"",image:"",featured:0,filter_cat:"",tags:"",gallery:"",badge_ru:"",badge_en:"",stats_ru:"",stats_en:"",requirements_ru:"",requirements_en:"",note_ru:"",note_en:""};
      try{
        await apiPost("api/items.php",payload);closeModal();toast("Изменения сохранены");
        if(isCat)portfolioDashboard();
        else if(type==="nav_home")homepageDashboard();
        else if(type==="nav"||type.startsWith("nav_")){const active=document.querySelector(".nav-item.active");if(active)render(active.dataset.page);else list(type);}
        else list(type)
      }
      catch(err){toast("Ошибка: "+err.message)}
    };
    return;
  }
  const portfolioFields=!isPortfolio?"":`
    <label class="form-label">Фильтр на сайте<select id="f_filter_cat">
      <option value="" ${!item.filter_cat?"selected":""}>—</option>
      <option value="hero" ${item.filter_cat==="hero"?"selected":""}>Hero-блок страницы (шапка, картинка+заголовок)</option>
      ${(pfCatsForForm||[]).filter(c=>c.location&&c.location!=="all").map(c=>`<option value="${esc(c.location)}" ${item.filter_cat===c.location?"selected":""}>${esc(c.title_ru)}</option>`).join("")}
    </select></label>
    <label class="form-label">Теги (через запятую)<input id="f_tags" value="${esc(item.tags)}" placeholder="Минимализм, Камень, Дерево"></label>
    <label class="form-label wide">Галерея — фото ИЛИ видео, по одному пути на строку (видео: .mp4/.webm/.mov — определяется по расширению файла)<textarea id="f_gallery" placeholder="images/proj1_1.jpg&#10;images/proj1_video.mp4&#10;images/proj1_2.jpg">${esc(item.gallery)}</textarea></label>`;
  const vacancyFields=!isVacancy?"":`
    <label class="form-label">Секция на сайте<select id="f_filter_cat">
      <option value="design" ${item.filter_cat==="design"?"selected":""}>Проектирование и дизайн</option>
      <option value="production" ${item.filter_cat==="production"||!item.filter_cat?"selected":""}>Производство и надзор</option>
      <option value="intern" ${item.filter_cat==="intern"?"selected":""}>Стажировка</option>
    </select></label>
    <label class="form-label">Тип занятости RU<input id="f_badge_ru" value="${esc(item.badge_ru)}" placeholder="Полная занятость"></label>
    <label class="form-label">Тип занятости EN<input id="f_badge_en" value="${esc(item.badge_en)}" placeholder="Full-time"></label>
    <label class="form-label wide">Характеристики RU — по одной на строку, формат «Подпись|Значение»<textarea id="f_stats_ru" placeholder="Опыт работы|от 3 лет&#10;Зарплата|от 2 000 $&#10;График|5/2, офис">${esc(item.stats_ru)}</textarea></label>
    <label class="form-label wide">Характеристики EN<textarea id="f_stats_en" placeholder="Experience|3+ years&#10;Salary|from $2 000&#10;Schedule|5/2, office">${esc(item.stats_en)}</textarea></label>
    <label class="form-label wide">Обязанности RU — один пункт на строку<textarea id="f_requirements_ru" placeholder="Разработка архитектурных концепций&#10;Ведение проектов от ТЗ до стройки">${esc(item.requirements_ru)}</textarea></label>
    <label class="form-label wide">Обязанности EN<textarea id="f_requirements_en" placeholder="Architectural concept development&#10;Project management">${esc(item.requirements_en)}</textarea></label>
    <label class="form-label">Доп. пометка RU<input id="f_note_ru" value="${esc(item.note_ru)}" placeholder="Возможен перевод в штат"></label>
    <label class="form-label">Доп. пометка EN<input id="f_note_en" value="${esc(item.note_en)}" placeholder="Full-time offer possible"></label>`;
  const serviceFields=!isServicePage?"":`
    <label class="form-label wide">Блок страницы (какой раздел этой карточкой заполняем)
      <select id="f_filter_cat">
        <option value="hero" ${item.filter_cat==="hero"?"selected":""}>Hero (шапка страницы — этот элемент один)</option>
        <option value="feature" ${item.filter_cat==="feature"||!item.filter_cat?"selected":""}>Карточка услуги/возможности</option>
        <option value="pricing" ${item.filter_cat==="pricing"?"selected":""}>Тариф / цена</option>
        <option value="step" ${item.filter_cat==="step"?"selected":""}>Шаг процесса (нумеруется автоматически по порядку)</option>
        <option value="object" ${item.filter_cat==="object"?"selected":""}>Пункт списка (типы объектов и т.п.)</option>
        <option value="report" ${item.filter_cat==="report"?"selected":""}>Пункт отчётности</option>
        <option value="result" ${item.filter_cat==="result"?"selected":""}>Итоговый текст (обычно один элемент)</option>
        <option value="cta" ${item.filter_cat==="cta"?"selected":""}>CTA-блок внизу страницы (один элемент)</option>
        <option value="design" ${item.filter_cat==="design"?"selected":""}>Проектирование (для Архитектуры/Интерьера/Мебели)</option>
        <option value="render" ${item.filter_cat==="render"?"selected":""}>Рендеры и изображения (для 3D-визуализации)</option>
        <option value="animation" ${item.filter_cat==="animation"?"selected":""}>Анимация и панорамы (для 3D-визуализации)</option>
        <option value="viz3d" ${item.filter_cat==="viz3d"?"selected":""}>3D-визуализация (для Архитектуры)</option>
        <option value="product" ${item.filter_cat==="product"?"selected":""}>Вид изделия (для Мебели)</option>
        <option value="style" ${item.filter_cat==="style"?"selected":""}>Стиль/комплектация (для Интерьера)</option>
        <option value="material" ${item.filter_cat==="material"?"selected":""}>Материал (карточка в сетке материалов)</option>
        <option value="metal" ${item.filter_cat==="metal"?"selected":""}>Металл/фурнитура (для Архитектуры)</option>
      </select>
    </label>
    <label class="form-label">Цена<input id="f_stat_price" value="${esc(statVal(item.stats_ru,'price'))}" placeholder="80$ или «По запросу»"></label>
    <label class="form-label">Единица (за что)<input id="f_stat_unit" value="${esc(statVal(item.stats_ru,'unit'))}" placeholder="/ визит"></label>
    <label class="form-label">Цена EN<input id="f_stat_price_en" value="${esc(statVal(item.stats_en,'price'))}" placeholder="80$ or “On request”"></label>
    <label class="form-label">Единица EN<input id="f_stat_unit_en" value="${esc(statVal(item.stats_en,'unit'))}" placeholder="/ visit"></label>
    <label class="form-label wide">Пункты списка RU — по одному на строку<textarea id="f_requirements_ru" placeholder="Регулярные плановые визиты&#10;Контроль соответствия работ проекту">${esc(item.requirements_ru)}</textarea></label>
    <label class="form-label wide">Пункты списка EN<textarea id="f_requirements_en" placeholder="Regular scheduled inspections&#10;Compliance with approved drawings">${esc(item.requirements_en)}</textarea></label>
    <label class="form-label">Доп. пометка RU<input id="f_note_ru2" value="${esc(item.note_ru)}" placeholder="Оптимально для активной стройки"></label>
    <label class="form-label">Доп. пометка EN<input id="f_note_en2" value="${esc(item.note_en)}" placeholder="Best for active construction"></label>
    <p class="settings-hint">Для «Hero» используй поля Название (= заголовок H1) и Описание (= подзаголовок) выше, и Обложку — как фон шапки. Для «Итогового текста» — поле Описание. Для «Шага» и «Пункта списка» — только Название нужно, остальное можно не заполнять. «Широкая карточка» ниже = выделенная карточка (как «Полное сопровождение объекта»).</p>`;
  modal(id?"Редактировать":"Добавить",`<form id="editorForm">
    <div class="form-grid">
    <label class="form-label">Название RU<input id="f_title_ru" value="${esc(item.title_ru)}" required></label>
    <label class="form-label">Название EN<input id="f_title_en" value="${esc(item.title_en)}"></label>
    ${(isVacancy||isServicePage)?"":`<label class="form-label">Категория (метка)<input id="f_category" value="${esc(item.category)}" placeholder="Интерьер / Архитектура"></label>`}
    <label class="form-label">${isVacancy?"Опыт (кратко, для списка)":isServicesHub?"Ссылка на страницу услуги":"Локация"}<input id="f_location" value="${esc(item.location)}" placeholder="${isServicesHub?'interior_design.html':''}"></label>
    ${isServicesHub?`<label class="form-label">Размер карточки на странице «Услуги»<select id="f_filter_cat">
      <option value="large" ${item.filter_cat==="large"?"selected":""}>Большая</option>
      <option value="medium" ${item.filter_cat==="medium"?"selected":""}>Средняя</option>
      <option value="small" ${item.filter_cat==="small"||!item.filter_cat?"selected":""}>Маленькая</option>
    </select></label>`:`<label class="form-label">${isVacancy?"Зарплата (кратко, для списка)":"Площадь"}<input id="f_area" value="${esc(item.area)}" placeholder="${isVacancy?'от 2 000 $':'120 м²'}"></label>`}
    <label class="form-label">Статус<select id="f_status"><option value="published" ${item.status==="published"?"selected":""}>Опубликовано</option><option value="draft" ${item.status==="draft"?"selected":""}>Черновик</option><option value="hidden" ${item.status==="hidden"?"selected":""}>Скрыто</option></select></label>
    <label class="form-label">Порядок<input id="f_sort_order" type="number" value="${item.sort_order??1}"></label>
    <label class="form-label wide">Описание RU${isVacancy?" (для карточек-абзацев вместо списка характеристик)":isServicePage?" (для Hero — подзаголовок; для «Итогового текста» — сам текст)":""}<textarea id="f_description_ru">${esc(item.description_ru)}</textarea></label>
    <label class="form-label wide">Описание EN<textarea id="f_description_en">${esc(item.description_en)}</textarea></label>
    ${isVacancy?"":`<label class="form-label wide">Обложка${isServicePage?" — фото ИЛИ видео (.mp4/.webm/.mov), фон шапки страницы (только для блока Hero)":isServicesHub?" (фон карточки на странице «Услуги»)":" (главное фото)"}<input id="f_image" value="${esc(item.image)}" placeholder="images/photo.jpg или images/video.mp4 — вставь ссылку из Медиа"></label>`}
    ${portfolioFields}
    ${vacancyFields}
    ${serviceFields}
    <label class="check"><input id="f_featured" type="checkbox" ${item.featured==1?"checked":""}> ${isVacancy||isServicePage?"Широкая / выделенная карточка (featured)":"Показывать как избранное"}</label>
    </div>
    <div class="form-actions"><button type="button" class="btn-ghost" onclick="closeModal()">Отмена</button><button class="btn-gold">Сохранить</button></div>
  </form>`,true);
  $("editorForm").onsubmit=async e=>{
    e.preventDefault();
    let stats_ru=item.stats_ru||"", stats_en=item.stats_en||"";
    if(isServicePage){
      const p1=$("f_stat_price").value.trim(), u1=$("f_stat_unit").value.trim();
      const p2=$("f_stat_price_en").value.trim(), u2=$("f_stat_unit_en").value.trim();
      stats_ru=[p1?`price|${p1}`:"",u1?`unit|${u1}`:""].filter(Boolean).join("\n");
      stats_en=[p2?`price|${p2}`:"",u2?`unit|${u2}`:""].filter(Boolean).join("\n");
    } else if(isVacancy){
      stats_ru=$("f_stats_ru").value; stats_en=$("f_stats_en").value;
    }
    const payload={
      action:"save", type, id:id||0,
      title_ru:$("f_title_ru").value, title_en:$("f_title_en").value,
      category:(isVacancy||isServicePage)?"":$("f_category").value, location:$("f_location").value, area:isServicesHub?(item.area||""):$("f_area").value,
      status:$("f_status").value, sort_order:$("f_sort_order").value,
      description_ru:$("f_description_ru").value, description_en:$("f_description_en").value,
      image:isVacancy?(item.image||""):$("f_image").value, featured:$("f_featured").checked?1:0,
      filter_cat:(isPortfolio||isVacancy||isServicePage||isServicesHub)?$("f_filter_cat").value:(item.filter_cat||""),
      tags:isPortfolio?$("f_tags").value:(item.tags||""),
      gallery:isPortfolio?$("f_gallery").value:(item.gallery||""),
      badge_ru:isVacancy?$("f_badge_ru").value:(item.badge_ru||""),
      badge_en:isVacancy?$("f_badge_en").value:(item.badge_en||""),
      stats_ru, stats_en,
      requirements_ru:(isVacancy||isServicePage)?$("f_requirements_ru").value:(item.requirements_ru||""),
      requirements_en:(isVacancy||isServicePage)?$("f_requirements_en").value:(item.requirements_en||""),
      note_ru:isVacancy?$("f_note_ru").value:isServicePage?$("f_note_ru2").value:(item.note_ru||""),
      note_en:isVacancy?$("f_note_en").value:isServicePage?$("f_note_en2").value:(item.note_en||"")
    };
    try{await apiPost("api/items.php",payload);closeModal();toast("Изменения сохранены");list(type)}
    catch(err){toast("Ошибка: "+err.message)}
  };
}

/* ══════════════ ЗАЯВКИ ══════════════ */

async function applicationsPage(){
  $("pageContent").innerHTML=`<div class="pane-tools"><input class="search-box" placeholder="Поиск..." oninput="filterApps(this.value)"></div><div class="table" id="appsRows"><div class="row"><div class="row-main">Загрузка…</div></div></div>`;
  try{
    const {items}=await apiGet("api/applications.php");
    renderApps(items);
    updateAppsBadge(items);
  }catch(e){$("appsRows").innerHTML=`<div class="row"><div class="row-main">Ошибка загрузки: ${esc(e.message)}</div></div>`}
}

function renderApps(items){
  if(!items.length){$("appsRows").innerHTML=`<div class="row"><div class="row-main">Заявок пока нет.</div></div>`;return}
  $("appsRows").innerHTML=items.map(a=>{
    const dt=new Date(a.created_at.replace(" ","T")).toLocaleString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});
    return `<div class="row" data-search="${esc((a.name+" "+a.contact+" "+a.message+" "+a.source_page+" "+a.subject).toLowerCase())}" style="align-items:flex-start">
      <div class="row-main">
        <div class="row-title">${esc(a.name)} — ${esc(a.contact)}</div>
        <div class="row-meta">${esc(a.subject||a.source_page||"Заявка")} · ${dt}${a.message?" · "+esc(a.message):""}</div>
      </div>
      <span class="badge ${a.status==='new'?'draft':'published'}">${a.status==='new'?'Новая':a.status==='done'?'Обработано':'Прочитано'}</span>
      <div class="row-actions">
        ${a.status!=='done'?`<button class="small-btn" onclick="markApp(${a.id},'done')">Обработано</button>`:``}
        <button class="small-btn" onclick="deleteApp(${a.id})">Удалить</button>
      </div>
    </div>`;
  }).join("");
}
function filterApps(q){q=q.toLowerCase();document.querySelectorAll("#appsRows .row").forEach(r=>r.style.display=(!r.dataset.search||r.dataset.search.includes(q))?"flex":"none")}

async function markApp(id,status){
  try{await apiPost("api/applications.php",{action:"mark",id,status});applicationsPage()}
  catch(e){toast("Ошибка: "+e.message)}
}
async function deleteApp(id){
  if(!confirm("Удалить заявку?"))return;
  try{await apiPost("api/applications.php",{action:"delete",id});applicationsPage()}
  catch(e){toast("Ошибка: "+e.message)}
}

function updateAppsBadge(items){
  const n=items.filter(a=>a.status==='new').length;
  const b=$("appsBadge");
  if(n>0){b.style.display="";b.textContent=n}else{b.style.display="none"}
}

async function refreshAppsBadge(){
  try{const {items}=await apiGet("api/applications.php");updateAppsBadge(items)}catch(e){}
}

/* ══════════════ ОБЗОР СТРАНИЦЫ (все блоки сразу, с превью) ══════════════ */

const SD_LABELS = {
  hero:"Hero-блок", feature:"Карточки услуг", pricing:"Тарифы", step:"Этапы работы",
  object:"Типы объектов", report:"Отчётность заказчику", result:"Результат", cta:"CTA (призыв к действию)",
  design:"Проектирование", viz3d:"3D-визуализация", material:"Материалы", metal:"Металл",
  product:"Виды изделий", style:"Стили и комплектация", render:"Рендеры и изображения", animation:"Анимация и панорамы",
  interior:"Интерьер", arch:"Архитектура", furniture:"Мебель", commercial:"Коммерческие"
};
const SD_ORDER_BASE = ["hero","feature","design","render","animation","viz3d","pricing","product","style","material","metal","step","object","report","result","cta","interior","arch","furniture","commercial"];

function sdOrderFor(items){
  const present = new Set(items.map(x=>x.filter_cat).filter(Boolean));
  const known = SD_ORDER_BASE.filter(c=>present.has(c));
  const unknown = [...present].filter(c=>!SD_ORDER_BASE.includes(c));
  return [...known, ...unknown];
}

function sdMiniItem(type,x,extra,showThumb){
  const isVid=/\.(mp4|webm|mov)$/i.test(x.image||"");
  const thumb=showThumb&&x.image?`<div class="sd-mini-thumb">${isVid?`<video src="${esc(x.image)}" muted></video>`:`<img src="${esc(x.image)}" onerror="this.style.display='none'">`}</div>`:"";
  return `<div class="sd-mini${showThumb?" sd-mini-withthumb":""}">
    <div style="cursor:pointer" onclick="editor('${type}',${x.id})">
    ${thumb}
    <div class="sd-mini-body">
      <span class="sd-mini-title">${esc(x.title_ru||"(без названия)")}</span>
      ${showThumb?`<span class="sd-mini-hint">${x.image?"Кликни, чтобы поменять фото/видео":"Фото/видео не задано — кликни, чтобы добавить"}</span>`:""}
    </div>
    </div>
    <div class="sd-mini-footer">
      ${extra?`<span class="sd-mini-extra">${esc(extra)}</span>`:"<span></span>"}
      <button class="small-btn" onclick="event.stopPropagation();removeSdItem(${x.id},'${type}')">Удалить</button>
    </div>
  </div>`;
}

async function removeSdItem(id,type){
  if(!confirm("Удалить этот элемент?"))return;
  try{
    await apiPost("api/items.php",{action:"delete",id});
    toast("Удалено");
    const active=document.querySelector(".nav-item.active");
    if(active) render(active.dataset.page);
  }catch(e){toast("Ошибка: "+e.message)}
}

/* ══════════════ ПОРТФОЛИО (Hero + категории-таблица + проекты-таблица) ══════════════ */

let PF_CATS=[], PF_ITEMS=[], PF_NAV=[];

async function portfolioDashboard(){
  $("pageContent").innerHTML=`<div style="display:flex;justify-content:flex-end;gap:8px;margin-bottom:16px">
    <button class="btn-ghost" onclick="window.open('portfolio.html','_blank')">👁 Просмотреть страницу</button>
    <button class="btn-gold" onclick="savePfHero()">Сохранить Hero</button>
  </div><div id="pfBody">Загрузка…</div>`;
  try{
    const [{items},{items:cats},{items:navItems}]=await Promise.all([
      apiGet("api/items.php?action=list&type=portfolio"),
      apiGet("api/items.php?action=list&type=portfolio_cat"),
      apiGet("api/items.php?action=list&type=nav_portfolio")
    ]);
    PF_ITEMS=items; PF_CATS=cats; PF_NAV=navItems;
    renderPortfolioDashboard();
  }catch(e){$("pfBody").innerHTML="Ошибка загрузки: "+esc(e.message)}
}

function renderPortfolioDashboard(){
  const hero=PF_ITEMS.find(x=>x.filter_cat==="hero")||{title_ru:"",title_en:"",description_ru:"",description_en:"",image:"",id:null};
  const projects=PF_ITEMS.filter(x=>x.filter_cat!=="hero");

  let html="";

  // 0. Навигация (общая для сайта)
  html+=`<div class="card" style="margin-bottom:14px"><div class="section-head"><div><h2>0. Верхняя навигация</h2><p>Только для страницы «Портфолио»</p></div><button class="small-btn" onclick="editor('nav_portfolio')">+ Добавить пункт</button></div>
    <div class="table">${PF_NAV.map(n=>`<div class="row"><div class="row-main"><div class="row-title">${esc(n.title_ru)}</div><div class="row-meta">${esc(n.location||"")} · ${esc(n.title_en||"")}</div></div><span class="badge ${n.status}">${n.status==="published"?"Показан":"Скрыт"}</span><div class="row-actions"><button class="small-btn" onclick="editor('nav_portfolio',${n.id})">Редактировать</button></div></div>`).join("")||'<p class="settings-hint">Пусто</p>'}</div>
  </div>`;

  // 1. Hero — инлайн-поля, без модалки
  const heroImg=hero.image?`<div class="hp-thumb">${/\.(mp4|webm|mov)$/i.test(hero.image)?`<video src="${esc(hero.image)}" muted controls></video>`:`<img src="${esc(hero.image)}" onerror="this.style.display='none'">`}</div>`:`<div class="hp-thumb" style="display:flex;align-items:center;justify-content:center;color:#555;font-size:10px">нет картинки</div>`;
  html+=`<div class="card" style="margin-bottom:14px"><div class="section-head"><div><h2>1. Hero-блок</h2><p>Шапка страницы «Портфолио»</p></div></div>
    <div style="display:grid;grid-template-columns:260px 1fr;gap:20px;align-items:start">
      ${heroImg}
      <div class="form-grid">
        <label class="form-label">Заголовок RU<input class="pf-hero-field" data-key="title_ru" value="${esc(hero.title_ru)}"></label>
        <label class="form-label">Заголовок EN<input class="pf-hero-field" data-key="title_en" value="${esc(hero.title_en)}"></label>
        <label class="form-label wide">Описание RU<textarea class="pf-hero-field" data-key="description_ru">${esc(hero.description_ru)}</textarea></label>
        <label class="form-label wide">Описание EN<textarea class="pf-hero-field" data-key="description_en">${esc(hero.description_en)}</textarea></label>
        <label class="form-label wide">Картинка (путь из «Медиа»)<input class="pf-hero-field" data-key="image" value="${esc(hero.image)}" placeholder="images/portfolio.png"></label>
      </div>
    </div>
  </div>`;

  // 2. Категории — таблица
  html+=`<div class="card" style="margin-bottom:14px"><div class="section-head"><div><h2>2. Категории фильтра</h2><p>Кнопки-фильтры над проектами на сайте</p></div><button class="small-btn" onclick="editor('portfolio_cat')">+ Добавить категорию</button></div>
    <div class="table">${PF_CATS.map(c=>`<div class="row"><div class="row-main"><div class="row-title">${esc(c.title_ru)}</div><div class="row-meta">${esc(c.title_en||"")} · slug: ${esc(c.location||"")}</div></div><span class="badge ${c.status}">${c.status==="published"?"Показан":"Скрыт"}</span><div class="row-actions"><button class="small-btn" onclick="editor('portfolio_cat',${c.id})">Редактировать</button><button class="small-btn" onclick="removeItem(${c.id})">Удалить</button></div></div>`).join("")||'<p class="settings-hint">Пока пусто</p>'}</div>
  </div>`;

  // 3. Проекты — таблица
  const catOptions=['<option value="">Все категории</option>'].concat(PF_CATS.filter(c=>c.location!=="all").map(c=>`<option value="${esc(c.location)}">${esc(c.title_ru)}</option>`)).join("");
  html+=`<div class="card"><div class="section-head"><div><h2>3. Проекты</h2><p>${projects.length} ${projects.length===1?"проект":"проектов"}</p></div><button class="small-btn" onclick="editor('portfolio')">+ Добавить проект</button></div>
    <div class="pane-tools">
      <input class="search-box" id="pfSearch" placeholder="Поиск проектов..." oninput="filterPfTable()">
      <select id="pfCatFilter" onchange="filterPfTable()" style="max-width:200px">${catOptions}</select>
    </div>
    <div class="table" id="pfProjectsTable"></div>
  </div>`;

  $("pfBody").innerHTML=html;
  renderPfProjectsTable(projects);
}

function catLabel(slug){const c=PF_CATS.find(c=>c.location===slug);return c?c.title_ru:(slug||"—")}

function renderPfProjectsTable(items){
  $("pfProjectsTable").innerHTML=items.length?items.map(x=>`
    <div class="row" data-search="${esc((x.title_ru+" "+x.title_en).toLowerCase())}" data-cat="${esc(x.filter_cat||"")}">
      <div class="thumb"><img src="${esc(x.image||'')}" onerror="this.style.display='none'"></div>
      <div class="row-main"><div class="row-title">${esc(x.title_ru)}</div><div class="row-meta">${esc(x.title_en||"")} · ${esc(catLabel(x.filter_cat))}</div></div>
      <span class="badge ${x.status}">${x.status==="published"?"Опубликован":x.status==="hidden"?"Скрыт":"Черновик"}</span>
      <div class="row-actions"><button class="small-btn" onclick="editor('portfolio',${x.id})">Редактировать</button><button class="small-btn" onclick="removePfProject(${x.id})">Удалить</button></div>
    </div>`).join(""):'<div class="row"><div class="row-main">Пока нет проектов</div></div>';
}

function filterPfTable(){
  const q=($("pfSearch").value||"").toLowerCase();
  const cat=$("pfCatFilter").value;
  document.querySelectorAll("#pfProjectsTable .row").forEach(r=>{
    const matchQ=!r.dataset.search||r.dataset.search.includes(q);
    const matchC=!cat||r.dataset.cat===cat;
    r.style.display=(matchQ&&matchC)?"flex":"none";
  });
}

async function removePfProject(id){
  if(!confirm("Удалить проект?"))return;
  try{await apiPost("api/items.php",{action:"delete",id});toast("Удалено");portfolioDashboard()}
  catch(e){toast("Ошибка: "+e.message)}
}

async function savePfHero(){
  const hero=PF_ITEMS.find(x=>x.filter_cat==="hero")||{};
  const vals={};
  document.querySelectorAll(".pf-hero-field").forEach(el=>{ vals[el.dataset.key]=el.value; });
  const payload={
    action:"save", type:"portfolio", id:hero.id||0,
    title_ru:vals.title_ru, title_en:vals.title_en,
    description_ru:vals.description_ru, description_en:vals.description_en,
    image:vals.image, filter_cat:"hero",
    category:"",location:"",area:"",featured:0,sort_order:hero.sort_order||1,
    tags:"",gallery:"",badge_ru:"",badge_en:"",stats_ru:"",stats_en:"",requirements_ru:"",requirements_en:"",note_ru:"",note_en:""
  };
  try{await apiPost("api/items.php",payload);toast("Hero сохранён");portfolioDashboard()}
  catch(e){toast("Ошибка: "+e.message)}
}

const NAV_TYPE_MAP={architecture:"nav_architecture",interior:"nav_interior",furniture:"nav_mebel",viz:"nav_3dviz",supervision:"nav_author6",designer:"nav_designerday",services:"nav_servis",portfolio:"nav_portfolio",vacancies:"nav_vacancies"};

async function serviceDashboard(type){
  currentType=type;
  $("pageContent").innerHTML=`<div class="dash-grid" id="dashGrid">Загрузка…</div>`;
  try{
    const navType=NAV_TYPE_MAP[type]||"nav";
    const [{items},{settings:s},navRes]=await Promise.all([
      apiGet(`api/items.php?action=list&type=${type}`),
      apiGet("api/settings.php"),
      apiGet(`api/items.php?action=list&type=${navType}`)
    ]);
    currentItems=items;
    renderServiceDashboard(type,items,s,navRes.items,navType);
  }catch(e){$("dashGrid").innerHTML=`Ошибка загрузки: ${esc(e.message)}`}
}

function renderServiceDashboard(type,items,s,navItems,navType){
  navType=navType||NAV_TYPE_MAP[type]||"nav";
  const byCat=c=>items.filter(x=>x.filter_cat===c);
  let html="";

  // ── Навигация (своя, только для этой страницы) ──
  html+=`<div class="card sd-card"><div class="section-head"><div><h2>Верхняя навигация</h2><p>Только для этой страницы</p></div><button class="small-btn" onclick="editor('${navType}')">+ Добавить пункт</button></div>
    <div class="sd-list">${navItems.slice(0,5).map(n=>sdMiniItem(navType,n,n.location)).join("")||'<p class="settings-hint">Пусто — меню на сайте статичное</p>'}</div></div>`;

  // ── Секции самой страницы ──
  const order = sdOrderFor(items);
  const uncategorized = items.filter(x=>!x.filter_cat);
  if(uncategorized.length){
    const label = type==="services" ? "Все услуги" : "Без категории";
    html+=`<div class="card sd-card">
      <div class="section-head"><div><h2>${esc(label)}</h2><p>${uncategorized.length} ${uncategorized.length===1?"элемент":"элементов"}</p></div></div>
      <div class="sd-list">${uncategorized.map(x=>sdMiniItem(type,x,x.category||"")).join("")}</div>
    </div>`;
  }
  order.forEach(cat=>{
    const list=byCat(cat);
    const label = SD_LABELS[cat] || cat;
    html+=`<div class="card sd-card">
      <div class="section-head"><div><h2>${esc(label)}</h2><p>${list.length} ${list.length===1?"элемент":"элементов"}</p></div></div>
      <div class="sd-list">
        ${list.length?list.map(x=>{
          const extra = (x.stats_ru||'').replace(/\\n/g,"\n").split("\n").find(l=>l.startsWith("price|"))?.split("|")[1] || (cat==="hero"?x.description_ru:"");
          return sdMiniItem(type,x,extra,cat==="hero");
        }).join(""):'<p class="settings-hint">Пока пусто</p>'}
      </div>
    </div>`;
  });

  // ── Контакты сайта (можно редактировать прямо тут) ──
  const chans=[['telegram','Telegram',s.telegram],['whatsapp','WhatsApp',s.whatsapp],['contact_email','Email',s.contact_email],['contact_phone','Телефон',s.contact_phone]].filter(c=>c[2]);
  html+=`<div class="card sd-card"><div class="section-head"><div><h2>Контакты сайта</h2><p>Общие для всего сайта</p></div><button class="small-btn" onclick="editContactsQuick()">Редактировать</button></div>
    <div class="sd-list">${chans.map(c=>`<div class="sd-mini"><span class="sd-mini-title">${esc(c[1])}</span><span class="sd-mini-extra">${esc(c[2])}</span></div>`).join("")||'<p class="settings-hint">Не заполнено</p>'}</div></div>`;

  // ── Footer (можно редактировать прямо тут) ──
  html+=`<div class="card sd-card"><div class="section-head"><div><h2>Footer</h2><p>Общий для всего сайта</p></div><button class="small-btn" onclick="editContactsQuick()">Редактировать</button></div>
    <div class="sd-list"><p class="settings-hint">${esc(s.footer_ru||"© 2026 MUKAAB (по умолчанию)")}</p></div></div>`;

  $("dashGrid").innerHTML=html;
}

function editNavQuick(){
  modal("Верхняя навигация",`<div id="navQuickList">Загрузка…</div><div class="form-actions"><button type="button" class="btn-ghost" onclick="closeModal()">Закрыть</button></div>`,true);
  apiGet("api/items.php?action=list&type=nav").then(({items})=>{
    $("navQuickList").innerHTML = items.length ? `<div class="table">${items.map(n=>`<div class="row"><div class="row-main"><div class="row-title">${esc(n.title_ru)}</div><div class="row-meta">${esc(n.location||"")}</div></div><div class="row-actions"><button class="small-btn" onclick="editor('nav',${n.id})">Редактировать</button></div></div>`).join("")}</div>` : '<p class="settings-hint">Пока пусто</p>';
  });
}

function editContactsQuick(){
  modal("Контакты сайта и Footer",`<div id="contactsQuickForm">Загрузка…</div>`,true);
  apiGet("api/settings.php").then(({settings:s})=>{
    const chans=[
      {key:'telegram',label:'Telegram',ph:'@mukaab_company'},
      {key:'whatsapp',label:'WhatsApp',ph:'+375 XX XXX XX XX'},
      {key:'contact_email',label:'Email',ph:'mukaabcompany@gmail.com'},
      {key:'contact_phone',label:'Телефон',ph:'+375 (33) 916-11-11'},
    ];
    $("contactsQuickForm").innerHTML = `<div class="form-grid">
      ${chans.map(c=>`<label class="form-label wide">${c.label}${sf(c.key,s[c.key],c.ph)}</label>`).join("")}
      <label class="form-label wide">Адрес RU${sf("address",s.address)}</label>
      <label class="form-label wide">Футер (копирайт) RU${sf("footer_ru",s.footer_ru,"© 2026 MUKAAB")}</label>
      <label class="form-label wide">Компания в футере (УНП/рег. номер)${sf("company_unp",s.company_unp,"ООО «Мукааб» УНП: 193790928")}</label>
    </div>
    <div class="settings-subhead">Соцсети (иконки в футере)</div>
    <div class="form-grid">
      <label class="form-label">Instagram${sf("social_instagram",s.social_instagram)}</label>
      <label class="form-label">Behance${sf("social_behance",s.social_behance)}</label>
      <label class="form-label">YouTube${sf("social_youtube",s.social_youtube)}</label>
      <label class="form-label">VKontakte${sf("social_vk",s.social_vk)}</label>
      <label class="form-label">Pinterest${sf("social_pinterest",s.social_pinterest)}</label>
      <label class="form-label">LinkedIn${sf("social_linkedin",s.social_linkedin)}</label>
    </div>
    <div class="form-actions"><button type="button" class="btn-ghost" onclick="closeModal()">Отмена</button><button class="btn-gold" onclick="saveContactsQuick()">Сохранить</button></div>`;
  });
}

async function saveContactsQuick(){
  const payload={};
  document.querySelectorAll("#contactsQuickForm .settings-field").forEach(el=>{ payload[el.dataset.key]=el.value; });
  try{await apiPost("api/settings.php",payload);closeModal();toast("Сохранено");if(currentType)serviceDashboard(currentType)}
  catch(e){toast("Ошибка: "+e.message)}
}

function editorNewFor(type,filterCat){
  editor(type);
  // предзаполним "Блок страницы" после открытия формы
  setTimeout(()=>{ const sel=$("f_filter_cat"); if(sel) sel.value=filterCat; },0);
}

function upload(){
  modal("Загрузка медиа",`<div class="dropzone" onclick="document.getElementById('files').click()">Нажмите для выбора файлов<br><small>JPG, PNG, WEBP (до 8МБ) · MP4, WEBM, MOV (до 60МБ)</small><input id="files" type="file" multiple accept="image/*,video/mp4,video/webm,.mov" hidden></div><div class="form-actions"><button class="btn-ghost" onclick="closeModal()">Закрыть</button></div>`);
  $("files").onchange=async()=>{
    const files=$("files").files;
    if(!files.length)return;
    const fd=new FormData();
    for(const f of files) fd.append("files[]",f);
    toast("Загрузка…");
    try{
      const res=await fetch(API+"api/media.php",{method:"POST",credentials:"same-origin",body:fd});
      const data=await res.json();
      if(!res.ok) throw new Error(data.error||"Ошибка загрузки");
      toast(`Загружено файлов: ${data.uploaded.length}`);
      closeModal();
    }catch(e){toast("Ошибка: "+e.message)}
  };
}

function render(p){$("pageTitle").textContent=pages[p][0];$("pageSubtitle").textContent=pages[p][1];document.querySelectorAll(".nav-item").forEach(x=>x.classList.toggle("active",x.dataset.page===p));const servicePages=["architecture","interior","furniture","viz","supervision","designer","services"];p==="dashboard"?dashboard():p==="homepage"?homepageDashboard():p==="settings"?settingsDashboard():p==="applications"?applicationsPage():p==="contacts"?contactsPage():p==="nav"?list("nav"):p==="portfolio"?portfolioDashboard():servicePages.includes(p)?serviceDashboard(p):list(p)}
document.querySelectorAll(".nav-item").forEach(x=>x.onclick=()=>render(x.dataset.page));

$("loginForm").onsubmit=async e=>{
  e.preventDefault();
  $("loginError").classList.add("hidden");
  try{
    await apiPost("auth/login.php",{username:$("login").value,password:$("password").value});
    $("loginScreen").classList.add("hidden");$("app").classList.remove("hidden");render("dashboard");refreshAppsBadge();
  }catch(err){$("loginError").textContent=err.message||"Неверный логин или пароль.";$("loginError").classList.remove("hidden")}
};
$("togglePassword").onclick=()=>{$("password").type=$("password").type==="password"?"text":"password"};
$("forgot").onclick=()=>toast("Обратитесь к разработчику для сброса пароля");
$("logout").onclick=async()=>{try{await apiPost("auth/logout.php",{})}catch(e){}location.reload()};
$("bellBtn").onclick=()=>toast("Новых уведомлений нет");
$("searchBtn").onclick=()=>toast("Глобальный поиск будет подключён позже");

(async function init(){
  try{
    const r=await apiGet("auth/check.php");
    if(r.authenticated){$("loginScreen").classList.add("hidden");$("app").classList.remove("hidden");render("dashboard");refreshAppsBadge()}
  }catch(e){/* остаёмся на экране логина */}
})();
