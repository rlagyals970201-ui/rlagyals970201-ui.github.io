/* 첫 화면 인트로 모션
   1) HYOMIN KIM 글자가 컷 편집처럼 한 글자씩 튀어 들어오고, 빨간 전환 바가 훑고 지나감
   2) CUT / DESIGN / SHOOT · 소개 문장이 커서와 함께 타이핑
   3) Edit & Design 손글씨가 써지듯 나타나고 밑줄이 그려짐 (CSS)
   4) 780+ Videos 숫자가 0부터 올라감
   main.js 보다 먼저 실행되어야 큰 제목 크기 맞추기가 정상 동작합니다. */
(() => {
  const root = document.documentElement;
  const hero = document.querySelector('.hero');
  if (!hero) { root.classList.remove('intro'); return; }
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { root.classList.remove('intro'); return; }

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ---------- 1. 큰 이름: 글자 단위 컷 인 ---------- */
  let n = 0;
  hero.querySelectorAll('.hero__name [data-fit], .hero__name [data-fit-same]').forEach((el) => {
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'ch';
      s.textContent = ch === ' ' ? ' ' : ch;
      s.style.animationDelay = (0.12 + 0.055 * i) + 's';
      el.appendChild(s);
      n++;
    });
  });
  const wipe = document.createElement('span');
  wipe.className = 'hero__wipe';
  wipe.setAttribute('aria-hidden', 'true');
  hero.querySelector('.hero__name').appendChild(wipe);

  // 편집 화면 같은 크롭 마크
  const marks = document.createElement('div');
  marks.className = 'hero__marks';
  marks.setAttribute('aria-hidden', 'true');
  marks.innerHTML = '<i></i><i></i><i></i><i></i><b>REC ● 00:00:00:00</b>';
  hero.querySelector('.hero__name').appendChild(marks);

  /* ---------- 2. 타이핑 ---------- */
  function prepType(el) {
    const nodes = [];
    const walk = (node) => node.childNodes.forEach((c) => {
      if (c.nodeType === 3 && c.textContent.trim()) {
        // 휴대폰에서만 줄바꿈되는 <br class="br-m"> 뒤에는 PC에서 띄어쓰기가 필요
        const prev = c.previousSibling;
        const keepSpace = prev && prev.nodeName === 'BR' && prev.classList.contains('br-m');
        let text = c.textContent.replace(/\s+/g, ' ').trimStart().replace(/ $/, '');
        if (keepSpace) text = ' ' + text;
        nodes.push({ node: c, text });
        c.textContent = '';
      }
      else if (c.nodeType === 1 && c.tagName !== 'svg') walk(c);
    });
    walk(el);
    return nodes;
  }
  async function type(el, nodes, speed) {
    const caret = document.createElement('span');
    caret.className = 'caret';
    el.classList.add('is-typing');
    for (const { node, text } of nodes) {
      node.parentNode.insertBefore(caret, node.nextSibling);
      for (const ch of text) {
        node.textContent += ch;
        await wait(ch === ' ' ? speed * 0.6 : ch === '/' || ch === ',' || ch === '.' ? speed * 3 : speed);
      }
    }
    await wait(900);
    caret.classList.add('is-done');
    el.classList.remove('is-typing');
  }
  const role = hero.querySelector('.hero__role');
  const lede = hero.querySelector('.hero__lede');
  const roleNodes = role ? prepType(role) : [];   // 글자를 미리 비워 두고
  const ledeNodes = lede ? prepType(lede) : [];

  root.classList.remove('intro');   // 준비가 끝났으니 화면 보이기

  (async () => {
    await wait(350);
    if (role) await type(role, roleNodes, 42);
    if (lede) await type(lede, ledeNodes, 55);
  })();

  /* ---------- 4. 숫자 카운트 ---------- */
  const meta = hero.querySelectorAll('.hero__meta span');
  meta.forEach((m) => {
    const match = m.textContent.match(/(\d+)\+ Videos/);
    if (!match) return;
    const target = +match[1];
    const before = m.textContent.slice(0, match.index);
    const t0 = performance.now() + 400;
    const dur = 1600;
    const tick = (now) => {
      const p = Math.min(Math.max((now - t0) / dur, 0), 1);
      const v = Math.round(target * (1 - Math.pow(1 - p, 3)));
      m.textContent = `${before}${v}+ Videos`;
      if (p < 1) requestAnimationFrame(tick);
    };
    m.textContent = `${before}0+ Videos`;
    requestAnimationFrame(tick);
  });

  // REC 타임코드 (인트로 동안만 흐름)
  const rec = marks.querySelector('b');
  const t1 = performance.now();
  const p2 = (x) => String(x).padStart(2, '0');
  const tc = () => {
    const s = (performance.now() - t1) / 1000;
    rec.textContent = `REC ● 00:00:${p2(Math.floor(s))}:${p2(Math.floor((s % 1) * 24))}`;
    if (s < 4.2) requestAnimationFrame(tc);
    else marks.classList.add('is-done');
  };
  requestAnimationFrame(tc);
})();
