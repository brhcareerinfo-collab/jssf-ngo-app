import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const form = document.getElementById("memberForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {

    await addDoc(collection(db, "members"), {
      fullName: document.getElementById("fullName").value,
      fatherName: document.getElementById("fatherName").value,
      mobile: document.getElementById("mobile").value,
      email: document.getElementById("email").value,
      dob: document.getElementById("dob").value,
      gender: document.getElementById("gender").value,
      address: document.getElementById("address").value,
      state: document.getElementById("state").value,
      district: document.getElementById("district").value,
      post: document.getElementById("post").options[document.getElementById("post").selectedIndex].text,
      fee: document.getElementById("fee").value,
      status: "Pending",
      paymentStatus: "Pending",
      createdAt: serverTimestamp()
    });

    alert("आवेदन सफलतापूर्वक जमा हो गया।");

    window.location.href = "payment.html";

  } catch (error) {
    alert("त्रुटि: " + error.message);
  }
});
