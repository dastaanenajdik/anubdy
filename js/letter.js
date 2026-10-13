/* ============================================================
   letter.js — Slide 4: envelope khulna + letter ka type hona
   ============================================================
   • Envelope pe tap → flap khulta hai, letter aata hai
   • Letter STATIC nahi hai — ek-ek akshar type hota hai (typewriter)
   • Typing ke beech "⏩ Skip typing" aur pura hone par "Continue ➜"

   LETTER KA TEXT   ➜ js/message.js (sirf wahi file badlo)
   Typewriter speed ➜ js/config.js > letter.typeSpeedMs
   Envelope/letter ka look ➜ css/slide-4.css
   ============================================================ */

let typedCount = 0;          // kitne akshar type ho chuke hain
let isTyping = false;        // abhi typing chal rahi hai?
let letterOpened = false;    // envelope ek baar khul gaya

// Envelope par tap = flap khule, envelope gayab, letter type hona shuru
function openEnvelope() {
    if (letterOpened) return;
    letterOpened = true;

    const flap = byId('env-flap');
    const env = byId('envelope');
    const paper = byId('letter-paper');

    flap.style.transform = 'rotateX(180deg)';
    setTimeout(() => {
        env.style.display = 'none';
        paper.style.display = 'block';
        startTypewriter();
    }, CONFIG.letter.flapOpenMs);
}

// Ek-ek akshar type hota hai, saath me letter khud neeche scroll hota hai
function startTypewriter(speedMs) {
    const container = byId('typed-text');
    const paperBox = byId('letter-paper');
    if (!container || !paperBox) return;

    if (typedCount >= BIRTHDAY_MESSAGE.length) {       // pehle hi pura type ho chuka hai
        showLetterDone();
        return;
    }

    const speed = speedMs || CONFIG.letter.typeSpeedMs;
    isTyping = true;
    byId('skip-typing-btn').hidden = false;
    byId('letter-next-btn').hidden = true;

    (function step() {
        if (!isTyping) return;                          // skip dabaya gaya

        const chunk = speed <= 4 ? 12 : 1;              // skip ke waqt tez
        typedCount = Math.min(typedCount + chunk, BIRTHDAY_MESSAGE.length);
        container.textContent = BIRTHDAY_MESSAGE.slice(0, typedCount);
        paperBox.scrollTop = paperBox.scrollHeight;

        if (typedCount >= BIRTHDAY_MESSAGE.length) { showLetterDone(); return; }
        setTimeout(step, speed);
    })();
}

// typing pura hone par: skip hatao, Continue dikhao
function showLetterDone() {
    isTyping = false;
    const skip = byId('skip-typing-btn');
    const next = byId('letter-next-btn');
    if (skip) skip.hidden = true;
    if (next) next.hidden = false;
}

// ⏩ Skip typing — pura letter turant likh do
function skipTyping() {
    isTyping = false;
    typedCount = BIRTHDAY_MESSAGE.length;
    byId('typed-text').textContent = BIRTHDAY_MESSAGE;
    const paperBox = byId('letter-paper');
    paperBox.scrollTop = paperBox.scrollHeight;
    showLetterDone();
}

function initLetter() {
    const env = byId('envelope');
    if (env) env.addEventListener('click', openEnvelope);

    const skip = byId('skip-typing-btn');
    if (skip) skip.addEventListener('click', skipTyping);

    // Letter pe dobara tap karne par bhi skip ho jaye
    const paper = byId('letter-paper');
    if (paper) paper.addEventListener('click', () => { if (isTyping) skipTyping(); });
}
