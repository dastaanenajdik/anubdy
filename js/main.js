/* ============================================================
   main.js — sabhi files ko ek saath jodne wali file
   ============================================================ */

function safeInit(name, fn) {
    try {
        if (typeof fn === 'function') fn();
    } catch (e) {
        console.error('safeInit error for ' + name + ':', e);
        try {
            if (typeof showToast === 'function') {
                showToast('Chhoti si dikkat aayi 😅 Neeche Back/Next se aage badh jaiye 💗');
            }
        } catch (te) { /* ignore */ }
    }
}

// index.html me data-bind="name" wali jagahon par CONFIG.text ka text bharna
function applyTextBindings() {
    document.querySelectorAll('[data-bind]').forEach(el => {
        const key = el.getAttribute('data-bind');
        const value = CONFIG.text[key];
        if (value === undefined) return;
        if (el.hasAttribute('data-bind-html')) el.innerHTML = fillTemplate(value, CONFIG.text);
        else el.textContent = fillTemplate(value, CONFIG.text);
    });
}

window.addEventListener('error', (e) => {
    try {
        if (typeof showToast === 'function') {
            showToast('Chhoti si dikkat aayi 😅 Neeche Back/Next se aage badh jaiye 💗');
        }
    } catch (te) { /* ignore */ }
});

document.addEventListener('DOMContentLoaded', () => {
    applyTextBindings();
    safeInit('login', initLogin);
    safeInit('slides', initSlides);
    safeInit('decorations', initDecorations);
    safeInit('cake', initCake);
    safeInit('question', initQuestion);
    safeInit('letter', initLetter);
    safeInit('music', initMusic);
    safeInit('cats', initCats);
    safeInit('who', initWho);
    safeInit('gallery', initGallery);
    safeInit('notes', initNotes);
    safeInit('facts', initFacts);
    safeInit('wish', initWish);
});
