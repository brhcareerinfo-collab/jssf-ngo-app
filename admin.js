import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const table = document.getElementById("memberTable");

async function loadMembers() {

  const querySnapshot = await getDocs(collection(db, "members"));

  querySnapshot.forEach((doc) => {

    const data = doc.data();

    table.innerHTML += `
      <tr>
        <td>${data.fullName || ""}</td>
        <td>${data.mobile || ""}</td>
        <td>${data.post || ""}</td>
        <td>₹${data.fee || ""}</td>
        <td>${data.status || "Pending"}</td>
      </tr>
    `;
  });

}

loadMembers();
