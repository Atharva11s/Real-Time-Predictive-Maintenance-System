// ======================
// SYSTEM LIMITS (BASE SAFETY)
// ======================
const TEMP_WARNING = 65;
const TEMP_CRITICAL = 70;
const VIBRATION_HIGH = 2.5;


// ======================
// DATA STORAGE
// ======================
let tempData = [];
let vibrationData = [];
let labels = [];
let pointColors = [];
let anomalyHistory = [];


// ======================
// CHART SETUP
// ======================
const tempChart = new Chart(document.getElementById("tempChart"), {
    type: "line",
    data: {
        labels: labels,
        datasets: [
            {
                label: "Temperature",
                data: tempData,
                borderColor: "cyan",
                pointBackgroundColor: pointColors
            },
            {
                label: "Temp Threshold",
                data: [],
                borderColor: "red",
                borderDash: [5, 5],
                pointRadius: 0
            }
        ]
    }
});

const vibrationChart = new Chart(document.getElementById("vibrationChart"), {
    type: "line",
    data: {
        labels: labels,
        datasets: [
            {
                label: "Vibration",
                data: vibrationData,
                borderColor: "orange"
            },
            {
                label: "Vibration Threshold",
                data: [],
                borderColor: "red",
                borderDash: [5, 5],
                pointRadius: 0
            }
        ]
    }
});


// ======================
// SLIDER LIVE VALUES
// ======================
const tempSlider = document.getElementById("tempThreshold");
const vibSlider = document.getElementById("vibThreshold");

tempSlider.oninput = () => {
    document.getElementById("tempLive").innerText = tempSlider.value;
};

vibSlider.oninput = () => {
    document.getElementById("vibLive").innerText = vibSlider.value;
};


// ======================
// PAUSE / PLAY
// ======================
let isRunning = true;
let interval = setInterval(fetchData, 1000);

function toggleLive() {
    const btn = document.getElementById("toggleBtn");

    if (isRunning) {
        clearInterval(interval);
        btn.innerText = "▶ Play";
    } else {
        interval = setInterval(fetchData, 1000);
        btn.innerText = "⏸ Pause";
    }

    isRunning = !isRunning;
}


// ======================
// MAIN LOGIC
// ======================
function fetchData() {
    fetch('/data')
        .then(res => res.json())
        .then(data => {

            // ======================
            // LIVE VALUES DISPLAY
            // ======================
            document.getElementById("tempLive").innerText = data.temperature.toFixed(2);
            document.getElementById("vibLive").innerText = data.vibration.toFixed(2);

            // ======================
            // PERSISTENT ANOMALY
            // ======================
            if (anomalyHistory.length > 5) anomalyHistory.shift();
            anomalyHistory.push(data.anomaly);

            let anomalyCount = anomalyHistory.filter(x => x === 1).length;
            let persistentAnomaly = anomalyCount >= 3;


            // ======================
            // USER THRESHOLDS
            // ======================
            const tempThreshold = parseFloat(tempSlider.value);
            const vibThreshold = parseFloat(vibSlider.value);

            let isThresholdBreach =
                data.temperature > tempThreshold ||
                data.vibration > vibThreshold;


            // ======================
            // SYSTEM STATE (CORE FIX)
            // ======================
            let systemState = "NORMAL";

            if (persistentAnomaly && !isThresholdBreach) {
                systemState = "SUSPECT";
            }
            else if (isThresholdBreach) {
                systemState = "CRITICAL";
            }


            // ======================
            // LIMIT DATA (LAST 20)
            // ======================
            if (labels.length > 20) {
                labels.shift();
                tempData.shift();
                vibrationData.shift();
                pointColors.shift();
            }

            labels.push(new Date().toLocaleTimeString());
            tempData.push(data.temperature);
            vibrationData.push(data.vibration);


            // ======================
            // POINT COLOR BASED ON STATE
            // ======================
            if (systemState === "CRITICAL") {
                pointColors.push("red");
            } else if (systemState === "SUSPECT") {
                pointColors.push("yellow");
            } else {
                pointColors.push("cyan");
            }


            // ======================
            // UPDATE THRESHOLD LINES
            // ======================
            tempChart.data.datasets[1].data = labels.map(() => tempThreshold);
            vibrationChart.data.datasets[1].data = labels.map(() => vibThreshold);


            tempChart.update();
            vibrationChart.update();


            // ======================
            // CLEAN ALERT SYSTEM
            // ======================
            let alertMsg = "";

            if (systemState === "NORMAL") {
                alertMsg = "✅ System Stable";
            }
            else if (systemState === "SUSPECT") {
                alertMsg = "🤖 ML Warning: Unusual pattern detected";
            }
            else if (systemState === "CRITICAL") {
                alertMsg = "🚨 CRITICAL: Possible system failure!";
            }

            const alertBox = document.getElementById("alert");

            alertBox.innerText = alertMsg;

            alertBox.classList.remove("normal", "suspect", "critical");

            if (systemState === "NORMAL") {
                alertBox.classList.add("normal");
            }
            else if (systemState === "SUSPECT") {
                alertBox.classList.add("suspect");
            }
            else if (systemState === "CRITICAL") {
                alertBox.classList.add("critical");
            }


        });
}