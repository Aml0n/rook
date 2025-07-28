const timerOneP = document.getElementById("timer1");
const timerTwoP = document.getElementById("timer2");
const intervalMs = 1000;

function Timer(startingTimeSeconds, startingTimeMinutes, htmlTimer) {
    this.startingTimeSeconds = startingTimeSeconds;
    this.startingTimeMinutes = startingTimeMinutes;
    this.htmlTimer = htmlTimer;


    this.elapsedTimeSeconds = this.startingTimeSeconds;
    this.elapsedTimeMinutes = this.startingTimeMinutes;

    this.updateTimer = function() {

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
            // console.log("hi");
            // console.log(`${this.elapsedTimeSeconds}, ${this.elapsedTimeMinutes}`)
            return
        } else {
            setTimeout(() => this.updateTimer(), intervalMs);
            // setTimeout(this.updateTimer, intervalMs)
            console.log(`${this.elapsedTimeSeconds}, ${this.elapsedTimeMinutes}`)
        }
    };

    this.timerDone = function() {
        if (this.elapsedTimeSeconds === 0 && this.elapsedTimeMinutes === 0) {
            return true
        } else {
            return false
        }
    };

};

let timerOne = new Timer(10, 0, timerOneP)

timerOne.updateTimer()