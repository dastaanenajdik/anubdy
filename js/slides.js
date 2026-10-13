/* ============================================================
   slides.js — slide 1-2-3-4 ke beech aage-peeche jaana
   ============================================================
   Kisi bhi button se kisi slide par jana ho to us button me
   data-goto="2" laga do, baaki kaam yahin hota hai.
   ============================================================ */

// Ek slide ko dikhao, baaki sab chhup jayein (dots bhi update)
function goToSlide(num) {
    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
    byId('slide-' + num).classList.add('active');
    byId('dot-' + num).classList.add('active');

    // Har slide par jaane ke turant baad uski zaroori taiyari
    if (num === 2) fitCake();      // cake ki size theek karo
    if (num === 3) resetNoBtn();   // No button wapas center me lao
}

function initSlides() {
    // data-goto wale sab buttons (jaise "Start the tribute", "Continue")
    document.querySelectorAll('[data-goto]').forEach(el => {
        el.addEventListener('click', () => goToSlide(Number(el.dataset.goto)));
    });
}
