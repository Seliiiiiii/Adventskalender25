// Alle Links innerhalb der "geschenke"-Klasse auswählen
const links = document.querySelectorAll(".geschenke a");
// Den Container auswählen, in dem der Gruß erscheinen soll
const ausgabe = document.querySelector(".geschenke-container");

// Eine Liste mit verschiedenen Grüßen
const gruesse = [
  "Frohe Weihnachten und eine wundervolle Zeit! 🎄",
  "Ho Ho Ho! Hab ein wunderbares Weihnachts-Fest! 🎅",
  "Ein frohes Fest und einen guten Rutsch ins neue Jahr! ✨",
];

// Jedem Link eine Funktion zuweisen
links.forEach((link, index) => {
  link.addEventListener("click", (event) => {
    // Verhindert, dass die Seite neu geladen wird oder nach oben springt
    event.preventDefault();

    // Den Text im Container ändern, basierend auf dem Index des Links
    ausgabe.innerText = gruesse[index];
  });
});
