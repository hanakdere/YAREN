let score = 0;
let wrong = 0;
let currentWord = null;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const wrongEl = document.getElementById("wrong");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function newQuestion() {
  optionsEl.innerHTML = "";
  currentWord = words[Math.floor(Math.random() * words.length)];

  questionEl.textContent = currentWord.tr;

  let options = [currentWord.en];

  while (options.length < 5) {
    let rand = words[Math.floor(Math.random() * words.length)].en;
    if (!options.includes(rand)) options.push(rand);
  }

  shuffle(options).forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === currentWord.en) {
    score += 10;
  } else {
    wrong++;
    popupText.textContent =
      `Yanlış! Doğru cevap: ${currentWord.en}`;
    popup.classList.remove("hidden");

    if (wrong === 3) {
      score -= 10;
      wrong = 0;
    }
  }
  updateUI();
  if (selected === currentWord.en) newQuestion();
}

function closePopup() {
  popup.classList.add("hidden");
  newQuestion();
}

function updateUI() {
  scoreEl.textContent = score;
  wrongEl.textContent = wrong;
}

newQuestion();
