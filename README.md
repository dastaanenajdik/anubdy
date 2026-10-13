# 🎂 Surprise Page — Files Ka Structure

Poori site chhote-chhote files me bati hui hai, taaki **badlav karna easy ho**
aur AI ko bolna aasan ho ki "ye file me ye badal do".

**Flow (10 pages):** PIN → Wallpaper → Cake → "Ready to celebrate?" → Letter →
Who is this for? → Gallery → Feelings zone → Notes → 14 October timeline + facts →
Last page (Happiest Birthday Again + photo + Wish Box).

**Naam:** poori site me **Anushree** (kahin bhi "Anushri" nahi hai).

**Aage-peeche jaane ka ek hi tarika:** neeche wala **Back / Next** bar
(har page ka apna "Continue" button hata diya gaya hai).

---

## 📁 Folder structure

```
anubdy/
├── index.html          ← sirf HTML (skeleton / markup)
├── css/
│   ├── base.css        ← common reset, slide system, dots, chip buttons, modal,
│   │                     chhote phone ke liye media queries
│   ├── login.css       ← screen 1: PIN wala lock screen
│   ├── slide-1.css     ← slide 1: wallpaper + "Happy Birthday"
│   ├── slide-2.css     ← slide 2: cake ROOM (lights, bokeh, balloons, header, controls)
│   ├── cake.css        ← cake khud (layers, drips, candles, flames, smoke, sparkles)
│   ├── slide-3.css     ← slide 3: "Are you ready to celebrate?" + No button
│   ├── slide-4.css     ← slide 4: envelope (niche sarakta hai) + letter paper
│   ├── slide-5.css     ← slide 5: "Who is this for?" + naam reveal
│   ├── slide-6.css     ← slide 6: photo cards ka bada deck + caption
│   ├── slide-7.css     ← slide 7: Feelings zone (4 note/letter icons ✉️)
│   ├── slide-8.css     ← slide 8: Notes / chunks (tap karke khulne wale cards)
│   ├── slide-9.css     ← slide 9: timeline (upar) + 14 October facts buttons (niche)
│   ├── slide-10.css    ← slide 10: Happiest Birthday Again + photo frame + Wish Box
│   └── extras.css      ← floating billi (cats) + toast messages
├── js/
│   ├── config.js       ← ⚙️ CONTROL ROOM (PIN, naam, text, timings, colors, sab data)
│   ├── message.js      ← 💌 poora birthday letter (sirf text)
│   ├── utils.js        ← chhote helper functions (rand, byId, confetti)
│   ├── login.js        ← PIN check (+ billi unlock)
│   ├── slides.js       ← slide navigation + dots (+ har slide ki taiyari)
│   ├── decorations.js  ← fairy lights, bokeh, balloons
│   ├── cake.js         ← cake banana, SIRF MIC se candles bujhana, confetti, countdown
│   ├── question.js     ← bhaagta hua "No" button
│   ├── letter.js       ← envelope khulna + poori story ka typewriter + skip
│   ├── toast.js        ← chhote popup messages
│   ├── cats.js         ← floating billi (tap/drag/auto pop)
│   ├── who.js          ← slide 5: who is this for
│   ├── gallery.js      ← slide 6: photo cards (swipe) + captions
│   ├── notes.js        ← slide 7 + 8: feelings zone + notes
│   ├── facts.js        ← slide 9: 14 October facts + timeline
│   ├── wish.js         ← slide 10: wish box (WhatsApp) + Celebrate Again
│   └── main.js         ← sab files ko jodta hai (ise badalne ki zaroorat nahi)
├── bg-photo.jpg
├── together.jpeg       ← last page ka cute photo frame (hum dono 🫶🏻)
├── memory1.jpeg
└── gallery/
    ├── p1.jpeg … p7.jpeg  ← gallery photos (slide 6)
    └── caption.txt        ← har photo ka caption (p1-…, p2-… format)
```

---

## 🗺️ "Mujhe ye badalna hai" → kaunsi file?

| Kya badalna hai | Kaunsi file |
|---|---|
| PIN badalna | `js/config.js` → `pin: '1410'` |
| Naam badalna | `js/config.js` → `text.name` / `text.heroName` / `text.aka` |
| Mic / "Blow now…" / side face wale texts | `js/config.js` → `text.micLabel` / `text.blowNow` / `text.blowGuide` |
| "Close your eyes and make a wish" line | `js/config.js` → `text.wishSub` |
| Letter type hone ki speed | `js/config.js` → `letter.typeSpeedMs` + `letter.charsPerTick` |
| Last page ka photo | `together.jpeg` badal do (ya `index.html` me path) |
| Birthday letter ka poora text | `js/message.js` |
| Date (14 Oct) wagairah | `js/config.js` → `text.date`, `text.eyebrow`, `text.finalLine` |
| Slide 5 ka reveal naam/line | `js/config.js` → `who` |
| Gallery ki photos | `gallery/` folder + `js/config.js` → `gallery.photos` |
| Photo captions | `gallery/caption.txt` (`p1-caption` format) |
| 💗 Important wala facts box | `js/config.js` → `facts.sections.important` |
| Notes (chunks) ka text | `js/config.js` → `notes.items` |
| Notes ki typing speed | `js/config.js` → `notes.typeSpeedMs` |
| 14 October ke facts / timeline | `js/config.js` → `facts` |
| Wish box ka WhatsApp number | `js/config.js` → `wish.whatsapp` (country code `wish.countryCode`) |
| Floating billi (GIF, lines, size) | `js/config.js` → `cats` |
| Gaane (letter / photo / throughout) + volume | `js/config.js` → `music` (logic: `js/music.js`) |
| Toast kitne/kitni der | `js/config.js` → `toast` |
| Wish countdown 15 sec → kuch aur | `js/config.js` → `celebration.wishSeconds` |
| Slide 7 ke note icons (✉️) | `js/config.js` → `notes.noteIcon` |
| Slide 5 ka reveal line/naam | `js/config.js` → `who` |
| Confetti colors | `js/config.js` → `celebration.confettiColors` |
| Candles / cake ke layer | `js/config.js` → `cake` |
| Balloons / fairy lights / bokeh | `js/config.js` → `decorations` |
| "No" button ke emojis aur lines | `js/config.js` → `noButton` |
| Kisi bhi page ka look | `css/slide-N.css` (common cheezein `css/base.css`) |
| Naya slide add karna | `index.html` me `<section class="slide scrollable" id="slide-11">` + `css/` me nayi file + `js/slides.js` ke `SLIDE_HOOKS` me zaroorat pade to entry |

---

## 🎤 Cake wala page (slide 2) — sirf VOICE se

- Candles **sirf mic (voice) se** bujhti hain. Is page par **kahin bhi click/tap**
  karne se mic khul jaata hai aur bada sa *“Blow now… 💨”* dikhne lagta hai —
  mic button dabana zaroori nahi hai.
- Mic kisi wajah se na khule (permission deny, error…) to state khud saaf ho
  jaati hai: **page par phir se click = mic dobara kholne ki koshish**. Saath me
  ek chhota fallback button bhi aa jaata hai (“Mic nahi chal raha? 🙈 Tap to
  blow”) — taaki page par rukna na pade.
- Side me ek chhota sa cute animation hai — lines se bana face, phoole gaal ke
  saath foonk maarta hua, munh se hawa jaati hui 💨 — bas samjhane ke liye ki
  karna kya hai (*“Aise foonk maaro!”*). Look → `css/slide-2.css` (`.blow-guide`),
  drawing → `index.html` (`.blow-face` wala SVG).
- Mic ki aawaz kitni tez chahiye → `js/config.js` → `celebration.micSensitivity`
  + `celebration.micLoudFrames`.
- Jab tak candles nahi bujhti aur wish ka timer poora nahi hota, **Next disable**
  rehta hai (wish ke waqt message: *“Close your eyes and make a wish ✨”*).
- ⚠️ Mic sirf **https://** ya **localhost** par chalta hai (Vercel par theek chalega).

---

## 💌 Wish Box (last page)

- Textarea me jo likha jayega, wo WhatsApp par khulega:
  `https://wa.me/91<CONFIG.wish.whatsapp>?text=…`
- Number badalna ho → `js/config.js` → `wish.whatsapp`.

---

## 🔗 Files ek dusre se kaise judi hain

```
index.html
   │
   ├── <link>  → css/*.css      (14 style files)
   │
   └── <script> → js/utils.js      (helpers: rand, byId, fillTemplate, confetti)
                  js/config.js     (CONFIG — sabhi settings aur data)
                  js/message.js    (BIRTHDAY_MESSAGE — letter ka text)
                  js/login.js, js/slides.js, js/decorations.js, js/cake.js,
                  js/question.js, js/letter.js, js/toast.js, js/cats.js,
                  js/who.js, js/gallery.js, js/notes.js, js/facts.js, js/wish.js
                  js/main.js       ← sabko start karta hai (DOMContentLoaded)
```

**Important:** scripts ka order matter karta hai — `utils → config → message → baaki → main`.
Nayi JS file banao to uska `<script>` tag `js/main.js` se **pehle** lagana.

---

## ✏️ Do khaas cheezein jo kaam aayengi

### 1. `data-bind` — text ek jagah badlo, sab jagah update
`index.html` me kuch jagahon par `data-bind="name"` laga hai.
Jo bhi value `js/config.js > text.name` me hogi, wahin dikhegi.
(`data-bind-html` laga ho to `<br>` jaisa HTML bhi chal jaata hai.)

### 2. `data-goto` — kisi bhi button se kisi bhi slide par jao
```html
<button data-goto="6">Continue ➜</button>
```
`js/slides.js` isko automatically handle karta hai — JS me kuch likhne ki zaroorat nahi.

### 3. `SLIDE_HOOKS` — slide khulte hi kya ho
`js/slides.js` me chhota sa object hai: cake fit karna, letter theek karna,
who-reveal, gallery, timeline, last page pe confetti + billi pop.
Naya kaam chahiye to wahin add karo.

### 4. Slide 2 ka "mic gate"
`js/slides.js` me `cakeSwipeOk()` / `cakeSwipeGuard()` hain — jab tak
`wishReady` (mic se candles + timer) nahi hota, Next/Next-dot aage nahi jaate.

---

## ▶️ Locally kaise chalayein

Sabse badiya (captions file padhne ke liye server chahiye):
```bash
python3 -m http.server 8000
# browser me kholo: http://localhost:8000
```
`index.html` par double click bhi kaam karta hai, bas tab captions `gallery/caption.txt`
ki jagah `js/config.js > gallery.captions` (backup list) se aayenge.

---

## ⚠️ Ek zaroori baat

`js/message.js` me letter ka text do backticks (`` ` ... ` ``) ke beech hai.
Agar letter ke andar khud backtick likhna ho, to uske pehle ek backslash lagana:
`\`` (aise). Warna text toot jayega.
