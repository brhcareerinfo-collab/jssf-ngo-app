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
