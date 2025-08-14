document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const message = document.getElementById('message');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value.trim();
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value.trim();

        // === Валидация полей ===
        if (!firstName || !email || !password) {
            return showMessage("Заполните все поля", "red");
        }

        if (!validateEmail(email)) {
            return showMessage("Введите корректный email", "red");
        }

        if (password.length < 6) {
            return showMessage("Пароль должен быть не менее 6 символов", "red");
        }

        // === Проверка на дублирование email ===
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            return showMessage("Такой пользователь уже зарегистрирован", "red");
        }

        // === Сохранение нового пользователя ===
        const newUser = {
            id: Date.now(),
            firstName,
            email,
            password // ⚠️ Только для учебных целей (в реальности: хешируй)
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // === Сохраняем текущего пользователя как авторизованного ===
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify({
            firstName,
            email
        }));

        showMessage("Регистрация прошла успешно!", "green");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1200);
    });

    // === Проверка email ===
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // === Отображение сообщения ===
    function showMessage(text, color = "black") {
        if (message) {
            message.textContent = text;
            message.style.color = color;
        }
    }
});
