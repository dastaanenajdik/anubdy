/* ============================================================
   config.js — POORE PROJECT KA CONTROL ROOM ⚙️
   ============================================================
   PIN, naam, text, timing, colors, emojis — sab kuch yahin hai.
   Zyadaatar badlav ke liye sirf ISI FILE ko badlo,
   baaki code files ko chhoone ki zaroorat nahi hogi.
   ============================================================ */

const CONFIG = {

    // ---------- 1. LOGIN SCREEN (screen 1) ----------
    pin: '1410',                    // 🔑 secret PIN yahin change karo (14 October)

    // ---------- 2. TEXT ----------
    // Ye text index.html me un jagahon par khud lag jata hai
    // jahan data-bind attribute laga hai.
    // {name} ki jagah automatically neeche wala 'name' aa jata hai.
    text: {
        date: '14 • 10',
        title: 'Happy Birthday',
        name: 'Anushree',                // asli naam
        heroName: 'Anushree 🌸🥺',       // slide 1 wala naam
        aka: 'aka Tingu 💗',            // pyar wala naam
        eyebrow: '14 • 10 • JUST FOR YOU',
        introSub: "{name}, it's your special day",
        plaque: 'Tingu',                // cake par likha hua pyara naam
        questionSub: 'Pick your answer, Tingu 🎀',
        wishTitle: 'Make a Wish',
        wishSub: 'Close your eyes and make a wish ✨',
        wishDoneTitle: 'Wish Granted',
        wishDoneSub: 'May every dream of yours come true',
        hintLabel: 'Tap the mic 🎤 then blow the candles out',
        micLabel: 'Click here to open mic & blow 🎤',
        micListening: 'Listening... blow now!',
        micUnavailable: 'Mic nahi mila 😢 mic allow karke dobara try kijiye 🎤',
        // Cake tap karne par ye chhote messages saamne aate hain (ek-ek karke)
        micOnly: [
            'Pookiee, tap the mic and blow into it 🎤💨',
            'Tapping won\'t work — blow into the mic, pookiee 🎤',
            'Only voice works here, pookiee — tap the mic and blow 💨🎤',
        ],
        wishLocked: 'Pehle wish kijiye — mic pe tap karke foonk maariye 🎤💨',
        wishDone: 'Wish ho gayi 💗 ab aage badhiye',
        letterDone: 'Poora letter likh diya 💌',

        // --- Slide 9 (14 October wala page) ---
        factsChip: '14 October — Aapka Din ✨',

        // --- Slide 10 (last page) ---
        finalTitle: 'Happiest Birthday,<br>Tingu! 🎂💗',
        finalText: 'Bas itna kehna tha — duniya thodi si chaotic hai, par usme aap jaise log mil jaaye to jeena worth it lagta hai. Hasti rahiye, khati rahiye, aur main hamesha ek text door hoon. 🫂💗',
        photoCaption: 'Ek din sach me… 🫂💗',
        finalLine: '14.10 — officially aapka din. ✨',
        wishBoxTitle: '💌 Wish Box 🎁',
        wishBoxPrompt: 'anything you want to tell me today....',
        restartHint: 'Yahan se poori site dobara shuru hogi 💗',
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
        // (swipe se candles bujhna hata diya gaya — ab sirf mic se)
        micSensitivity: 0.09,     // mic kitni aawaz pe react kare (0.1 - 0.3)
        micLoudFrames: 4,         // kitne frames tak tez aawaz chahiye
    },

    // ---------- 6. "NO" BUTTON JO BHAAGTA HAI (slide 3) ----------
    noButton: {
        emojis: ['🙈', '🥺', '😢', '😭', '😠', '😤', '😩', '🫠', '🥴', '🙃', '😵‍💫', '😴'],
        // {emoji} ki jagah upar wala emoji aa jata hai. Jitne chahe lines add karo.
        messages: [
            "Arre nahi nahi... Yes dabaiye na {emoji}",
            "Aap samajhti kyun nahi hain? Yes kijiye {emoji}",
            "Yes kijiye {emoji}",
            "Nice try... but you can't skip this one {emoji}",
            "No button bhi bhaag raha hai aap se {emoji}",
            "Pakad mein nahi aa raha na? Yes hi kijiye {emoji}",
            "Ab to No ne surrender kar diya hai {emoji}",
            "Bas kijiye, ab gussa ho gaya hai No wala {emoji}",
            "Chhodiye usse, abhi so jayega {emoji}",
            "Last baar bol rahi hoon... YES dabaiye {emoji}",
            "Theek hai theek hai... dogi ho ho ho 🥰💖"
        ],
        dodgeMs: 420,             // click karne par bhaagne ki speed
        hoverMs: 350,             // mouse lane par bhaagne ki speed
    },

    // ---------- 7. LETTER (slide 4) ----------
    letter: {
        typeSpeedMs: 30,          // ek tick me kitna time lage (chhota number = fast) — 30ms = aahista likhna
        charsPerTick: 1,          // ek tick me kitne akshar type hon (1 = ek-ek akshar, aahista)
        flapOpenMs: 500,          // envelope ka flap khulne me kitna time
        skipSpeedMs: 2,           // skip dabane par typing ki speed
    },

    // ---------- 8. WHO IS THIS FOR? (slide 5) ----------
    who: {
        // Ab sirf ek hi option hai — aur reveal bina tap ke khud dikhta hai
        name: 'Anushree 🌸',
        aka: 'meri Tingu 💗',
        line: 'Yes… ye sab sirf aapke liye hai 🫶🏻',
    },

    // ---------- 9. GALLERY (slide 6) ----------
    gallery: {
        // Photos gallery folder me hain (p1.jpeg - p7.jpeg)
        photos: ['p1.jpeg', 'p2.jpeg', 'p3.jpeg', 'p4.jpeg', 'p5.jpeg', 'p6.jpeg', 'p7.jpeg'],

        // Captions: ye gallery/caption.txt se khud padhe jaate hain
        // (network me file na mile to neeche wale backup captions use hote hain)
        captionFile: 'gallery/caption.txt',
        captions: [
            'Background ki paintings aur decor sundar hai, par asli beauty toh frame ke saamne baithi hai. 😗',
            'Phone case toh accha hai hi, par uske peeche wali smile usse bhi zyada pyaari hai 😉',
            'Nadi ki lehrein ek taraf, aur aapka yeh graceful and charming look doosri taraf🫣♥️',
            'Stepped right out of a dream and straight onto a mood board. 💜✨',
            'Stepped straight into a vintage postcard🏛️✨',
            'Kisi road-trip wali movie ka ekdum dream sequence lag raha hai! 🎬',
            'Stunning under the lights! ✨  🫣',
        ],

        // Note: "Her song chalao" wala button hata diya gaya hai

    },

    // ---------- 10. FEELINGS ZONE + NOTES (slide 7 & 8) ----------
    notes: {
        noteCount: 4,             // bas hint wale note icons (koi logic nahi)
        noteIcon: '✉️',           // 🔒 ki jagah letter/note wala sign
        items: [
            {
                title: 'Some things, I wanna confess to you…',
                text: "Tingu Mingu, I'm really sorry ki aapko video call ke liye itna wait karwata hoon. 🥹❤️ I hope jaldi hi hum call karein aur aapka yeh wait khatam ho jaaye. 🫂💗",
            },
            {
                title: 'Woh pehla "Babu" 🫶🏻',
                text: "Aur mujhe yaad hai jab humari conversation ke beech aapne first time mujhe “Babu” bola tha, hayeee 😭❤️ I swear, woh sunke main dil se khush ho gaya tha, pata nahi kyun but that little moment felt so special to me. 🥹🫶🏻💗",
            },
            {
                title: 'Aapki woh dance video 💃🏻',
                text: "Aapki woh dance video jab maine first time dekhi thi, hayeee 😭❤️ uss raat literally 15 baar dekhi thi. Aap dance karte waqt continuously smile kar rahi thi, aur usse pata chalta hai ki aapko dance karna kitna pasand hai. 🥹💗 I hope aapka stage par dance karne ka dream jaldi poora ho. 💃🏻✨️",
            },
            {
                title: 'Woh ek morning ☀️',
                text: "Starting mein aap mujhe thodi sad si vibes deti thi, but ek morning jab humari baat hui, aap itni khushi se sab kuch share kar rahi thi, aapki masti, mazaak sab dekhkar mujhe bahut achha laga. 🥹❤️ Idk what changed, but I'm genuinely so happy to see you happy🫶🏻💗",
            },
        ],
        typeSpeedMs: 14,          // note khulte hi typing ki speed
        doneText: 'Sab notes khul gaye 💗 ab aage badhiye…',
    },

    // ---------- 11. 14 OCTOBER WALA PAGE (slide 9) ----------
    facts: {
        buttons: [
            { id: 'inHistory', chip: '🇮🇳 Bharat', label: 'Indian History', emoji: '🏛️', sub: '14 October — Bharat ke itihaas me' },
            { id: 'inCelebs', chip: '⭐ Sitare', label: 'Indian Celebs', emoji: '🎬', sub: 'Aaj ke din paida hue Indian sitare' },
            { id: 'days', chip: '🌍 Days', label: 'International & National Days', emoji: '📅', sub: '14 October ko duniya kya manati hai' },
            { id: 'worldHistory', chip: '🌏 Duniya', label: 'World History', emoji: '📜', sub: 'Duniya me aaj ke din kya hua tha' },
            { id: 'worldCelebs', chip: '🌍 World', label: 'International Celebs', emoji: '✨', sub: 'Duniya bhar ke 14 October wale' },
            { id: 'important', chip: '💗 Important', label: 'Important', emoji: '💗', sub: 'Baaki sab interesting hai, par asli baat ye hai' },
        ],
        sections: {
            // (a) Indian History
            inHistory: [
                { t: '1884 — Lala Har Dayal ka janm', d: 'Delhi me paida hue Lala Har Dayal — Ghadar Party ke founder aur India ke freedom movement ke sabse bade revolutionaries me se ek.' },
                { t: '1955 — Colombo Plan Conference, New Delhi', d: 'Asia ke deshon ko technological help dene ke liye Colombo Plan ka conference New Delhi me hua.' },
                { t: '1956 — Dhamma Deeksha, Deekshabhoomi (Nagpur)', d: 'Dr. B. R. Ambedkar ne apne 4-5 lakh followers ke saath Nagpur ke Deekshabhoomi me Buddhism accept kiya — isliye 14 October ko Dhamma Chakra Pravartan Din kehte hain.' },
                { t: '1998 — Amartya Sen ko Nobel Prize', d: 'Economist Amartya Sen ko welfare economics ke liye Nobel Prize (Economic Sciences) mila — announcement 14 October 1998 ko hua tha.' },
            ],
            // (b) Indian Celebs
            inCelebs: [
                { t: 'Gautam Gambhir (b. 1981)', d: 'Former Indian opener, 2 World Cup finals me kaamyaab, aur ab Team India ke head coach + politician.' },
                { t: 'Navya Nair (b. 1985)', d: 'Malayalam actress aur dancer — apni charming acting ke liye famous.' },
                { t: 'Nikhil Banerjee (b. 1931)', d: 'Legendary sitar maestro — India ke sabse bade sitar players me se ek.' },
                { t: 'Arun Khetarpal (b. 1950)', d: '2nd Lieutenant, Param Vir Chakra (1971 Indo-Pak war) — sirf 21 saal ki umar me shaheed hue.' },
                { t: 'Anamika Khanna (b. 1977)', d: 'Indian fashion designer — 14 October ko hi paida hui.' },
            ],
            // (c) Days
            days: [
                { t: 'Dhamma Chakra Pravartan Din (India)', d: '14 October 1956 me Nagpur ke Deekshabhoomi me hui mass conversion ki yaad me manaya jata hai — Maharashtra me bahut bada din hai.' },
                { t: 'World Standards Day (ISO / IEC)', d: 'Standards aur unke banane walon ko celebrate karta hai. 14 October isliye chuna gaya kyunki 1946 me isi din London me 25 desh mile the — wahi se ISO bana. 1970 se manaya jata hai.' },
                { t: 'International E-Waste Day', d: 'WEEE Forum dwara — purane phone/laptop wagairah ko sahi tareeke se recycle karne ke baare me awareness.' },
                { t: 'National Dessert Day (USA)', d: 'Meethe ke liye ek poora din 🍰 — 14 October ko USA me desserts ka celebration hota hai.' },
            ],
            // (d) World History
            worldHistory: [
                { t: '1066 — Battle of Hastings', d: 'William of Normandy ne King Harold II ko haraya — Norman conquest of England shuru hui, England ka history hamesha ke liye badal gaya.' },
                { t: '1888 — Pehli Motion Picture', d: 'Louis Le Prince ne "Roundhay Garden Scene" film ki — duniya ki sabse purani bachi hui motion picture.' },
                { t: '1947 — Sound Barrier Toota', d: 'Chuck Yeager ne Bell X-1 rocket plane se Mach 1 se tez udi — insaan pehli baar sound se fast chala.' },
                { t: '1964 — Martin Luther King Jr. ko Nobel Peace Prize', d: 'Civil rights leader MLK ko Nobel Peace Prize mila — woh us waqt ke sabse young winner the.' },
                { t: '2012 — Felix Baumgartner ka Jump', d: 'Stratosphere se 39 km upar se 9 minute tak free-fall — speed 1357 km/h, sound barrier bhi cross hua, aur safely parachute se landing.' },
            ],
            // (e) International Celebs
            worldCelebs: [
                { t: 'Dwight D. Eisenhower (b. 1890)', d: 'WWII me Europe ke Supreme Allied Commander, aur America ke 34th President.' },
                { t: 'Hannah Arendt (b. 1906)', d: 'Political philosopher — "The Origins of Totalitarianism" ki author.' },
                { t: 'Ralph Lauren (b. 1939)', d: 'Fashion designer aur businessman — Polo wala brand unhi ka hai.' },
                { t: 'Cliff Richard (b. 1940)', d: 'Legendary singer — aur mazedaar baat, unka janm Lucknow, India me hua tha 🎶' },
                { t: 'Roger Moore (b. 1927)', d: 'James Bond ki 7 filmon ke Bond — 14 October ko hi paida hue.' },
                { t: 'Usher (b. 1978)', d: 'American singer — 8 Grammy awards, R&B ke bade naam.' },
                { t: 'Leonard Bernstein (d. 1990)', d: 'Composer aur conductor (West Side Story) — 14 October 1990 ko unka nidhan hua.' },
            ],
            // (f) Important — sabse aakhiri box, par sabse badi baat
            important: [
                { t: 'The one thing that matters — you landed on this day ❤️😂', d: 'Baaki saari baatein interesting hain, but ye hi asli baat hai: is duniya ne 14 October ko ek bahut hi pyaara insaan gift kiya. 🥹🎀' },
            ],
        },
        timeline: [
            { t: 'The First Hello', d: '27 September — humara first hello Snap pe hua tha. Bas ek chhota sa message, aur sab kuch wahi se shuru ho gaya. ✨' },
            { t: 'The First Laugh', d: 'Woh pehli hasi jo bina kisi reason ke memory banti gayi. 😄' },
            { t: 'The Random Conversations', d: 'Woh random baatein jo kabhi bhi khali nahi hoti thi. 🫶🏻' },
            { t: 'The Chaos', d: 'Kyunki is safar me thoda chaos bhi toh hona hi tha. 😅' },
            { t: 'Today', d: 'Aur ab… yahan tak pahunch gaye. 14 October 💗' },
        ],
        staggerMs: 300,           // timeline ke items ek-ek karke aayein
    },

    // ---------- 12. LAST PAGE — WISH BOX (slide 10) ----------
    wish: {
        whatsapp: '6206108416',   // 📱 WhatsApp number (10 digit)
        countryCode: '91',        // India
        prefix: '',               // message ke pehle lagne wala text (khali chhodo)
        emptyToast: 'Kuch toh likhiye pehle 😅',
        openToast: 'WhatsApp khul raha hai... send karna mat bhooliyega 💚',
        celebrateToast: 'Party never ends 🎉💗',
    },

    // ---------- 13. FLOATING BILLI (cats) — pure site par ----------
    cats: {
        enabled: true,
        size: 50,                 // cat ka size (px)
        tapCooldownMs: 700,       // itni der me dobara tap na ho
        toastMs: 2600,            // toast kitni der dikhe
        list: [
            {
                id: 'cat-scuba',
                gif: 'https://media.tenor.com/GQAsycjoZG8AAAAi/scuba-scuba-cat.gif',
                fallback: '🤿',
                side: 'right', top: '12%', offset: '5%',
                lines: [
                    'Dua: Aap jahan bhi jayein, aapko apni jagah mil jaye 🌊 — May you always find where you belong.',
                    'Dua: Aapka dil hamesha halka rahe 🕊️ — May your heart always stay light.',
                    'Scuba billi bolti hai: khushiyon me doob jaiye, literally 🤿',
                    'Congratulations! Itni deep wish bhejni thi ki scuba gear lagana pada 😎',
                ],
            },
            {
                id: 'cat-dance',
                gif: 'https://media.tenor.com/ECATiSXWwm8AAAAm/dancing-cat-cat.webp',
                fallback: '💃',
                side: 'left', bottom: '22%', offset: '4%',
                lines: [
                    'Dua: Aapko hamesha aise log milein jo aapki value samjhein 💗 — May you always find people who truly value you.',
                    'Dua: Aapki hasi kabhi kam na ho 😄 — May your laughter never run out.',
                    'Ye billi aapke liye naach rahi hai. Fees: ek slice cake 🍰',
                    'Dance floor ready hai, cake ready hai, bas aap late hain 💃',
                    'Happy Birthday! Aaj koi aapko kisi baat par daant nahi sakta. Rule hai. 😼',
                ],
            },
        ],
    },

    // ---------- 13b. MUSIC (teen gaane — js/music.js) ----------
    // bg      → main song: site khulne ke saath hi shuru se bajta hai; letter/photo
    //           wale gaane ke waqt ruk (pause ho) jaata hai, aur wapas wahin se chalu hota hai
    // letter  → envelope khulte hi loop, us page se hate hi band
    // photo   → photo page par aate hi loop, next/back se band
    music: {
        volume: 0.8,              // 0 (chup) se 1 (poori awaaz)
        letter: 'https://files.catbox.moe/s3ic3d.mp3',
        photo: 'https://files.catbox.moe/qisdwe.mp3',
        bg: 'https://files.catbox.moe/sqj2kr.mp3',
    },

    // ---------- 14. TOASTS (chhote messages) ----------
    toast: {
        max: 2,                   // ek saath kitne toast dikhein
        ms: 2600,                 // kitni der dikhein
    },
};
