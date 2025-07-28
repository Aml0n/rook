const timerOneP = document.getElementById("timer1");
const timerTwoP = document.getElementById("timer2");
const intervalMs = 1000;

let timersRunning = true;

function Timer(startingTimeSeconds, startingTimeMinutes, htmlTimer, isPaused) {
    this.startingTimeSeconds = startingTimeSeconds;
    this.startingTimeMinutes = startingTimeMinutes;
    this.htmlTimer = htmlTimer;


    this.elapsedTimeSeconds = this.startingTimeSeconds;
    this.elapsedTimeMinutes = this.startingTimeMinutes;
    this.isPaused = isPaused;
    this.timerDone = false;

    this.updateTimer = function() {
  
        if (this.isPaused === true) {
            return
        }
        if (this.timerDone) {
            return
        }
        // console.log(`${this.htmlTimer}`)

        let paddedMinutes;
        let paddedSeconds = String(this.elapsedTimeSeconds).padStart(2, "0");
        if (this.elapsedTimeMinutes < 10) {
            paddedMinutes = String(this.elapsedTimeMinutes).padStart(2, "0")
        } else {
            paddedMinutes = String(this.elapsedTimeMinutes);
        }

        this.htmlTimer.textContent = `${paddedMinutes}:${paddedSeconds}`

        if (this.elapsedTimeSeconds === 0 && this.elapsedTimeMinutes !== 0) {
            this.elapsedTimeMinutes--;
            this.elapsedTimeSeconds = 59;
        } else {
            this.elapsedTimeSeconds--;
        }

        if (this.elapsedTimeSeconds === 0 && this.elapsedTimeMinutes === 0) {
            setTimeout(() => {this.htmlTimer.textContent = "00:00"}, 1000)
            this.timerDone = true;
            // console.log("hi");
            // console.log(`${this.elapsedTimeSeconds}, ${this.elapsedTimeMinutes}`)
            return
        } else {
            this.timeoutId = setTimeout(() => this.updateTimer(), intervalMs);
            // setTimeout(this.updateTimer, intervalMs)
            // console.log(`${this.elapsedTimeSeconds}, ${this.elapsedTimeMinutes}`)
        }
    };

};

let timerOne = new Timer(10, 0, timerOneP, false);

let timerTwo = new Timer(50, 0, timerTwoP, true);

const switchButton = document.querySelector(".switch");
switchButton.addEventListener("click", () => {
    if (!timersRunning) {
        timerOne.isPaused = false;
        timerOne.updateTimer();

    } else if (timerOne.isPaused) {
        timerOne.isPaused = false;
        timerTwo.isPaused = true;
        clearTimeout(timerTwo.timeoutId);
        timerOne.updateTimer();
        // console.log("hello  1");

    } else if (timerTwo.isPaused) {
        timerTwo.isPaused = false;
        timerOne.isPaused = true;
        clearTimeout(timerOne.timeoutId);
        timerTwo.updateTimer();
        // console.log("hello  2");
    }
})


timerOne.updateTimer()

timerTwo.updateTimer()