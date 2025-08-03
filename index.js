const timerOneP = document.querySelector(".timer1");
const timerTwoP = document.querySelector(".timer2");
const intervalMs = 1000;
const pauseButton = document.querySelector(".pause");

let timersPaused = true;                

function Timer(startingTimeSeconds, startingTimeMinutes, htmlTimer, fieldSeconds, fieldMinutes, submitButton, errorP, isPaused, onComplete) {
    this.startingTimeSeconds = startingTimeSeconds;
    this.startingTimeMinutes = startingTimeMinutes;
    this.htmlTimer = htmlTimer;
    this.errorP = errorP;
    this.onComplete = onComplete;

    this.fieldSeconds = fieldSeconds;
    this.fieldMinutes = fieldMinutes;
    this.submitButton = submitButton;

    this.elapsedTimeSeconds = this.startingTimeSeconds;
    this.elapsedTimeMinutes = this.startingTimeMinutes;
    this.isPaused = isPaused;
    this.timerDone = false;
    
    this.submitButton.addEventListener("click", () => {
        if (this.fieldMinutes.value === "" || this.fieldSeconds.value === "") {
            this.errorP.textContent = "please type a number"
            
        } else {
            this.elapsedTimeMinutes = Number(this.fieldMinutes.value);
            this.elapsedTimeSeconds = (Number(this.fieldSeconds.value) + 1);
            this.htmlTimer.textContent = `${String(this.elapsedTimeMinutes).padStart(2, "0")}:${String(this.elapsedTimeSeconds).padStart(2, "0")}`
            this.errorP.textContent = "";
        }
    })

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

let timerOne = new Timer(70, 0, timerOneP, 
    document.querySelector(".timerOne .seconds"), 
    document.querySelector(".timerOne .minutes"), 
    document.querySelector(".timerOne > div.submit > button"), 
    document.querySelector(".timerOne .error"),
    false, () => {
        switchTimers(timerTwo, timerOne);
});

let timerTwo = new Timer(20, 0, timerTwoP, 
    document.querySelector(".timerTwo .seconds"), 
    document.querySelector(".timerTwo .minutes"), 
    document.querySelector(".timerTwo > div.submit > button"), 
    document.querySelector(".timerTwo .error"),
    true, () => {
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

});

// timerTwoSubmit.addEventListener("click", () => {
//     if (timerTwoFieldMinutes.value === "" || timerTwoFieldSeconds.value === "") {
//         timerTwoError.textContent = "please type a number"
//     } else {
//         timerTwo.elapsedTimeMinutes = Number(timerTwoFieldMinutes.value);
//         timerTwo.elapsedTimeSeconds = (Number(timerTwoFieldSeconds.value) + 1);
//         timerTwoError.textContent = "";
//     }
// })
// timerOne.updateTimer()

// timerTwo.updateTimer()

// * init

    timersPaused = true;
    timerOne.isPaused = true;
    timerTwo.isPaused = true;

    switchIsEnabled = false;

