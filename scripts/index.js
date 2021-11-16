var counterPerformedElement = document.getElementById("performed");
var startElement = document.getElementById("start");
var timerElement = document.getElementById("timer");

var cycleDuration;
var numberOfCycles;
var cyclesLeft;

async function rest() {
    if(cyclesLeft === 0){
        timerElement.innerHTML = "DONE!";
        startElement.disabled = false;
        return;
    }
    setTimeout(() => timerElement.classList.add("rest"), 1_000);
    let copyCycleDuration = cycleDuration;
    timerInterval = await setInterval(() => {
        timerElement.innerHTML = `${copyCycleDuration*0.001}s`;
        copyCycleDuration -= 1000;
        if(copyCycleDuration < 0) {                    
            startSound();
            clearInterval(timerInterval);
            act(timerElement, cycleDuration, cyclesLeft);
        }
    }, 1_000);
}

async function act(cyclesLeft) {
    setTimeout(() => timerElement.classList.remove("rest"), 1_000);
    let copyCycleDuration = cycleDuration;
    timerInterval = await setInterval(() => {
        timerElement.innerHTML = `${copyCycleDuration*0.001}s`;
        copyCycleDuration -= 1000;
        if(copyCycleDuration < 0){
            increaseCounter();
            cyclesLeft === 0 ? endSound() : stopSound();
            clearInterval(timerInterval);
            rest(cycleDuration, --cyclesLeft);
        }
    }, 1_000);
}

async function start(button) {
    button.disabled = true;
    cycleDuration = +document.getElementById("duration").value * 1_000;
    numberOfCycles = +document.getElementById("cycles").value;
    initialiseCounter();
    timerElement.classList.remove("disabled");
    await act(cyclesLeft);
}

function initialiseCounter() {
    cyclesLeft = numberOfCycles;
    counterPerformedElement.innerHTML = numberOfCycles - cyclesLeft;
    document.getElementById("total").innerHTML = "/ " + numberOfCycles;
}

function increaseCounter() {
    cyclesLeft--;
    counterPerformedElement.innerHTML = numberOfCycles - cyclesLeft; 
}

// expect waiting time in seconds
function waitTimeAndThenCall(waitingTime, callback, checkTime=200) {
    const endTime = new Date();
    endTime.setSeconds(endTime.getSeconds() + waitingTime);
    const interval = setInterval(() => {
        console.log(new Date().getTime(), endTime.getTime(), new Date().getTime() < endTime.getTime())
        if (new Date().getTime() > endTime.getTime()) {
            clearInterval(interval);
            callback();
        }
    }, checkTime);
}