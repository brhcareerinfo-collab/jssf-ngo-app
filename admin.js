import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const table = document.getElementById("memberTable");

async function loadMembers() {

  table.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "members"));

  querySnapshot.forEach((doc) => {

    const data = doc.data();

    table.innerHTML += `
      <tr>
  <td>${data.memberId || "-"}</td>
  <td>${data.fullName || ""}</td>
        <td>${data.mobile || ""}</td>
        <td>${data.post || ""}</td>
        <td>₹${data.fee || ""}</td>
        <td>${data.status || "Pending"}</td>
        <td>
          <button
class="btn btn-success btn-sm"
onclick="approveMember('${doc.id}')">
Approve
</button>

<button
class="btn btn-danger btn-sm"
onclick="rejectMember('${doc.id}')">
Reject
</button>
        </td>
      </tr>
    `;

  });

}

loadMembers();
window.approveMember = async function(id) {

  await updateDoc(doc(db, "members", id), {
    status: "Approved",
    memberId: "JSSF" + Date.now()
});

  alert("Member Approved");

  loadMembers();

}

window.rejectMember = async function(id) {

  await updateDoc(doc(db, "members", id), {
    status: "Rejected"
  });

  alert("Member Rejected");

  loadMembers();

}
