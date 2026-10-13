/* ============================================================
   music.js — teen gaane, ek waqt par sirf ek hi bajta hai
   ============================================================
   Rules (jo page par ho, uske hisaab se gaana):
     • BG      (main song) — site khulte hi shuru se bajna shuru hota hai
                             aur poore site me bajta rehta hai. Bich-bich me
                             jab letter ya photo wala gaana aata hai to ye ruk
                             (pause ho) jaata hai, aur wo page chhodne par wahin
                             se continue karta hai jahan se band hua tha.
     • LETTER  (slide 4)   — envelope khulte hi song "letter" loop me bajta hai.
                             Us page se hate hi band, aur main song wahin se chalu.
     • PHOTO   (slide 6)   — photo page par aate hi song "photo" loop me bajta hai.
                             Next/Back dabane par band, aur main song wahin se chalu.

   Gaane ke links → js/config.js > music
   Ye file ek hi jagah se decide karti hai: syncMusic() (site khulne par,
   slides.js aur letter.js se bulaya jaata hai jab bhi page badle ya envelope khule).
   ============================================================ */

const MUSIC_KEYS = ['letter', 'photo', 'bg'];
const musicAudio = {};          // { letter: Audio, photo: Audio, bg: Audio }
let musicPlaying = null;        // abhi kaun sa gaana chal raha hai ('letter' | 'photo' | 'bg' | null)
let musicMuted = false;         // top-right mute button se mute hai ya nahi

function getTrack(key) {
    if (!musicAudio[key]) {
        const audio = new Audio(CONFIG.music[key]);
        audio.loop = true;
        audio.preload = 'auto';
        audio.volume = CONFIG.music.volume;
        audio.muted = musicMuted;
        musicAudio[key] = audio;
    }
    return musicAudio[key];
}

function toggleMute() {
    musicMuted = !musicMuted;
    Object.keys(musicAudio).forEach((k) => {
        if (musicAudio[k]) musicAudio[k].muted = musicMuted;
    });
    const btn = byId('mute-btn');
    const ico = byId('mute-ico');
    if (btn) {
        btn.classList.toggle('muted', musicMuted);
        btn.setAttribute('aria-pressed', musicMuted ? 'true' : 'false');
        btn.setAttribute('aria-label', musicMuted ? 'Unmute music' : 'Mute music');
    }
    if (ico) ico.textContent = musicMuted ? '🔇' : '🔊';
    if (!musicMuted) syncMusic();
}

// Abhi kis page par kaunsa gaana hona chahiye?
function wantedTrack() {
    if (typeof currentSlide !== 'undefined') {
        if (currentSlide === 4 && typeof letterOpened !== 'undefined' && letterOpened) return 'letter';
        if (currentSlide === 6) return 'photo';
    }
    return 'bg';
}

function playTrack(key) {
    const audio = getTrack(key);
    const p = audio.play();
    if (p && typeof p.catch === 'function') {
        // Browser ne auto-play rok diya → pehli tap/key/interaction par turant chalu hoga (initMusic)
        p.catch(() => { /* chup */ });
    }
}

// Page / envelope badalne par ye chalta hai — sahi gaana chalu, baaki band/pause
function syncMusic() {
    const want = wantedTrack();
    if (want === musicPlaying) {
        // Same gaana hi chal raha hai → bas check karo ki sach me baj raha ho
        if (want && musicAudio[want] && musicAudio[want].paused) playTrack(want);
        return;
    }

    // Purana gaana roko
    if (musicPlaying) {
        const old = musicAudio[musicPlaying];
        if (old) {
            old.pause();
            // letter/photo ek baar phir se shuru hoon, bg (main song) wahin se resume ho jahan ruka tha
            if (musicPlaying !== 'bg') old.currentTime = 0;
        }
    }

    musicPlaying = want;

    if (want) {
        // letter/photo hamesha shuru se; bg (main song) apni ruki hui jagah se hi aage badhe
        if (want !== 'bg') getTrack(want).currentTime = 0;
        playTrack(want);
    }
}

function initMusic() {
    if (!CONFIG.music) return;
    MUSIC_KEYS.forEach(getTrack);   // gaane pehle se load kar lo

    const muteBtn = byId('mute-btn');
    if (muteBtn) {
        muteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMute();
        });
    }

    // Site khulne ke saath hi main song shuru karo
    syncMusic();

    // Agar browser bina touch ke autoplay rok de, to pehle hi touch/click/key par turant chalu ho jaye
    const retry = (e) => {
        if (e && e.target && e.target.closest && e.target.closest('#mute-btn')) return;
        if (!musicPlaying) {
            syncMusic();
        } else if (musicAudio[musicPlaying] && musicAudio[musicPlaying].paused) {
            playTrack(musicPlaying);
        }
    };
    ['pointerdown', 'pointerup', 'touchstart', 'touchend', 'click', 'keydown', 'input'].forEach((evt) => {
        document.addEventListener(evt, retry, true);
    });
}
