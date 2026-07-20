import { db } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  alert("Member ID नहीं मिला");
  throw new Error("Member ID Missing");
}

async function loadMember() {

  const docRef = doc(db, "members", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    alert("Member नहीं मिला");
    return;
  }

  const data = docSnap.data();

  document.getElementById("memberId").textContent =
    data.memberId || "-";

  document.getElementById("fullName").textContent =
    data.fullName || "-";

  document.getElementById("post").textContent =
    data.post || "-";

  document.getElementById("mobile").textContent =
    data.mobile || "-";

  document.getElementById("status").textContent =
    data.status || "Pending";

  // Photo
  if (data.photoURL) {

    document.getElementById("memberPhoto").src =
      data.photoURL;

  } else {

    document.getElementById("memberPhoto").src =
      "https://via.placeholder.com/100";

  }

}

loadMember();
