document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const message = document.getElementById('message');
    const switchToLogin = document.getElementById('switchToLogin');

    // Switch between registration and login forms
    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = "login.html"; // Make sure you have a login.html
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value.trim();
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value.trim();

        // Validation
        if (!firstName || !email || !password) {
            return showMessage("Заполните все поля", "red");
        }

        if (!validateEmail(email)) {
            return showMessage("Введите корректный email", "red");
        }

        if (password.length < 6) {
            return showMessage("Пароль должен быть не менее 6 символов", "red");
        }

        // Save new user
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.email === email)) {
            return showMessage("Этот email уже зарегистрирован", "red");
        }

        const newUser = {
            id: Date.now(),
            firstName,
            email,
            password // Note: In production, never store plain passwords
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto-login after registration
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify({
            firstName,
            email
        }));

        showMessage("Регистрация успешна! Перенаправление...", "green");
        
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1500);
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showMessage(text, color) {
        message.textContent = text;
        message.style.color = color;
        message.style.display = "block";
        setTimeout(() => {
            message.style.display = "none";
        }, 3000);
    }
});