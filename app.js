const alertsDiv = document.getElementById("alerts");
const cameraFeed = document.getElementById("cameraFeed");

cameraFeed.innerHTML = "📡 Camera Stream Active";

setInterval(() => {
  const isKnown = Math.random() > 0.5;

  const event = {
    camera: "Front Door",
    person: isKnown ? "John" : "Unknown",
    status: isKnown ? "known" : "unknown",
    time: new Date().toLocaleTimeString()
  };

  addAlert(event);
}, 3000);

function addAlert(event) {
  const div = document.createElement("div");
  div.className = `alert ${event.status}`;

  div.innerHTML = `
    <strong>${event.camera}</strong><br/>
    ${event.person} - ${event.time}
  `;

  alertsDiv.prepend(div);
}

function triggerAlarm() {
  alert("🚨 Alarm Triggered!");
}

function startTalk() {
  alert("🎤 Two-way talk started");
}

const threatsDiv = document.getElementById("threats");
const ledgerBody = document.querySelector("#ledger tbody");
const emergencyBanner = document.getElementById("emergencyBanner");
const emergencyText = document.getElementById("emergencyText");

// Simulated threat events
setInterval(() => {
  const types = ["fire", "animal", "fight", "crowd", "audio"];
  const type = types[Math.floor(Math.random() * types.length)];

  const event = {
    type,
    source: "Camera 1",
    time: new Date().toLocaleTimeString()
  };

  addThreat(event);
  addToLedger(event);

  if (type === "fire" || type === "fight") {
    triggerEmergency(event);
  }

}, 5000);

// Add threat UI
function addThreat(event) {
  const div = document.createElement("div");
  div.className = event.type;
  div.innerText = `${event.type.toUpperCase()} detected (${event.time})`;
  threatsDiv.prepend(div);
}

//Dashcam & Road Safety Mode
const dashcamDiv = document.getElementById("dashcam");
const sosStatus = document.getElementById("sosStatus");
const recordingStatus = document.getElementById("recordingStatus");

// Simulated dashcam events
setInterval(() => {
  const types = ["crash", "distance"];
  const type = types[Math.floor(Math.random() * types.length)];

  const event = {
    type,
    source: "Vehicle Cam",
    time: new Date().toLocaleTimeString()
  };

  addDashcamEvent(event);
  addToLedger(event);

  if (type === "crash") {
    triggerSOS(event);
  }

}, 7000);

// Show dashcam event
function addDashcamEvent(event) {
  const div = document.createElement("div");
  div.className = event.type;

  div.innerText = `${event.type.toUpperCase()} detected (${event.time})`;
  dashcamDiv.prepend(div);
}

// SOS + Voice + Recording simulation
function triggerSOS(event) {
  sosStatus.innerText = "🚨 SOS SENT!";
  sosStatus.style.color = "red";

  recordingStatus.innerText = "Recording: ON 🎥";

  // Simulated voice alert
  speak("Crash detected. Sending SOS alert.");

  setTimeout(() => {
    sosStatus.innerText = "Status: Normal";
    sosStatus.style.color = "white";

    recordingStatus.innerText = "Recording: OFF";
  }, 6000);
}

// Voice alert (browser TTS)
function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(msg);
}


// Ledger entry
function addToLedger(event) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${event.time}</td>
    <td>${event.type}</td>
    <td>${event.source}</td>
  `;

  ledgerBody.prepend(row);
}

// Emergency trigger
function triggerEmergency(event) {
  emergencyBanner.style.display = "block";
  emergencyText.innerText = `${event.type.toUpperCase()} detected! Immediate action required!`;

  setTimeout(() => {
    emergencyBanner.style.display = "none";
  }, 5000);
}
