import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const form = document.getElementById("memberForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  alert("Connection Successful");

  // अगले स्टेप में पूरा Firestore Save कोड जोड़ेंगे
});
