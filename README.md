# 🎂 Surprise Page — Files Ka Structure

Poori site chhote-chhote files me bati hui hai, taaki **badlav karna easy ho**
aur AI ko bolna aasan ho ki "ye file me ye badal do".

**Flow (10 pages):** PIN → Wallpaper → Cake → "Ready to celebrate?" → Letter →
Who is this for? → Gallery → Feelings zone → Notes → 14 October facts + timeline →
Last page (Happiest Birthday Again + Wish Box).

---

## 📁 Folder structure

```
anubdy/
├── index.html          ← sirf HTML (skeleton / markup)
├── css/
│   ├── base.css        ← common reset, slide system, dots, chip buttons, modal
│   ├── login.css       ← screen 1: PIN wala lock screen
│   ├── slide-1.css     ← slide 1: wallpaper + "Happy Birthday"
│   ├── slide-2.css     ← slide 2: cake ROOM (lights, bokeh, balloons, header, controls)
│   ├── cake.css        ← cake khud (layers, drips, candles, flames, smoke, sparkles)
│   ├── slide-3.css     ← slide 3: "Are you ready to celebrate?" + No button
│   ├── slide-4.css     ← slide 4: envelope + letter paper + skip/continue buttons
│   ├── slide-5.css     ← slide 5: "Who is this for?" + naam reveal
│   ├── slide-6.css     ← slide 6: photo cards ka deck + caption + song button
│   ├── slide-7.css     ← slide 7: Feelings zone (4 lock icons)
│   ├── slide-8.css     ← slide 8: Notes / chunks (tap karke khulne wale cards)
│   ├── slide-9.css     ← slide 9: 14 October facts buttons + timeline
│   ├── slide-10.css    ← slide 10: Happiest Birthday Again + Wish Box
│   └── extras.css      ← floating billi (cats) + toast messages
├── js/
│   ├── config.js       ← ⚙️ CONTROL ROOM (PIN, naam, text, timings, colors, sab data)
│   ├── message.js      ← 💌 poora birthday letter (sirf text)
│   ├── utils.js        ← chhote helper functions (rand, byId, confetti)
│   ├── login.js        ← PIN check (+ billi unlock)
│   ├── slides.js       ← slide navigation + dots (+ har slide ki taiyari)
│   ├── decorations.js  ← fairy lights, bokeh, balloons
│   ├── cake.js         ← cake banana, candles bujhana, confetti, countdown
│   ├── question.js     ← bhaagta hua "No" button
│   ├── letter.js       ← envelope khulna + typewriter + skip
│   ├── toast.js        ← chhote popup messages
│   ├── cats.js         ← floating billi (tap/drag/auto pop)
│   ├── who.js          ← slide 5: who is this for
│   ├── gallery.js      ← slide 6: photo cards + captions + uska gana
│   ├── notes.js        ← slide 7 + 8: feelings zone + notes
│   ├── facts.js        ← slide 9: 14 October facts + timeline
│   ├── wish.js         ← slide 10: wish box (WhatsApp) + Celebrate Again
│   └── main.js         ← sab files ko jodta hai (ise badalne ki zaroorat nahi)
├── bg-photo.jpg
├── memory1.jpeg
└── gallery/
    ├── p1.jpeg … p7.jpeg  ← gallery photos (slide 6)
    ├── caption.txt        ← har photo ka caption (p1-…, p2-… format)
    └── song.mp3           ← 🎵 USKA GANA (ye file khud daalni hai, neeche padho)
```

---

## 🗺️ "Mujhe ye badalna hai" → kaunsi file?

| Kya badalna hai | Kaunsi file |
|---|---|
| PIN badalna | `js/config.js` → `pin: '1410'` |
| Naam badalna | `js/config.js` → `text.name` / `text.heroName` / `text.aka` |
| Birthday letter ka poora text | `js/message.js` |
| Date (14 Oct) wagairah | `js/config.js` → `text.date`, `text.eyebrow`, `text.finalLine` |
| Typewriter ki speed | `js/config.js` → `letter.typeSpeedMs` |
| Slide 5 ka reveal naam/line | `js/config.js` → `who` |
| Gallery ki photos | `gallery/` folder + `js/config.js` → `gallery.photos` |
| Photo captions | `gallery/caption.txt` (`p1-caption` format) |
| 🎵 Uska gana | `gallery/song.mp3` daal do (ya `js/config.js` → `gallery.songSrc` badlo) |
| Notes (chunks) ka text | `js/config.js` → `notes.items` |
| Notes ki typing speed | `js/config.js` → `notes.typeSpeedMs` |
| 14 October ke facts / timeline | `js/config.js` → `facts` |
| Wish box ka WhatsApp number | `js/config.js` → `wish.whatsapp` (country code `wish.countryCode`) |
| Floating billi (GIF, lines, size) | `js/config.js` → `cats` |
| Toast kitne/kitni der | `js/config.js` → `toast` |
| Wish countdown 15 sec → kuch aur | `js/config.js` → `celebration.wishSeconds` |
| Confetti colors | `js/config.js` → `celebration.confettiColors` |
| Candles / cake ke layer | `js/config.js` → `cake` |
| Balloons / fairy lights / bokeh | `js/config.js` → `decorations` |
| "No" button ke emojis aur lines | `js/config.js` → `noButton` |
| Kisi bhi page ka look | `css/slide-N.css` (common cheezein `css/base.css`) |
| Naya slide add karna | `index.html` me `<section class="slide scrollable" id="slide-11">` + `css/` me nayi file + `js/slides.js` ke `SLIDE_HOOKS` me zaroorat pade to entry |

---

## 🎵 Uska gana (slide 6)

1. Apna gaana `gallery/song.mp3` naam se `gallery` folder me daal do.
2. Bas — slide 6 par **“🎵 Her song chalao”** button aa jayega.
3. File kisi aur naam/format me hai (jaise `song.m4a`)? To `js/config.js` me
   `gallery.songSrc` badal do.
4. File na mile to button tap karne par ek toast batayega ki file kahan daalni hai.

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
`js/slides.js` me chhota sa object hai: cake fit karna, gallery reset karna,
timeline banana, last page pe confetti + billi pop. Naya kaam chahiye to wahin add karo.

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
