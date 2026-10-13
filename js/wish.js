/* ============================================================
   wish.js — Slide 10: Happiest Birthday Again + Wish Box
   ============================================================
   • Page pe aate hi: confetti bursts + dono billi khud pop karti hain
   • "🎉 Celebrate Again" → 3 confetti bursts + button pe sparkle + toast
   • "↺ Shuru se" → pehle page (slide 1)
   • Wish box → WhatsApp par message kholta hai

   WhatsApp number / toasts → js/config.js > wish
   Look → css/slide-10.css
   ============================================================ */

let finalRevealed = false;

// ---------------- Page pe pehli baar aane par ----------------
function onFinalPage() {
    if (finalRevealed) return;
    finalRevealed = true;

    setTimeout(() => burstConfetti({ x: 0.5, y: 0.42 }, { particleCount: 90, spread: 100 }), 220);
    setTimeout(() => burstConfetti({ x: 0.12, y: 0.6 }, { particleCount: 55, spread: 70 }), 620);
    setTimeout(() => burstConfetti({ x: 0.88, y: 0.6 }, { particleCount: 55, spread: 70 }), 1020);

    // billi bhi celebrate karti hai
    if (typeof catsAutoPop === 'function') catsAutoPop();
}

// ---------------- 🎉 Celebrate Again ----------------
function celebrateAgain() {
    burstConfetti({ x: 0.5, y: 0.45 }, { particleCount: 110, spread: 110 });
    setTimeout(() => burstConfetti({ x: 0.1, y: 0.55 }, { particleCount: 70, spread: 80 }), 150);
    setTimeout(() => burstConfetti({ x: 0.9, y: 0.55 }, { particleCount: 70, spread: 80 }), 300);

    const btn = byId('celebrate-again');
    btn.classList.remove('sparkle');
    void btn.offsetWidth;
    btn.classList.add('sparkle');
    setTimeout(() => btn.classList.remove('sparkle'), 1000);

    showToast(CONFIG.wish.celebrateToast);
}

// ---------------- 💌 Wish Box (WhatsApp) ----------------
function sendWish() {
    const box = byId('wish-text');
    const message = (box.value || '').trim();

    if (!message) {
        showToast(CONFIG.wish.emptyToast);
        box.focus();
        return;
    }

    const number = CONFIG.wish.countryCode + CONFIG.wish.whatsapp;
    const url = 'https://wa.me/' + number + '?text=' + encodeURIComponent((CONFIG.wish.prefix || '') + message);

    window.open(url, '_blank', 'noopener');
    showToast(CONFIG.wish.openToast);
    burstConfetti({ x: 0.5, y: 0.72 }, { particleCount: 45, spread: 65 });
}

function initWish() {
    const sendBtn = byId('wish-send');
    if (sendBtn) sendBtn.addEventListener('click', sendWish);

    const again = byId('celebrate-again');
    if (again) again.addEventListener('click', celebrateAgain);

    const restart = byId('start-over');
    if (restart) {
        restart.addEventListener('click', () => {
            goToFirstSlide();
            burstConfetti({ x: 0.5, y: 0.6 }, { particleCount: 60, spread: 90 });
        });
    }
}
