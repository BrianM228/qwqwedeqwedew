document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const currentUser = localStorage.getItem("name");

    const accName = document.getElementById("account-name");
    const accountSection = document.getElementById("accountSection");
    const logoutBtn = document.getElementById("logoutBtn");

    // Показываем имя
    if (accName && currentUser) {
        accName.textContent = currentUser;
    }

    // Показываем панель аккаунта
    if (accountSection && isLoggedIn) {
        accountSection.style.display = "flex";
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("currentUser");
            window.location.href = "reg.html";
        });
    }

    if (!isLoggedIn) {
    alert("Сначала войдите в аккаунт.");
    window.location.href = "login.html"; // или reg.html
}

    // Swiper
    if (typeof Swiper !== "undefined") {
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
    }
});
