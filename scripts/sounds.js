const AUDIOS = {
    active: new Audio("../sounds/active.ogg"),
    rest: new Audio("../sounds/rest.ogg"),
    end: new Audio("../sounds/end.ogg"),
}

function playAudio(audio) {
    console.log(audio, new Date().getSeconds())
    AUDIOS[audio].play();
}

function activeSound() {
    playAudio("active");
}

function restSound() {
    playAudio("rest");
}

function endSound() {
    playAudio("end");
}