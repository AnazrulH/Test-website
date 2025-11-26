/* Common small utilities for pages */
document.addEventListener("DOMContentLoaded", () => {
  // accordion behavior (buttons with class .acc-btn)
  document.querySelectorAll(".acc-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      const panel = btn.nextElementSibling;
      if (!panel) return;
      panel.style.display = panel.style.display === "block" ? "none" : "block";
    });
  });

  // simple in-page search (if present)
  const searchInput = document.querySelector("#page-search");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll(".searchable").forEach(el => {
        const txt = el.innerText.toLowerCase();
        el.style.display = txt.includes(q) ? "" : "none";
      });
    });
  }
});

/* --- Simple Permainan Huruf (used on pages/code-for-me.html) --- */
function startLetterGame() {
  const container = document.getElementById("game-root");
  if (!container) return;

  const letters = [
    { letter: "A", answer: "Ayam", choices: ["Ayam","Buku","Gajah","Ikan"] },
    { letter: "B", answer: "Bola", choices: ["Baldi","Bola","Burung","Kasut"] },
    { letter: "C", answer: "Cicak", choices: ["Cawan","Kucing","Cicak","Basikal"] }
  ];

  let idx = 0;
  let score = 0;

  function renderRound() {
    const item = letters[idx];
    container.innerHTML = `
      <h3>Huruf: ${item.letter}</h3>
      <p>Klik gambar / jawapan yang betul untuk huruf ini.</p>
      <div class="choices">
        ${item.choices.map((c, i) => `<button class="choice" data-choice="${c}">${c}</button>`).join("")}
      </div>
      <p id="feedback"></p>
      <p class="muted">Skor: <span id="score">${score}</span></p>
    `;

    container.querySelectorAll(".choice").forEach(btn => {
      btn.addEventListener("click", () => {
        const picked = btn.dataset.choice;
        const feedback = document.getElementById("feedback");
        if (picked === item.answer) {
          feedback.innerText = "Betul! ✓";
          score += 1;
        } else {
          feedback.innerText = `Cuba lagi! Jawapan: ${item.answer}`;
        }
        document.getElementById("score").innerText = score;
        // next round after short delay
        setTimeout(() => {
          idx++;
          if (idx >= letters.length) {
            container.innerHTML = `<h3>Permainan Selesai</h3><p>Skor akhir: ${score}/${letters.length}</p><button id="replay">Main semula</button>`;
            document.getElementById("replay").addEventListener("click", () => { idx = 0; score = 0; renderRound(); });
          } else {
            renderRound();
          }
        }, 800);
      });
    });
  }

  renderRound();
}
