/* ============================================================
   slides.js — slides ke beech aage-peeche jaana + neeche wale Back / Next bar
   ============================================================
   • "data-goto" wale buttons khud kaam karte hain
   • Slide 2 (cake) ka niyam: jab tak mic se candles na bujhein aur
     wish ka countdown poora na ho, aage nahi ja sakte (next page disable)
   ============================================================ */

let currentSlide = 1;
const TOTAL_SLIDES = 10;

// Har slide par pahunchne ke baad kya karna hai
const SLIDE_HOOKS = {
    2: () => { if (typeof fitCake === 'function') fitCake(); },
    3: () => { if (typeof resetNoBtn === 'function') resetNoBtn(); },
    4: () => { if (typeof prepareLetterPage === 'function') prepareLetterPage(); },
    5: () => { if (typeof autoRevealWho === 'function') autoRevealWho(); },
    6: () => { if (typeof fitDeck === 'function') fitDeck(); },
    9: () => { if (typeof buildTimeline === 'function') buildTimeline(); },
    10: () => { if (typeof onFinalPage === 'function') onFinalPage(); },
};

// Slide 2 se aage jaane ki ijazat hai? (sirf mic + countdown ke baad)
function cakeSwipeOk() {
    return currentSlide !== 2 || (typeof wishReady !== 'undefined' && wishReady);
}

// Slide 2 se aage jaane ki koshish — rok do aur pookiee ko bata do
function cakeSwipeGuard() {
    if (typeof showToast === 'function') showToast(CONFIG.text.wishLocked, 3000);
    const micBtn = byId('mic-btn');
    if (micBtn && !micBtn.classList.contains('hide')) {
        micBtn.classList.remove('sparkle');
        void micBtn.offsetWidth;
        micBtn.classList.add('sparkle');
    }
    return false;
}

function goToSlide(num, opts) {
    if (num < 1 || num > TOTAL_SLIDES) return;
    const target = byId('slide-' + num);
    if (!target) return;

    // Slide 2 se aage? tab hi jab mic se candles bujhi hon + wish ka timer poora ho
    const force = !!(opts && opts.force);
    if (!force && num > currentSlide && !cakeSwipeOk()) {
        cakeSwipeGuard();
        return;
    }

    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    target.classList.add('active');

    target.scrollTop = 0;
    currentSlide = num;

    updateNavBar();

    // Har page ke hisaab se gaana (letter / photo / throughout) — js/music.js
    if (typeof syncMusic === 'function') syncMusic();

    const hook = SLIDE_HOOKS[num];
    if (hook) hook();
}

function goToFirstSlide() { goToSlide(1); }

function stepSlide(delta) {
    const next = currentSlide + delta;
    if (next < 1 || next > TOTAL_SLIDES) return;
    const btnId = delta > 0 ? 'nav-next' : 'nav-back';
    const btn = byId(btnId);
    if (btn) {
        btn.classList.remove('pop');
        void btn.offsetWidth;
        btn.classList.add('pop');
        btn.style.animation = 'navPop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }
    goToSlide(next);
}

function updateNavBar() {
    const back = byId('nav-back');
    const next = byId('nav-next');
    if (!back || !next) return;
    if (currentSlide <= 1) {
        back.classList.add('hidden-btn');
    } else {
        back.classList.remove('hidden-btn');
    }
    if (currentSlide >= TOTAL_SLIDES) {
        next.classList.add('hidden-btn');
    } else {
        next.classList.remove('hidden-btn');
    }

    // Slide 2 par: jab tak mic se candles na bujhein + timer poora na ho,
    // "Next" button disabled (dikhata hai, par kaam nahi karta)
    const locked = currentSlide === 2 && !(typeof wishReady !== 'undefined' && wishReady);
    next.classList.toggle('disabled-btn', locked);
    next.setAttribute('aria-disabled', locked ? 'true' : 'false');
    next.title = locked ? CONFIG.text.wishLocked : '';
}

function initSlides() {
    document.querySelectorAll('[data-goto]').forEach(el => {
        // Ye buttons jaan-boojh kar lagaye gaye hain, isliye mic-gate yahan lagu nahi hota
        el.addEventListener('click', () => goToSlide(Number(el.dataset.goto), { force: true }));
    });

    const backBtn = byId('nav-back');
    const nextBtn = byId('nav-next');
    if (backBtn) backBtn.addEventListener('click', () => stepSlide(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => stepSlide(+1));

    document.addEventListener('keydown', (e) => {
        const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
        if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

        if (e.key === 'ArrowLeft') { e.preventDefault(); stepSlide(-1); }

        // Slide 2 par right arrow tab hi jab wish ka timer poora ho
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            if (currentSlide === 2 && !cakeSwipeOk()) { cakeSwipeGuard(); return; }
            stepSlide(+1);
        }
    });

    updateNavBar();
}
