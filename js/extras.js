/* Capabilities 작업 이미지 · 이미지 라이트박스
   main.js 보다 먼저 실행되어야 data-reveal 등장 효과가 붙습니다. */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = (s = '') => String(s).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const pad = (n) => String(n).padStart(2, '0');

  /* ---------- Capabilities: 작업 이미지 (항상 보임, 없으면 숨김) ---------- */
  const CAP = window.CAP_IMAGES || {};
  $$('.cap__item[data-cap]').forEach((item) => {
    const imgs = (CAP[item.dataset.cap] || []).filter(Boolean);
    const gal = $('.cap__gal', item);
    if (!gal) return;
    if (!imgs.length) { gal.remove(); return; }
    const html = imgs.map((src, i) => `<li><button type="button" class="shot" data-lb="${esc(src)}" aria-label="이미지 ${pad(i + 1)} 크게 보기">
             <img src="${esc(src)}" alt="" loading="lazy"><span class="shot__no">IMG ${pad(i + 1)}</span></button></li>`).join('');
    gal.innerHTML = `<div class="cap__gal-in"><ul class="cap__shots" style="--n:${Math.min(imgs.length, 5)}">${html}</ul></div>`;
    item.classList.add('is-open', 'has-shots');
  });

  /* ---------- 라이트박스 ---------- */
  const lb = document.createElement('div');
  lb.className = 'lb';
  lb.setAttribute('aria-hidden', 'true');
  lb.innerHTML = '<button type="button" class="lb__close" aria-label="닫기">Close ✕</button><img alt="">';
  document.body.appendChild(lb);
  const lbImg = $('img', lb);
  const closeLb = () => { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); };
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-lb]');
    if (t) { lbImg.src = t.dataset.lb; lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); return; }
    if (lb.classList.contains('is-open') && (e.target === lb || e.target.closest('.lb__close'))) closeLb();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });

})();
