/* ============================================================
   who.js — Slide 5: "Who is this for?"
   ============================================================
   Dono options tap hone par naam reveal hota hai.
   Naam/line badalne ho → js/config.js > who
   Look → css/slide-5.css
   ============================================================ */

let whoRevealed = false;

function initWho() {
    const options = byId('who-options');
    const reveal = byId('who-reveal');
    if (!options || !reveal) return;

    options.querySelectorAll('.who-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            options.querySelectorAll('.who-chip').forEach(c => c.classList.add('picked'));

            if (whoRevealed) return;        // reveal sirf ek baar
            whoRevealed = true;

            const card = document.createElement('div');
            card.className = 'who-answer';
            card.innerHTML =
                '<p class="who-line">' + CONFIG.who.line + '</p>' +
                '<p class="who-name">' + CONFIG.who.name + '</p>' +
                '<p class="who-aka">' + CONFIG.who.aka + '</p>';
            reveal.appendChild(card);

            byId('who-next').classList.remove('hidden-btn');
            burstConfetti(originFromEl(card), { particleCount: 46, spread: 85 });
            showToast('It was you… always 💗');
        });
    });
}
