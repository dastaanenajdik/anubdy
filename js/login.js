/* ============================================================
   login.js — Screen 1: PIN wala lock screen
   ============================================================
   PIN badalna ho to js/config.js me 'pin' badlo.
   Look/style badalna ho to css/login.css badlo.
   ============================================================ */

// "Unlock" dabane par PIN check hota hai
function unlockSurprise() {
    if (byId('pwd').value === CONFIG.pin) {
        byId('login-screen').style.display = 'none';
        byId('main-app').style.display = 'block';
        fitCake();                                  // cake ko screen ke hisaab se fit karo
        if (typeof unlockCats === 'function') unlockCats();   // ab billi dikhegi
    } else {
        byId('error-msg').style.display = 'block';
    }
}

function initLogin() {
    byId('unlock-btn').addEventListener('click', unlockSurprise);

    // Enter dabane par bhi unlock ho jaye
    byId('pwd').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.isComposing && e.keyCode !== 229) unlockSurprise();
    });
}
