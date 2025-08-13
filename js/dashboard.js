document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("name");

    const accName = document.querySelector(".account-name");
    const accountSection = document.getElementById("accountSection");
    const logoutBtn = document.getElementById("logoutBtn");

    // Показываем имя
    if (accName) accName.textContent = currentUser;

    // Показываем раздел
    if (accountSection) accountSection.style.display = "flex";

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("email");
            localStorage.removeItem("name");
            localStorage.removeItem("password");
            window.location.href = "reg.html";
        });
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
