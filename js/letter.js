/* ============================================================
   letter.js — Slide 4: envelope + poori story (type hoke likhti hai)
   ============================================================
   Kaise chalta hai:
     • Envelope pe tap karo → flap khulta hai
     • Poori story type hoti jaati hai (bilkul notes jaisa, ek-ek akshar — aahista)
     • Envelope khulte hi letter wala gaana shuru hota hai (js/music.js)
     • Jitna text badhta hai, envelope utna hi NICHE sarakta jaata hai
       (letter ke peeche se nikal kar neeche chala jaata hai) ✨
     • "Continue ➜" tab dikhta hai jab poori story likh jaye
       (ya ⏩ Skip typing dabao — turant pura)

   LETTER KA TEXT    → js/message.js
   Typing ki speed   → js/config.js > letter.typeSpeedMs + charsPerTick
   Envelope/paper ka look → css/slide-4.css
   ============================================================ */

let typedCount = 0;          // kitne akshar type ho chuke hain
let isTyping = false;        // abhi typing chal rahi hai?
let letterOpened = false;    // envelope khul chuka hai
let letterDone = false;      // poori story likh di gayi

function letterSlide() { return byId('slide-4'); }

// ---------- Envelope khulta hai, typing shuru ----------
function openEnvelope() {
    if (letterOpened) return;
    letterOpened = true;

    // Gaana turant (user ke tap ke saath hi) — browser auto-play block na kare
    if (typeof syncMusic === 'function') syncMusic();

    const flap = byId('env-flap');
    const paper = byId('letter-paper');
    const env = byId('envelope');
    const actions = byId('letter-actions');

    if (flap) flap.style.transform = 'rotateX(180deg)';

    setTimeout(() => {
        if (paper) paper.style.display = 'block';
        if (actions) actions.style.display = 'flex';
        if (env) env.classList.add('opened');       // seal hat jaye, envelope halka ho jaye
        startTypewriter();
    }, CONFIG.letter.flapOpenMs);
}

// ---------- Typewriter (notes wala andaaz) ----------
function startTypewriter(speedMs) {
    try {
        const container = byId('typed-text');
        if (!container) return;

        if (typeof BIRTHDAY_MESSAGE === 'undefined' || typeof BIRTHDAY_MESSAGE !== 'string') {
            showFullLetter();
            return;
        }

        if (typedCount >= BIRTHDAY_MESSAGE.length) {
            showLetterDone();
            return;
        }

        const speed = speedMs || (CONFIG && CONFIG.letter && CONFIG.letter.typeSpeedMs) || 12;
        const perTick = (CONFIG && CONFIG.letter && CONFIG.letter.charsPerTick) || 4;
        isTyping = true;

        const skipBtn = byId('skip-typing-btn');
        if (skipBtn) skipBtn.hidden = false;

        (function step() {
            if (!isTyping) return;
            try {
                const chunk = speed <= 4 ? 14 : perTick;
                const total = BIRTHDAY_MESSAGE.length;
                let next = Math.min(typedCount + chunk, total);
                // Emoji (surrogate pair) ko beech se na todo — dono akshar ek saath aayein
                const lastCode = BIRTHDAY_MESSAGE.charCodeAt(next - 1);
                if (next < total && lastCode >= 0xD800 && lastCode <= 0xDBFF) next = Math.min(next + 1, total);
                typedCount = next;
                container.textContent = BIRTHDAY_MESSAGE.slice(0, typedCount);
                followTyping();

                if (typedCount >= BIRTHDAY_MESSAGE.length) {
                    showLetterDone();
                    return;
                }
                setTimeout(step, speed);
            } catch (e) {
                showFullLetter();
            }
        })();
    } catch (e) {
        showFullLetter();
    }
}

// ---------- Typing ke saath envelope niche sarakta jaye ----------
// (layout ki padhai thodi-thodi der me, taaki phone par typing smooth rahe)
let lastFollowAt = 0;

function followTyping(force) {
    const now = Date.now();
    if (!force && now - lastFollowAt < 70) return;
    lastFollowAt = now;

    const env = byId('envelope');
    const paper = byId('letter-paper');

    if (env && paper) {
        const total = (typeof BIRTHDAY_MESSAGE === 'string' && BIRTHDAY_MESSAGE.length)
            ? BIRTHDAY_MESSAGE.length : 1;
        const progress = Math.min(1, typedCount / total);

        // Letter ke bilkul neeche tak jaane ke liye kitna neeche girna hai
        const travel = Math.max(0, paper.offsetTop + paper.offsetHeight + 26 - env.offsetHeight);
        env.style.transform = 'translateY(' + Math.round(progress * travel) + 'px)';
    }

    // Page khud neeche scroll hota jaye (jaise notes me hota hai)
    const slide = letterSlide();
    if (slide) slide.scrollTop = slide.scrollHeight;
}

function showFullLetter() {
    try {
        if (typeof BIRTHDAY_MESSAGE === 'string') {
            const container = byId('typed-text');
            if (container) container.textContent = BIRTHDAY_MESSAGE;
        }
    } catch (e) { /* ignore */ }
    followTyping(true);
    showLetterDone();
}

function showLetterDone() {
    const firstTime = !letterDone;
    isTyping = false;
    letterDone = true;

    const skip = byId('skip-typing-btn');
    if (skip) skip.hidden = true;

    followTyping(true);

    // Story poori likh gayi → pookiee ko bata do ki ab neeche Next se aage jaana hai
    if (firstTime && typeof showToast === 'function' && CONFIG.text.letterDone) {
        showToast(CONFIG.text.letterDone, 3000);
    }
}

// ---------- ⏩ Skip typing ----------
function skipTyping() {
    isTyping = false;
    typedCount = (typeof BIRTHDAY_MESSAGE === 'string') ? BIRTHDAY_MESSAGE.length : 0;
    try {
        const container = byId('typed-text');
        if (container && typeof BIRTHDAY_MESSAGE === 'string') container.textContent = BIRTHDAY_MESSAGE;
    } catch (e) { /* ignore */ }
    showLetterDone();
}

// ---------- Slide 4 par wapas aane par ----------
function prepareLetterPage() {
    const slide = letterSlide();
    if (slide) slide.scrollTop = 0;
    followTyping(true);
}

function initLetter() {
    const env = byId('envelope');
    if (env) {
        env.addEventListener('click', openEnvelope);
        env.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEnvelope(); }
        });
    }

    // Page pe kahin bhi tap karne se envelope khul jaye (intro ke waqt)
    const slide4 = letterSlide();
    if (slide4) {
        slide4.addEventListener('click', (e) => {
            if (e.target.closest('.chip-btn')) return;
            if (!letterOpened) openEnvelope();
        });
    }

    const skip = byId('skip-typing-btn');
    if (skip) skip.addEventListener('click', skipTyping);

    // Letter pe tap karne par typing turant poori ho jaye
    const paper = byId('letter-paper');
    if (paper) {
        paper.addEventListener('click', () => { if (isTyping) skipTyping(); });
    }
}
