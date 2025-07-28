const timer = document.querySelector(".timer");

let seconds = 30;
let minutes = 0;

let paddedSeconds;
let paddedMinutes;

const interval = 1000;

function timerDone() {
    if (seconds === 0 && minutes === 0) {
        return true
    } else {
        return false
    }
}

function updateTimer() {

    paddedSeconds = String(seconds).padStart(2, "0");
    if (minutes < 10) {
        paddedMinutes = String(minutes).padStart(2, "0")
    } else {
        paddedMinutes = String(minutes);
    }
    

    timer.textContent = `${paddedMinutes}:${paddedSeconds}`

    if (seconds === 0 && minutes !== 0) {
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }

    
    if (timerDone()) {
        setTimeout(() => {timer.textContent = "00:00"}, 1000)
        return
    } else {
        setTimeout(updateTimer, interval);
    }
}


updateTimer();

// setInterval(updateTimer, interval);

// while (true) {

// }
