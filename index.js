const timer = document.querySelector(".timer");

let minutes = 10;
let hours = 4;

let paddedMinutes;
let paddedHours;

function updateTimer() {

    paddedMinutes = String(minutes).padStart(2, "0");
    if (hours < 10) {
        paddedHours = String(hours).padStart(2, "0")
    } else {
        paddedHours = String(hours);
    }
    

    timer.textContent = `${paddedHours}:${paddedMinutes}`

    if (minutes === 0) {
        hours--;
        minutes = 59;
    } else {
        minutes--;
    }

    
}

const interval = 1000;

setInterval(updateTimer, interval);

// while (true) {
//     setTimeout(updateTimer, 1000);
// }
