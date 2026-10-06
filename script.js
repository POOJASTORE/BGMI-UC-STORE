/* =====================================================
   GOAT ARENA LIVE
   ===================================================== */

let modiVotes = 0;
let rahulVotes = 0;

let fullscreenStarted = false;


/* =====================================================
   ELEMENTS
   ===================================================== */

const modiSide =
    document.getElementById("modiSide");

const rahulSide =
    document.getElementById("rahulSide");

const modiCounter =
    document.getElementById("modiCounter");

const rahulCounter =
    document.getElementById("rahulCounter");

const modiCrown =
    document.getElementById("modiCrown");

const rahulCrown =
    document.getElementById("rahulCrown");

const resetButton =
    document.getElementById("resetButton");


/* =====================================================
   VOICE
   ===================================================== */

let hindiVoice = null;


function loadVoices() {

    const voices =
        window.speechSynthesis.getVoices();

    hindiVoice =
        voices.find(
            voice =>
                voice.lang &&
                voice.lang
                    .toLowerCase()
                    .startsWith("hi")
        ) || null;
}


loadVoices();


if ("onvoiceschanged" in speechSynthesis) {

    speechSynthesis.onvoiceschanged =
        loadVoices;
}


/* =====================================================
   SPEAK
   ===================================================== */

function speakName(name) {

    if (!("speechSynthesis" in window)) {
        return;
    }

    speechSynthesis.cancel();

    const utterance =
        new SpeechSynthesisUtterance(name);

    utterance.lang = "hi-IN";

    if (hindiVoice) {

        utterance.voice =
            hindiVoice;
    }

    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.volume = 1;

    speechSynthesis.speak(utterance);
}


/* =====================================================
   NUMBER
   ===================================================== */

function formatNumber(number) {

    return String(number).padStart(2, "0");
}


/* =====================================================
   UPDATE SCREEN
   ===================================================== */

function updateScreen() {

    modiCounter.textContent =
        formatNumber(modiVotes);

    rahulCounter.textContent =
        formatNumber(rahulVotes);


    modiCrown.classList.remove("active");

    rahulCrown.classList.remove("active");


    if (modiVotes > rahulVotes) {

        modiCrown.classList.add("active");

    }
    else if (rahulVotes > modiVotes) {

        rahulCrown.classList.add("active");

    }
}


/* =====================================================
   POP ANIMATION
   ===================================================== */

function popCounter(element) {

    element.classList.remove("pop");

    void element.offsetWidth;

    element.classList.add("pop");

    setTimeout(() => {

        element.classList.remove("pop");

    }, 120);
}


/* =====================================================
   ENTER FULLSCREEN
   ===================================================== */

async function enterFullscreen() {

    if (document.fullscreenElement) {
        return;
    }


    try {

        if (
            document.documentElement
                .requestFullscreen
        ) {

            await document.documentElement
                .requestFullscreen();

        }

    }
    catch (error) {

        console.log(
            "Fullscreen request:",
            error
        );
    }
}


/* =====================================================
   LOCK LANDSCAPE WHEN POSSIBLE
   ===================================================== */

async function lockLandscape() {

    try {

        if (
            screen.orientation &&
            screen.orientation.lock
        ) {

            await screen.orientation
                .lock("landscape");

        }

    }
    catch (error) {

        // Chrome normal tabs may reject this.
        // Installed PWA/fullscreen can allow it.
    }
}


/* =====================================================
   FIRST USER ACTION
   ===================================================== */

async function startDisplayMode() {

    if (fullscreenStarted) {
        return;
    }

    fullscreenStarted = true;

    await enterFullscreen();

    await lockLandscape();
}


/* =====================================================
   MODI
   ===================================================== */

modiSide.addEventListener(
    "click",
    async function () {

        await startDisplayMode();

        modiVotes++;

        updateScreen();

        popCounter(modiCounter);

        speakName("नरेंद्र मोदी");
    }
);


/* =====================================================
   RAHUL
   ===================================================== */

rahulSide.addEventListener(
    "click",
    async function () {

        await startDisplayMode();

        rahulVotes++;

        updateScreen();

        popCounter(rahulCounter);

        speakName("राहुल गांधी");
    }
);


/* =====================================================
   RESET
   ===================================================== */

resetButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        modiVotes = 0;

        rahulVotes = 0;

        speechSynthesis.cancel();

        updateScreen();
    }
);


/* =====================================================
   ROTATION
   ===================================================== */

window.addEventListener(
    "orientationchange",
    function () {

        /*
         * Browser security may reject fullscreen
         * without a user gesture.
         *
         * If already fullscreen, layout automatically
         * fills the new orientation.
         */

        setTimeout(() => {

            if (document.fullscreenElement) {

                document.documentElement
                    .style.width = "100vw";

                document.documentElement
                    .style.height = "100vh";
            }

        }, 100);
    }
);


/* =====================================================
   INITIAL
   ===================================================== */

updateScreen();
