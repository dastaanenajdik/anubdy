/* ============================================================
   utils.js — chhote helper functions jo baar baar use hote hain
   ============================================================ */

// min aur max ke beech ek random number (decimals ke saath)
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

// document.getElementById ka chhota shortcut
function byId(id) {
    return document.getElementById(id);
}

// {name} / {emoji} jaisi jagahon ko value se replace karta hai
//   fillTemplate('Hello {name}', { name: 'Anushree' }) => 'Hello Anushree'
function fillTemplate(text, values) {
    return String(text).replace(/\{(\w+)\}/g, (match, key) => {
        return values[key] !== undefined ? values[key] : match;
    });
}

// list me se ek random cheez
function pickRandom(list) {
    if (!list || !list.length) return '';
    return list[Math.floor(Math.random() * list.length)];
}

// kisi element ke center se confetti ka origin (0-1 ke beech) nikaalo
function originFromEl(el) {
    if (!el) return { x: 0.5, y: 0.6 };
    const box = el.getBoundingClientRect();
    return {
        x: (box.left + box.width / 2) / window.innerWidth,
        y: (box.top + box.height / 2) / window.innerHeight,
    };
}

// confetti ka ek chhota burst (canvas-confetti library se)
function burstConfetti(origin, extra) {
    if (typeof confetti !== 'function') return;
    const base = {
        particleCount: 55,
        spread: 75,
        startVelocity: 34,
        scalar: 0.9,
        origin: origin || { x: 0.5, y: 0.5 },
        colors: CONFIG.celebration.confettiColors,
    };
    confetti(Object.assign(base, extra || {}));
}
