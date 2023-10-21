let isRunning = false;
let startTime = 0;
let lapTimes = [];
let interval;

function startStop() {
    const startStopButton = document.getElementById("startStop");

    if (isRunning) {
        isRunning = false;
        clearInterval(interval);
        startStopButton.textContent = "Start";
    } else {
        isRunning = true;
        startTime = Date.now() - (lapTimes.length > 0 ? lapTimes[lapTimes.length - 1] : 0);
        interval = setInterval(updateStopwatch, 10);
        startStopButton.textContent = "Stop";
    }
}

function reset() {
    isRunning = false;
    clearInterval(interval);
    lapTimes = [];
    startTime = 0;
    document.getElementById("stopwatch").textContent = "00:00:00";
    document.getElementById("startStop").textContent = "Start";
    document.getElementById("laps").textContent = "";
}

function lap() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        lapTimes.push(lapTime);
        const lapNumber = lapTimes.length;
        const formattedTime = formatTime(lapTime);
        const lapsDiv = document.getElementById("laps");
        lapsDiv.innerHTML += `<p>Lap ${lapNumber}: ${formattedTime}</p>`;
    }
}

function updateStopwatch() {
    const elapsedTime = Date.now() - startTime;
    document.getElementById("stopwatch").textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = (time % 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
}
