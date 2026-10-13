/* ============================================================
   who.js — Slide 5: "Who is this for?"
   ============================================================
   • Sirf ek option hai: "Someone very close to my heart"
   • Reveal ("Yes… ye sab sirf aapke liye hai" + naam) ab
     BINA TAP ke, slide khulte hi khud dikh jaata hai ✨

   Naam/line badalne ho → js/config.js > who
   Look → css/slide-5.css
   ============================================================ */

let whoRevealed = false;
let whoRevealTimer = null;

function buildWhoReveal() {
    const reveal = byId('who-reveal');
    if (!reveal || whoRevealed) return;
    whoRevealed = true;

    const card = document.createElement('div');
    card.className = 'who-answer';
    card.innerHTML =
        '<p class="who-line">' + CONFIG.who.line + '</p>' +
        '<p class="who-name">' + CONFIG.who.name + '</p>' +
        '<p class="who-aka">' + CONFIG.who.aka + '</p>';
    reveal.appendChild(card);
}

// Slide khulte hi reveal (thoda sa ruk kar, taaki animation dikhe)
function autoRevealWho() {
    clearTimeout(whoRevealTimer);
    whoRevealTimer = setTimeout(() => {
        buildWhoReveal();
        const card = document.querySelector('#who-reveal .who-answer');
        if (card && typeof burstConfetti === 'function') {
            burstConfetti(originFromEl(card), { particleCount: 40, spread: 80, scalar: 0.85 });
        }
    }, 550);
}

function initWho() {
    const options = byId('who-options');
    if (!options) return;

    // Jo bhi option tap kare — usko "picked" dikhao + reveal pakka ho jaye
    options.querySelectorAll('.who-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            options.querySelectorAll('.who-chip').forEach(c => c.classList.add('picked'));
            buildWhoReveal();
        });
    });
}
