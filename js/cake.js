/* ============================================================
   cake.js — Slide 2: cake banane se lekar candles bujhane tak
   ============================================================
   Is file me hai:
     • cake ke layers/drips/rosettes banana  (buildTier)
     • candles banana                        (buildCandles)
     • screen ke hisaab se cake ka size      (fitCake)
     • SIRF mic (voice) se candles bujhana   (blowCandles)
     • cake pe tap karne par "mic pe tap karke foonk maaro" wala message
     • confetti + wish wala countdown        (startCelebration)

   ⚠️ Tap / swipe se candles NAHI bujhte — bas voice se.
   Numbers badalne hon (candles ki position, countdown seconds,
   confetti colors) to js/config.js ka 'cake' aur 'celebration'
   section badlo. Look badalna ho to css/cake.css.
   ============================================================ */

let cakeStage = null;      // #cake-stage
let cakeScene = null;      // #cake-scene  (scale yahin hota hai)
let isBlown = false;       // candles ek baar bujh gayin to dobara nahi
let wishReady = false;     // countdown pura hua? (tab hi aage jaane do)
let micStream = null, micRaf = null;
let micHintIndex = 0;      // "mic pe tap karo" messages ke liye counter

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
    const s = Math.max(minScale, Math.min(
        maxScale,
        (window.innerHeight - 190) / H,
        (window.innerWidth * 0.92) / W
    ));
    cakeStage.style.width = (W * s) + 'px';
    cakeStage.style.height = (H * s) + 'px';
    cakeScene.style.transform = 'scale(' + s + ')';
}

// ---------- Cake pe tap karne par chhota sa message ----------
// (candles tap/swipe se nahi bujhte — pookiee ko mic pe tap karke foonk maarna hai 🎤)
function micOnlyHint() {
    const lines = CONFIG.text.micOnly || ['Tap the mic and blow into it 🎤'];
    const line = lines[micHintIndex % lines.length];
    micHintIndex++;
    showToast(line, 3000);

    const micBtn = byId('mic-btn');
    if (micBtn) {
        micBtn.classList.remove('sparkle');
        void micBtn.offsetWidth;
        micBtn.classList.add('sparkle');
    }
}

// ---------- Mic se blow karna ----------
function stopMic() {
    if (micRaf) cancelAnimationFrame(micRaf);
    if (micStream) micStream.getTracks().forEach(t => t.stop());
    micStream = null;
}

function startMicListening() {
    const micBtn = byId('mic-btn');
    const micLabel = byId('mic-label');
    if (micStream || isBlown) return;         // candles bujh chuki hain to kuch nahi

    // browser me mic ka support nahi hai to seedha message dikha do
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        micLabel.textContent = CONFIG.text.micUnavailable;
        showToast(CONFIG.text.micUnavailable, 3200);
        showMicFallback();
        return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        micStream = stream;
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        ctx.createMediaStreamSource(stream).connect(analyser);
        const data = new Uint8Array(analyser.fftSize);
        let loudFrames = 0;

        micBtn.classList.add('listening');
        micLabel.textContent = CONFIG.text.micListening;

        const listen = () => {
            analyser.getByteTimeDomainData(data);
            let sum = 0;
            for (let i = 0; i < data.length; i++) { const v = (data[i] - 128) / 128; sum += v * v; }
            const rms = Math.sqrt(sum / data.length);
            loudFrames = rms > CONFIG.celebration.micSensitivity ? loudFrames + 1 : 0;

            if (loudFrames > CONFIG.celebration.micLoudFrames) {
                blowCandles(); stopMic(); ctx.close(); return;
            }
            micRaf = requestAnimationFrame(listen);
        };
        listen();
    }).catch(() => {
        micLabel.textContent = CONFIG.text.micUnavailable;
        showToast(CONFIG.text.micUnavailable, 3400);
        showMicFallback();
    });
}

// ---------- Mic na chale to ek chhota rasta (warna page par ruk jayenge) ----------
function showMicFallback() {
    const btn = byId('mic-fallback');
    if (btn) btn.hidden = false;
}

// ---------- Candles bujhana (sirf mic se) ----------
function blowCandles() {
    if (isBlown) return;
    isBlown = true;
    stopMic();

    if (cakeStage) cakeStage.setAttribute('aria-label', 'Candles blown out');
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

    // ---- 15 second ka wish countdown ring ----
    const total = CONFIG.celebration.wishSeconds;
    const ring = byId('ring-progress');
    const timerEl = byId('timer-display');
    const circumference = 2 * Math.PI * Number(ring.getAttribute('r'));
    ring.style.strokeDasharray = circumference;
    let timeLeft = total;

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

    // cake pe tap = "mic pe tap karke foonk maaro" wala message
    // (candles sirf voice se bujhengi ✨)
    cakeStage.addEventListener('click', () => { if (!isBlown) micOnlyHint(); });

    // mic wala button
    byId('mic-btn').addEventListener('click', startMicListening);

    // screen ghume to cake ka size dobara theek karo
    window.addEventListener('resize', fitCake);
    fitCake();
}
