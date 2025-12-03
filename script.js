const tuerchen = document.querySelectorAll(".tuerchen");
const tuerchenZahl = document.querySelectorAll(".tuerchen a p");
const tuerchenLinks = document.querySelectorAll(".tuerchen a");
const today = new Date();
const aktuellerTag = today.getDate();
const aktuellerMonat = today.getMonth();

tuerchenZahl.forEach((pElement, index) => {
  const tuerchenNummer = parseInt(pElement.textContent.trim());
  const aktuellerLink = tuerchenLinks[index];

  const aktuellesTuerchen = tuerchen[index];

  if (tuerchenNummer <= aktuellerTag && aktuellerMonat === 11) {
    aktuellerLink.href = `${tuerchenNummer}.html`;
    aktuellesTuerchen.classList.add("is-open");
    if (tuerchenNummer === aktuellerTag) {
      aktuellesTuerchen.style.backgroundColor = "#400625";
    }
  } else {
    aktuellerLink.href = "#";
    aktuellerLink.addEventListener("click", (event) => {
      event.preventDefault();
    });
    aktuellesTuerchen.classList.remove("is-open");
  }
});

//türchen einstellungen fertig

const toggleButton = document.querySelector(".toggle-box");
const music = document.querySelector(".background-music");
const iconMusicOn = document.querySelector(".icon-music-on");
const iconMusicOff = document.querySelector(".icon-music-off");

const savedToggle = localStorage.getItem("musicToggle");
const savedTime = parseFloat(localStorage.getItem("musicTime")) || 0; // Standardmäßig 0, falls nichts gespeichert ist

let toggle = savedToggle === "true";

music.currentTime = savedTime;

function initializeToggleState() {
  if (toggle) {
    toggleButton.style.justifyContent = "flex-end";
    iconMusicOn.style.opacity = "1";
    iconMusicOff.style.opacity = "0";
    music.play();
  } else {
    toggleButton.style.justifyContent = "flex-start";
    iconMusicOn.style.opacity = "0";
    iconMusicOff.style.opacity = "1";
    music.pause();
  }
}

initializeToggleState();

toggleButton.addEventListener("click", () => {
  toggle = !toggle;

  if (toggle) {
    toggleButton.style.justifyContent = "flex-end";
    music.play();

    iconMusicOn.style.opacity = "1";
    iconMusicOff.style.opacity = "0";
  } else {
    localStorage.setItem("musicTime", music.currentTime);

    toggleButton.style.justifyContent = "flex-start";
    music.pause();

    iconMusicOn.style.opacity = "0";
    iconMusicOff.style.opacity = "1";
  }

  localStorage.setItem("musicToggle", toggle);
});

window.addEventListener("beforeunload", () => {
  if (toggle) {
    localStorage.setItem("musicTime", music.currentTime);
  }
});
