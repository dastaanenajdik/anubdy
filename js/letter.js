/* ============================================================
   letter.js — Slide 4: envelope khulna + handwriting type hona
   ============================================================
   LETTER KA TEXT ➜ js/message.js (sirf wahi file badlo)
   Typewriter ki speed ➜ js/config.js > letter.typeSpeedMs
   Envelope/letter ka look ➜ css/slide-4.css
   ============================================================ */

// Envelope par tap = flap khule, envelope gayab, letter aaye
function openEnvelope() {
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
function startTypewriter() {
    const container = byId('typed-text');
    const paperBox = byId('letter-paper');
    let i = 0;

    function typeWriter() {
        if (i < BIRTHDAY_MESSAGE.length) {
            container.textContent += BIRTHDAY_MESSAGE.charAt(i);
            i++;
            paperBox.scrollTop = paperBox.scrollHeight;
            setTimeout(typeWriter, CONFIG.letter.typeSpeedMs);
        }
    }
    typeWriter();
}

function initLetter() {
    byId('envelope').addEventListener('click', openEnvelope);
}
