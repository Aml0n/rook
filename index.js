const timerOneP = document.getElementById("timer1");
const timerTwoP = document.getElementById("timer2");
const intervalMs = 1000;
const pauseButton = document.querySelector(".pause");

let timersPaused = true;

function Timer(startingTimeSeconds, startingTimeMinutes, htmlTimer, isPaused, onComplete) {
    this.startingTimeSeconds = startingTimeSeconds;
    this.startingTimeMinutes = startingTimeMinutes;
    this.htmlTimer = htmlTimer;
    this.onComplete = onComplete;

    this.timerCompleted = function() {

    }

    this.elapsedTimeSeconds = this.startingTimeSeconds;
    this.elapsedTimeMinutes = this.startingTimeMinutes;
    this.isPaused = isPaused;
    this.timerDone = false;
    
    this.updateTimer = function() {

        if (this.isPaused === true) {
            return;
        }
        if (this.timerDone) {
            return;
        }

        if (this.elapsedTimeSeconds === 0 && this.elapsedTimeMinutes !== 0) {
            this.elapsedTimeMinutes--;
            this.elapsedTimeSeconds = 59;
        } else {
            this.elapsedTimeSeconds--;
        }
 
        this.htmlTimer.textContent = `${String(this.elapsedTimeMinutes).padStart(2, "0")}:${String(this.elapsedTimeSeconds).padStart(2, "0")}`

        if (this.elapsedTimeSeconds === 0 && this.elapsedTimeMinutes === 0) {
            this.onComplete();
            this.timerDone = true;
            switchIsEnabled = false;
            // console.log("hi");
            // console.log(`${this.elapsedTimeSeconds}, ${this.elapsedTimeMinutes}`)
            return;
        } else {
            this.timeoutId = setTimeout(() => this.updateTimer(), intervalMs);
            // setTimeout(this.updateTimer, intervalMs)
            // console.log(`${this.elapsedTimeSeconds}, ${this.elapsedTimeMinutes}`)
        }        
    }
};

function switchTimers(switchOn, switchOff) {
    switchOn.htmlTimer.textContent = `${String(switchOn.elapsedTimeMinutes).padStart(2, "0")}:${String(switchOn.elapsedTimeSeconds).padStart(2, "0")}`
    switchOn.isPaused = false;
    switchOff.isPaused = true;
    clearTimeout(switchOff.timeoutId);
    clearTimeout(switchOn.timeoutId);
    lastTimerOn = switchOn;
    notLastTimerOn = switchOff;

    switchOn.timeoutId = setTimeout(switchOn.updateTimer(), 1000);
    
};

let timerOne = new Timer(10, 0, timerOneP, false, () => {
    switchTimers(timerTwo, timerOne);
});

let timerTwo = new Timer(10, 0, timerTwoP, true, () => {
    switchTimers(timerOne, timerTwo);
});

let lastTimerOn = timerOne;
let notLastTimerOn = timerTwo;

const switchButton = document.querySelector(".switch");
let switchIsEnabled = true;
switchButton.addEventListener("click", () => {
    if (!switchIsEnabled) {
        return;
    }

    // if (timersPaused) {
    //     timerOne.isPaused = false;
    //     switchTimers(timerOne, timerTwo);

    // } else 
    if (timerTwo.timerDone) {
        switchTimers(timerOne, timerTwo);
        switchIsEnabled = false;
    } else if (timerOne.timerDone) {
        switchTimers(timerTwo, timerOne);
        switchIsEnabled = false;
    } else if (timerOne.isPaused) {
        switchTimers(timerOne, timerTwo);
        // console.log("hello  1");

    } else if (timerTwo.isPaused) {
        switchTimers(timerTwo, timerOne);
        // console.log("hello  2");
    }
})

pauseButton.addEventListener("click", () => {
    if (timersPaused) {
        switchTimers(lastTimerOn, notLastTimerOn);
        timersPaused = false;
        pauseButton.textContent = "pause"
        switchIsEnabled = true;

    } else {
        timersPaused = true;
        clearTimeout(timerOne.timeoutId);
        clearTimeout(timerTwo.timeoutId);

        timerOne.isPaused = true;
        timerTwo.isPaused = true;

        switchIsEnabled = false;

        pauseButton.textContent = "unpause"
    }


})
// timerOne.updateTimer()

// timerTwo.updateTimer()