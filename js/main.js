/* ============================================================
   main.js — sabhi files ko ek saath jodne wali file
   ============================================================
   Is file me naye functions add karne ki zaroorat nahi padti.
   Bas yahin se decide hota hai ki kaunsi file kab chale.
   ============================================================ */

// index.html me data-bind="name" wali jagahon par CONFIG.text ka text bharna
// (data-bind-html laga ho to <br> jaisa HTML bhi chal jaata hai)
function applyTextBindings() {
    document.querySelectorAll('[data-bind]').forEach(el => {
        const key = el.getAttribute('data-bind');
        const value = CONFIG.text[key];
        if (value === undefined) return;
        if (el.hasAttribute('data-bind-html')) el.innerHTML = fillTemplate(value, CONFIG.text);
        else el.textContent = fillTemplate(value, CONFIG.text);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    applyTextBindings();   // naam/title/date wagairah
    initLogin();           // js/login.js
    initSlides();          // js/slides.js  (dots bhi yahin bante hain)
    initDecorations();     // js/decorations.js
    initCake();            // js/cake.js
    initQuestion();        // js/question.js
    initLetter();          // js/letter.js
    initCats();            // js/cats.js   (floating billi)
    initWho();             // js/who.js    (slide 5)
    initGallery();         // js/gallery.js (slide 6)
    initNotes();           // js/notes.js  (slide 7 + 8)
    initFacts();           // js/facts.js  (slide 9)
    initWish();            // js/wish.js   (slide 10)
});
