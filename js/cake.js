/* ============================================================
   cake.js — Slide 2: cake banane se lekar candles bujhane tak
   ============================================================
   Is file me hai:
     • cake ke layers/drips/rosettes banana  (buildTier)
     • candles banana                        (buildCandles)
     • screen ke hisaab se cake ka size      (fitCake)
     • candles bujhana                       (blowCandles)
         – mic (voice) se foonk maarke, YA
         – candle/cake pe tap (click) karke  ← dono me timer turant shuru
     • slide 2 par kahin AUR click = mic khulta hai, "Blow now…" dikhta hai,
       aur mic kisi wajah se na khule to agla page-click dobara try karta hai
     • confetti + wish wala countdown        (startCelebration)

   ⚠️ Foonk se bujhta hai, aur candle pe tap karne se bhi bujh jaata hai.
      Tap wala rasta band karna ho to js/config.js > cake.tapToBlow: false.
   Numbers badalne hon (candles ki position, countdown seconds,
   confetti colors) to js/config.js ka 'cake' aur 'celebration'
   section badlo. Look badalna ho to css/cake.css.
   ============================================================ */

let cakeStage = null;      // #cake-stage
let cakeScene = null;      // #cake-scene  (scale yahin hota hai)
let isBlown = false;       // candles ek baar bujh gayin to dobara nahi
let wishReady = false;     // countdown pura hua? (tab hi aage jaane do)
let micStream = null, micRaf = null;
let micAudioCtx = null;    // mic wala AudioContext (stopMic band karta hai)
let micOpening = false;    // mic khul raha hai? (tez-tez clicks par do permission prompt na aayein)

// ---------- Cake ke layers (drips, phool, berries) ----------
function buildTier(tier, { width, ry, rosettes, berries }) {
    const drips = tier.querySelector('.drips');
    const count = Math.round(width / 13);
    const dw = width / count;

    // upar se girte hue cream ke drips
    for (let i = 0; i < count; i++) {
        const center = i * dw + dw / 2 - width / 2;
        const curve = ry * Math.sqrt(Math.max(0, 1 - Math.pow(center / (width / 2), 2)));
        const long = Math.random() < 0.3;
        const d = document.createElement('span');
        d.className = 'drip';
        d.style.left = (i * dw - 1.5) + 'px';
        d.style.width = (dw + 3) + 'px';
        d.style.height = (curve + (long ? rand(26, 42) : rand(8, 20))) + 'px';
        drips.appendChild(d);
    }

    // rosettes (phool) aur berries (laal goliyan)
    const deco = tier.querySelector('.deco-layer');
    const half = width / 2;
    for (let i = 0; i < rosettes; i++) {
        const dx = -half * 0.88 + (i * (half * 1.76)) / (rosettes - 1);
        const y = ry * Math.sqrt(1 - Math.pow(dx / half, 2));
        const r = document.createElement('span');
        r.className = 'rosette';
        r.style.left = (half + dx - 10) + 'px';
        r.style.top = (y - 10) + 'px';
        deco.appendChild(r);

        if (berries && i < rosettes - 1) {
            const bx = dx + (half * 1.76) / (rosettes - 1) / 2;
            const by = ry * Math.sqrt(1 - Math.pow(bx / half, 2));
            const b = document.createElement('span');
            b.className = 'berry';
            b.style.left = (half + bx - 7) + 'px';
            b.style.top = (by - 12) + 'px';
            deco.appendChild(b);
        }
    }
}

// ---------- Candles ----------
function buildCandles() {
    const candlesEl = byId('candles');
    CONFIG.cake.candles.forEach((c) => {
        const el = document.createElement('div');
        el.className = 'candle ' + c.style;
        el.style.left = (CONFIG.cake.sceneWidth / 2 + c.dx) + 'px';   // center = 160
        el.style.bottom = c.bottom + 'px';
        el.innerHTML = '<span class="glow"></span><span class="wick"></span>' +
            '<span class="flame" style="--fd:' + rand(0.7, 1.1).toFixed(2) + 's"></span>';
        candlesEl.appendChild(el);
    });
}

// ---------- Screen ke hisaab se cake ka size ----------
function fitCake() {
    if (!cakeStage || !cakeScene) return;
    const { sceneWidth: W, sceneHeight: H, minScale, maxScale } = CONFIG.cake;
    const s = Math.max(Math.min(minScale, 0.52), Math.min(
        maxScale,
        (window.innerHeight - 330) / H,
        (window.innerWidth * 0.92) / W
    ));
    cakeStage.style.width = (W * s) + 'px';
    cakeStage.style.height = (H * s) + 'px';
    cakeScene.style.transform = 'scale(' + s + ')';
}

// ---------- Mic button ko hilaa/chamka kar ishara karna ----------
// Jab aage jaane ki koshish ho (Next locked) to mic button gayab NAHI hota —
// bas thoda hilta (nudge) aur chamakta hai, ki "pehle foonk maaro" 🎤
// (candles bujh jaane ke baad hi button jaata hai, wo blowCandles me hota hai)
function nudgeMicButton() {
    const micBtn = byId('mic-btn');
    if (!micBtn || isBlown) return;
    micBtn.classList.remove('hide');           // galti se chhupa ho to wapas lao
    micBtn.classList.remove('nudge', 'sparkle');
    void micBtn.offsetWidth;                   // animation dobara chalane ke liye
    micBtn.classList.add('nudge', 'sparkle');
}

// ---------- "Blow now…" wala bada ishara dikhana / chhupana ----------
function setBlowNow(show) {
    const el = byId('blow-now');
    if (el) el.classList.toggle('show', !!show);
}

// ---------- Mic kisi wajah se na khule to wapas "phir se try" wali haalat ----------
// State yahan poori saaf ho jaati hai, isliye page par AGla click mic ko
// bilkul naye sire se kholne ki koshish karta hai (retry) ✨
function handleMicFailure() {
    stopMic();
    const micBtn = byId('mic-btn');
    const micLabel = byId('mic-label');
    if (micBtn) micBtn.classList.remove('hide', 'listening');
    if (micLabel) micLabel.textContent = CONFIG.text.micRetryLabel || CONFIG.text.micLabel;
    showToast(CONFIG.text.micUnavailable, 3400);
    showMicFallback();
}

// ---------- Mic band karna (saari safaai ek hi jagah) ----------
function stopMic() {
    micOpening = false;
    if (micRaf) cancelAnimationFrame(micRaf);
    micRaf = null;
    if (micStream) micStream.getTracks().forEach(t => t.stop());
    micStream = null;
    if (micAudioCtx) {
        const closing = micAudioCtx.close();
        if (closing && closing.catch) closing.catch(() => { /* pehle se band hai to koi baat nahi */ });
        micAudioCtx = null;
    }
    setBlowNow(false);
    const micBtn = byId('mic-btn');
    if (micBtn) micBtn.classList.remove('listening');
}

// ---------- Mic se blow karna ----------
// Slide 2 par kahin BHI click (jo cake/candle par nahi hai) ya mic button par
// click hone par yahi chalta hai:
//   • mic pehle se khula hai  → bas "Blow now…" dikhta rahe, kuch aur nahi
//   • mic khul raha hai       → doosra permission prompt nahi khulta
//   • mic band / fail ho gaya → bilkul nayi koshish (isliye phir se page
//                               click karne par mic dobara khul jaata hai)
function startMicListening() {
    const micBtn = byId('mic-btn');
    const micLabel = byId('mic-label');
    if (isBlown) return;                       // candles bujh chuki hain to kuch nahi

    if (micStream) {                           // mic khula hua hai — foonk ka ishara bana rahe
        setBlowNow(true);
        return;
    }
    if (micOpening) return;                    // khul hi raha hai, duplicate prompt roko

    // browser me mic ka support hi nahi hai to message + chhota rasta dikha do
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        handleMicFailure();
        return;
    }

    micOpening = true;
    if (micBtn) micBtn.classList.remove('hide', 'listening');
    if (micLabel) micLabel.textContent = CONFIG.text.micOpening || CONFIG.text.micLabel;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        micOpening = false;
        if (isBlown) {                         // intezaar me hi kaam ho gaya ho to mic band rakho
            stream.getTracks().forEach(t => t.stop());
            return;
        }

        micStream = stream;
        try {
            micAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (micAudioCtx.state === 'suspended') {
                const resuming = micAudioCtx.resume();
                if (resuming && resuming.catch) resuming.catch(() => { /* browser khud sambhal lega */ });
            }
        } catch (e) {
            handleMicFailure();
            return;
        }
        const analyser = micAudioCtx.createAnalyser();
        analyser.fftSize = 512;
        micAudioCtx.createMediaStreamSource(stream).connect(analyser);
        const data = new Uint8Array(analyser.fftSize);
        let loudFrames = 0;

        // mic beech me band ho jaaye (device hata, permission gayi) to
        // state saaf kar do, taaki agla page-click dobara mic khol sake
        stream.getTracks().forEach(t => t.addEventListener('ended', () => {
            if (!isBlown) handleMicFailure();
        }));

        hideMicFallback();                     // mic chal gaya, purana fallback hata do
        if (micBtn) micBtn.classList.add('listening');
        if (micLabel) micLabel.textContent = CONFIG.text.micListening;
        setBlowNow(true);                      // 🎉 ab saaf dikhega: "Blow now… 💨"

        const listen = () => {
            if (!micStream) return;            // mic band ho gaya to sunna bhi band
            analyser.getByteTimeDomainData(data);
            let sum = 0;
            for (let i = 0; i < data.length; i++) { const v = (data[i] - 128) / 128; sum += v * v; }
            const rms = Math.sqrt(sum / data.length);
            loudFrames = rms > CONFIG.celebration.micSensitivity ? loudFrames + 1 : 0;

            if (loudFrames > CONFIG.celebration.micLoudFrames) {
                blowCandles();                 // andar hi stopMic() chal jaata hai
                return;
            }
            micRaf = requestAnimationFrame(listen);
        };
        listen();
    }).catch(() => {
        // mic allow na ho / error aaye — sab saaf karke rakho, taaki page par
        // phir se click karne par mic dobara khulne ki koshish ho sake
        handleMicFailure();
    });
}

// ---------- Mic na chale to ek chhota rasta (warna page par ruk jayenge) ----------
function showMicFallback() {
    const btn = byId('mic-fallback');
    if (btn) { btn.hidden = false; btn.classList.remove('hide'); }
}

function hideMicFallback() {
    const btn = byId('mic-fallback');
    if (btn) btn.hidden = true;
}

// ---------- Tap se blow karna (candle/cake pe click) ----------
// Tap wala rasta band karna ho to js/config.js > cake.tapToBlow: false
function tapToBlowOn() {
    return !CONFIG.cake || CONFIG.cake.tapToBlow !== false;
}

// Tap hui jagah par chhota sa 💨 poof — taaki saaf pata chale ki tap se bujhi hai
function puffAt(x, y) {
    const puff = document.createElement('span');
    puff.className = 'tap-puff';
    puff.textContent = '💨';
    puff.style.left = x + 'px';
    puff.style.top = y + 'px';
    document.body.appendChild(puff);
    setTimeout(() => puff.remove(), 900);
}

function onCandleTap(e) {
    if (isBlown) return;
    puffAt(e.clientX, e.clientY);
    blowCandles('tap');                        // andar hi confetti + timer chalu ho jaata hai
}

// ---------- Candles bujhana (mic ki foonk YA candle pe tap — dono se) ----------
// Dono raste yahi function bulate hain, isliye smoke + confetti + wish ka timer
// (startCelebration) bilkul ek jaisa chalta hai.
//   source: 'voice' (mic) ya 'tap' (candle/cake pe click)
function blowCandles(source) {
    if (isBlown) return;
    isBlown = true;
    stopMic();

    if (cakeStage) {
        cakeStage.classList.add('blown');      // ab candles pe tap karne ka ishara band
        cakeStage.dataset.blownBy = (source === 'tap' ? 'tap' : 'voice');
        cakeStage.setAttribute('aria-label', 'Candles blown out');
    }
    byId('hint-text').classList.add('hide');
    byId('mic-btn').classList.add('hide');

    const fallback = byId('mic-fallback');
    if (fallback) fallback.classList.add('hide');

    // har candle thode gap se bujhe, saath me smoke uthe
    document.querySelectorAll('.candle').forEach((candle, i) => {
        setTimeout(() => {
            candle.classList.add('out');
            for (let k = 0; k < CONFIG.cake.smokePuffs; k++) {
                const puff = document.createElement('span');
                puff.className = 'smoke';
                puff.style.setProperty('--sx', rand(-10, 10).toFixed(1) + 'px');
                puff.style.animationDelay = (0.25 + k * 0.35) + 's';
                candle.appendChild(puff);
                setTimeout(() => puff.remove(), 4000);
            }
        }, i * CONFIG.celebration.blowStaggerMs);
    });

    setTimeout(startCelebration, CONFIG.celebration.celebrationDelayMs);
}

// ---------- Confetti + wish countdown ----------
function startCelebration() {
    const colors = CONFIG.celebration.confettiColors;

    // ek bada burst
    confetti({ particleCount: 140, spread: 100, startVelocity: 42, origin: { y: 0.55 }, colors, scalar: 1.05, zIndex: 100 });

    // dono taraf se chhoti chhoti confetti
    const end = Date.now() + CONFIG.celebration.sideConfettiMs;
    (function frame() {
        confetti({ particleCount: 3, angle: 60, spread: 60, origin: { x: 0, y: 0.75 }, colors, zIndex: 100 });
        confetti({ particleCount: 3, angle: 120, spread: 60, origin: { x: 1, y: 0.75 }, colors, zIndex: 100 });
        if (Date.now() < end) requestAnimationFrame(frame);
    })();

    // cake ke upar chamakte sitare
    const sparkles = byId('sparkles');
    for (let i = 0; i < CONFIG.celebration.sparkleCount; i++) {
        const sp = document.createElement('span');
        sp.className = 'sparkle';
        sp.style.left = rand(20, 290) + 'px';
        sp.style.top = rand(10, 260) + 'px';
        sp.style.animationDelay = rand(0, 1.8).toFixed(2) + 's';
        sp.style.animationDuration = rand(1.4, 2.4).toFixed(2) + 's';
        sparkles.appendChild(sp);
    }

    // "Happy Birthday" wali intro line chhupao, wish panel lao
    byId('intro').classList.add('hide');
    byId('wish-panel').classList.add('show');

    // ---- 10 second ka wish countdown ring (seconds: js/config.js → celebration.wishSeconds) ----
    const total = CONFIG.celebration.wishSeconds;
    const ring = byId('ring-progress');
    const timerEl = byId('timer-display');
    const circumference = 2 * Math.PI * Number(ring.getAttribute('r'));
    ring.style.strokeDasharray = circumference;
    let timeLeft = total;

    // shuruaat hamesha config se — HTML me likha number purana reh jaye to bhi chalega
    timerEl.textContent = timeLeft;
    ring.style.strokeDashoffset = 0;

    const countdown = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        ring.style.strokeDashoffset = circumference * (1 - timeLeft / total);

        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerEl.textContent = '♡';
            byId('wish-title').textContent = CONFIG.text.wishDoneTitle;
            byId('wish-sub').textContent = CONFIG.text.wishDoneSub;
            wishReady = true;                       // ab Next/Continue enable ho gaya
            if (typeof updateNavBar === 'function') updateNavBar();   // Next unlock
            confetti({ particleCount: 90, spread: 120, startVelocity: 30, origin: { y: 0.3 }, colors, zIndex: 100 });
            showToast(CONFIG.text.wishDone, 3000);
        }
    }, 1000);
}

// ---------- Sab kuch jodna ----------
function initCake() {
    cakeStage = byId('cake-stage');
    cakeScene = byId('cake-scene');

    // cake ke dono layers banao
    buildTier(byId(CONFIG.cake.tiers.bottom.id), CONFIG.cake.tiers.bottom);
    buildTier(byId(CONFIG.cake.tiers.top.id), CONFIG.cake.tiers.top);
    buildCandles();

    // Slide 2 par click/tap ka do tarah ka kaam hai:
    //   1) cake/candle par tap  → wahi candle turant bujh jaati hai (aur wish ka
    //      timer wahin se shuru — bilkul foonk jaisa hi) 💨
    //   2) baaki kahin bhi tap  → mic khul jaata hai, "Blow now…" dikhta hai
    //      (mic na khule to page par phir se click = dobara try;
    //       fail hone par handleMicFailure state saaf kar deta hai)
    // Sirf fallback button isse bahar hai — uska apna kaam hai (bina mic bujhana).
    const slide2 = byId('slide-2');
    if (slide2) {
        slide2.addEventListener('click', (e) => {
            if (isBlown) return;
            if (e.target.closest('#mic-fallback')) return;

            // Candle (ya cake ke kisi bhi hisse) par tap = seedha foonk 🕯️💨
            if (tapToBlowOn() && e.target.closest('#cake-stage')) {
                onCandleTap(e);
                return;
            }
            startMicListening();
        });
    }

    // Candle/cake ko keyboard se bhi bujha sakein (Enter / Space) — keyboard wale
    // logon ke liye cake-stack ek button ki tarah kaam karta hai
    if (tapToBlowOn() && cakeStage) {
        cakeStage.setAttribute('role', 'button');
        cakeStage.setAttribute('tabindex', '0');
        cakeStage.setAttribute('aria-label', CONFIG.text.tapAria || 'Cake — tap or press Enter to blow the candles');
        cakeStage.setAttribute('title', CONFIG.text.tapTitle || '');
        cakeStage.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
            if (isBlown) return;
            e.preventDefault();
            const box = cakeStage.getBoundingClientRect();
            puffAt(box.left + box.width / 2, box.top + box.height * 0.3);
            blowCandles('tap');
        });
    }

    // Mic button bhi wahi kaam karta hai — slide wala handler bhi iske click par
    // chalega, par micOpening/micStream wale check duplicate prompt rok dete hain
    byId('mic-btn').addEventListener('click', startMicListening);

    const fallbackBtn = byId('mic-fallback');
    if (fallbackBtn) fallbackBtn.addEventListener('click', blowCandles);

    // screen ghume to cake ka size dobara theek karo
    window.addEventListener('resize', fitCake);
    fitCake();
}
