var counterPerformedElement = document.getElementById("performed");
var startElement = document.getElementById("start");
var timerElement = document.getElementById("timer");

var cycleDurationInSeconds;
var numberOfCycles;
var cyclesLeft;

var timerIsActive = false;
const TIMER_REFRESH_DELAY = 55;

const { interval, pipe, timer } = rxjs;
const { take, takeUntil, finalize } = rxjs.operators;

function toggleRestActiveTimer() {
    toggleTimerIsActive();
    if (cyclesLeft === 0) return;
    // const startTime = new Date();
    const endTime = new Date();
    endTime.setSeconds(endTime.getSeconds() + cycleDurationInSeconds);
    // This could be any observable stream
    interval(TIMER_REFRESH_DELAY)
        .pipe(
            takeUntil(timer(endTime)),
            finalize(toggleRestActiveTimer)
        )
        .subscribe(() => updateTimerDisplay(endTime));
}

function toggleTimerIsActive() {
    timerIsActive ? setTimerRest(): setTimerActive();
    timerIsActive = !timerIsActive;
    timerElement.classList.toggle("rest");
}

function setTimerActive() {
    cyclesLeft === 0 
        ? endSound() 
        : stopSound();
}

function setTimerRest() {
    decreaseCyclesLeft();
    cyclesLeft === 0 
        ? endTimer()
        : startSound()
}

function endTimer() {
    endSound();
    timerElement.innerHTML = "DONE!";
    startElement.disabled = false;
    return;
}

function updateTimerDisplay(endTime) {
    const currentTime = new Date();

    // get time difference in seconds
    const remainingSeconds = Math.abs(endTime - currentTime) / 1_000;
    let [seconds, milliseconds] = (remainingSeconds + "00").split(".");

    // add leading 0s to seconds if less than 10 seconds
    seconds = ("00" + seconds).slice(- Math.max(seconds.length, 2));

    // add trailing 0s to milliseconds
    milliseconds = milliseconds.substring(0, 2);
    timerElement.innerHTML = `${[seconds, milliseconds].join(".")}s`;
}

// async function rest() {
//     if(cyclesLeft === 0){
//         timerElement.innerHTML = "DONE!";
//         startElement.disabled = false;
//         return;
//     }
//     setTimeout(() => timerElement.classList.add("rest"), 1_000);
//     let copyCycleDurationInSeconds = cycleDurationInSeconds;
//     timerInterval = await setInterval(() => {
//         timerElement.innerHTML = `${copyCycleDurationInSeconds*0.001}s`;
//         copyCycleDurationInSeconds -= 1000;
//         if(copyCycleDurationInSeconds < 0) {                    
//             startSound();
//             clearInterval(timerInterval);
//             act(timerElement, cycleDurationInSeconds, cyclesLeft);
//         }
//     }, 1_000);
// }

// async function act(cyclesLeft) {
//     setTimeout(() => timerElement.classList.remove("rest"), 1_000);
//     let copyCycleDurationInSeconds = cycleDurationInSeconds;
//     timerInterval = await setInterval(() => {
//         timerElement.innerHTML = `${copyCycleDurationInSeconds*0.001}s`;
//         copyCycleDurationInSeconds -= 1000;
//         if(copyCycleDurationInSeconds < 0){
//             increaseCounter();
//             cyclesLeft === 0 ? endSound() : stopSound();
//             clearInterval(timerInterval);
//             rest(cycleDurationInSeconds, --cyclesLeft);
//         }
//     }, 1_000);
// }

async function start(button) {
    button.disabled = true;
    cycleDurationInSeconds = +document.getElementById("duration").value;
    numberOfCycles = +document.getElementById("cycles").value;
    timerElement.classList.remove("disabled");
    initialiseCounter();
    toggleRestActiveTimer();
}

function initialiseCounter() {
    cyclesLeft = numberOfCycles;
    counterPerformedElement.innerHTML = numberOfCycles - cyclesLeft;
    document.getElementById("total").innerHTML = "/ " + numberOfCycles;
}

function decreaseCyclesLeft() {
    cyclesLeft--;
    counterPerformedElement.innerHTML = numberOfCycles - cyclesLeft; 
}