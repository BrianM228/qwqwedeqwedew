const form = document.getElementById("loginForm");
const message = document.getElementById("loginMessage");
const submitBtn = form.querySelector("button");


function showMessage(text, type) {
    message.textContent = text;
    message.className = type === "error" ? "error" : "success";
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.elements["email"].value.trim().toLowerCase();
    const password = form.elements["password"].value;

    submitBtn.disabled = true;
    submitBtn.textContent = "Проверка...";

    if (!email || !password) {
        showMessage("БЫСТРО ЗАПОЛНИ ВСЕ ПОЛЯ, ДУРАЛЕЙ!", "error");
        resetButton();
        return;
    }

    if (!validateEmail(email)) {
        showMessage("Введите корректный имейл", "error");
        resetButton();
        return;
    }

    if (password.length < 6) {
        showMessage("Пароль должен быть минимум 6 символов", "error");
        resetButton();
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
        (u) => u.email === email && u.password === password
    );

    if (!user) {
        showMessage("Неверный пароль или имейл", "error");
        resetButton();
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }));

    showMessage("Вход выполнен успешно", "success");

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1500);
});

function resetButton() {
    submitBtn.disabled = false;
    submitBtn.textContent = "Войти";
}
