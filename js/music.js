/* ============================================================
   music.js — teen gaane, ek waqt par sirf ek hi bajta hai
   ============================================================
   Rules (jo page par ho, uske hisaab se gaana):
     • LETTER  (slide 4) — envelope khulte hi song "letter" loop me bajta hai.
                           Us page se hate hi band.
     • PHOTO   (slide 6) — photo page par aate hi song "photo" loop me bajta hai.
                           Next/Back dabane par band.
     • BG      (slide 7 se aage throughout) — photo page ke baad se ye gaana
                           poore site me bajta rehta hai. Letter/photo wale gaane
                           ke waqt ye ruk jaata hai, aur wo page chhodne par wahin
                           se continue karta hai jahan se ruka tha.

   Gaane ke links → js/config.js > music
   Ye file ek hi jagah se decide karti hai: syncMusic() (slides.js aur letter.js
   se bulaya jaata hai jab bhi page badle ya envelope khule).
   ============================================================ */

const MUSIC_KEYS = ['letter', 'photo', 'bg'];
const musicAudio = {};          // { letter: Audio, photo: Audio, bg: Audio } (pehli baar zaroorat padne par banta hai)
let musicPlaying = null;        // abhi kaun sa gaana chal raha hai ('letter' | 'photo' | 'bg' | null)
let bgUnlocked = false;         // photo page chhodne ke baad true — tab se bg gaana "throughout" chalega

function getTrack(key) {
    if (!musicAudio[key]) {
        const audio = new Audio(CONFIG.music[key]);
        audio.loop = true;
        audio.preload = 'auto';
        audio.volume = CONFIG.music.volume;
        musicAudio[key] = audio;
    }
    return musicAudio[key];
}

// Abhi kis page par kaunsa gaana hona chahiye?
function wantedTrack() {
    if (currentSlide === 4 && letterOpened) return 'letter';
    if (currentSlide === 6) return 'photo';
    if (bgUnlocked) return 'bg';
    return null;
}

function playTrack(key) {
    const audio = getTrack(key);
    const p = audio.play();
    if (p && typeof p.catch === 'function') {
        // Browser ne auto-play rok diya → agli tap/key par dobara try hoga (initMusic)
        p.catch(() => { /* chup */ });
    }
}

// Page / envelope badalne par ye chalta hai — sahi gaana chalu, baaki band/pause
function syncMusic() {
    // Photo page (6) chhod kar aage gaye? tabhi se bg gaana shuru ho sakta hai
    if (currentSlide > 6) bgUnlocked = true;

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
            // letter/photo ek baar phir se shuru hoon, bg wahin se resume ho
            if (musicPlaying !== 'bg') old.currentTime = 0;
        }
    }

    musicPlaying = want;

    if (want) {
        // letter/photo hamesha shuru se; bg apni jagah se
        if (want !== 'bg') getTrack(want).currentTime = 0;
        playTrack(want);
    }
}

function initMusic() {
    if (!CONFIG.music) return;
    MUSIC_KEYS.forEach(getTrack);   // gaane pehle se load kar lo (play nahi hote)

    // Autoplay rokne par: pehle tap/key par dobara koshish
    const retry = () => {
        if (musicPlaying && musicAudio[musicPlaying] && musicAudio[musicPlaying].paused) {
            playTrack(musicPlaying);
        }
    };
    document.addEventListener('pointerdown', retry, true);
    document.addEventListener('keydown', retry, true);
}
