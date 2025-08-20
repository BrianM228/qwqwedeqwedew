document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userData = JSON.parse(localStorage.getItem("currentUser")) || {};

    const accName = document.getElementById("account-name");
    const logoutBtn = document.getElementById("logoutBtn");
    
    if (accName) {
        if (isLoggedIn && userData.firstName) {
            accName.textContent = userData.firstName;
            accName.style.color = "#f1f1f1"; 
            accName.style.cursor = "default";
            accName.onclick = null;
        } else {

            accName.textContent = "Зарегистрироваться";
            accName.style.color = "#4dabf7"; 
            accName.style.cursor = "pointer";
            accName.style.textDecoration = "underline";
            accName.onclick = () => window.location.href = "reg.html";
        }
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("currentUser");
            window.location.href = "reg.html";
        });
    }

    if (typeof Swiper !== "undefined") {
        try {
            new Swiper(".swiper-container", {
                direction: "vertical",
                slidesPerView: 1,
                spaceBetween: 10,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            });
        } catch (error) {
            console.error("Swiper error:", error);
        }
    }
});