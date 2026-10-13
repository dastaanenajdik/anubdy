/* ============================================================
   letter.js — Slide 4: envelope khulna + letter ka type hona
   ============================================================ */

let typedCount = 0;
let isTyping = false;
let letterOpened = false;

function openEnvelope() {
    if (letterOpened) return;
    letterOpened = true;

    const flap = byId('env-flap');
    const env = byId('envelope');
    const paper = byId('letter-paper');

    if (flap) flap.style.transform = 'rotateX(180deg)';
    setTimeout(() => {
        if (env) env.style.display = 'none';
        if (paper) paper.style.display = 'block';
        startTypewriter();
    }, CONFIG.letter.flapOpenMs);
}

function startTypewriter(speedMs) {
    try {
        const container = byId('typed-text');
        const paperBox = byId('letter-paper');
        if (!container || !paperBox) return;

        if (typeof BIRTHDAY_MESSAGE === 'undefined' || typeof BIRTHDAY_MESSAGE !== 'string') {
            showFullLetter();
            return;
        }

        if (typedCount >= BIRTHDAY_MESSAGE.length) {
            showLetterDone();
            return;
        }

        const speed = speedMs || (CONFIG && CONFIG.letter && CONFIG.letter.typeSpeedMs) ? CONFIG.letter.typeSpeedMs : 15;
        isTyping = true;

        const skipBtn = byId('skip-typing-btn');
        const nextBtn = byId('letter-next-btn');
        if (skipBtn) skipBtn.hidden = false;
        if (nextBtn) nextBtn.hidden = true;

        (function step() {
            if (!isTyping) return;
            try {
                const chunk = speed <= 4 ? 12 : 1;
                typedCount = Math.min(typedCount + chunk, BIRTHDAY_MESSAGE.length);
                container.textContent = BIRTHDAY_MESSAGE.slice(0, typedCount);
                paperBox.scrollTop = paperBox.scrollHeight;

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

function showFullLetter() {
    try {
        if (typeof BIRTHDAY_MESSAGE === 'string') {
            const container = byId('typed-text');
            if (container) container.textContent = BIRTHDAY_MESSAGE;
            const paperBox = byId('letter-paper');
            if (paperBox) paperBox.scrollTop = paperBox.scrollHeight;
        }
    } catch (e) { /* ignore */ }
    showLetterDone();
}

function showLetterDone() {
    isTyping = false;
    const skip = byId('skip-typing-btn');
    const next = byId('letter-next-btn');
    if (skip) skip.hidden = true;
    if (next) {
        next.hidden = false;
        // Continue turant visible ho (typo ko rokne ke liye)
        try { next.style.display = 'inline-block'; } catch (e) {}
    }
}

function skipTyping() {
    isTyping = false;
    typedCount = (typeof BIRTHDAY_MESSAGE === 'string') ? BIRTHDAY_MESSAGE.length : 0;
    try {
        const container = byId('typed-text');
        if (container && typeof BIRTHDAY_MESSAGE === 'string') container.textContent = BIRTHDAY_MESSAGE;
        const paperBox = byId('letter-paper');
        if (paperBox) paperBox.scrollTop = paperBox.scrollHeight;
    } catch (e) { /* ignore */ }
    showLetterDone();
}

function initLetter() {
    const env = byId('envelope');
    if (env) env.addEventListener('click', openEnvelope);

    const skip = byId('skip-typing-btn');
    if (skip) skip.addEventListener('click', skipTyping);

    const paper = byId('letter-paper');
    if (paper) {
        paper.addEventListener('click', () => {
            if (isTyping) skipTyping();
        });
    }

    // #slide-4 par kahin bhi tap karo to envelope khule (chip-btn par tap ho to kuch na kare)
    const slide4 = byId('slide-4');
    if (slide4) {
        slide4.addEventListener('click', (e) => {
            if (e.target.closest('.chip-btn')) return;
            openEnvelope();
        });
    }
}
