const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Bildnamen anpassen wenn exportiert!
const cardImages = [
  "dateien/memory/karte-1.png",
  "dateien/memory/karte-2.png",
  "dateien/memory/karte-3.png",
  "dateien/memory/karte-4.png",
  "dateien/memory/karte-5.png",
  "dateien/memory/karte-6.png",
  "dateien/memory/karte-7.png",
  "dateien/memory/karte-8.png",
  "dateien/memory/karte-9.png",
  "dateien/memory/karte-10.png",
  "dateien/memory/karte-11.png",
  "dateien/memory/karte-12.png",
];

// Erstellt 12 Paare für insgesamt 24 Karten
let gameCards = [...cardImages, ...cardImages];

function flipCard() {
  if (lockBoard) return;
  if (this.classList.contains("matched")) return;
  if (this === firstCard) return;

  // Hier wird die Karte umgedreht (du benötigst die CSS-Klasse 'flip')
  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  // Der data-Attribut-Wert wird verglichen
  let isMatch =
    firstCard.getAttribute("data-image") ===
    secondCard.getAttribute("data-image");

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  // Behalte die 'flip' Klasse und markiere als 'matched'
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true; // Board sperren

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000); // 1000ms = 1 Sekunde
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function initializeGame() {
  // Weise jedem Karten-Element im HTML die Bilder und zufällige Positionen zu
  cards.forEach((card, index) => {
    const img = card.querySelector("img");

    // 1. Weise das Bild zu (feste Reihenfolge)
    img.src = gameCards[index];

    // 2. Speichere den Bildpfad als data-Attribut zum späteren Vergleich
    card.setAttribute("data-image", gameCards[index]);

    // 3. Füge den Event Listener hinzu
    card.addEventListener("click", flipCard);

    // 4. Randomisiere die Position der Karte mit CSS 'order'
    card.style.order = Math.floor(Math.random() * cards.length);
  });
}

document.addEventListener("DOMContentLoaded", initializeGame);

initializeGame();
