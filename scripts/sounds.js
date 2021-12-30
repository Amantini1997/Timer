const AUDIOS = {
    active: new Audio("../sounds/active.ogg"),
    rest: new Audio("../sounds/rest.ogg"),
    end: new Audio("../sounds/end.ogg"),
}

let lastPlayedAudio = AUDIOS.rest;

function clearAudio() {
    lastPlayedAudio.pause();
    lastPlayedAudio.currentTime = 0;
}

function playAudio(audio) {
    clearAudio();
    audio.play();
    lastPlayedAudio = audio;
}

function activeSound() {
    playAudio(AUDIOS.active);
}

function restSound() {
    playAudio(AUDIOS.rest);
}

function endSound() {
    playAudio(AUDIOS.end);
}