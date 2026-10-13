/* ============================================================
   cats.js — floating billi (dono cats poori site par rehti hain)
   ============================================================
   • Tap  → cat pop karti hai + ek random dua/line toast me + chhota confetti
   • Drag → finger ke saath chalti hai; chhodne par wahin ruk jaati hai
            (chhodi hui jagah ab uski \"apni jagah\" ban jaati hai)
   • AUTO → agar billi ke neeche kuch likha hai (text), to billi khud
            us jagah se hat kar sabse paas wali khaali jagah chali jaati hai.
            Agar wahan kuch nahi likha, aur apni jagah (home) khaali hai,
            to wapas apni jagah chali jaati hai.
   • PIN unlock hone tak chhupi rehti hai (js/login.js unlockCats() bulata hai)
   • Last page (birthday reveal) par khud pop karti hain (catsAutoPop())

   Har cat ki position: CSS wali jagah + ek \"translate\" shift (x, y px).
   Shift ko CAT_STATE me rakhte hain: x/y = abhi ka shift, hx/hy = apni jagah.

   GIF links, size aur lines → js/config.js > cats
   Look/animation → css/extras.css
   ============================================================ */

const CAT_LINES = {};       // { catId: [lines...] }
const CAT_NODES = {};       // { catId: DOM element }
const CAT_STATE = {};       // { catId: { x, y, hx, hy } }  (px shift se)
let catsBuilt = false;
let catCheckTimer = null;
let catCheckQueued = false;

const CAT_CHECK_MS = 300;   // kitni der me ek baar check ho (text badle to bhi pakdega)
const CAT_TEXT_PAD = 6;     // billi ke box ka andar ka hissa jo text se takraye (GIF ke khaali kinaare chhod kar)
const CAT_GRID_STEP = 10;   // khaali jagah dhoondhte waqt kitne px ka gap

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
    CAT_STATE[cfg.id] = { x: 0, y: 0, hx: 0, hy: 0 };
    attachCatEvents(el, cfg);
    byId('cat-layer').appendChild(el);
    CAT_NODES[cfg.id] = el;
    return el;
}

// ---------- Cat ko shift karna (CSS transition 'translate' se smooth chalega) ----------
function setCatOffset(el, x, y) {
    const st = CAT_STATE[el.id];
    if (!st) return;
    st.x = x;
    st.y = y;
    el.style.translate = x + 'px ' + y + 'px';
}

// ---------- Tap + drag ----------
function attachCatEvents(el, cfg) {
    let dragging = false;
    let moved = false;
    let startX = 0, startY = 0;
    let baseX = 0, baseY = 0;      // drag shuru hone par cat ka shift

    el.addEventListener('pointerdown', (e) => {
        if (el.classList.contains('cat-locked')) return;
        dragging = true;
        moved = false;
        startX = e.clientX;
        startY = e.clientY;
        const st = CAT_STATE[el.id];
        baseX = st.x;
        baseY = st.y;
        if (el.setPointerCapture) el.setPointerCapture(e.pointerId);
    });

    el.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        // 9px se zyada hile to drag mode (tab tap-reaction nahi hota)
        if (!moved && Math.sqrt(dx * dx + dy * dy) > 9) {
            moved = true;
            el.classList.add('dragging');       // transition band → finger ke saath chalegi
        }
        if (moved) setCatOffset(el, baseX + dx, baseY + dy);
    });

    const release = () => {
        if (!dragging) return;
        dragging = false;
        if (moved) {
            el.classList.remove('dragging');
            dropCat(el);
        } else {
            reactToTap(el, cfg);       // bas tap hua tha
        }
    };

    el.addEventListener('pointerup', release);
    el.addEventListener('pointercancel', release);
    el.addEventListener('lostpointercapture', release);

    // Mouse wale users ke liye: cursor le jao to bhi line dikhe
    el.addEventListener('click', (e) => e.preventDefault());
}

// Drag chhodne par: agar wahan text nahi hai to wahi nayi \"apni jagah\" ban jaati hai
function dropCat(el) {
    const st = CAT_STATE[el.id];
    const obstacles = collectTextObstacles();
    const box = catBoxAt(catNatural(el), st.x, st.y);
    if (!hitsAny(box, obstacles)) {
        st.hx = st.x;
        st.hy = st.y;
    }
    catsAutoCheck();                     // agar text par chhodi ho to turant hat jaye
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

// =====================================================================
//  AUTO: text se hat jao / wapas apni jagah
// =====================================================================

// Cat ki CSS wali jagah (shift se pehle) — viewport ke hisaab se, px me
function catNatural(el) {
    const cs = getComputedStyle(el);
    const size = CONFIG.cats.size;
    let left = parseFloat(cs.left);
    let top = parseFloat(cs.top);
    if (isNaN(left)) left = window.innerWidth - parseFloat(cs.right) - size;
    if (isNaN(top)) top = window.innerHeight - parseFloat(cs.bottom) - size;
    return { left: left || 0, top: top || 0 };
}

// (x, y) shift par cat ka box
function catBoxAt(nat, x, y) {
    const size = CONFIG.cats.size;
    const left = nat.left + x;
    const top = nat.top + y;
    return { left: left, top: top, right: left + size, bottom: top + size };
}

// Box ka andar ka hissa (text se takrane ke liye)
function insetBox(box) {
    const p = CAT_TEXT_PAD;
    return { left: box.left + p, top: box.top + p, right: box.right - p, bottom: box.bottom - p };
}

function boxesOverlap(a, b) {
    return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function hitsAny(box, obstacles) {
    const inner = insetBox(box);
    for (let i = 0; i < obstacles.length; i++) {
        if (boxesOverlap(inner, obstacles[i])) return true;
    }
    return false;
}

// Abhi screen par jo text dikh raha hai (sirf active page + bottom bar + inputs)
function collectTextObstacles() {
    const rects = [];
    const roots = [];
    const active = document.querySelector('.slide.active');
    if (active) roots.push(active);
    const bar = byId('bottom-bar');
    if (bar) roots.push(bar);
    const muteBtn = byId('mute-btn');
    if (muteBtn) {
        const mr = muteBtn.getBoundingClientRect();
        if (mr.width > 0 && mr.height > 0) {
            rects.push({ left: mr.left, top: mr.top, right: mr.right, bottom: mr.bottom });
        }
    }

    roots.forEach((root) => {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const range = document.createRange();
        let node;
        while ((node = walker.nextNode())) {
            if (!node.nodeValue || !node.nodeValue.trim()) continue;
            const parent = node.parentElement;
            if (!parent || parent.closest('script, style')) continue;
            range.selectNodeContents(node);
            const list = range.getClientRects();
            for (let i = 0; i < list.length; i++) {
                const r = list[i];
                if (r.width > 0 && r.height > 0) {
                    rects.push({ left: r.left, top: r.top, right: r.right, bottom: r.bottom });
                }
            }
        }
        root.querySelectorAll('textarea, input').forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.width > 0 && r.height > 0) {
                rects.push({ left: r.left, top: r.top, right: r.right, bottom: r.bottom });
            }
        });
    });
    return rects;
}

// Khaali jagah dhoondho — jo sabse paas ho (taaki billi zyada door na jaye)
function findFreeSpot(entry, entries, obstacles) {
    const size = CONFIG.cats.size;
    const maxX = window.innerWidth - size - 4;
    const maxY = window.innerHeight - size - 4;
    const cur = entry.box;
    let best = null;
    let bestD = Infinity;

    for (let x = 4; x <= maxX; x += CAT_GRID_STEP) {
        for (let y = 4; y <= maxY; y += CAT_GRID_STEP) {
            const box = { left: x, top: y, right: x + size, bottom: y + size };
            const d = (x - cur.left) * (x - cur.left) + (y - cur.top) * (y - cur.top);
            if (d >= bestD) continue;                       // pehle hi door hai, skip
            if (hitsAny(box, obstacles)) continue;
            let clash = false;
            for (let j = 0; j < entries.length; j++) {
                if (entries[j] !== entry && boxesOverlap(box, entries[j].box)) { clash = true; break; }
            }
            if (clash) continue;
            best = box;
            bestD = d;
        }
    }
    if (!best) return null;
    return { x: best.left - entry.nat.left, y: best.top - entry.nat.top };
}

// Ek check: kya koi billi text ke upar hai? To hat jao. Nahi to (zaroorat ho to) ghar wapas.
function catsAutoCheck() {
    catCheckQueued = false;
    if (!catsBuilt) return;
    const layer = byId('cat-layer');
    if (!layer || layer.classList.contains('hidden')) return;

    const obstacles = collectTextObstacles();

    const entries = CONFIG.cats.list
        .map((cfg) => CAT_NODES[cfg.id])
        .filter(Boolean)
        .map((el) => {
            const st = CAT_STATE[el.id];
            const nat = catNatural(el);
            return { el, st, nat, box: catBoxAt(nat, st.x, st.y) };
        });

    entries.forEach((entry) => {
        const { el, st, nat } = entry;
        if (el.classList.contains('cat-locked') || el.classList.contains('dragging')) return;

        // (1) Billi ke neeche text hai → khaali jagah chali jao
        if (hitsAny(entry.box, obstacles)) {
            const spot = findFreeSpot(entry, entries, obstacles);
            if (spot) {
                setCatOffset(el, spot.x, spot.y);
                entry.box = catBoxAt(nat, spot.x, spot.y);
            }
            return;
        }

        // (2) Yahan kuch nahi likha → agar apni jagah (home) khaali hai to wapas wahin
        if (st.x !== st.hx || st.y !== st.hy) {
            const homeBox = catBoxAt(nat, st.hx, st.hy);
            const clash = entries.some((o) => o !== entry && boxesOverlap(homeBox, o.box));
            if (!hitsAny(homeBox, obstacles) && !clash) {
                setCatOffset(el, st.hx, st.hy);
                entry.box = homeBox;
            }
        }
    });
}

// Scroll / resize / typing ke waqt jaldi check ho (ek frame me ek baar)
function queueCatCheck() {
    if (catCheckQueued) return;
    catCheckQueued = true;
    requestAnimationFrame(catsAutoCheck);
}

// ---------- PIN sahi hone par cats dikhao ----------
function unlockCats() {
    const layer = byId('cat-layer');
    if (!layer) return;
    layer.classList.remove('hidden');
    layer.querySelectorAll('.cat').forEach(c => c.classList.remove('cat-locked'));
    queueCatCheck();
}

function initCats() {
    if (!CONFIG.cats.enabled) return;
    const layer = byId('cat-layer');
    layer.classList.add('hidden');       // PIN tak chhupi rahengi
    CONFIG.cats.list.forEach(buildCat);
    catsBuilt = true;

    catCheckTimer = setInterval(catsAutoCheck, CAT_CHECK_MS);
    document.addEventListener('scroll', queueCatCheck, true);   // page scroll hone par text khisakta hai
    window.addEventListener('resize', queueCatCheck);
}
