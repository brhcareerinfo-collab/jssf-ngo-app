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

  querySnapshot.forEach((member) => {

    const data = member.data();

    table.innerHTML += `
      <tr>
        <td>${data.memberId || "-"}</td>
        <td>${data.fullName || ""}</td>
        <td>${data.mobile || ""}</td>
        <td>${data.post || ""}</td>
        <td>₹${data.fee || ""}</td>
        <td>${data.status || "Pending"}</td>
        <td>

          <button class="btn btn-primary btn-sm"
            onclick="viewMember('${member.id}')">
            View
          </button>

          <br><br>

          ${
            data.status === "Approved"
            ? `<span class="badge bg-success">Approved</span>`
            : `<button class="btn btn-success btn-sm"
                onclick="approveMember('${member.id}')">
                Approve
              </button>`
          }

          <br><br>

          ${
            data.status === "Rejected"
            ? `<span class="badge bg-danger">Rejected</span>`
            : `<button class="btn btn-danger btn-sm"
                onclick="rejectMember('${member.id}')">
                Reject
              </button>`
          }

        </td>
      </tr>
    `;

  });

}

loadMembers();

window.viewMember = function(id) {
  window.location.href = "member-details.html?id=" + id;
};

window.approveMember = async function(id) {

  await updateDoc(doc(db, "members", id), {
    status: "Approved",
    memberId: "JSSF" + Date.now()
  });

  alert("Member Approved");

  loadMembers();

};

window.rejectMember = async function(id) {

  await updateDoc(doc(db, "members", id), {
    status: "Rejected"
  });

  alert("Member Rejected");

  loadMembers();

};
