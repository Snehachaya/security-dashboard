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
