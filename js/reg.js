document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const message = document.getElementById('message'); // элемент для вывода сообщений

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value.trim();

        // ===== Валидация =====
        if (!name || !email || !password) {
            return showMessage("Заполните все поля", "red");
        }

        if (password.length < 6) {
            return showMessage("Пароль слишком короткий", "red");
        }

        if (!validateEmail(email)) {
            return showMessage("Введите корректный email", "red");
        }

        // ===== Проверка на существующего пользователя =====
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            return showMessage("Пользователь с таким email уже зарегистрирован", "red");
        }

        // ===== Создание нового пользователя =====
        const newUser = {
            id: Date.now(),
            firstName: name,
            email: email,
            password: password
        };

        users.push(newUser);
        localStorage.setItem('name', name)
        localStorage.setItem('email', email)
        localStorage.setItem('password', password)

        showMessage("Регистрация прошла успешно!", "green");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showMessage(text, color = "black") {
        if (message) {
            message.textContent = text;
            message.style.color = color;
        }
    }
});
