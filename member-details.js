
import { db } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const docRef = doc(db, "members", id);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {

  const data = docSnap.data();

  document.getElementById("memberId").textContent = data.memberId || "-";
  document.getElementById("fullName").textContent = data.fullName || "-";
  document.getElementById("mobile").textContent = data.mobile || "-";
  document.getElementById("post").textContent = data.post || "-";
  document.getElementById("status").textContent = data.status || "-";
  document.getElementById("fee").textContent = data.fee || "-";

} else {

  alert("Member नहीं मिला");

}
