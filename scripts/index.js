function playAudio(audioID) {
    document.getElementById(audioID).play()
}

function startSound() {
    playAudio("startSound");
}

function stopSound() {
    playAudio("stopSound");
}

function endSound() {
    playAudio("endSound");
}

function printTime(e = null, msTime){
    e.innerHtml = `${msTime}s`;
}

async function rest(timer, msTime, times){
    if(times < 0){
        timer.innerHTML = "DONE!";
        document.getElementById("start").disabled = false;
        return;
    }
    setTimeout(() => timer.classList.add("rest"), 1000);
    let copyTime = msTime;
    timerInterval = await setInterval(() => {
        timer.innerHTML = `${copyTime*0.001}s`;
        copyTime -= 1000;
        if(copyTime < 0) {                    
            startSound();
            clearInterval(timerInterval);
            act(timer, msTime, times);
        }
    },1000);
}

async function act(timer, msTime, times){
    document.getElementById("remaining").innerHTML = times;
    setTimeout(() => timer.classList.remove("rest"), 1000);
    let copyTime = msTime;
    timerInterval = await setInterval(() => {
        timer.innerHTML = `${copyTime*0.001}s`;
        copyTime -= 1000;
        if(copyTime < 0){
            times === 0 ? endSound() : stopSound();
            clearInterval(timerInterval);
            rest(timer, msTime, --times);
        }
    },1000);
}

async function start(button){
    button.disabled = true;
    let time = +document.getElementById("time").value;
    time *= 1000;
    let times = +document.getElementById("times").value - 1;
    let timer = document.getElementById("timer");
    timer.classList.remove("disabled");
    await act(timer, time, times);
}