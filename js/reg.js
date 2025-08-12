const form = document.getElementById("registrationForm");
const message = document.getElementById("message");


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.toLowerCase();
    const password = document.getElementById("password").value;

    if (!firstName || !lastName || !email || !password) {
        return showMessage("заполните все поля", "red");
    }

    if (password.length < 6) {
        return showMessage("пароль слишком маленький", "red");
    }

    if (!validateEmail(email)) {
        return showMessage("Введите корректный имейл", "red");
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email)) {
        return showMessage("Email уже зарегистрирован", "red");
    }

    const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        password
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    form.reset();

    showMessage("Регистрация прошла успешна. Перенаправление...", "green");

    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);

})


function showMessage(text, color){
    message.textContent = text;
    message.style.color = color
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}