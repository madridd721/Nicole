const intro = document.querySelector("#intro");
const mainContent = document.querySelector("#mainContent");
const openButton = document.querySelector("#openButton");
const backButton = document.querySelector("#backButton");
const letterButton = document.querySelector("#letterButton");
const musicButton = document.querySelector("#musicButton");
const letterModal = document.querySelector("#letterModal");
const closeModal = document.querySelector("#closeModal");
const phrase = document.querySelector("#phrase");
const bgMusic = document.querySelector("#bgMusic");

const phrases = [
    "Que nunca te falten motivos para sonreír.",
    "Hay personas que hacen más bonito cualquier día.",
    "Merecés todo lo lindo que la vida pueda regalarte."
];

let phraseIndex = 0;

function showMainContent() {
    intro.classList.add("hidden");
    mainContent.classList.remove("hidden");
    phrase.textContent = phrases[phraseIndex];
    phraseIndex = (phraseIndex + 1) % phrases.length;
}

function startMusic() {
    bgMusic.play().then(() => {
        musicButton.textContent = "♫ Pausar música";
        musicButton.setAttribute("aria-pressed", "true");
    }).catch(() => {
        musicButton.textContent = "♫ Activar música";
        musicButton.setAttribute("aria-pressed", "false");
    });
}

function toggleMusic() {
    if (bgMusic.paused) {
        startMusic();
        return;
    }

    bgMusic.pause();
    musicButton.textContent = "♫ Activar música";
    musicButton.setAttribute("aria-pressed", "false");
}

function showIntro() {
    mainContent.classList.add("hidden");
    intro.classList.remove("hidden");
}

function openLetter() {
    letterModal.classList.remove("hidden");
    closeModal.focus();
    document.body.style.overflow = "hidden";
}

function closeLetter() {
    letterModal.classList.add("hidden");
    document.body.style.overflow = "";
    letterButton.focus();
}

openButton.addEventListener("click", () => {
    showMainContent();
    startMusic();
});
backButton.addEventListener("click", showIntro);
letterButton.addEventListener("click", openLetter);
musicButton.addEventListener("click", toggleMusic);
closeModal.addEventListener("click", closeLetter);

letterModal.addEventListener("click", (event) => {
    if (event.target === letterModal) closeLetter();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !letterModal.classList.contains("hidden")) closeLetter();
});
