// js/rooms.js - Updated version
import { db } from "./firebase.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const container = document.getElementById("rooms-container");
const buttons = document.querySelectorAll(".filter-btn");
let allRooms = [];

// ✅ Format price (₱1,200)
function formatPrice(price) {
  const num = Number(price);
  if (isNaN(num)) return "₱0";
  return `₱${num.toLocaleString("en-PH")}`;
}

// ✅ Fetch data from Firebase
const accRef = ref(db, "accommodations");
onValue(accRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    allRooms = Object.entries(data).map(([key, value]) => ({
      id: key,
      ...value
    }));
    renderRooms(allRooms);
  } else {
    container.innerHTML = "<p>No rooms found.</p>";
  }
});

// ✅ Render rooms
function renderRooms(list) {
  container.innerHTML = "";

  list.forEach((room) => {
    const isActive = room.status === "Active";
    const card = document.createElement("div");
    card.className = `room-card ${isActive ? "" : "unavailable"}`;
    card.style.opacity = "0";

    // ✅ Main card content
    card.innerHTML = `
      <img src="${room.image}" alt="${room.name}" class="room-image">
      <div class="room-info">
        <h3 class="room-name">${room.name}</h3>
        ${room.packageType ? `<p class="package">${room.packageType}</p>` : ""}
        ${
          room.type === "whole"
            ? `<p class="room-price"><span>${formatPrice(room.wholeResortPrice)}</span> / 24 Hours</p>`
            : `
              <p class="room-price"><span>${formatPrice(room.dayPrice)}</span> / Day Use</p>
              <p class="room-price"><span>${formatPrice(room.overnightPrice)}</span> / Overnight</p>
            `
        }
      </div>
    `;

    // ✅ Add View Details button for ALL rooms (active and inactive)
    const btn = document.createElement("button");
    btn.className = "book-btn";
    btn.textContent = isActive ? "View Details" : "View Details";
    
    btn.addEventListener("click", () => {
      // Redirect to room details page with room ID
      window.location.href = `roomdetails.html?id=${room.id}`;
    });

    card.querySelector(".room-info").appendChild(btn);

    // ✅ Add overlay if not active
    if (!isActive) {
      const overlay = document.createElement("div");
      overlay.className = "unavailable-overlay";
      overlay.textContent = "Unavailable";
      card.appendChild(overlay);
    }

    container.appendChild(card);

    // Fade-in effect
    setTimeout(() => (card.style.opacity = "1"), 100);
  });
}

// ✅ Filter buttons
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const type = btn.dataset.type;
    if (type === "all") renderRooms(allRooms);
    else renderRooms(allRooms.filter((r) => r.type === type));
  });
});