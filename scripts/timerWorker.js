importScripts("https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.1.0/rxjs.umd.js");

const { interval, timer } = rxjs;
const { takeUntil, finalize } = rxjs.operators;

const TIMER_REFRESH_DELAY = 55;

let cyclesLeft;
let cyclesEndTime;

onmessage = ({ data }) => {
    cyclesEndTime = data.cyclesEndTime;
    executeCyclesLeft();
}

function executeCyclesLeft() {   

    // Terminate if all the cycles have been performed
    if (cyclesEndTime.length === 0) terminate();

    // Calculate the time at which the current cycle
    // should terminate
    const endTime = cyclesEndTime.shift();
    
    // Set recursion
    interval(TIMER_REFRESH_DELAY)
        .pipe(
            takeUntil(timer(endTime)),
            finalize(endCycle)
        )
        .subscribe(() => postMessage({ command: "update:cycleTime" }));
}

function endCycle() {
    postMessage({ 
        command: "end:cycle", 
        args: [cyclesEndTime.length] 
    });
    executeCyclesLeft();
}