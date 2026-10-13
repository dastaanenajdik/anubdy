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
//   fillTemplate('Hello {name}', { name: 'Tingu Mingu' }) => 'Hello Tingu Mingu'
function fillTemplate(text, values) {
    return String(text).replace(/\{(\w+)\}/g, (match, key) => {
        return values[key] !== undefined ? values[key] : match;
    });
}
