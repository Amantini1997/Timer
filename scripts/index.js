const { interval, pipe, timer } = rxjs;
const { take, takeUntil, finalize } = rxjs.operators;

const counterPerformedElement = document.getElementById("performed");
const startElement = document.getElementById("start");
const timerElement = document.getElementById("timer");

const TIMER_REFRESH_DELAY = 55;
let cycleDurationInSeconds;
let numberOfCycles;
let cyclesLeft;
let timerIsActive = false;

// Alternate rest and active state
function toggleRestActiveTimer() {
    // Change the state effective state of the counter
    toggleTimerIsActive();
    // Terminate if all the cycles have been performed
    if (cyclesLeft === 0) return;
    // Calculate the time at which the current cycle
    // should terminate
    const endTime = new Date();
    endTime.setSeconds(endTime.getSeconds() + cycleDurationInSeconds);
    // Set recursion
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

    // assign default value to milliseconds if remainingSeconds
    // is integer
    let [seconds, milliseconds = "00"] = (remainingSeconds + "00").split(".");

    // add leading 0s to seconds if less than 10 seconds
    seconds = ("00" + seconds).slice(- Math.max(seconds.length, 2));
    // add trailing `0`s to milliseconds
    milliseconds = milliseconds.substring(0, 2);

    timerElement.innerHTML = `${[seconds, milliseconds].join(".")}s`;
    
    // if (keepDebugging) myDebugger.push(obj);
}

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
    updateCyclesPerformedText();
    document.getElementById("total").innerHTML = "/ " + numberOfCycles;
}

function decreaseCyclesLeft() {
    cyclesLeft--;
    updateCyclesPerformedText(); 
}

function updateCyclesPerformedText() {
    counterPerformedElement.innerHTML = numberOfCycles - cyclesLeft;
}