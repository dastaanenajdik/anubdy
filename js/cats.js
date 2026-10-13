/* ============================================================
   cats.js — floating billi (dono cats poori site par rehti hain)
   ============================================================
   • Tap  → cat pop karti hai + ek random dua/line toast me + chhota confetti
   • Drag → finger ke saath chalti hai, chhodne par wahin ruk jaati hai
   • PIN unlock hone tak chhupi rehti hai (js/login.js unlockCats() bulata hai)
   • Last page (birthday reveal) par khud pop karti hain (catsAutoPop())

   GIF links, size aur lines → js/config.js > cats
   Look/animation → css/extras.css
   ============================================================ */

const CAT_LINES = {};       // { catId: [lines...] }
const CAT_NODES = {};       // { catId: DOM element }
let catsBuilt = false;

// ---------- Ek cat ka DOM banao ----------
function buildCat(cfg) {
    const el = document.createElement('div');
    el.className = 'cat';
    el.id = cfg.id;
    el.style.width = el.style.height = CONFIG.cats.size + 'px';
    if (cfg.side === 'right') el.style.right = cfg.offset || '5%';
    else el.style.left = cfg.offset || '5%';
    if (cfg.top) el.style.top = cfg.top;
    if (cfg.bottom) el.style.bottom = cfg.bottom;

    const img = document.createElement('img');
    img.alt = 'billi';
    img.draggable = false;
    img.src = cfg.gif;
    // GIF kisi wajah se load na ho to emoji dikha do
    img.addEventListener('error', () => {
        img.remove();
        const fallback = document.createElement('span');
        fallback.className = 'cat-fallback';
        fallback.textContent = cfg.fallback || '🐱';
        el.appendChild(fallback);
    });
    el.appendChild(img);

    CAT_LINES[cfg.id] = cfg.lines || [];
    attachCatEvents(el, cfg);
    byId('cat-layer').appendChild(el);
    CAT_NODES[cfg.id] = el;
    return el;
}

// ---------- Tap + drag ----------
function attachCatEvents(el, cfg) {
    let dragging = false;
    let moved = false;
    let startX = 0, startY = 0, baseX = 0, baseY = 0;

    el.addEventListener('pointerdown', (e) => {
        if (el.classList.contains('cat-locked')) return;
        dragging = true;
        moved = false;
        startX = e.clientX;
        startY = e.clientY;
        const box = el.getBoundingClientRect();
        baseX = box.left;
        baseY = box.top;
        if (el.setPointerCapture) el.setPointerCapture(e.pointerId);
    });

    el.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        // 9px se zyada hile to drag mode (tab tap-reaction nahi hota)
        if (!moved && Math.sqrt(dx * dx + dy * dy) > 9) {
            moved = true;
            el.classList.add('dragging');
            el.style.right = 'auto';
            el.style.bottom = 'auto';
            el.style.left = baseX + 'px';
            el.style.top = baseY + 'px';
        }
        if (moved) {
            el.style.left = (baseX + dx) + 'px';
            el.style.top = (baseY + dy) + 'px';
        }
    });

    const release = () => {
        if (!dragging) return;
        dragging = false;
        if (moved) el.classList.remove('dragging');
        else reactToTap(el, cfg);       // bas tap hua tha
    };

    el.addEventListener('pointerup', release);
    el.addEventListener('pointercancel', release);
    el.addEventListener('lostpointercapture', release);

    // Mouse wale users ke liye: cursor le jao to bhi line dikhe
    el.addEventListener('click', (e) => e.preventDefault());
}

// ---------- Tap karne par: pop + random line + confetti ----------
function reactToTap(el, cfg) {
    const now = Date.now();
    if (now - Number(el.dataset.lastTap || 0) < CONFIG.cats.tapCooldownMs) return;   // spam na ho
    el.dataset.lastTap = String(now);

    popCat(el);
    showRandomToast(CAT_LINES[cfg.id] || [], CONFIG.cats.toastMs);
    burstConfetti(originFromEl(el), { particleCount: 26, spread: 55, scalar: 0.65, startVelocity: 24 });
}

// sirf pop animation
function popCat(el) {
    if (!el) return;
    el.classList.remove('pop');
    void el.offsetWidth;                 // animation dobara chale
    el.classList.add('pop');
    setTimeout(() => el.classList.remove('pop'), 520);
}

// ---------- Birthday reveal: dono cats khud pop karti hain ----------
function catsAutoPop() {
    if (!catsBuilt) return;
    CONFIG.cats.list.forEach((cfg, i) => {
        setTimeout(() => {
            const el = CAT_NODES[cfg.id];
            if (!el) return;
            popCat(el);
            burstConfetti(originFromEl(el), { particleCount: 20, spread: 50, scalar: 0.6, startVelocity: 22 });
        }, i * 260);
    });
    const dancer = CONFIG.cats.list[1] || CONFIG.cats.list[0];
    setTimeout(() => showRandomToast(CAT_LINES[dancer.id] || [], CONFIG.cats.toastMs), 700);
}

// ---------- PIN sahi hone par cats dikhao ----------
function unlockCats() {
    const layer = byId('cat-layer');
    if (!layer) return;
    layer.classList.remove('hidden');
    layer.querySelectorAll('.cat').forEach(c => c.classList.remove('cat-locked'));
}

function initCats() {
    if (!CONFIG.cats.enabled) return;
    const layer = byId('cat-layer');
    layer.classList.add('hidden');       // PIN tak chhupi rahengi
    CONFIG.cats.list.forEach(buildCat);
    catsBuilt = true;
}
