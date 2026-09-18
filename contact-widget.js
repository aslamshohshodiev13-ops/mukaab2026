/* ══════════════════════════════════════════════════════════
   Общий виджет обратной связи — подключается на страницы услуг.
   1) Подставляет Telegram/WhatsApp из Настроек админки в шапку.
   2) Делает кнопки "Оставить заявку"/CTA рабочими — открывают форму,
      отправка идёт в mukaab-admin-backend/public/apply.php,
      заявка появляется в админке в разделе "Заявки".
════════════════════════════════════════════════════════════ */
(function(){
  const CW_SETTINGS_URL = "mukaab-admin-backend/public/settings.php";
  const CW_APPLY_URL = "mukaab-admin-backend/public/apply.php";

  function cwLang(){
    if (document.documentElement.lang === 'en') return 'en';
    const enBtn = document.getElementById('btn-en') || document.getElementById('mob-btn-en');
    if (enBtn && enBtn.classList.contains('active')) return 'en';
    return 'ru';
  }
  function cwEsc(s){return (s??'').toString().replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  function cwPageTitle(){ const h1 = document.querySelector('.hero-content h1, h1'); return h1 ? h1.textContent.trim() : document.title; }

  const T = {
    ru: { label:'Оставить заявку', name:'Имя и фамилия', contact:'Telegram / телефон / email', msg:'Коротко о задаче (необязательно)', send:'Отправить', err:'Заполните имя и контакт', ok:'Заявка отправлена! Мы свяжемся с вами в ближайшее время.' },
    en: { label:'Send a Request', name:'Full name', contact:'Telegram / phone / email', msg:'A few words about your project (optional)', send:'Send', err:'Please fill in your name and contact', ok:'Request sent! We will contact you shortly.' }
  };

  function injectModal(){
    if(document.getElementById('cwOverlay')) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = `
<div id="cwOverlay" style="position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.60);backdrop-filter:blur(18px);display:flex;justify-content:center;align-items:center;opacity:0;visibility:hidden;transition:.35s ease;">
  <div id="cwModal" style="width:min(540px,94vw);background:rgba(10,10,10,0.97);border:1px solid rgba(255,255,255,.09);border-radius:6px;padding:40px 40px 36px;position:relative;transform:translateY(24px) scale(.97);transition:.35s cubic-bezier(.19,1,.22,1);">
    <div id="cwLabel" style="font-size:10px;letter-spacing:.32em;text-transform:uppercase;color:#3b82f6;font-weight:700;margin-bottom:12px;">Заявка</div>
    <div id="cwTitle" style="font-size:22px;font-weight:800;letter-spacing:-.02em;margin-bottom:28px;">—</div>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <input id="cwName" type="text" placeholder="Имя и фамилия" style="height:50px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:4px;padding:0 18px;color:#fff;font-family:'Montserrat',sans-serif;font-size:14px;outline:none;">
      <input id="cwContact" type="text" placeholder="Telegram / телефон / email" style="height:50px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:4px;padding:0 18px;color:#fff;font-family:'Montserrat',sans-serif;font-size:14px;outline:none;">
      <textarea id="cwMessage" placeholder="Коротко о задаче" rows="3" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:4px;padding:14px 18px;color:#fff;font-family:'Montserrat',sans-serif;font-size:14px;outline:none;resize:none;line-height:1.6;"></textarea>
    </div>
    <div id="cwError" style="display:none;margin-top:10px;font-size:12px;color:rgba(255,100,100,.8);"></div>
    <div id="cwSuccess" style="display:none;margin-top:10px;font-size:13px;color:rgba(130,230,160,.85);"></div>
    <button id="cwSubmit" style="width:100%;height:52px;margin-top:22px;border:none;border-radius:4px;background:linear-gradient(135deg,#0051ff,#2563eb);color:#fff;font-size:15px;font-weight:700;font-family:'Montserrat',sans-serif;cursor:pointer;transition:.35s;letter-spacing:.04em;" onmouseover="this.style.background='linear-gradient(135deg,#2563eb,#3b82f6)'" onmouseout="this.style.background='linear-gradient(135deg,#0051ff,#2563eb)'">Отправить</button>
    <button id="cwClose" style="position:absolute;top:20px;right:20px;width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.04);color:rgba(255,255,255,.6);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
  </div>
</div>`;
    document.body.appendChild(wrap.firstElementChild);
    document.getElementById('cwOverlay').addEventListener('click', e => { if(e.target.id==='cwOverlay') closeContactModal(); });
    document.getElementById('cwClose').addEventListener('click', closeContactModal);
    document.getElementById('cwSubmit').addEventListener('click', submitContactModal);
    document.addEventListener('keydown', e => { if(e.key==='Escape') closeContactModal(); });
  }

  let cwSubject = '';

  window.openContactModal = function(subject){
    injectModal();
    const l = cwLang(), t = T[l];
    cwSubject = subject || cwPageTitle();
    document.getElementById('cwLabel').textContent = l==='ru' ? 'Заявка' : 'Request';
    document.getElementById('cwTitle').textContent = t.label;
    document.getElementById('cwName').placeholder = t.name;
    document.getElementById('cwContact').placeholder = t.contact;
    document.getElementById('cwMessage').placeholder = t.msg;
    document.getElementById('cwSubmit').textContent = t.send;
    document.getElementById('cwName').value = '';
    document.getElementById('cwContact').value = '';
    document.getElementById('cwMessage').value = '';
    document.getElementById('cwError').style.display = 'none';
    document.getElementById('cwSuccess').style.display = 'none';
    document.getElementById('cwSubmit').style.display = '';
    const ov = document.getElementById('cwOverlay'), mo = document.getElementById('cwModal');
    ov.style.opacity = '1'; ov.style.visibility = 'visible';
    mo.style.transform = 'translateY(0) scale(1)';
    document.body.style.overflow = 'hidden';
  };

  window.closeContactModal = function(){
    const ov = document.getElementById('cwOverlay'); if(!ov) return;
    const mo = document.getElementById('cwModal');
    ov.style.opacity = '0'; ov.style.visibility = 'hidden';
    mo.style.transform = 'translateY(24px) scale(.97)';
    document.body.style.overflow = '';
  };

  async function submitContactModal(){
    const l = cwLang(), t = T[l];
    const name = document.getElementById('cwName').value.trim();
    const contact = document.getElementById('cwContact').value.trim();
    const message = document.getElementById('cwMessage').value.trim();
    const err = document.getElementById('cwError'), suc = document.getElementById('cwSuccess');
    if(!name || !contact){ err.textContent = t.err; err.style.display = 'block'; return; }
    err.style.display = 'none';
    try{
      const res = await fetch(CW_APPLY_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({
        name, contact, message, subject: cwSubject, source_page: cwPageTitle()
      })});
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || 'error');
      suc.textContent = t.ok; suc.style.display = 'block';
      document.getElementById('cwSubmit').style.display = 'none';
      setTimeout(closeContactModal, 2500);
    }catch(e){
      err.textContent = (l==='ru' ? 'Ошибка отправки, попробуйте ещё раз' : 'Failed to send, please try again');
      err.style.display = 'block';
    }
  }

  function wireButtons(){
    document.querySelectorAll('.cta-btn').forEach(btn=>{
      if(btn.dataset.cwWired || btn.getAttribute('onclick')) return;
      btn.dataset.cwWired = '1';
      btn.addEventListener('click', () => openContactModal(cwPageTitle()));
    });
  }

  function applyContactLinks(s){
    // Собираем 4 канала связи с учётом "показывать" и "порядок"
    const chans = [
      {key:'telegram', label:'Telegram', href: s.client_bot_username ? ('https://t.me/'+s.client_bot_username.replace('@','')) : (s.telegram ? (/^https?:/.test(s.telegram) ? s.telegram : 'https://t.me/'+s.telegram.replace('@','')) : '')},
      {key:'whatsapp', label:'WhatsApp', href: s.whatsapp ? (/^https?:/.test(s.whatsapp) ? s.whatsapp : 'https://wa.me/'+s.whatsapp.replace(/[^\d]/g,'')) : ''},
      {key:'contact_email', label: cwLang()==='ru' ? (s.contact_email_btn_ru||'Email') : (s.contact_email_btn_en||'Email'), href: s.contact_email ? ('mailto:'+s.contact_email) : ''},
      {key:'contact_phone', label: cwLang()==='ru' ? (s.contact_phone_btn_ru||'Позвонить') : (s.contact_phone_btn_en||'Call'), href: s.contact_phone ? ('tel:'+s.contact_phone.replace(/[^\d+]/g,'')) : ''},
    ].filter(c => c.href && s[c.key+'_enabled'] !== '0')
     .sort((a,b) => (parseInt(s[a.key+'_order']||'1')) - (parseInt(s[b.key+'_order']||'1')));

    if(!chans.length) return; // ничего не настроено — оставляем то, что уже в HTML

    const writeText = cwLang()==='ru' ? 'Написать нам' : 'Contact Us';
    const html = chans.map(c => `<a href="${c.href}" target="${c.key==='telegram'||c.key==='whatsapp'?'_blank':'_self'}">${cwEsc(c.label)}</a>`).join('')
      + `<a href="#" data-cw-write="1">${cwEsc(writeText)}</a>`;

    ['contactMenu','mobileContactMenu'].forEach(id=>{
      const el = document.getElementById(id);
      if(el) el.innerHTML = html;
    });
    document.querySelectorAll('[data-cw-write]').forEach(a=>{
      a.addEventListener('click', e=>{ e.preventDefault(); openContactModal(cwPageTitle()); });
    });
  }

  async function loadNavMenu(){
    try{
      const res = await fetch("mukaab-admin-backend/public/list.php?type=nav", { cache:'no-store' });
      const data = await res.json();
      const items = (data.items||[]);
      if(!items.length) return; // ничего не настроено в админке — оставляем статичное меню
      const l = cwLang();
      const html = items.map(x => `<a href="${cwEsc(x.location||'#')}">${cwEsc(x['title_'+l]||x.title_ru)}</a>`).join('');
      const desktop = document.getElementById('navLeftDesktop');
      const mobile = document.getElementById('navLeftMobile');
      if(desktop) desktop.innerHTML = html;
      if(mobile) mobile.innerHTML = html;
    }catch(e){ /* бэкенд недоступен — остаётся статичное меню */ }
  }

  document.addEventListener('DOMContentLoaded', wireButtons);
  if (document.readyState !== 'loading') wireButtons();

  loadNavMenu();

  fetch(CW_SETTINGS_URL, { cache:'no-store' })
    .then(r=>r.json())
    .then(d=>{ if(d && d.settings) applyContactLinks(d.settings); })
    .catch(()=>{});
})();