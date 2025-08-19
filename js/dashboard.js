document.addEventListener("DOMContentLoaded", () => {
    // 1. Get authentication data
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userData = JSON.parse(localStorage.getItem("currentUser")) || {};
    
    // 2. Get DOM elements
    const accName = document.getElementById("account-name");
    const logoutBtn = document.getElementById("logoutBtn");
    
    // 3. Update account display
    if (accName) {
        if (isLoggedIn && userData.firstName) {
            // Show username if logged in
            accName.textContent = userData.firstName;
            accName.style.color = "#f1f1f1"; // Ensure visibility
            accName.style.cursor = "default";
            accName.onclick = null;
        } else {
            // Show registration link if not logged in
            accName.textContent = "Зарегистрироваться";
            accName.style.color = "#4dabf7"; // Blue color for link
            accName.style.cursor = "pointer";
            accName.style.textDecoration = "underline";
            accName.onclick = () => window.location.href = "reg.html";
        }
    }
    
    // 4. Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("currentUser");
            window.location.href = "reg.html";
        });
    }
    
    // 5. Initialize Swiper
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