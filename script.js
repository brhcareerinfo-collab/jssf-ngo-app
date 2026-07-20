// Jeevan Setu Sahayata Foundation Website

document.addEventListener("DOMContentLoaded", function () {

    console.log("JSSF Website Loaded Successfully");

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

});
import { db } from "./firebase.js";

import {
collection,
onSnapshot
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const memberCount = document.getElementById("memberCount");

onSnapshot(collection(db, "members"), (snapshot) => {
    memberCount.textContent = snapshot.size;
});
