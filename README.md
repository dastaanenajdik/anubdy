# 🎂 Surprise Page — Files Ka Structure

Pehle `style`, `script` aur `HTML` — sab kuch ek hi `index.html` me tha.
Ab sab alag-alag files me hai, taaki **badlav karna easy ho** aur AI ko
bolna aasan ho ki "ye file me ye badal do".

---

## 📁 Folder structure

```
anubdy/
├── index.html          ← sirf HTML (skeleton / markup)
├── css/
│   ├── base.css        ← common reset, slide system, neeche wale dots
│   ├── login.css       ← screen 1: PIN wala lock screen
│   ├── slide-1.css     ← slide 1: wallpaper + "Happy Birthday"
│   ├── slide-2.css     ← slide 2: cake ROOM (lights, bokeh, balloons, header, controls)
│   ├── cake.css        ← cake khud (layers, drips, candles, flames, smoke, sparkles)
│   ├── slide-3.css     ← slide 3: "Are you ready to celebrate?" + No button
│   └── slide-4.css     ← slide 4: envelope + letter paper
├── js/
│   ├── config.js       ← ⚙️ CONTROL ROOM (PIN, naam, timings, colors, emojis)
│   ├── message.js      ← 💌 poora birthday letter (sirf text)
│   ├── utils.js        ← chhote helper functions
│   ├── login.js        ← PIN check
│   ├── slides.js       ← slide navigation (aage/piche)
│   ├── decorations.js  ← fairy lights, bokeh, balloons
│   ├── cake.js         ← cake banana, candles bujhana, confetti, countdown
│   ├── question.js     ← bhaagta hua "No" button
│   ├── letter.js       ← envelope khulna + typewriter
│   └── main.js         ← sab files ko jodta hai (ise badalne ki zaroorat nahi)
├── bg-photo.jpg
├── memory1.jpeg
└── gallery/
    ├── p1.jpeg … p7.jpeg  ← gallery photos
    └── caption.txt        ← photo captions
```

---

## 🗺️ "Mujhe ye badalna hai" → kaunsi file?

| Kya badalna hai | Kaunsi file |
|---|---|
| PIN badalna | `js/config.js` → `pin: '1411'` |
| Naam badalna (ek jagah, sab jagah update) | `js/config.js` → `text.name` |
| Birthday letter ka poora text | `js/message.js` |
| Typewriter ki speed | `js/config.js` → `letter.typeSpeedMs` |
| Wish countdown 15 sec → kuch aur | `js/config.js` → `celebration.wishSeconds` |
| Confetti colors | `js/config.js` → `celebration.confettiColors` |
| Candles ki position / count | `js/config.js` → `cake.candles` |
| Cake ke layer ka size, rosettes | `js/config.js` → `cake.tiers` |
| Balloons ke color/position | `js/config.js` → `decorations.balloons` |
| Fairy lights / bokeh kitne | `js/config.js` → `decorations.bulbCount`, `bokehCount` |
| "No" button ke emojis aur funny lines | `js/config.js` → `noButton.emojis`, `noButton.messages` |
| Mic ki sensitivity | `js/config.js` → `celebration.micSensitivity` |
| Login screen ka look | `css/login.css` |
| Wallpaper slide ka look | `css/slide-1.css` |
| Cake ka design (layers, candles, flames) | `css/cake.css` |
| Room ki sajawat (lights, balloons) | `css/slide-2.css` |
| Question wale slide ka look | `css/slide-3.css` |
| Envelope / letter paper ka look | `css/slide-4.css` |
| Naya slide add karna | `index.html` me `<section class="slide" id="slide-5">` + `css/` me nayi file + ek naya dot |

---

## 🔗 Files ek dusre se kaise judi hain

```
index.html
   │
   ├── <link>  → css/*.css      (7 style files)
   │
   └── <script> → js/utils.js      (helpers: rand, byId, fillTemplate)
                  js/config.js     (CONFIG — sabhi settings)
                  js/message.js    (BIRTHDAY_MESSAGE — letter ka text)
                  js/login.js
                  js/slides.js
                  js/decorations.js
                  js/cake.js
                  js/question.js
                  js/letter.js
                  js/main.js       ← sabko start karta hai (DOMContentLoaded)
```

**Important:** scripts ka order matter karta hai — `utils → config → message → baaki → main`.
Nayi JS file banao to uska `<script>` tag `js/main.js` se **pehle** lagana.

---

## ✏️ Do khaas cheezein jo kaam aayengi

### 1. `data-bind` — text ek jagah badlo, sab jagah update
`index.html` me kuch jagahon par `data-bind="name"` laga hai.
Jo bhi value `js/config.js > text.name` me hogi, wahin dikhegi.

```html
<div class="plaque" data-bind="plaque">Tingu Mingu</div>
```
```js
text: { name: 'Tingu Mingu', plaque: '{name}' }   // {name} ki jagah naam aa jata hai
```

### 2. `data-goto` — kisi bhi button se kisi bhi slide par jao
```html
<button data-goto="4">Yes 💖</button>
```
`js/slides.js` isko automatically handle karta hai — JS me kuch likhne ki zaroorat nahi.

---

## ▶️ Locally kaise chalayein

Bas `index.html` par double click kar do — kaam kar jayega (koi server/install nahi chahiye).
Ya phir:

```bash
python3 -m http.server 8000
# browser me kholo: http://localhost:8000
```

---

## ⚠️ Ek zaroori baat

`js/message.js` me letter ka text do backticks (`` ` ... ` ``) ke beech hai.
Agar letter ke andar khud backtick likhna ho, to uske pehle ek backslash lagana:
`\`` (aise). Warna text toot jayega.
