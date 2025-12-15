// =======================================================
// JAVASCRIPT LOGIK FÜR DEN WEBCAM-ADVENTSTÜRCHENER
// =======================================================

// DOM-Elemente abrufen (Hinzufügen des Countdown-Elements)
const video = document.getElementById("webcam-stream");
const canvas = document.getElementById("photo-canvas");
const captureButton = document.getElementById("capture-button");
const preview = document.getElementById("photo-preview");
const downloadLink = document.getElementById("download-link");
const countdownOverlay = document.getElementById("countdown-overlay"); // NEU
const context = canvas.getContext("2d");

let currentStream;

function startCamera() {
  preview.style.display = "none";
  downloadLink.style.display = "none";
  countdownOverlay.style.display = "none";

  navigator.mediaDevices
    .getUserMedia({
      video: {
        width: { ideal: 480 },
        height: { ideal: 640 },
      },
      audio: false,
    })
    .then((stream) => {
      currentStream = stream;
      video.srcObject = stream;
      video.play();
      video.style.display = "block";
      captureButton.style.display = "inline-block";
    })
    .catch((err) => {
      console.error("Kamera-Zugriff fehlgeschlagen: ", err);
      alert("Konnte nicht auf die Kamera zugreifen.");
      video.style.display = "none";
      captureButton.style.display = "none";
    });
}

// NEU: Funktion, die den Countdown startet
function startCountdown() {
  // Deaktiviere den Button, damit er nicht mehrmals geklickt werden kann
  captureButton.style.display = "none";

  // Video zentrieren und zur Vorbereitung kurz einfrieren (optional)
  video.classList.add("frozen");

  let count = 3;
  countdownOverlay.textContent = count;
  countdownOverlay.style.display = "block";

  // Setzt ein Intervall, das jede Sekunde läuft
  const countdownInterval = setInterval(() => {
    count--;

    if (count > 0) {
      countdownOverlay.textContent = count;
    } else {
      clearInterval(countdownInterval); // Zähler stoppen
      countdownOverlay.style.display = "none"; // Countdown ausblenden
      takePictureNow(); // Foto aufnehmen
    }
  }, 1000); // 1000 Millisekunden = 1 Sekunde
}

function takePictureNow() {
  // 1. Padding-Werte in Pixel festlegen
  // Angenommen: 3rem (48px) top/right/left, 6rem (96px) bottom
  const PADDING_TOP = 48;
  const PADDING_RIGHT = 48;
  const PADDING_BOTTOM = 96;
  const PADDING_LEFT = 48;

  // Fester HEX-Code für den Hintergrund (bitte Ihren Wert einfügen)
  const BACKGROUND_COLOR = "#ffffff"; // Beispiel-Farbe für Dark Rose

  // Annahme der reinen Bildgröße (aus den Camera Constraints)
  const sourceWidth = video.videoWidth || 480;
  const sourceHeight = video.videoHeight || 640;

  // 2. GESAMTGRÖSSE des Canvas definieren (Bild + Padding)
  canvas.width = sourceWidth + PADDING_LEFT + PADDING_RIGHT;
  canvas.height = sourceHeight + PADDING_TOP + PADDING_BOTTOM;

  context.fillStyle = BACKGROUND_COLOR;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // 3. Das Bild in den inneren, gepaddeten Bereich zeichnen
  // Die Position des Videos startet beim linken und oberen Padding-Wert
  context.drawImage(
    video,
    PADDING_LEFT, // Start X-Position
    PADDING_TOP, // Start Y-Position
    sourceWidth,
    sourceHeight
  );
  // ***************************************************************

  // 4. Den Stream stoppen, nachdem das Bild aufgenommen wurde
  stopCamera();

  // 5. Download vorbereiten und Vorschau anzeigen
  const imageDataURL = canvas.toDataURL("image/png");
  preview.src = imageDataURL;
  preview.style.display = "block";
  downloadLink.href = imageDataURL;
  downloadLink.style.display = "inline-block";
  video.style.display = "none";
}

function stopCamera() {
  if (currentStream) {
    currentStream.getTracks().forEach((track) => track.stop());
  }
}

// =======================================================
// INITIALISIERUNG & EVENT LISTENER
// =======================================================
document.addEventListener("DOMContentLoaded", startCamera);

// Wichtig: Der Button ruft nun die Start-Countdown-Funktion auf!
captureButton.addEventListener("click", startCountdown);

window.addEventListener("beforeunload", stopCamera);
