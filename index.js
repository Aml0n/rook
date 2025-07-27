const timer = document.querySelector(".timer");

let minutes = 30;
let hours = 0;

let paddedMinutes;
let paddedHours;

const interval = 1000;

function timerDone() {
    if (minutes === 0 && hours === 0) {
        return true
    } else {
        return false
    }
}

function updateTimer() {

    paddedMinutes = String(minutes).padStart(2, "0");
    if (hours < 10) {
        paddedHours = String(hours).padStart(2, "0")
    } else {
        paddedHours = String(hours);
    }
    

    timer.textContent = `${paddedHours}:${paddedMinutes}`

    if (minutes === 0 && hours !== 0) {
        hours--;
        minutes = 59;
    } else {
        minutes--;
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
