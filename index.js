const timer = document.querySelector(".timer");
const intervalMs = 1000;


function Timer(startingTimeSeconds, startingTimeMinutes) {
    this.startingTimeSeconds = startingTimeSeconds;
    this.startingTimeMinutes = startingTimeMinutes;


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

        timer.textContent = `${paddedMinutes}:${paddedSeconds}`

        if (this.elapsedTimeSeconds === 0 && this.elapsedTimeMinutes !== 0) {
            this.elapsedTimeMinutes--;
            this.elapsedTimeSeconds = 59;
        } else {
            this.elapsedTimeSeconds--;
        }

        if (!(() => this.timerDone)) {
            setTimeout(() => {timer.textContent = "00:00"}, 1000)
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

let timerOne = new Timer(0, 1)

timerOne.updateTimer()