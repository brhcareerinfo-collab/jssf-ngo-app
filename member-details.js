import { db } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  alert("Member ID नहीं मिला");
  throw new Error("Member ID missing");
}

const docRef = doc(db, "members", id);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {

  const data = docSnap.data();

  document.getElementById("memberId").textContent = data.memberId || "-";
  document.getElementById("fullName").textContent = data.fullName || "-";
  document.getElementById("fatherName").textContent = data.fatherName || "-";
  document.getElementById("mobile").textContent = data.mobile || "-";
  document.getElementById("email").textContent = data.email || "-";
  document.getElementById("dob").textContent = data.dob || "-";
  document.getElementById("gender").textContent = data.gender || "-";
  document.getElementById("address").textContent = data.address || "-";
  document.getElementById("district").textContent = data.district || "-";
  document.getElementById("state").textContent = data.state || "-";
  document.getElementById("aadhaar").textContent = data.aadhaar || "-";
  document.getElementById("post").textContent = data.post || "-";
  document.getElementById("fee").textContent = data.fee || "-";
  document.getElementById("status").textContent = data.status || "-";

} else {

  alert("Member नहीं मिला");

}
