const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playBeep() {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.1);
}

const socket = io();
const statusIndicator = document.getElementById("status-indicator");
function updateStatus(isConnected) {
  statusIndicator.textContent = isConnected ? "● Connected" : "● Disconnected";
  statusIndicator.classList.toggle("status--connected", isConnected);
  statusIndicator.classList.toggle("status--disconnected", !isConnected);
}

socket.on("connect", () => {
  updateStatus(true);
});
socket.on("disconnect", () => {
  updateStatus(false);
});

const map = L.map("map", {
  center: [20.5937, 78.9629],
  zoom: 3,
  minZoom: 2,
  maxZoom: 18,
  maxBounds: [
    [-90, -180],
    [90, 180],
  ],
  maxBoundsViscosity: 1.0,
  noWrap: true,
  zoomControl: true,
  attributionControl: false,
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
  maxNativeZoom: 19,
  maxZoom: 19,
  noWrap: true,
}).addTo(map);

const markers = new Map();
let selfMarker = null;
function createSelfLight(latlng) {
  const container = document.createElement("div");
  container.className = "device-light";
  return L.marker(latlng, {
    icon: L.divIcon({ html: container.outerHTML, className: "" }),
  }).addTo(map);
}

function createOtherIndicator(latlng) {
  return L.circleMarker(latlng, {
    radius: 6,
    color: "#bfbfbf",
    weight: 2,
    fillColor: "#000",
    fillOpacity: 1,
  })
    .addTo(map)
    .bindPopup(`User: ${latlng.id || "unknown"}`);
}

if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    ({ coords: { latitude, longitude } }) => {
      if (latitude && longitude) {
        socket.emit("send-location", { latitude, longitude });
      }
    },
    (error) => console.error(error),
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
}

socket.on("receive-location", ({ id, latitude, longitude }) => {
  if (!id || typeof latitude !== "number" || typeof longitude !== "number")
    return;

  const latlng = [latitude, longitude];
  if (id === socket.id) {
    if (selfMarker) {
      selfMarker.setLatLng(latlng);
    } else {
      selfMarker = createSelfLight(latlng);
    }
    map.panTo(latlng, { animate: true, duration: 0.7 });
    playBeep();
  } else {
    if (markers.has(id)) {
      markers.get(id).setLatLng(latlng);
    } else {
      const other = createOtherIndicator(latlng);
      markers.set(id, other);
    }
  }
});

socket.on("user-disconnected", (id) => {
  if (markers.has(id)) {
    map.removeLayer(markers.get(id));
    markers.delete(id);
  }
});
