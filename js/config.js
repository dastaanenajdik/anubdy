/* ============================================================
   config.js — POORE PROJECT KA CONTROL ROOM ⚙️
   ============================================================
   PIN, naam, text, timing, colors, emojis — sab kuch yahin hai.
   Zyadaatar badlav ke liye sirf ISI FILE ko badlo,
   baaki code files ko chhoone ki zaroorat nahi hogi.
   ============================================================ */

const CONFIG = {

    // ---------- 1. LOGIN SCREEN (screen 1) ----------
    pin: '1411',                    // 🔑 secret PIN yahin change karo

    // ---------- 2. TEXT ----------
    // Ye text index.html me un jagahon par khud lag jata hai
    // jahan data-bind attribute laga hai.
    // {name} ki jagah automatically neeche wala 'name' aa jata hai.
    text: {
        date: '14 • 11',
        title: 'Happy Birthday',
        name: 'Tingu Mingu',            // sirf naam (baaki jagahon me bhi use hota hai)
        heroName: 'Tingu Mingu 🌸🥺',   // slide 1 wala naam (emoji ke saath)
        eyebrow: '14 • 11 • JUST FOR YOU',
        introSub: "{name}, it's your special day",
        plaque: '{name}',               // cake par likha hua naam
        questionSub: 'Pick your answer, {name} 🎀',
        wishTitle: 'Make a Wish',
        wishSub: 'Close your eyes and make it count',
        wishDoneTitle: 'Wish Granted',
        wishDoneSub: 'May every dream of yours come true',
        hintLabel: 'Tap the candles or swipe across to blow',
        micLabel: 'Or blow into your mic',
        micListening: 'Listening... blow now!',
        micUnavailable: 'Mic unavailable, just tap the candles',
    },

    // ---------- 3. CAKE (slide 2) ----------
    cake: {
        sceneWidth: 320,      // cake ki drawing ka size (CSS: css/cake.css)
        sceneHeight: 400,
        minScale: 0.6,        // chhoti screen par kitna chhota ho sakta hai
        maxScale: 1.3,        // badi screen par kitna bada ho sakta hai
        tiers: {
            // width/ry = tier ka size, rosettes = phool, berries = chhoti laal goliyan
            bottom: { id: 'tier-bottom', width: 260, ry: 24, rosettes: 9, berries: true },
            top: { id: 'tier-top', width: 180, ry: 18, rosettes: 7, berries: false },
        },
        candles: [
            // dx = center se left/right, bottom = neeche se height, style = color class
            { dx: 0, bottom: 290, style: 'lavender' },
            { dx: -42, bottom: 282, style: '' },
            { dx: 42, bottom: 282, style: 'peach' },
        ],
        smokePuffs: 3,        // har candle bujhne par kitne smoke puff uthein
    },

    // ---------- 4. DECORATIONS (slide 2 ki sajawat) ----------
    decorations: {
        bokehCount: 18,       // hawa me ghoomte soft gol circles
        bulbCount: 16,        // upar wali fairy lights ke bulbs
        bulbColors: [         // [bulb ka color, uska glow]
            ['#fff1c9', 'rgba(255, 214, 140, 0.55)'],
            ['#ffd6e0', 'rgba(255, 170, 195, 0.55)'],
            ['#e7dcff', 'rgba(200, 175, 255, 0.5)'],
            ['#d9f3ea', 'rgba(160, 220, 200, 0.5)'],
        ],
        bokehTones: [         // bokeh circles ke colors
            'rgba(255, 196, 210, 0.9)',
            'rgba(255, 226, 180, 0.9)',
            'rgba(214, 196, 255, 0.85)',
            'rgba(255, 255, 255, 0.95)',
        ],
        balloons: [           // Colors/position yahin se badlo 🎈
            { c1: '#ffd1dc', c2: '#f5a3b8', left: '-14px', top: '18%', d: '6.5s' },
            { c1: '#e4d8ff', c2: '#bda8ef', left: '30px', top: '30%', d: '7.5s', width: '46px', height: '56px' },
            { c1: '#ffe9c7', c2: '#f6c98e', right: '-12px', top: '16%', d: '7s' },
            { c1: '#d6f1e8', c2: '#a7dcc9', right: '34px', top: '29%', d: '6s', width: '46px', height: '56px' },
        ],
    },

    // ---------- 5. CELEBRATION (jab candles bujhein) ----------
    celebration: {
        wishSeconds: 15,          // wish karne ka countdown (seconds)
        sparkleCount: 12,         // cake ke upar chamakte sitare
        blowStaggerMs: 140,       // candles ek-ek karke bujhne ka gap
        celebrationDelayMs: 650,  // bujhne ke baad confetti kab shuru ho
        sideConfettiMs: 6000,     // side se confetti kitni der tak chalti rahe
        confettiColors: ['#f9a8c0', '#fcd5b5', '#c8b6ff', '#b8e0d2', '#fff1a8', '#ffffff', '#f6c1d0'],
        swipeDistance: 30,        // swipe karne par candles bujhne ki doori (px)
        micSensitivity: 0.12,     // mic kitni aawaz pe react kare (0.1 - 0.3)
        micLoudFrames: 5,         // kitne frames tak tez aawaz chahiye
    },

    // ---------- 6. "NO" BUTTON JO BHAAGTA HAI (slide 3) ----------
    noButton: {
        emojis: ['🙈', '🥺', '😢', '😭', '😠', '😤', '😩', '🫠', '🥴', '🙃', '😵‍💫', '😴'],
        // {emoji} ki jagah upar wala emoji aa jata hai. Jitne chahe lines add karo.
        messages: [
            "Arre nahi nahi... Yes dabao na {emoji}",
            "Tum samajhti kyu nahi? Yes karo {emoji}",
            "Yes kro {emoji}",
            "Nice try... but u can't skip this one {emoji}",
            "No button bhi bhaag raha hai tumse {emoji}",
            "Pakad mein nahi aa raha na? Yes hi karo {emoji}",
            "Ab to No ne surrender kar diya hai {emoji}",
            "Bas karo, ab gussa ho gaya hai No wala {emoji}",
            "Chhodo usse, abhi so jayega {emoji}",
            "Last baar bol rahi hoon... YES dabao {emoji}",
            "Theek hai theek hai... dogi ho ho ho 🥰💖"
        ],
        dodgeMs: 420,             // click karne par bhaagne ki speed
        hoverMs: 350,             // mouse lane par bhaagne ki speed
    },

    // ---------- 7. LETTER (slide 4) ----------
    letter: {
        typeSpeedMs: 25,          // typewriter ki speed (chhota number = fast)
        flapOpenMs: 500,          // envelope ka flap khulne me kitna time
    },
};
