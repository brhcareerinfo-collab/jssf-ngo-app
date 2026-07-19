// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDO6qicYhQIAix_BFGgj_vskBTcZOzlmQc",
  authDomain: "jssf-member-portal.firebaseapp.com",
  projectId: "jssf-member-portal",
  storageBucket: "jssf-member-portal.firebasestorage.app",
  messagingSenderId: "1072736110249",
  appId: "1:1072736110249:web:d59de5fd4be72661324bb8",
  measurementId: "G-DJ00HETSYH"
};
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
