let form = document.getElementById("loginForm")
let loginMessage = document.getElementById("loginMessage")

form.addEventListener("submit", (e) => {
    e.preventDefault()


    let email = form.querySelector('input[type="email"]').value.trim().toLowerCase();
    let password = form.querySelector('input[type="password"]').value;


if(!email || !password) {
    return showMessage("Субо заполни все поля", 'red')
}

if (!validateEmail(email)) {
    return showMessage("Введите корректный email", 'red')
}

if (password.length < 6) {
    return showMessage("Пароль слишком маленький", 'red')
}
 
let users = JSON.parse(localStorage.getItem("users")) || []
let user = users.find (
    (user) => user.email === email && user.password === password
);
 if (!user) {
    return showMessage("Неверный пароль или email", 'red')
 }
  if (user.password != password) {
    return showMessage("Неверный пароль", 'red')
 }


localStorage.setItem(
    "currentUser",
    JSON.stringify({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }))
showMessage("Вход выполнен", 'green')

setTimeout(() => {
    window.location.href = "dashboard.html";
}, 1500)
})

function showMessage(text, color) {
    loginMessage.textContent = text;
    loginMessage.style.color = color;
}


function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}