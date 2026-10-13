/* ============================================================
   question.js — Slide 3: "Are you ready to celebrate?"
   ============================================================
   Yahan woh "No" button hai jo cursor/aankh se bhaagta hai 🙂
   Emojis aur funny lines js/config.js ke 'noButton' section me hain.
   Button ka look css/slide-3.css me hai.
   ============================================================ */

let noBtn = null;
let noEmojiEl = null;
let funnyMsgEl = null;
let noClickCount = 0;

// No button kitni door tak bhaag sakta hai (screen ke hisaab se)
function getNoRange() {
    const groupBox = byId('btn-group').getBoundingClientRect();
    const btnBox = noBtn.getBoundingClientRect();
    const pad = 6;
    const maxX = Math.max(0, (groupBox.width - btnBox.width) / 2 - pad);
    const maxY = Math.min(120, Math.max(30, window.innerHeight * 0.13));
    return { maxX, maxY };
}

// Button ko kisi bhi random jagah le jao
function moveNoBtn(speedMs) {
    const { maxX, maxY } = getNoRange();
    const x = (Math.random() * 2 - 1) * maxX;
    const y = (Math.random() * 2 - 1) * maxY;
    noBtn.style.transition = 'transform ' + speedMs + 'ms cubic-bezier(0.22, 1, 0.36, 1)';
    noBtn.style.transform = 'translate(' + x.toFixed(1) + 'px, ' + y.toFixed(1) + 'px)';
}

// Jab koi No dabane ki koshish kare: bhaago + emoji badlo + nayi line dikhao
function dodgeNoBtn() {
    moveNoBtn(CONFIG.noButton.dodgeMs);
    noBtn.style.background = 'rgba(255, 255, 255, 0.6)';

    // emoji ghumaate raho
    const emojis = CONFIG.noButton.emojis;
    const emoji = emojis[noClickCount % emojis.length];
    noEmojiEl.textContent = emoji;

    // lines ek-ek karke, aakhiri line wahin tiki rahe
    const messages = CONFIG.noButton.messages;
    const msgIndex = Math.min(noClickCount + 1, messages.length - 1);
    funnyMsgEl.textContent = fillTemplate(messages[msgIndex], { emoji, name: CONFIG.text.name });

    noClickCount++;

    // thodi der baad background wapas normal
    clearTimeout(dodgeNoBtn._t);
    dodgeNoBtn._t = setTimeout(() => { noBtn.style.background = 'rgba(255, 255, 255, 0.42)'; }, 180);
}

// Mouse wale users ke liye: cursor pahunchne se pehle hi slip ho jaye
function hoverNoBtn() {
    moveNoBtn(CONFIG.noButton.hoverMs);
}

// Har baar slide 3 par aane par bilkul fresh shuruaat
function resetNoBtn() {
    noClickCount = 0;
    noBtn.style.transition = 'transform ' + CONFIG.noButton.dodgeMs + 'ms cubic-bezier(0.22, 1, 0.36, 1)';
    noBtn.style.transform = 'translate(0, 0)';
    noBtn.style.background = 'rgba(255, 255, 255, 0.42)';
    noEmojiEl.textContent = CONFIG.noButton.emojis[0];
    funnyMsgEl.textContent = '';
}

function initQuestion() {
    noBtn = byId('no-btn');
    noEmojiEl = byId('no-emoji');
    funnyMsgEl = byId('funny-msg');

    noBtn.addEventListener('click', dodgeNoBtn);
    // kuch purane browsers/webviews me matchMedia nahi hota → guard laga do
    const canHover = typeof window.matchMedia === 'function'
        ? window.matchMedia('(hover: hover)').matches
        : false;
    if (canHover) {
        noBtn.addEventListener('mouseenter', hoverNoBtn);
    }
    // screen ghume to button wapas center me
    window.addEventListener('resize', () => {
        noBtn.style.transition = 'none';
        noBtn.style.transform = 'translate(0, 0)';
    });
}
