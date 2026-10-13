/* ============================================================
   notes.js — Slide 7 (Feelings zone) + Slide 8 (Notes / chunks)
   ============================================================
   • Slide 7 = darwaza: chip "Feelings zone" + 4 lock icons + "Notes kholo →"
   • Slide 8 = 4 note cards; har card pe tap karo → lock khulta hai
     aur note typing animation ke saath likha jaata hai.

   Notes ka text/title → js/config.js > notes.items
   Typing ki speed      → js/config.js > notes.typeSpeedMs
   Look                 → css/slide-7.css + css/slide-8.css
   ============================================================ */

let notesOpened = 0;

// ---------------- Slide 7: 4 chhote lock icons (bas hint) ----------------
function buildLocks() {
    const row = byId('lock-row');
    if (!row) return;
    row.innerHTML = '';
    for (let i = 0; i < CONFIG.notes.lockCount; i++) {
        const lock = document.createElement('span');
        lock.className = 'lock-dot';
        lock.textContent = '🔒';
        lock.style.setProperty('--d', (1.7 + i * 0.35).toFixed(2) + 's');
        row.appendChild(lock);
    }
}

// ---------------- Slide 8: note cards ----------------
function buildNotes() {
    const list = byId('note-list');
    if (!list) return;
    list.innerHTML = '';
    notesOpened = 0;

    CONFIG.notes.items.forEach((note, i) => {
        const card = document.createElement('button');
        card.className = 'note-card';
        card.type = 'button';
        card.innerHTML =
            '<div class="note-head">' +
                '<span class="note-num">Note ' + (i + 1) + '</span>' +
                '<span class="note-lock">🔒</span>' +
            '</div>' +
            '<h4 class="note-title">' + note.title + '</h4>' +
            '<p class="note-body"></p>' +
            '<p class="note-tap">tap karke kholo 💌</p>';

        card.addEventListener('click', () => openNote(card, note));
        list.appendChild(card);
    });

    updateNoteProgress();
}

// Note khulne par: lock hat jaye + text type ho
function openNote(card, note) {
    if (card.classList.contains('open')) return;

    card.classList.add('open');
    card.querySelector('.note-lock').textContent = '🔓';
    card.querySelector('.note-tap').textContent = '';

    typeNote(card.querySelector('.note-body'), note.text);

    notesOpened++;
    updateNoteProgress();

    burstConfetti(originFromEl(card), { particleCount: 22, spread: 55, scalar: 0.7, startVelocity: 22 });
}

// ek-ek akshar likhne wala animation
function typeNote(el, text) {
    let i = 0;
    (function step() {
        i = Math.min(i + 2, text.length);
        el.textContent = text.slice(0, i);
        if (i < text.length) setTimeout(step, CONFIG.notes.typeSpeedMs);
    })();
}

// "2 / 4 notes khule" + sab khulne par Continue dikhao
function updateNoteProgress() {
    const total = CONFIG.notes.items.length;
    const box = byId('note-progress');
    if (box) {
        box.textContent = notesOpened >= total
            ? CONFIG.notes.doneText
            : notesOpened + ' / ' + total + ' notes khule 💌 (baaki bhi khol lo)';
    }
    if (notesOpened >= total) {
        const next = byId('notes-next');
        if (next) next.classList.remove('hidden-btn');
        showToast('Sab notes khul gaye 💗');
    }
}

function initNotes() {
    buildLocks();
    buildNotes();
}
