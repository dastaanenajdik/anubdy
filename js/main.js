/* ============================================================
   main.js — sabhi files ko ek saath jodne wali file
   ============================================================
   Is file me naye functions add karne ki zaroorat nahi padti.
   Bas yahin se decide hota hai ki kaunsi file kab chale.
   ============================================================ */

// index.html me data-bind="name" wali jagahon par CONFIG.text ka text bharna
function applyTextBindings() {
    document.querySelectorAll('[data-bind]').forEach(el => {
        const key = el.getAttribute('data-bind');
        const value = CONFIG.text[key];
        if (value === undefined) return;
        el.textContent = fillTemplate(value, CONFIG.text);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    applyTextBindings();   // naam/title/date wagairah
    initLogin();           // js/login.js
    initSlides();          // js/slides.js
    initDecorations();     // js/decorations.js
    initCake();            // js/cake.js
    initQuestion();        // js/question.js
    initLetter();          // js/letter.js
});
