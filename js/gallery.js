/* ============================================================
   gallery.js — Slide 6: photo cards + captions + uska gana
   ============================================================
   • Samne wala card side me swipe karo → hatt jaata hai, piche wala aage aata hai,
     aur piche wale ke peeche se teesra card jhalak deta hai.
   • Neeche caption bhi saath-saath badalta hai (gallery/caption.txt se).
   • Photo badalne ka sirf ek tarika: SWIPE (arrow / numbering / song hata diye)

   Photo list → js/config.js > gallery.photos
   Captions   → gallery/caption.txt (ya config me backup captions)
   Look       → css/slide-6.css
   ============================================================ */

let deckCards = [];          // DOM cards (index = photo index)
let deckCaptions = [];       // har photo ka caption
let deckIndex = 0;           // sabse aage wala card
let deckBuilt = false;
let deckBusy = false;         // ek waqt me ek hi card udta hai
let deckDrag = null;
let songReady = false;

// ---------------- Captions padho (caption.txt se) ----------------
async function loadCaptions() {
    const fallback = CONFIG.gallery.captions.slice();
    const photos = CONFIG.gallery.photos;

    // file:// par fetch kaam nahi karta → wahan config wale captions use honge
    try {
        const res = await fetch(CONFIG.gallery.captionFile, { cache: 'no-store' });
        if (!res.ok) throw new Error('caption file nahi mili');
        const text = await res.text();

        const map = {};
        text.split(/\r?\n/).forEach((line) => {
            const m = line.match(/^\s*(p\d+)\s*[-–:]\s*(.+)$/i);   // "p1-caption"
            if (m) map[m[1].toLowerCase()] = m[2].trim();
        });

        return photos.map((file, i) => {
            const key = 'p' + (i + 1);
            const byName = map[(file.split('.')[0] || '').toLowerCase()];
            return map[key] || byName || fallback[i] || '';
        });
    } catch (err) {
        return fallback;
    }
}

// ---------------- Deck banao ----------------
function buildDeck() {
    const deck = byId('deck');
    if (!deck) return;
    deck.innerHTML = '';
    deckCards = [];
    deckIndex = 0;

    CONFIG.gallery.photos.forEach((file, i) => {
        const card = document.createElement('div');
        card.className = 'deck-card';

        const img = document.createElement('img');
        img.src = 'gallery/' + file;
        img.alt = 'Photo ' + (i + 1);
        img.draggable = false;
        img.loading = 'lazy';
        img.decoding = 'async';

        card.appendChild(img);
        deck.appendChild(card);
        attachCardDrag(card, i);
        deckCards.push(card);
    });

    deckBuilt = true;
    updateDeck(true);
}

// ---------------- Cards ki position (0 = samne, 1/2 = piche side se) ----------------
function updateDeck(animate) {
    const n = deckCards.length;

    deckCards.forEach((card, i) => {
        const rel = (i - deckIndex + n) % n;
        if (!animate) card.style.transition = 'none';

        card.style.zIndex = String(1000 - rel);

        if (rel === 0) {
            card.style.transform = 'translate3d(0, 0, 0) rotate(0deg) scale(1)';
            card.style.opacity = '1';
        } else if (rel === 1) {
            card.style.transform = 'translate3d(30px, 8px, 0) rotate(5.5deg) scale(0.95)';
            card.style.opacity = '1';
        } else if (rel === 2) {
            card.style.transform = 'translate3d(60px, 16px, 0) rotate(11deg) scale(0.9)';
            card.style.opacity = '1';
        } else {
            card.style.transform = 'translate3d(80px, 22px, 0) rotate(14deg) scale(0.86)';
            card.style.opacity = '0';
        }

        if (!animate) {
            void card.offsetWidth;          // reflow (taaki jump na dikhe)
            card.style.transition = '';
        }
    });

    showCaption(deckIndex);
}

// ---------------- Caption ----------------
function showCaption(index) {
    const cap = byId('deck-caption');
    if (!cap) return;
    cap.classList.remove('in');
    cap.textContent = deckCaptions[index] || '';
    requestAnimationFrame(() => cap.classList.add('in'));
}

// ---------------- Card ko swipe/drag karna ----------------
function attachCardDrag(card, index) {
    card.addEventListener('pointerdown', (e) => {
        if (index !== deckIndex) return;               // sirf sabse aage wala card
        deckDrag = { x: e.clientX, y: e.clientY, dx: 0, on: true };
        card.classList.add('dragging');
        if (card.setPointerCapture) card.setPointerCapture(e.pointerId);
    });

    card.addEventListener('pointermove', (e) => {
        if (!deckDrag || !deckDrag.on || index !== deckIndex) return;
        deckDrag.dx = e.clientX - deckDrag.x;
        const dy = (e.clientY - deckDrag.y) * 0.06;
        card.style.transform =
            'translate3d(' + deckDrag.dx + 'px, ' + dy + 'px, 0) rotate(' + (deckDrag.dx / 22) + 'deg)';
    });

    const finish = () => {
        if (!deckDrag || !deckDrag.on || index !== deckIndex) return;
        const dx = deckDrag.dx;
        deckDrag.on = false;
        card.classList.remove('dragging');

        if (Math.abs(dx) > 80) flingCard(card, dx < 0 ? -1 : 1, dx < 0 ? 1 : -1);   // hata do
        else {                                                     // wapas jagah pe
            card.style.transition = '';
            updateDeckPositionOnly(card, (index - deckIndex + deckCards.length) % deckCards.length);
        }
    };

    card.addEventListener('pointerup', finish);
    card.addEventListener('pointercancel', finish);
    card.addEventListener('lostpointercapture', finish);
}

// ek hi card ko uski jagah par wapas bhejo
function updateDeckPositionOnly(card, rel) {
    if (rel === 0) card.style.transform = 'translate3d(0, 0, 0) rotate(0deg) scale(1)';
    else if (rel === 1) card.style.transform = 'translate3d(30px, 8px, 0) rotate(5.5deg) scale(0.95)';
    else card.style.transform = 'translate3d(60px, 16px, 0) rotate(11deg) scale(0.9)';
}

// ---------------- Card ko udaa do (next / previous) ----------------
// flyDir = card kis taraf udega (-1 left / 1 right)
// step   = kaunsa card samne aayega (+1 agla / -1 pichla)
function flingCard(card, flyDir, step) {
    const n = deckCards.length;
    if (!n || deckBusy) return;

    deckBusy = true;
    const nextIndex = (deckIndex + step + n) % n;

    card.style.transition = 'transform 0.4s cubic-bezier(0.3, 0.7, 0.4, 1), opacity 0.4s ease';
    card.style.transform =
        'translate3d(' + (flyDir < 0 ? -150 : 150) + '%, ' + (flyDir < 0 ? -8 : 8) + '%, 0) rotate(' + (flyDir < 0 ? -22 : 22) + 'deg)';
    card.style.opacity = '0';

    showCaption(nextIndex);                 // caption turant badal jaye

    setTimeout(() => {
        deckIndex = nextIndex;
        updateDeck(false);                  // naya card samne, udaa hua card peeche chhup jaye
        deckBusy = false;
    }, 400);
}

function deckNext() { if (deckCards[deckIndex]) flingCard(deckCards[deckIndex], -1, 1); }
function deckPrev() { if (deckCards[deckIndex]) flingCard(deckCards[deckIndex], 1, -1); }

// ---------------- Gallery slide par aane par ----------------
// (slide khulte waqt) — bas caption theek kar do
function fitDeck() {
    if (!deckBuilt) return;
    showCaption(deckIndex);
}

// (purane naam se bhi kaam kare)
function resetDeck() { fitDeck(); }

async function initGallery() {
    if (!byId('deck')) return;

    deckCaptions = await loadCaptions();
    buildDeck();

    // Keyboard se bhi (laptop par) — phone par swipe hi hai
    document.addEventListener('keydown', (e) => {
        const slide = byId('slide-6');
        if (!slide || !slide.classList.contains('active')) return;
        if (e.key === 'ArrowRight') deckNext();
        if (e.key === 'ArrowLeft') deckPrev();
    });

    // Screen ghoomne par card wapas apni jagah
    window.addEventListener('resize', () => updateDeck(false));
}
