const $=(id)=>document.getElementById(id);const esc=(s)=>String(s??'').replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const store={get(k){try{return localStorage.getItem(k);}catch{return null;}},set(k,v){try{localStorage.setItem(k,v);}catch{}},};function merge(base,over){if(over===undefined)return base;if(Array.isArray(base)&&Array.isArray(over))return base.map((b,i)=>merge(b,over[i]));if(base&&typeof base==='object'&&over&&typeof over==='object'&&!Array.isArray(over)){const out={...base};for(const k of Object.keys(over))out[k]=merge(base[k],over[k]);return out;}
return over;}
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;let lang=store.get('lang')==='en'?'en':'ko';let P=null;let U=null;const ICON={arrow:'<svg class="i-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 16 16 8M9.5 8H16v6.5"/></svg>',mail:'<svg class="i-line" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></svg>',linkedin:'<svg class="i-fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.6 8.65 22 11.2 22 14.5V21h-4v-5.8c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.1V21H10V9Z"/></svg>',right:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>',check:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg>',chev:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg>',sun:'<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3.5"/><path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6 16 16M4 16l1.4-1.4M14.6 5.4 16 4"/></svg>',moon:'<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M16.5 12.5A7 7 0 0 1 7.5 3.5a7 7 0 1 0 9 9Z"/></svg>',};const contactIcons=(links)=>links.map((l)=>{const icon=/linkedin/i.test(l.href)?ICON.linkedin:ICON.mail;const tgt=l.href.startsWith('mailto:')?'':' target="_blank" rel="noopener"';return`<a class="icon-link" href="${esc(l.href)}"${tgt} aria-label="${esc(l.label)}" title="${esc(l.text || l.label)}">${icon}</a>`;}).join('');const todo=(t)=>(t?`<span class="ui-tag amber todo">${esc(U.todo)} · ${esc(t)}</span>`:'');const list=(items)=>(items?.length?`<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`:'');const ext=(l)=>(l?`<a class="ext" href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.text)} ${ICON.arrow}</a>`:'');const emph=(text)=>esc(text).replace(/\[\[(.*?)\]\]/g,'<strong>$1</strong>');const sechead=(num,key,note)=>`
  <div class="ui-sechead">
    <span class="sec-num">${num}</span>
    <h2 class="ui-sectitle sec-en">${esc(SECTION_EN[key])}</h2>
    ${lang === 'ko' ? `<span class="sec-ko">${esc(U.sections[key])}</span>` : ''}
    ${note ? `<span class="ui-secnote">${esc(note)}</span>` : ''}
  </div>`;const SECTION_EN={career:'CAREER',strengths:'STRENGTHS',projects:'PROJECTS',more:'MORE'};function renderTop(){document.documentElement.lang=lang;document.title=`${P.profile.name} · ${P.profile.role}`;$('brand').textContent=U.brand;document.querySelectorAll('#nav a').forEach((a)=>{a.textContent=U.nav[a.dataset.sec||a.dataset.page];});document.querySelectorAll('#langSeg span').forEach((b)=>b.classList.toggle('on',b.dataset.lang===lang));renderThemeBtn();}
function renderHero(){const p=P.profile;$('hero').innerHTML=`
    <div class="hero-text">
      <h1 class="ui-title">${esc(p.headline)}</h1>
      <p class="hero-intro">${esc(p.intro)}<span class="caret" aria-hidden="true"></span></p>
      ${todo(p.introTodo)}
    </div>
    <aside class="ui-card profile">
      <img src="${esc(p.photo)}" alt="${esc(p.name)}">
      <div class="profile-who"><b>${esc(p.name)}</b><small>${esc(p.role)}</small></div>
      <div class="icon-links">${contactIcons(p.links)}</div>
    </aside>`;}
const CAR=`<svg class="car" viewBox="0 0 44 22" aria-hidden="true">
  <path class="car-body" d="M3 16.4V12c0-1.2.7-2.2 1.8-2.6L8 8.2l2.6-3.4c.7-.9 1.8-1.4 2.9-1.4h10.7c1.2 0 2.3.5 3 1.4l4.4 5.2 6.1 1.1c1.8.3 3.2 1.9 3.2 3.8v1.5c0 .8-.6 1.4-1.4 1.4H4.4c-.8 0-1.4-.6-1.4-1.4z"/>
  <path class="car-win" d="M11.9 6.2c.3-.4.8-.6 1.3-.6h4.6v4.4H9.7zM19.6 5.6h4.6c.6 0 1.1.3 1.5.7l3.3 3.7h-9.4z"/>
  <path class="car-light" d="M39.6 13.2h1.6"/>
  <path class="car-tail" d="M3.4 12.6v1.6"/>
  <g class="wheel"><circle cx="11" cy="17.5" r="3.6"/><path d="M11 15v5M8.5 17.5h5"/></g>
  <g class="wheel"><circle cx="33" cy="17.5" r="3.6"/><path d="M33 15v5M30.5 17.5h5"/></g>
</svg>`;const ym=(s)=>{const[y,m]=s.split('-').map(Number);return y*12+(m-1);};const fmtYM=(s)=>s.replace('-','.');function panel(c){const projs=(c.groups||[]).filter((g)=>g.project);return`<div class="visual-frame stats c-${esc(c.color || 'blue')}">
    <div class="stats-head">
      <span class="stats-co">${esc(c.company)}</span>
      <span class="stats-period">${esc(c.period)}</span>
    </div>
    <div class="stats-team">${esc(c.team)}</div>
    <div class="stats-grid">${c.stats.map((s) => `<div><div class="sv">${esc(s.value)}${s.unit?`<small>${esc(s.unit)}</small>`:''}</div><div class="sl">${esc(s.label)}</div></div>`).join('')}
    </div>
    ${c.footnote ? `<div class="footnote">*${esc(c.footnote)}</div>` : ''}
    ${c.role ? `<div class="pn-block"><h5>${esc(U.careerRole)}</h5><p class="pn-role">${esc(c.role)}</p></div>` : ''}
    ${projs.length ? `<div class="pn-block"><h5>${esc(U.careerProjects)}</h5><div class="pn-links">${projs.map((g)=>`<a href="projects/${esc(g.project)}/">${esc(g.label || g.title)}${ICON.arrow}</a>`).join('')}</div></div>` : ''}
  </div>`;}
let DRIVE=null;function renderCareer(){const r=P.road;const list=[...P.careers].reverse();const d=new Date();const nowM=d.getFullYear()*12+d.getMonth();const start=ym(r.items[0].start);const total=nowM+3-start;const pct=(m)=>((m-start)/total)*100;const items=r.items.map((it,i)=>{const s0=ym(it.start);const e0=it.end?ym(it.end)+1:nowM+1;return{...it,i,left:pct(s0),width:pct(e0)-pct(s0),period:`${fmtYM(it.start)} – ${it.end ? fmtYM(it.end) : r.now}`,last:i===r.items.length-1};});const nowPct=pct(nowM+1);const years=[];for(let y=Math.floor(start/12)+1;y*12<=nowM;y+=1)years.push({y,left:pct(y*12)});const n=list.length;$('career').innerHTML=`
    <div class="drive" id="drive">
      <div class="drive-snaps" aria-hidden="true">${list.map(() => '<i class="drive-snap"></i>').join('')}</div>
      <div class="drive-pin">
        ${sechead('01', 'career')}
        <div class="drive-road">
          <div class="road-track">
            ${items.map((it) => `<button type="button"class="road-label ${it.i % 2 ? 'row-b' : 'row-a'} ${it.last ? 'end' : ''} c-${it.color}"data-i="${it.i}"style="${it.last ? 'right:0' : `left:${it.left.toFixed(2)}%`}"><b>${esc(it.name)}</b><small>${esc(it.period)}</small></button>`).join('')}
            <div class="road-line">
              ${items.map((it) => `<i class="seg c-${it.color} ${it.end ? '' : 'open'}"data-i="${it.i}"style="left:${it.left.toFixed(2)}%;width:${it.width.toFixed(2)}%"></i>`).join('')}
              <i class="lane"></i>
              <span class="road-now" style="left:${nowPct.toFixed(2)}%"></span>
              <span class="car-wrap" style="left:${nowPct.toFixed(2)}%">${CAR}</span>
            </div>
            <div class="road-years">${years.map((y) => `<span style="left:${y.left.toFixed(2)}%">${y.y}</span>`).join('')}</div>
          </div>
        </div>
        <div class="drive-body">
          ${list.map((c, i) => `<article class="drive-item c-${esc(c.color)}${i === n - 1 ? ' on' : ''}"data-i="${i}"><div class="drive-text"><div class="beat-kicker has-logo"><span class="beat-logo"><img src="${esc(c.logo)}"alt="${esc(c.company)}"></span><span>${esc(c.kicker.split(' · ').slice(1).join(' · '))}</span></div><p class="drive-story">${emph(c.story)}</p><div class="drive-count"><b>${String(i+1).padStart(2,'0')}</b>/${String(n).padStart(2,'0')}</div></div><figure class="drive-panel">${panel(c)}</figure></article>`).join('')}
        </div>
      </div>
    </div>`;const stops=items.map((it,i)=>(i===0?it.left+3.5:it.last?nowPct:it.left+it.width/2));DRIVE={el:$('drive'),stops,nowPct,cur:-1};DRIVE.el.querySelectorAll('.road-label').forEach((b)=>b.addEventListener('click',()=>{const i=Number(b.dataset.i);const el=DRIVE.el;if(el.classList.contains('pinned')){goStop(i);}else{el.querySelector(`.drive-item[data-i="${i}"]`)?.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'start'});}}));}
const plain=(t)=>String(t??'').replace(/\[\[|\]\]/g,'');function renderStrengths(){$('strengths').innerHTML=sechead('02','strengths')+`
    <div class="str-cols">
      ${P.strengths.map((st, i) => `<article class="ui-card str-col"><span class="str-num">0${i+1}</span><h3>${esc(st.title)}</h3><p>${esc(st.desc)}</p><div class="str-next"><b>${esc(U.strengthNext)}</b><span>${esc(st.closing)}</span></div><div class="str-links">${st.projects.map((pr)=>`
              <a class="str-link${pr.wide ? ' wide' : ''}" href="projects/${esc(pr.project)}/">
                <span class="str-thumb"><img src="${esc(pr.img)}" alt="" loading="lazy"></span>
                <span class="str-link-text"><b>${esc(pr.title)}</b><small>${esc(pr.company)} · ${esc(pr.period)}</small></span>
                ${ICON.arrow}
              </a>`).join('')}</div></article>`).join('')}
    </div>`;}
let INDEX={projects:[],posts:[]};const loadIndex=fetch('data/index.json').then((r)=>r.json()).then((j)=>{INDEX=j;}).catch(()=>{});const fmtDate=(d)=>(d||'').replace(/^(\d{4})-(\d{2})-(\d{2}).*/,'$1.$2.$3');const draftTag=(m)=>(m.draft?'<span class="ui-tag amber">초안</span>':'');const ICON_PREV='<svg class="i-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6 8.5 12l6 6"/></svg>';const ICON_NEXT='<svg class="i-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 6 6 6-6 6"/></svg>';const RAIL_MAX=10;function renderProjects(){const list=INDEX.projects;$('projects').innerHTML=`
    <div class="rail-head">
      ${sechead('03', 'projects', U.projectsNote)}
      <div class="rail-btns">
        <button type="button" class="rail-btn" data-dir="-1" aria-label="이전 프로젝트">${ICON_PREV}</button>
        <button type="button" class="rail-btn" data-dir="1" aria-label="다음 프로젝트">${ICON_NEXT}</button>
      </div>
    </div>
    <div class="rail" id="projRail">
      ${list.slice(0, RAIL_MAX).map((m) => `<a class="ui-card pcard rail-card"href="projects/${esc(m.slug)}/"><div class="pcard-thumb">${m.thumb?`<img src="${esc(m.thumb)}" alt="" loading="lazy">`:''}<span class="pcard-go">${ICON.arrow}</span></div><div class="pcard-body"><div class="kicker">${esc([m.category,m.company,m.year].filter(Boolean).join(' · '))}${draftTag(m)}</div><h3>${esc(m.title)}</h3><p>${esc(m.summary)}</p></div></a>`).join('')}
      ${list.length > RAIL_MAX ? `<a class="rail-more"href="projects/"aria-label="${esc(U.moreProjects)}"><span class="rail-more-btn">${ICON_NEXT}</span><b>${esc(U.moreProjects)}</b></a>` : ''}
    </div>`;const rail=$('projRail');rail.querySelectorAll('.pcard-thumb img').forEach((img)=>{const mark=()=>{const r=img.naturalWidth/img.naturalHeight;if(r>1.9)img.closest('.pcard').classList.add('wide');else if(r>=1.5)img.closest('.pcard').classList.add('fill');};if(img.complete)mark();else img.addEventListener('load',mark,{once:true});});const btns=[...document.querySelectorAll('#projects .rail-btn')];const sync=()=>{btns[0].disabled=rail.scrollLeft<4;btns[1].disabled=rail.scrollLeft+rail.clientWidth>rail.scrollWidth-4;};btns.forEach((b)=>b.addEventListener('click',()=>{const card=rail.querySelector('.rail-card');const step=card?card.getBoundingClientRect().width+16:rail.clientWidth*0.8;rail.scrollBy({left:Number(b.dataset.dir)*step,behavior:'smooth'});}));rail.addEventListener('scroll',sync,{passive:true});window.addEventListener('resize',sync);sync();}
const KIND_TAG={활동:'gray',자격:'blue',수상:'amber',Activity:'gray',Program:'gray',Research:'gray',Certification:'blue',Award:'amber'};function renderMore(){const titleOf=(a)=>(a.href?`<a class="tl-link" href="${esc(a.href)}" target="_blank" rel="noopener"><b>${esc(a.title)}</b> ${ICON.arrow}</a>`:`<b>${esc(a.title)}</b>`);const inlineList=(items)=>`<ul class="tl-list">${items.map((a) => `<li><span class="tl-period">${esc(a.period)}</span><div class="tl-main">${titleOf(a)}${a.sub?`<small>${esc(a.sub)}</small>`:''}</div></li>`).join('')}</ul>`;const kindList=(items)=>`<ul class="tl-list stacked">${items.map((a) => `<li><span class="tl-period">${esc(a.period)}</span><div class="tl-main"><div class="tl-title">${a.kind?`<span class="ui-tag ${KIND_TAG[a.kind] || 'gray'}">${esc(a.kind)}</span>`:''}${titleOf(a)}</div>${a.sub?`<small>${esc(a.sub)}</small>`:''}</div></li>`).join('')}</ul>`;const col=(title,body,cls='')=>`
      <div class="ui-group ${cls}">
        <div class="ui-group-head"><h3 class="ui-group-title">${esc(title)}</h3></div>
        ${body}
      </div>`;const school=P.education.map((e)=>`
      <div class="school">
        ${e.logo ? `<span class="school-logo"><img src="${esc(e.logo)}"alt=""></span>` : ''}
        <div class="school-text">
          <div class="school-name"><b>${esc(e.title)}</b><span class="ui-meta">${esc(e.period)}</span></div>
          <small>${esc([e.degree, e.sub].filter(Boolean).join(' · '))}</small>
          ${e.minor ? `<small>${esc(e.minor)}</small>` : ''}
        </div>
      </div>`).join('');$('more').innerHTML=sechead('04','more')+`
    <div class="more-grid three">
      ${col(U.education, `${school}<h4 class="more-sub">${esc(U.papers)}</h4>${kindList(P.papers)}`, 'edu')}
      ${col(U.activities, kindList(P.activities))}
      ${col(U.awards, kindList(P.awards))}
    </div>`;}
function renderClosing(){const p=P.profile;$('closing').innerHTML=`
    <div class="closing-inner">
      <p class="closing-line">${esc(P.closing)}</p>
      <div class="closing-links icon-links">${contactIcons(p.links)}</div>
    </div>
    <div class="wordmark" aria-hidden="true">${esc(P.wordmark)}</div>
    <div class="closing-foot"><span>© 2026 ${esc(p.name)}</span><a href="#">Top ↑</a></div>`;}
const wide=()=>window.matchMedia('(min-width: 901px)').matches;function layoutDrive(){if(!DRIVE)return;const el=DRIVE.el;const body=el.querySelector('.drive-body');body.style.zoom='';el.style.height='';el.style.removeProperty('--panel-h');const pin=wide();el.classList.add('no-anim');el.classList.toggle('pinned',pin);requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.remove('no-anim')));if(!pin){setCar(DRIVE.nowPct);setActive(-1);return;}
const panels=[...el.querySelectorAll('.drive-panel .visual-frame')];const ph=Math.max(...panels.map((p)=>p.scrollHeight));el.style.setProperty('--panel-h',`${Math.ceil(ph)}px`);const pinH=window.innerHeight-60;const pinEl=el.querySelector('.drive-pin');const avail=pinH-(body.getBoundingClientRect().top-pinEl.getBoundingClientRect().top)-28;const need=body.scrollHeight;if(need>avail)body.style.zoom=String(Math.max(0.72,avail/need));const n=el.querySelectorAll('.drive-item').length;const range=Math.round((n-1)*window.innerHeight*0.55);el.style.height=`${pinH + range}px`;el.querySelectorAll('.drive-snap').forEach((s,i)=>{s.style.top=`${Math.round((range * i) / (n - 1))}px`;});updateDrive();}
function setCar(x){const car=DRIVE.el.querySelector('.car-wrap');if(car)car.style.left=`${x.toFixed(2)}%`;}
function setActive(i){const el=DRIVE.el;el.querySelectorAll('.drive-item').forEach((it)=>it.classList.toggle('on',i<0||Number(it.dataset.i)===i));el.querySelectorAll('.road-label, .seg').forEach((s)=>{s.classList.toggle('on',Number(s.dataset.i)===i);s.classList.toggle('past',i>=0&&Number(s.dataset.i)>i);});}
let moveTimer;function driveRange(){const el=DRIVE.el;return{el,range:el.offsetHeight-(window.innerHeight-60),y:60-el.getBoundingClientRect().top};}
function updateDrive(){if(!DRIVE||!DRIVE.el.classList.contains('pinned')){document.documentElement.classList.remove('snap-drive');return;}
const{el,range,y}=driveRange();document.documentElement.classList.toggle('snap-drive',y>-2&&y<range+2);const n=DRIVE.stops.length;const f=Math.min(1,Math.max(0,y/range))*(n-1);const k=Math.min(n-2,Math.floor(f));const a=DRIVE.stops[k];const b=DRIVE.stops[k+1];setCar(a+(b-a)*(f-k));const i=Math.round(f);if(i!==DRIVE.cur){DRIVE.cur=i;setActive(i);}
el.classList.add('moving');clearTimeout(moveTimer);moveTimer=setTimeout(()=>el.classList.remove('moving'),180);}
function goStop(i){const{el,range}=driveRange();const n=DRIVE.stops.length;const top=el.getBoundingClientRect().top+window.scrollY-60;window.scrollTo({top:Math.round(top+range*(Math.max(0,Math.min(n-1,i))/(n-1))),behavior:reduceMotion?'auto':'smooth'});}
function layoutCurtain(){const hero=$('hero');if(!hero)return;$('heroSpace').style.height=`${Math.ceil(hero.getBoundingClientRect().bottom + 42)}px`;const line=document.querySelector('#closing .closing-line');if(line){const fromBottom=window.innerHeight-line.getBoundingClientRect().top;document.querySelector('.outro-space').style.height=`${Math.ceil(fromBottom + 48)}px`;}
updateCurtain();}
function updateCurtain(){const sheet=$('sheet');if(!sheet)return;const r=sheet.getBoundingClientRect();$('backdrop').classList.toggle('show-outro',r.bottom<window.innerHeight-1);$('gnb').classList.toggle('solid',r.top<60&&r.bottom>60);}
let ticking=false;window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{updateDrive();updateCurtain();ticking=false;});},{passive:true});window.addEventListener('resize',()=>{layoutDrive();layoutCurtain();});document.fonts?.ready.then(layoutDrive);document.fonts?.ready.then(layoutCurtain);let observers=[];function watch(){observers.forEach((o)=>o.disconnect());observers=[];if(DRIVE)DRIVE.cur=-1;layoutDrive();const links=[...document.querySelectorAll('#nav a[data-sec]')];const navIO=new IntersectionObserver((entries)=>{entries.forEach((e)=>{if(e.isIntersecting)links.forEach((a)=>a.classList.toggle('on',a.dataset.sec===e.target.id));});},{rootMargin:'-40% 0px -55% 0px'});links.forEach((a)=>navIO.observe($(a.dataset.sec)));observers.push(navIO);}
function applyTheme(t){document.documentElement.dataset.theme=t;if(U)renderThemeBtn();}
function renderThemeBtn(){const dark=document.documentElement.dataset.theme==='dark';const btn=$('themeBtn');btn.innerHTML=dark?ICON.sun:ICON.moon;btn.title=dark?U.themeLight:U.themeDark;btn.setAttribute('aria-label',btn.title);}
$('themeBtn').addEventListener('click',()=>{const t=document.documentElement.dataset.theme==='dark'?'light':'dark';store.set('theme',t);applyTheme(t);});$('langSeg').addEventListener('click',()=>{lang=lang==='ko'?'en':'ko';store.set('lang',lang);render();loadIndex.then(()=>{renderProjects();});});function render(){P=lang==='en'?merge(window.PORTFOLIO.ko,window.PORTFOLIO.en):window.PORTFOLIO.ko;U=P.ui;renderTop();renderHero();renderCareer();renderStrengths();renderProjects();renderMore();renderClosing();layoutCurtain();watch();}
applyTheme(store.get('theme')==='dark'?'dark':'light');render();loadIndex.then(()=>{renderProjects();});(function(){document.addEventListener('contextmenu',(e)=>e.preventDefault());document.addEventListener('dragstart',(e)=>{if(e.target instanceof HTMLImageElement)e.preventDefault();});document.addEventListener('keydown',(e)=>{const mod=e.metaKey||e.ctrlKey;const devtools=mod&&(e.altKey||e.shiftKey)&&['KeyI','KeyJ','KeyC'].includes(e.code);if(e.key==='F12'||devtools||(mod&&!e.shiftKey&&['KeyU','KeyS'].includes(e.code)))e.preventDefault();});})();