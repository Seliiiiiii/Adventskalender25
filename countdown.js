function updateCountdown() {
  const countdownElement = document.getElementById("countdown");
  const now = new Date();
  const currentYear = now.getFullYear();

  // Ziel ist der 24. Dezember des aktuellen Jahres
  let targetDate = new Date(currentYear, 11, 24, 0, 0, 0);

  // Wenn Weihnachten dieses Jahr schon vorbei ist, nimm das nächste Jahr
  if (now > targetDate) {
    targetDate = new Date(currentYear + 1, 11, 24, 0, 0, 0);
  }

  const diff = targetDate - now;

  // Zeitberechnungen für Tage, Stunden, Minuten und Sekunden
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Anzeige im H2-Element
  countdownElement.innerHTML = `${days} Tage, ${hours}h ${minutes}m ${seconds}s`;
}

// Alle 1000ms (1 Sekunde) aktualisieren
setInterval(updateCountdown, 1000);

// Sofort beim Laden einmal ausführen
updateCountdown();
