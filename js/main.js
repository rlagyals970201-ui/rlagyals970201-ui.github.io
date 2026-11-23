(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = (s = '') => String(s).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const pad = (n, l = 2) => String(n).padStart(l, '0');
  const FPS = 24;
  const tc = (sec) => {
    const f = Math.floor(sec * FPS);
    return [Math.floor(f / (3600 * FPS)), Math.floor(f / (60 * FPS)) % 60, Math.floor(f / FPS) % 60, f % FPS].map((n) => pad(n)).join(':');
  };

  /* ---------- 큰 타이포: 컨테이너 너비에 꽉 맞추기 ---------- */
  const fits = $$('[data-fit]');
  function fitText() {
    fits.forEach((el) => {
      el.style.fontSize = '100px';
      const box = el.parentElement.clientWidth;
      const w = el.getBoundingClientRect().width;
      if (w) el.style.fontSize = (100 * box / w) * 0.998 + 'px';
    });
    $$('[data-fit-same]').forEach((el) => {
      const ref = $(el.dataset.fitSame);
      if (ref) el.parentElement.style.fontSize = ref.style.fontSize;
    });
  }

  /* ---------- 롤링 띠: 끊김 없는 무한 반복 ----------
     문구 묶음을 화면 너비 이상이 될 때까지 채워 한 그룹을 만들고, 그룹을 한 번 더 이어 붙인 뒤
     정확히 그룹 하나 너비(px)만큼 이동 → 시작 화면과 끝 화면이 같아 이음매가 보이지 않음 */
  const mqTrack = $('.marquee__track');
  const mqBase = mqTrack ? $('.marquee__group', mqTrack).innerHTML : '';
  const MQ_SPEED = 90; // px / 초
  function buildMarquee() {
    if (!mqTrack) return;
    mqTrack.style.animation = 'none';
    mqTrack.innerHTML = `<div class="marquee__group">${mqBase}</div>`;
    const g = mqTrack.firstElementChild;
    let guard = 0;
    while (g.getBoundingClientRect().width < window.innerWidth && guard++ < 30) g.innerHTML += mqBase;
    mqTrack.appendChild(g.cloneNode(true));
    const w = g.getBoundingClientRect().width;
    mqTrack.style.setProperty('--marquee-shift', w + 'px');
    mqTrack.style.setProperty('--marquee-dur', (w / MQ_SPEED).toFixed(2) + 's');
    void mqTrack.offsetWidth;
    mqTrack.style.animation = '';
  }

  /* ---------- 유튜브 ---------- */
  function ytId(u) {
    if (!u) return '';
    const m = String(u).match(/(?:youtu\.be\/|[?&]v=|shorts\/|embed\/|live\/)([\w-]{11})/);
    if (m) return m[1];
    return /^[\w-]{11}$/.test(u.trim()) ? u.trim() : '';
  }
  const works = (window.WORKS || []).map((w) => ({
    ...w,
    id: ytId(w.url),
    short: w.format === 'short' || /\/shorts\//.test(w.url || ''),
  }));

  /* ---------- 작업물: 타일 그리드 (Video / Image 탭) ---------- */
  const art = (window.ART || []).filter((a) => a && a.img);
  const grid = $('#wgrid');
  const moreBtn = $('#wmore');
  const PAGE = 8;                 // 한 번에 보여 줄 개수 (4개씩 2줄)
  let kind = 'video';
  let shown = PAGE;

  // 세로·가로로 긴 이미지는 흐린 배경 위에 전체가 보이게
  const fitMedia = (src, fallback = '') => `
            <img class="work__blur" src="${esc(src)}" alt="" loading="lazy" draggable="false" aria-hidden="true"${fallback}>
            <img class="work__fit" src="${esc(src)}" alt="" loading="lazy" draggable="false"${fallback}>`;

  function videoCard(w, i) {
    const no = pad(i + 1);
    let thumb = `<span class="work__ph">${no}</span>`;
    if (w.id && w.short) {
      thumb = fitMedia(`https://i.ytimg.com/vi/${w.id}/oardefault.jpg`,
        ` onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${w.id}/hqdefault.jpg'"`);
    } else if (w.id) {
      thumb = `<img src="https://i.ytimg.com/vi/${w.id}/maxresdefault.jpg" alt="" loading="lazy" draggable="false"
          onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${w.id}/hqdefault.jpg'">`;
    }
    return `
      <li class="work ${w.short ? 'is-short is-fit' : 'is-wide'}">
        <button type="button" class="work__btn" data-index="${i}" aria-label="${esc(w.title)} 영상 보기">
          <div class="work__media">
            ${thumb}
            <div class="hud" aria-hidden="true">
              <span class="hud__tl"><b>V1</b>Clip ${no}</span>
              <span class="hud__tr">${w.short ? '9:16' : '16:9'}</span>
              <span class="hud__safe"></span>
              <span class="hud__bar"><i></i></span>
            </div>
          </div>
          <div class="work__meta">
            <span class="work__no">${no}</span>
            <h3 class="work__title">${esc(w.title)}</h3>
            <span class="work__cat">${esc(w.category)} — ${esc(w.year)}</span>
          </div>
        </button>
      </li>`;
  }
  function artCard(a, i) {
    const no = pad(i + 1);
    // frame: "wide"·"tall" 은 전체가 보이게, 비우면(정사각 일러스트) 꽉 채움
    const fit = a.frame === 'wide' || a.frame === 'tall';
    const media = `
          <div class="work__media">
            ${fit ? fitMedia(a.img) : `<img src="${esc(a.img)}" alt="" loading="lazy" draggable="false">`}
            <div class="hud" aria-hidden="true">
              <span class="hud__tl"><b>G1</b>Still ${no}</span>
              <span class="hud__tr">${a.url ? 'Link ↗' : 'View'}</span>
              <span class="hud__safe"></span>
            </div>
          </div>
          <div class="work__meta">
            <span class="work__no">${no}</span>
            <h3 class="work__title">${esc(a.title)}</h3>
            <span class="work__cat">${esc(a.category || 'Illustration')}</span>
          </div>`;
    const cls = `work is-art${fit ? ' is-fit' : ''}`;
    return a.url
      ? `<li class="${cls}"><a class="work__btn" href="${esc(a.url)}" target="_blank" rel="noopener" draggable="false" aria-label="${esc(a.title)} 보러 가기">${media}</a></li>`
      : `<li class="${cls}"><button type="button" class="work__btn" data-lb="${esc(a.img)}" aria-label="${esc(a.title)} 크게 보기">${media}</button></li>`;
  }
  function renderGrid() {
    const list = kind === 'video' ? works : art;
    const items = list.slice(0, shown);
    grid.className = `wgrid is-${kind}`;
    grid.innerHTML = items.map(kind === 'video' ? videoCard : artCard).join('');
    const left = list.length - items.length;
    moreBtn.hidden = left <= 0;
    moreBtn.innerHTML = `More <span>+${Math.min(PAGE, left)}</span><small>남은 작업물 ${left}개</small>`;
    $$('.work', grid).forEach((el, i) => setTimeout(() => el.classList.add('is-in'), 30 * (i % PAGE)));
    const c = $('#cursor');
    if (c) c.textContent = kind === 'video' ? 'Play' : 'View';
  }
  renderGrid();
  moreBtn.addEventListener('click', () => { shown += PAGE; renderGrid(); });
  $$('.works__tab').forEach((t) => {
    const n = $('.works__count', t);
    if (n) n.textContent = pad(t.dataset.set === 'video' ? works.length : art.length);
    t.addEventListener('click', () => {
      if (t.dataset.set === kind) return;
      kind = t.dataset.set;
      shown = PAGE;
      $$('.works__tab').forEach((x) => { x.classList.toggle('is-on', x === t); x.setAttribute('aria-selected', x === t); });
      renderGrid();
    });
  });

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.work__btn');
    if (!btn || btn.tagName === 'A' || btn.dataset.lb) return;   // 이미지: 링크 이동 또는 크게 보기
    openModal(+btn.dataset.index);
  });

  // 섬네일 위 커서 (Play / View)
  const cursor = $('#cursor');
  if (matchMedia('(pointer: fine)').matches) {
    grid.addEventListener('pointermove', (e) => {
      cursor.classList.toggle('is-on', !!e.target.closest('.work__media'));
      cursor.style.transform = `translate3d(${e.clientX + 14}px, ${e.clientY + 14}px, 0)`;
    });
    grid.addEventListener('pointerleave', () => cursor.classList.remove('is-on'));
  }
  function measure() {}
  function updateSlider() {}

  /* ---------- 영상 팝업 ---------- */
  const modal = $('#modal');
  const box = $('.modal__box', modal);
  const frame = $('#modalFrame');
  let current = 0, lastFocus = null;

  function render(i) {
    current = (i + works.length) % works.length;
    const w = works[current];
    $('#modalNo').textContent = pad(current + 1);
    $('#modalTitle').textContent = w.title;
    $('#modalMeta').textContent = [w.category, w.role, w.year].filter(Boolean).join('  ·  ');
    box.classList.toggle('is-short', w.short);
    frame.innerHTML = w.id
      ? `<iframe src="https://www.youtube-nocookie.com/embed/${w.id}?autoplay=1&rel=0&playsinline=1"
           title="${esc(w.title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`
      : `<div class="modal__empty">아직 연결된 영상이 없습니다.</div>`;
  }
  function openModal(i) {
    lastFocus = document.activeElement;
    render(i);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    $('.modal__close', modal).focus({ preventScroll: true });
  }
  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    setTimeout(() => { if (!modal.classList.contains('is-open')) frame.innerHTML = ''; }, 400);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  $$('[data-close]', modal).forEach((el) => el.addEventListener('click', closeModal));
  $('#mPrev').addEventListener('click', () => render(current - 1));
  $('#mNext').addEventListener('click', () => render(current + 1));
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') render(current - 1);
    if (e.key === 'ArrowRight') render(current + 1);
  });

  /* ---------- 타임코드 · 타임라인 플레이헤드 ----------
     페이지 전체를 3분짜리 시퀀스로 보고, 스크롤 위치를 타임코드로 표시 */
  const SEQ = 180; // 초
  const tcEl = $('#tc');
  const ruler = $('#ruler');
  const head = $('#playhead');
  if (ruler) {
    ruler.innerHTML = Array.from({ length: 10 }, (_, k) => {
      const s = (SEQ / 10) * k;
      return `<span style="left:${k * 10}%">${pad(Math.floor(s / 60))}:${pad(Math.floor(s % 60))}</span>`;
    }).join('');
  }
  const header = $('.header');
  const totop = $('#totop'), totopBar = $('#totopBar'), totopTc = $('#totopTc'), about = $('#about');
  const themed = $$('[data-theme]');
  let ticking = false;
  function onScroll() {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    tcEl.textContent = tc(p * SEQ);
    if (head && ruler) head.style.transform = `translateX(${p * ruler.clientWidth}px)`;

    const y = header.offsetHeight / 2;
    let theme = '';
    for (const s of themed) {
      const r = s.getBoundingClientRect();
      if (r.top <= y && r.bottom > y) { theme = s.dataset.theme; break; }
    }
    header.classList.toggle('is-light', theme === 'light');

    // 플로팅 TOP: About 섹션을 지나면 노출
    if (totop && about) {
      totop.classList.toggle('is-on', about.getBoundingClientRect().bottom < window.innerHeight * 0.5);
      totopBar.style.width = (p * 100).toFixed(1) + '%';
      const sec = p * SEQ;
      totopTc.textContent = pad(Math.floor(sec / 60)) + ':' + pad(Math.floor(sec % 60));
    }
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });

  /* ---------- 스크롤 등장 ---------- */
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    : null;
  $$('[data-reveal]').forEach((el, i) => {
    el.style.transitionDelay = (i % 3) * 0.08 + 's';
    io ? io.observe(el) : el.classList.add('is-in');
  });

  /* ---------- 초기화 · 리사이즈 ---------- */
  function refresh() { fitText(); buildMarquee(); onScroll(); measure(); updateSlider(); }
  refresh();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  let lastW = window.innerWidth, rT;
  window.addEventListener('resize', () => {
    clearTimeout(rT);
    rT = setTimeout(() => {
      fitText(); onScroll(); updateSlider();
      if (window.innerWidth !== lastW) { lastW = window.innerWidth; buildMarquee(); }
    }, 100);
  });
})();
