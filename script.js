"use strict";


/* =========================================
   VOTE COUNTERS
========================================= */

let modiVotes = 0;
let rahulVotes = 0;


/* =========================================
   HTML ELEMENTS
========================================= */

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


/* =========================================
   BROWSER VOICE
========================================= */

const speech =
    window.speechSynthesis;


/* =========================================
   AVAILABLE VOICES
========================================= */

let availableVoices = [];


function loadVoices() {

    if (!speech) {
        return;
    }

    availableVoices =
        speech.getVoices();
}


loadVoices();


if (
    speech &&
    "onvoiceschanged" in speech
) {
    speech.onvoiceschanged =
        loadVoices;
}


/* =========================================
   FIND HINDI VOICE
========================================= */

function getHindiVoice() {

    if (!speech) {
        return null;
    }


    if (!availableVoices.length) {
        availableVoices =
            speech.getVoices();
    }


    /*
       पहले Hindi voice खोजेंगे.
    */

    let voice =
        availableVoices.find(
            function (item) {

                return (
                    item.lang &&
                    item.lang.toLowerCase()
                        .startsWith("hi")
                );

            }
        );


    /*
       Hindi voice नहीं मिली तो
       कोई Indian English voice.
    */

    if (!voice) {

        voice =
            availableVoices.find(
                function (item) {

                    return (
                        item.lang === "en-IN"
                    );

                }
            );

    }


    return voice || null;
}


/* =========================================
   SPEAK NAME
========================================= */

function speakName(name) {

    if (!speech) {
        return;
    }


    /*
       पहले पिछली आवाज रोकें.
    */

    speech.cancel();


    /*
       नई आवाज बनाएं.
    */

    const utterance =
        new SpeechSynthesisUtterance(
            name
        );


    /*
       Hindi language.
    */

    utterance.lang = "hi-IN";


    /*
       Hindi voice available हो
       तो उसे use करें.
    */

    const voice =
        getHindiVoice();


    if (voice) {

        utterance.voice =
            voice;

    }


    /*
       Voice settings.
    */

    utterance.rate = 0.85;

    utterance.pitch = 1;

    utterance.volume = 1;


    /*
       बोलें.
    */

    speech.speak(
        utterance
    );
}


/* =========================================
   NUMBER FORMAT
========================================= */

function formatNumber(number) {

    return String(number)
        .padStart(2, "0");
}


/* =========================================
   UPDATE COUNTERS
========================================= */

function updateCounters() {

    modiCounter.textContent =
        formatNumber(
            modiVotes
        );


    rahulCounter.textContent =
        formatNumber(
            rahulVotes
        );
}


/* =========================================
   CROWN SYSTEM
========================================= */

function updateCrown() {

    /*
       सबसे पहले दोनों crown हटाओ.
       इससे बराबर होने पर
       दोनों crown automatically हटेंगे.
    */

    modiCrown.classList.remove(
        "active"
    );

    rahulCrown.classList.remove(
        "active"
    );


    /*
       मोदी के votes ज्यादा.
    */

    if (
        modiVotes >
        rahulVotes
    ) {

        modiCrown.classList.add(
            "active"
        );

        return;
    }


    /*
       राहुल के votes ज्यादा.
    */

    if (
        rahulVotes >
        modiVotes
    ) {

        rahulCrown.classList.add(
            "active"
        );

        return;
    }


    /*
       अगर दोनों बराबर हैं,
       तो कोई crown नहीं.
    */
}


/* =========================================
   UPDATE COMPLETE SCREEN
========================================= */

function updateScreen() {

    updateCounters();

    updateCrown();
}


/* =========================================
   CLICK ANIMATION
========================================= */

function animateVote(element) {

    element.classList.remove(
        "vote-animation"
    );


    /*
       Animation restart.
    */

    void element.offsetWidth;


    element.classList.add(
        "vote-animation"
    );


    setTimeout(
        function () {

            element.classList.remove(
                "vote-animation"
            );

        },
        300
    );
}


/* =========================================
   MODI CLICK
========================================= */

modiSide.addEventListener(
    "click",
    function () {

        /*
           मोदी को +1.
        */

        modiVotes++;


        /*
           Counter और crown update.
        */

        updateScreen();


        /*
           Click animation.
        */

        animateVote(
            modiSide
        );


        /*
           आवाज:
           नरेंद्र मोदी
        */

        speakName(
            "नरेंद्र मोदी"
        );

    }
);


/* =========================================
   RAHUL CLICK
========================================= */

rahulSide.addEventListener(
    "click",
    function () {

        /*
           राहुल को +1.
        */

        rahulVotes++;


        /*
           Counter और crown update.
        */

        updateScreen();


        /*
           Click animation.
        */

        animateVote(
            rahulSide
        );


        /*
           आवाज:
           राहुल गांधी
        */

        speakName(
            "राहुल गांधी"
        );

    }
);


/* =========================================
   RESET BUTTON
========================================= */

resetButton.addEventListener(
    "click",
    function (event) {

        /*
           Reset को vote नहीं बनने देना.
        */

        event.stopPropagation();


        /*
           दोनों counters zero.
        */

        modiVotes = 0;

        rahulVotes = 0;


        /*
           चल रही आवाज बंद.
        */

        if (speech) {

            speech.cancel();

        }


        /*
           Screen वापस initial state.
        */

        updateScreen();

    }
);


/* =========================================
   INITIAL SCREEN
========================================= */

updateScreen();
