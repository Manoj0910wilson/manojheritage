/* Scroll choreography for the home page:
   1) one realistic pod (a rotating photo sequence) that glides down the whole page,
   2) the exploded whole pod / split pod / seeds section,
   3) gentle photo parallax. */

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- Floating pod ---------------- */
export function initFloatingPod() {
  const canvas = document.querySelector('[data-float-pod]');
  if (!canvas || reduced()) { document.body.classList.add('static-pod'); return; }
  const ctx2d = canvas.getContext('2d');
  const base = canvas.dataset.frames;
  const count = Number(canvas.dataset.count) || 1;
  const fw = canvas.width; const fh = canvas.height;
  const frames = new Array(count);
  const exTrack = document.querySelector('[data-explode-track]');
  let loaded = 0;

  const loadFrame = (i) => new Promise((resolve) => {
    const im = new Image();
    im.decoding = 'async';
    im.onload = () => { frames[i] = im; loaded += 1; resolve(); };
    im.onerror = () => resolve();
    im.src = `${base}${String(i).padStart(3, '0')}.webp`;
  });

  let stops = [];
  const measure = () => {
    const scrollY = window.scrollY;
    stops = [...document.querySelectorAll('[data-pod]')].map((el) => {
      const small = window.innerWidth < 720;
      const raw = (small && el.dataset.podM ? el.dataset.podM : el.dataset.pod).split(',').map(Number);
      let [x, y, size, rot, op] = raw;
      if (small && !el.dataset.podM) { x = x >= 0.5 ? 0.88 : 0.12; size *= 0.8; }
      const r = el.getBoundingClientRect();
      return { c: r.top + scrollY + r.height / 2, x, y, size, rot, op };
    }).sort((a, b) => a.c - b.c);
  };

  const state = { y: window.scrollY, mx: 0, my: 0, tx: 0, ty: 0 };
  let running = false;
  let lastFrame = -1; let lastDpr = 0; let lastW = 0; let lastLoaded = 0;

  const draw = (time) => {
    const vw = window.innerWidth; const vh = window.innerHeight;
    const docH = Math.max(1, document.documentElement.scrollHeight - vh);
    const center = state.y + vh / 2;
    let a = stops[0]; let b = stops[0]; let t = 0;
    for (let i = 0; i < stops.length; i += 1) {
      if (stops[i].c <= center) a = stops[i];
      if (stops[i].c > center) { b = stops[i]; break; }
      b = stops[i];
    }
    if (a !== b) t = smooth(clamp((center - a.c) / (b.c - a.c)));
    const scale = clamp(vw / 1440, 0.5, 1);
    const sizePx = lerp(a.size, b.size, t) * scale;
    const margin = 6;
    const px = clamp(lerp(a.x, b.x, t) * vw + state.mx, sizePx / 2 + margin, vw - sizePx / 2 - margin);
    const py = lerp(a.y, b.y, t) * vh + state.my + Math.sin(time / 1500) * 7;
    const tilt = lerp(a.rot, b.rot, t) + Math.sin(state.y / 380) * 5;
    let hide = 0;
    if (exTrack) {
      const r = exTrack.getBoundingClientRect();
      hide = Math.min(clamp((vh * 0.85 - r.top) / (vh * 0.3)), clamp((r.bottom - vh * 0.15) / (vh * 0.3)));
    }
    const last = stops[stops.length - 1];
    const tail = last ? clamp((center - last.c - vh * 0.55) / (vh * 0.45)) : 0; // fade out once the contact block has passed
    const opacity = lerp(a.op, b.op, t) * (loaded ? 1 : 0) * (1 - smooth(hide)) * (1 - smooth(tail));

    const turns = 5;
    const cycle = count + 2; // two blended in-between frames close the small gap at the loop seam
    const progress = clamp(state.y / docH);
    const idx = Math.floor(progress * turns * cycle) % cycle;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = Math.round(sizePx);
    if (cssW !== lastW || dpr !== lastDpr) {
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${Math.round(cssW * fh / fw)}px`;
      canvas.width = Math.round(cssW * dpr); canvas.height = Math.round(cssW * dpr * fh / fw);
      lastW = cssW; lastDpr = dpr; lastFrame = -1;
    }
    if (idx !== lastFrame || loaded !== lastLoaded) {
      const pick = (i) => { let u = i; while (u >= 0 && !frames[u]) u -= 1; return u >= 0 ? frames[u] : frames.find(Boolean); };
      const first = pick(Math.min(idx, count - 1));
      if (first) {
        ctx2d.clearRect(0, 0, canvas.width, canvas.height);
        ctx2d.globalAlpha = 1;
        ctx2d.drawImage(first, 0, 0, canvas.width, canvas.height);
        if (idx >= count) {
          const start = frames[0];
          if (start) { ctx2d.globalAlpha = (idx - count + 1) / 3; ctx2d.drawImage(start, 0, 0, canvas.width, canvas.height); ctx2d.globalAlpha = 1; }
        }
        lastFrame = idx; lastLoaded = loaded;
      }
    }
    canvas.style.opacity = opacity.toFixed(3);
    canvas.style.transform = `translate3d(${(px - cssW / 2).toFixed(1)}px, ${(py - cssW * fh / fw / 2).toFixed(1)}px, 0) rotate(${tilt.toFixed(2)}deg)`;
  };

  const tick = (time) => {
    const target = window.scrollY;
    state.y = lerp(state.y, target, 0.12);
    state.mx = lerp(state.mx, state.tx, 0.06);
    state.my = lerp(state.my, state.ty, 0.06);
    draw(time);
    const settling = Math.abs(state.y - target) > 0.4 || Math.abs(state.mx - state.tx) > 0.3 || Math.abs(state.my - state.ty) > 0.3;
    if (settling || !document.hidden) requestAnimationFrame(tick); else running = false;
  };
  const start = () => { if (!running) { running = true; requestAnimationFrame(tick); } };

  window.addEventListener('scroll', start, { passive: true });
  window.addEventListener('resize', () => { measure(); start(); });
  window.addEventListener('load', () => { measure(); start(); });
  document.addEventListener('visibilitychange', start);
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', (e) => {
      state.tx = (e.clientX / window.innerWidth - 0.5) * -26;
      state.ty = (e.clientY / window.innerHeight - 0.5) * -18;
    }, { passive: true });
  }

  // First frame right away, the rest while the browser is idle
  loadFrame(0).then(() => {
    document.body.classList.add('has-float');
    measure(); start();
    let next = 1;
    const pump = () => {
      if (next >= count) return;
      const batch = [];
      for (let k = 0; k < 4 && next < count; k += 1) batch.push(loadFrame(next++));
      Promise.all(batch).then(() => (window.requestIdleCallback ? requestIdleCallback(pump) : setTimeout(pump, 30)));
    };
    pump();
  });
  // Layout shifts (images, fonts) move the waypoints, so re-measure a few times
  [600, 1800, 4000].forEach((ms) => setTimeout(measure, ms));
}

/* ---------------- Exploded product view ---------------- */
export function initExplode() {
  const track = document.querySelector('[data-explode-track]');
  const stage = document.querySelector('[data-explode-stage]');
  if (!track || !stage) return;
  const update = () => {
    const r = track.getBoundingClientRect();
    const range = Math.max(1, track.offsetHeight - window.innerHeight);
    const raw = clamp(-r.top / range);
    const p = reduced() ? 1 : smooth(clamp(raw / 0.78));
    stage.style.setProperty('--p', p.toFixed(4));
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

/* ---------------- Photo parallax ---------------- */
export function initParallax() {
  if (reduced()) return;
  const items = [...document.querySelectorAll('[data-parallax]')];
  if (!items.length) return;
  const update = () => {
    const vh = window.innerHeight;
    items.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const t = clamp((r.top + r.height / 2) / vh, -0.2, 1.2) * 2 - 1;
      el.style.setProperty('--py', t.toFixed(3));
    });
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}
