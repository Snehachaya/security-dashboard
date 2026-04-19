const cameras = ["Front Door", "Parking", "Office"];
const people = ["John", "Alice", "Unknown"];

const ledger = document.querySelector("#ledger tbody");

let stats = { entry: 0, exit: 0, unknown: 0 };

function createAlert(container, text, time) {
  const el = document.createElement("div");
  el.className = "alert";
  el.innerHTML = `${text}<div class="time">${time}</div>`;
  container.prepend(el);
  if (container.children.length > 8) container.removeChild(container.lastChild);
}

function logEvent(time, type, source) {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${time}</td><td>${type}</td><td>${source}</td>`;
  ledger.prepend(row);
  if (ledger.children.length > 10) ledger.removeChild(ledger.lastChild);
}

function updateStats(type, known) {
  if (type === "entry") {
    stats.entry++;
    totalEntry.innerText = stats.entry;
  } else {
    stats.exit++;
    totalExit.innerText = stats.exit;
  }

  if (!known) {
    stats.unknown++;
    unknownCount.innerText = stats.unknown;
  }
}

setInterval(() => {
  const cam = cameras[Math.floor(Math.random() * cameras.length)];
  const time = new Date().toLocaleTimeString();
  const mode = Math.floor(Math.random() * 4);

  if (mode === 0) {
    const name = people[Math.floor(Math.random() * people.length)];
    const known = name !== "Unknown";
    const type = Math.random() > 0.5 ? "entry" : "exit";

    createAlert(homeSecurity, `<b>${name}</b> (${known ? "Known" : "Unknown"}) - ${type}`, time);
    createAlert(entryExit, `${name} ${type}`, time);

    updateStats(type, known);
    logEvent(time, type, name);
  }

  if (mode === 1) {
    const types = ["fire", "fight", "crowd"];
    const t = types[Math.floor(Math.random() * types.length)];
    createAlert(threats, `${t} detected`, time);
    logEvent(time, t, cam);
  }

  if (mode === 2) {
    const types = ["crash", "distance"];
    const t = types[Math.floor(Math.random() * types.length)];
    createAlert(dashcam, `${t}`, time);
    logEvent(time, t, cam);
  }

  if (mode === 3) {
    const types = ["object", "missing", "unattended"];
    const t = types[Math.floor(Math.random() * types.length)];
    createAlert(assets, `${t}`, time);
    logEvent(time, t, cam);
  }

}, 2000);
