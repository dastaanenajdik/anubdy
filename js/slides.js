/* ============================================================
   slides.js — slides ke beech aage-peeche jaana + neeche wale dots + nav bar
   ============================================================ */

let currentSlide = 1;
const TOTAL_SLIDES = 10;

// Har slide par pahunchne ke baad kya karna hai
const SLIDE_HOOKS = {
    2: () => { if (typeof fitCake === 'function') fitCake(); },
    3: () => { if (typeof resetNoBtn === 'function') resetNoBtn(); },
    6: () => { if (typeof resetDeck === 'function') resetDeck(); },
    9: () => { if (typeof buildTimeline === 'function') buildTimeline(); },
    10: () => { if (typeof onFinalPage === 'function') onFinalPage(); },
};

function buildDots() {
    const box = byId('dots-container');
    if (!box) return;
    box.innerHTML = '';
    for (let i = 1; i <= TOTAL_SLIDES; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === currentSlide ? ' active' : '');
        dot.id = 'dot-' + i;
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', 'Go to slide ' + i);
        dot.addEventListener('click', () => goToSlide(i));
        box.appendChild(dot);
    }
}

function goToSlide(num) {
    if (num < 1 || num > TOTAL_SLIDES) return;
    const target = byId('slide-' + num);
    if (!target) return;

    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
    target.classList.add('active');

    const dot = byId('dot-' + num);
    if (dot) dot.classList.add('active');

    target.scrollTop = 0;
    currentSlide = num;

    updateNavBar();

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
}

function initSlides() {
    buildDots();

    document.querySelectorAll('[data-goto]').forEach(el => {
        el.addEventListener('click', () => goToSlide(Number(el.dataset.goto)));
    });

    const backBtn = byId('nav-back');
    const nextBtn = byId('nav-next');
    if (backBtn) backBtn.addEventListener('click', () => stepSlide(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => stepSlide(+1));

    document.addEventListener('keydown', (e) => {
        const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
        if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
        if (e.key === 'ArrowLeft') { e.preventDefault(); stepSlide(-1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); stepSlide(+1); }
    });

    updateNavBar();
}
