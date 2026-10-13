/* ============================================================
   toast.js — chhote popup messages (neeche se aake gayab ho jaate hain)
   ============================================================
   Kitne toast ek saath dikhein aur kitni der → js/config.js > toast
   Look/style → css/extras.css (.toast)
   Kisi bhi file me bas likho:  showToast('Hello 💗');
   ============================================================ */

// Ek toast dikhao (naya aaye to sabse purana hat jaata hai)
function showToast(text, ms) {
    const box = byId('toast-box');
    if (!box || !text) return;

    const limit = (CONFIG.toast && CONFIG.toast.max) || 2;
    while (box.children.length >= limit) box.removeChild(box.firstChild);

    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = text;
    box.appendChild(el);

    requestAnimationFrame(() => el.classList.add('in'));

    const life = ms || (CONFIG.toast && CONFIG.toast.ms) || 2600;
    setTimeout(() => {
        el.classList.remove('in');
        setTimeout(() => el.remove(), 400);
    }, life);
}

// list me se koi bhi ek line dikhao
function showRandomToast(lines, ms) {
    showToast(pickRandom(lines), ms);
}
