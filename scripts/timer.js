// const { interval, pipe, timer } = rxjs;
// const { take, takeUntil, finalize } = rxjs.operators;

const counterPerformedElement = document.getElementById("performed");
const startElement = document.getElementById("start");
const timerElement = document.getElementById("timer");

let timerWorker;

let totalActiveCycles;
let activeCyclesLeft;

// array containing the end time of all the cycles (active & rest)
let cyclesEndTime;
// reference to the next end cycle. needed to avoid refresh issues
// related to inactive tab slowed down activity.
let nextCycleEndTime;

function initialiseWorker() {
    timerWorker = new Worker("./scripts/timerWorker.js");
    timerWorker.onmessage = ({ data }) => {
        const { command, args } = data;
        switch (command) {
            case "update:cycleTime": 
                updateTimerDisplay();
                break;
            case "end:cycle": 
                setTimerIsActive(args[0]);
                break;
        }
    }
}

function setTimerIsActive(cyclesLeft = totalActiveCycles * 2) {
    const currentCycleIndex = cyclesEndTime.length - cyclesLeft; 
    nextCycleEndTime = cyclesEndTime[currentCycleIndex];
    activeCyclesLeft = Math.floor((cyclesLeft - 1) / 2);
    const timerIsActive = cyclesLeft % 2 === 0;
    timerIsActive ? setTimerActive(): setTimerRest();
    timerElement.classList.toggle("rest", !timerIsActive);
}

function setTimerActive() {
    activeCyclesLeft === 0 
        ? endSound() 
        : restSound();
}

function setTimerRest() {
    updateCyclesPerformedText();
    activeCyclesLeft === 0 
        ? endTimer()
        : activeSound();
}

function endTimer() {
    endSound();
    timerWorker.terminate();
    timerElement.innerHTML = "DONE!";
    startElement.disabled = false;
}

function updateTimerDisplay() {
    const currentTime = new Date();

    // get time difference in seconds
    let remainingSeconds = Math.abs(nextCycleEndTime - currentTime) / 1_000;

    // add millisecond if remainingSeconds is integer
    remainingSeconds += (Number.isInteger(remainingSeconds) ? "." : "") + "00";

    let [seconds, milliseconds] = remainingSeconds.split(".");

    // add leading 0s to seconds if less than 10 seconds
    seconds = ("00" + seconds).slice(- Math.max(seconds.length, 2));
    // add trailing `0`s to milliseconds
    milliseconds = milliseconds.substring(0, 2);

    timerElement.innerHTML = `${[seconds, milliseconds].join(".")}s`;
}

function start(button) {
    totalActiveCycles = +document.getElementById("cycles").value;
    const cycleDurationInSeconds = +document.getElementById("duration").value;
    generateCycles(cycleDurationInSeconds);
    initialiseCounter();
    setTimerIsActive();

    initialiseWorker();
    timerWorker.postMessage({ cyclesEndTime });

    // prevent disabling if error
    button.disabled = true;
    timerElement.classList.remove("disabled");
}

function initialiseCounter() {
    activeCyclesLeft = totalActiveCycles;
    updateCyclesPerformedText();
    document.getElementById("total").innerHTML = "/ " + totalActiveCycles;
}

function updateCyclesPerformedText() {
    counterPerformedElement.innerHTML = totalActiveCycles - activeCyclesLeft;
}

function generateCycles(cycleDurationInSeconds) {
    cyclesEndTime = [];
    let nextCycleEndTime = new Date();
    for (let i = 0; i < totalActiveCycles * 2; i++) {
        nextCycleEndTime.setSeconds(nextCycleEndTime.getSeconds() + cycleDurationInSeconds);
        cyclesEndTime.push(new Date(nextCycleEndTime.getTime()));
    }
}