document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const message = document.getElementById('loginMessage');
    const switchToRegister = document.getElementById('switchToRegister');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = form.elements["email"].value.trim().toLowerCase();
        const password = form.elements["password"].value;

        const submitBtn = form.querySelector("button");
        submitBtn.disabled = true;
        submitBtn.textContent = "Вход...";

        if (!email || !password) {
            showMessage("Заполните все поля", "error");
            resetButton();
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            showMessage("Неверный email или пароль", "error");
            resetButton();
            return;
        }

        // Successful login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify({
            firstName: user.firstName,
            email: user.email
        }));

        showMessage("Вход выполнен! Перенаправление...", "success");
        
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1500);
    });

    function showMessage(text, type) {
        message.textContent = text;
        message.className = type;
        message.style.display = "block";
    }

    function resetButton() {
        const btn = form.querySelector("button");
        btn.disabled = false;
        btn.textContent = "Войти";
    }
});