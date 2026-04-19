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
