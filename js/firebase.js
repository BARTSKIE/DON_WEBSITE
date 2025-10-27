// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// ✅ Firebase Configuration
const firebaseConfig = {
            apiKey: "AIzaSyB3GGbWzI-n4sTGxuhCB2PLa8d4ikLCbmU",
            authDomain: "don-elmers.firebaseapp.com",
            databaseURL: "https://don-elmers-default-rtdb.firebaseio.com",
            projectId: "don-elmers",
            storageBucket: "don-elmers.firebasestorage.app",
            messagingSenderId: "569277809850",
            appId: "1:569277809850:web:0aa28c0915fe05394f2e83",
        };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
