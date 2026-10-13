/* ============================================================
   decorations.js — Slide 2 ki sajawat: fairy lights, bokeh, balloons
   ============================================================
   Kitne bulbs/bokeh hain aur balloons kahan-kahan hain —
   sab js/config.js ke 'decorations' section me badlo.
   Style (shape, glow, animation) css/slide-2.css me hai.
   ============================================================ */

// Upar wali fairy lights: wire ki curve + chamakte bulbs
function buildFairyLights() {
    const wrap = byId('fairy-lights');
    const curve = t => 8 + 28 * Math.abs(Math.sin(Math.PI * 2 * t));

    // wire (SVG polyline) ki shape
    const pts = [];
    for (let i = 0; i <= 100; i++) {
        const t = i / 100;
        pts.push((t * 1000).toFixed(1) + ',' + curve(t).toFixed(1));
    }
    byId('light-wire').setAttribute('points', pts.join(' '));

    // bulbs
    const colors = CONFIG.decorations.bulbColors;
    const n = CONFIG.decorations.bulbCount;
    for (let i = 0; i < n; i++) {
        const t = (i + 0.5) / n;
        const [c, g] = colors[i % colors.length];
        const b = document.createElement('span');
        b.className = 'bulb';
        b.style.left = (t * 100) + '%';
        b.style.top = (curve(t) + 3) + 'px';
        b.style.setProperty('--c', c);
        b.style.setProperty('--g', g);
        b.style.setProperty('--d', rand(1.8, 3.2).toFixed(2) + 's');
        b.style.setProperty('--delay', rand(0, 2).toFixed(2) + 's');
        wrap.appendChild(b);
    }
}

// Hawa me dheere-dheere ghoomte hue soft gol lights
function buildBokeh() {
    const layer = byId('bokeh-layer');
    const tones = CONFIG.decorations.bokehTones;
    const count = CONFIG.decorations.bokehCount;

    for (let i = 0; i < count; i++) {
        const s = rand(14, 70);
        const b = document.createElement('span');
        b.className = 'bokeh';
        b.style.width = b.style.height = s + 'px';
        b.style.left = rand(-5, 98) + '%';
        b.style.top = rand(8, 92) + '%';
        b.style.background = 'radial-gradient(circle, ' + tones[i % tones.length] + ' 0%, rgba(255,255,255,0) 70%)';
        b.style.setProperty('--o', rand(0.35, 0.75).toFixed(2));
        b.style.animationDuration = rand(7, 14).toFixed(1) + 's';
        b.style.animationDelay = (-rand(0, 14)).toFixed(1) + 's';
        layer.appendChild(b);
    }
}

// Room ke kone me tairte balloons (config me list hai)
function buildBalloons() {
    const layer = byId('balloon-layer');

    CONFIG.decorations.balloons.forEach((b) => {
        const el = document.createElement('div');
        el.className = 'balloon';
        el.setAttribute('aria-hidden', 'true');
        el.style.setProperty('--c1', b.c1);
        el.style.setProperty('--c2', b.c2);
        if (b.left !== undefined) el.style.left = b.left;
        if (b.right !== undefined) el.style.right = b.right;
        el.style.top = b.top;
        if (b.width) el.style.width = b.width;
        if (b.height) el.style.height = b.height;
        if (b.d) el.style.setProperty('--d', b.d);
        layer.appendChild(el);
    });
}

function initDecorations() {
    buildFairyLights();
    buildBokeh();
    buildBalloons();
}
