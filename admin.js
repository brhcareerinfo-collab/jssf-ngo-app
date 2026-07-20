import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  runTransaction
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
const table = document.getElementById("memberTable");
const searchInput = document.getElementById("searchInput");
const counterRef = doc(db, "counters", "membership");
let allMembers = [];

async function loadMembers() {

  try {

    table.innerHTML = `
      <tr>
        <td colspan="7" class="text-center">
          Loading...
        </td>
      </tr>
    `;

    const snapshot = await getDocs(collection(db, "members"));

    allMembers = [];

    snapshot.forEach((docSnap) => {

      allMembers.push({
        id: docSnap.id,
        ...docSnap.data()
      });

    });

    renderTable(allMembers);

  } catch (error) {

    console.error(error);

    table.innerHTML = `
      <tr>
        <td colspan="7" class="text-danger text-center">
          ${error.message}
        </td>
      </tr>
    `;

  }

}

function renderTable(list) {

  table.innerHTML = "";

  let total = 0;
  let approved = 0;
  let pending = 0;
  let rejected = 0;
  let totalCollection = 0;

  list.forEach((data) => {

    total++;

    if (data.status === "Approved") {

      approved++;

    } else if (data.status === "Rejected") {

      rejected++;

    } else {

      pending++;

    }

    totalCollection += Number(data.fee || 0);

    table.innerHTML += `

<tr>

<td>${data.memberId || "-"}</td>

<td>${data.fullName || ""}</td>

<td>${data.mobile || ""}</td>

<td>${data.post || ""}</td>

<td>₹${data.fee || 0}</td>

<td>${data.status || "Pending"}</td>

<td>

<button
class="btn btn-primary btn-sm mb-2 w-100"
onclick="viewMember('${data.id}')">
View
</button>

<button
class="btn btn-warning btn-sm mb-2 w-100"
onclick="window.location.href='id-card.html?id=${data.id}'">
🪪 ID Card
</button>

${
data.status==="Pending"
?

`<button
class="btn btn-success btn-sm mb-2 w-100"
onclick="approveMember('${data.id}')">
Approve
</button>

<button
class="btn btn-danger btn-sm w-100"
onclick="rejectMember('${data.id}')">
Reject
</button>`

:

data.status==="Approved"

?

`<span class="badge bg-success">
Approved
</span>`

:

`<span class="badge bg-danger">
Rejected
</span>`

}

</td>

</tr>

`;

  });

  if (list.length === 0) {

    table.innerHTML = `
<tr>
<td colspan="7" class="text-center">
No Members Found
</td>
</tr>
`;

  }

  document.getElementById("totalMembers").textContent = total;
  document.getElementById("approvedMembers").textContent = approved;
  document.getElementById("pendingMembers").textContent = pending;
  document.getElementById("rejectedMembers").textContent = rejected;
  document.getElementById("totalCollection").textContent = "₹" + totalCollection;

}

searchInput.addEventListener("keyup", function () {

  const value = this.value.toLowerCase();

  const filtered = allMembers.filter(member =>

(member.fullName || "").toLowerCase().includes(value) ||

(member.mobile || "").includes(value) ||

(member.memberId || "").toLowerCase().includes(value)

);

renderTable(filtered);

});

window.viewMember = function(id){

window.location.href="member-details.html?id="+id;

}

window.approveMember = async function(id){

  try {

    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear()).slice(-2);

    await runTransaction(db, async (transaction) => {

      const counterDoc = await transaction.get(counterRef);

      let lastNumber = 0;

      if (counterDoc.exists()) {
        lastNumber = counterDoc.data().lastNumber || 0;
      }

      lastNumber++;

      const memberId =
        `JSSF/${month}/${year}/${String(lastNumber).padStart(4,"0")}`;

      transaction.update(counterRef,{
        lastNumber:lastNumber
      });

      transaction.update(doc(db,"members",id),{

        status:"Approved",

        memberId:memberId

      });

    });

    alert("Member Approved Successfully");

    loadMembers();

  } catch(err){

    console.error(err);

    alert(err.message);

  }

window.rejectMember = async function(id){

  await updateDoc(doc(db,"members",id),{
    status:"Rejected"
  });

  alert("Member Rejected");
  } // <-- catch के बाद approveMember को बंद करो

}

window.rejectMember = async function(id){

  try{

    await updateDoc(doc(db,"members",id),{
      status:"Rejected"
    });

    alert("Member Rejected Successfully");

  }catch(err){

    console.error(err);

    alert(err.message);

  }

}

loadMembers();
  
  loadMembers();
