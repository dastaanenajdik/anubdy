/* ============================================================
   facts.js — Slide 9: "Janti hai aaj kya kya hua tha?" + timeline
   ============================================================
   • 5 buttons (Indian History, Indian Celebs, Days, World History,
     International Celebs) → tap karo to chhota sa modal page khulta hai
     aur items ek-ek karke aate hain.
   • Neeche "Hamari timeline 🗓️" — items ~300ms ke gap pe appear hote hain
     (sirf pehli baar).

   Sara data → js/config.js > facts
   Look      → css/slide-9.css (+ modal css/base.css me)
   ============================================================ */

let timelineBuilt = false;

// ---------------- 5 buttons ----------------
function buildFactButtons() {
    const box = byId('fact-buttons');
    if (!box) return;
    box.innerHTML = '';

    CONFIG.facts.buttons.forEach((btn) => {
        const el = document.createElement('button');
        el.className = 'fact-btn';
        el.type = 'button';
        el.innerHTML =
            '<span class="fact-emoji">' + btn.emoji + '</span>' +
            '<span class="fact-label">' + btn.label + '</span>' +
            '<span class="fact-chip">' + btn.chip + '</span>';
        el.addEventListener('click', () => openFact(btn));
        box.appendChild(el);
    });
}

// ---------------- Modal kholna ----------------
function openFact(btn) {
    const modal = byId('fact-modal');
    const items = CONFIG.facts.sections[btn.id] || [];

    byId('modal-chip').textContent = btn.chip;
    byId('modal-title').textContent = btn.label;
    byId('modal-sub').textContent = btn.sub;

    const box = byId('modal-items');
    box.innerHTML = '';
    items.forEach((item, i) => {
        const el = document.createElement('div');
        el.className = 'fact-item';
        el.innerHTML = '<strong>' + item.t + '</strong><span>' + item.d + '</span>';
        el.style.animationDelay = (i * 90) + 'ms';      // ek-ek karke aa jayein
        box.appendChild(el);
    });

    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('open'));
}

function closeFact() {
    const modal = byId('fact-modal');
    if (!modal) return;
    modal.classList.remove('open');
    setTimeout(() => { modal.hidden = true; }, 260);
}

// ---------------- Timeline (ek-ek karke appear) ----------------
function buildTimeline() {
    if (timelineBuilt) return;              // sirf pehli baar banti hai
    timelineBuilt = true;

    const list = byId('timeline-list');
    if (!list) return;
    list.innerHTML = '';

    CONFIG.facts.timeline.forEach((item, i) => {
        setTimeout(() => {
            const el = document.createElement('div');
            el.className = 'tl-item';
            el.innerHTML =
                '<span class="tl-dot"></span>' +
                '<div><strong>' + item.t + '</strong><span>' + item.d + '</span></div>';
            list.appendChild(el);
            requestAnimationFrame(() => el.classList.add('in'));
        }, i * CONFIG.facts.staggerMs);
    });
}

function initFacts() {
    buildFactButtons();

    const modal = byId('fact-modal');
    if (!modal) return;

    byId('modal-close').addEventListener('click', closeFact);
    // bahar tap karne par band
    modal.addEventListener('click', (e) => { if (e.target === modal) closeFact(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeFact(); });
}
