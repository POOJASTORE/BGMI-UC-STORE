/* =========================================
   GOAT ARENA LIVE
   ========================================= */


/* ==============================
   VOTE COUNTERS
============================== */

let modiVotes = 0;
let rahulVotes = 0;


/* ==============================
   ELEMENTS
============================== */

const modiSide = document.getElementById("modiSide");
const rahulSide = document.getElementById("rahulSide");

const modiCounter = document.getElementById("modiCounter");
const rahulCounter = document.getElementById("rahulCounter");

const modiCrown = document.getElementById("modiCrown");
const rahulCrown = document.getElementById("rahulCrown");

const resetButton = document.getElementById("resetButton");
const fullscreenButton = document.getElementById("fullscreenButton");


/* ==============================
   SPEECH
============================== */

const speech = window.speechSynthesis;

let hindiVoice = null;


function loadHindiVoice() {

    const voices = speech.getVoices();

    hindiVoice =
        voices.find(
            voice =>
                voice.lang &&
                voice.lang.toLowerCase().startsWith("hi")
        ) || null;
}


loadHindiVoice();


if ("onvoiceschanged" in speech) {
    speech.onvoiceschanged = loadHindiVoice;
}


/* ==============================
   SPEAK NAME
============================== */

function speakName(name) {

    if (!("speechSynthesis" in window)) {
        return;
    }

    speech.cancel();

    const utterance =
        new SpeechSynthesisUtterance(name);

    utterance.lang = "hi-IN";

    if (hindiVoice) {
        utterance.voice = hindiVoice;
    }

    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.volume = 1;

    speech.speak(utterance);
}


/* ==============================
   NUMBER FORMAT
============================== */

function formatNumber(number) {

    return String(number).padStart(2, "0");

}


/* ==============================
   UPDATE COUNTERS
============================== */

function updateCounters() {

    modiCounter.textContent =
        formatNumber(modiVotes);

    rahulCounter.textContent =
        formatNumber(rahulVotes);

}


/* ==============================
   UPDATE CROWN
============================== */

function updateCrown() {

    modiCrown.classList.remove("active");
    rahulCrown.classList.remove("active");


    if (modiVotes > rahulVotes) {

        modiCrown.classList.add("active");

    }

    else if (rahulVotes > modiVotes) {

        rahulCrown.classList.add("active");

    }

    // बराबर होने पर दोनों crown hidden रहेंगे

}


/* ==============================
   COUNTER ANIMATION
============================== */

function animateCounter(element) {

    element.classList.remove("pop");

    void element.offsetWidth;

    element.classList.add("pop");

    setTimeout(() => {

        element.classList.remove("pop");

    }, 140);

}


/* ==============================
   UPDATE SCREEN
============================== */

function updateScreen() {

    updateCounters();

    updateCrown();

}


/* ==============================
   MODI CLICK
============================== */

modiSide.addEventListener("click", function () {

    modiVotes++;

    updateScreen();

    animateCounter(modiCounter);

    speakName("नरेंद्र मोदी");

});


/* ==============================
   RAHUL CLICK
============================== */

rahulSide.addEventListener("click", function () {

    rahulVotes++;

    updateScreen();

    animateCounter(rahulCounter);

    speakName("राहुल गांधी");

});


/* ==============================
   RESET
============================== */

resetButton.addEventListener("click", function (event) {

    event.stopPropagation();

    modiVotes = 0;
    rahulVotes = 0;

    speech.cancel();

    updateScreen();

});


/* ==============================
   FULLSCREEN
============================== */

async function enterFullscreen() {

    const element = document.documentElement;


    try {

        if (document.fullscreenElement) {

            await document.exitFullscreen();

            return;

        }


        if (element.requestFullscreen) {

            await element.requestFullscreen();

        }

        else if (element.webkitRequestFullscreen) {

            element.webkitRequestFullscreen();

        }

    }

    catch (error) {

        console.log(
            "Fullscreen request failed:",
            error
        );

    }

}


/* ==============================
   FULLSCREEN BUTTON
============================== */

fullscreenButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        enterFullscreen();

    }
);


/* ==============================
   UPDATE BUTTON TEXT
============================== */

function updateFullscreenButton() {

    if (document.fullscreenElement) {

        fullscreenButton.textContent =
            "⛶ EXIT FULL SCREEN";

    }

    else {

        fullscreenButton.textContent =
            "⛶ FULL SCREEN";

    }

}


document.addEventListener(
    "fullscreenchange",
    updateFullscreenButton
);


/* ==============================
   INITIAL SCREEN
============================== */

updateScreen();
updateFullscreenButton();
