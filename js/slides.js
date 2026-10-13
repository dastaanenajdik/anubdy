/* ============================================================
   slides.js — slides ke beech aage-peeche jaana + neeche wale dots
   ============================================================
   Kisi bhi button se kisi slide par jana ho to us button me
   data-goto="6" laga do, baaki kaam yahin hota hai.

   Dots khud ban jaate hain (jitne .slide hain, utne dots).
   Har slide par jaane ke baad uski zaroori taiyari SLIDE_HOOKS me hai.
   ============================================================ */

// Har slide par pahunchne ke baad kya karna hai
const SLIDE_HOOKS = {
    2: () => { if (typeof fitCake === 'function') fitCake(); },              // cake ki size
    3: () => { if (typeof resetNoBtn === 'function') resetNoBtn(); },        // No button wapas center
    6: () => { if (typeof resetDeck === 'function') resetDeck(); },          // gallery deck
    9: () => { if (typeof buildTimeline === 'function') buildTimeline(); },  // timeline ek-ek karke
    10: () => { if (typeof onFinalPage === 'function') onFinalPage(); },     // birthday reveal + billi
};

// Jitne slides hain utne dots bana do
function buildDots() {
    const box = byId('dots-container');
    if (!box) return;
    box.innerHTML = '';
    const total = document.querySelectorAll('.slide').length;
    for (let i = 1; i <= total; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 1 ? ' active' : '');
        dot.id = 'dot-' + i;
        box.appendChild(dot);
    }
}

// Ek slide ko dikhao, baaki sab chhup jayein (dots bhi update)
function goToSlide(num) {
    const target = byId('slide-' + num);
    if (!target) return;

    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
    target.classList.add('active');

    const dot = byId('dot-' + num);
    if (dot) dot.classList.add('active');

    // Lamba page ho to sabse upar se shuru karo
    target.scrollTop = 0;

    const hook = SLIDE_HOOKS[num];
    if (hook) hook();
}

// Sabse pehla slide (Shuru se button isko use karta hai)
function goToFirstSlide() {
    goToSlide(1);
}

function initSlides() {
    buildDots();

    // data-goto wale sab buttons (jaise "Start the tribute", "Continue", "Back")
    document.querySelectorAll('[data-goto]').forEach(el => {
        el.addEventListener('click', () => goToSlide(Number(el.dataset.goto)));
    });
}
