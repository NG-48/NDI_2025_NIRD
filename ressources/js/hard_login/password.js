let passwordInput = document.getElementById('password');
let pwdStatus = document.getElementById('pwdStatus');
let realPassword = "";
let previousRealPassword = "";
let previousFakePassword = "";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{1,2000}$/;

passwordInput.addEventListener('keypress', (e) => {  // ajout de caractères
    const key = e.key;
    realPassword += key;
    e.preventDefault();

    passwordInput.value += randomPasswordChar();
    updateStatus();
})

passwordInput.addEventListener('input', () => {  // suppression de caractères
    if (passwordInput.value === "") {
        realPassword = "";
    } else if (passwordInput.value.length < previousFakePassword.length) {
        const diff = previousFakePassword.length - passwordInput.value.length;

        let deletePosition = -1;
        for (let i = 0; i < passwordInput.value.length; i++) {
            if (previousFakePassword[i] !== passwordInput.value[i]) {
                deletePosition = i;
                break;
            }
        }

        if (deletePosition === -1) {
            deletePosition = passwordInput.value.length;
        }

        realPassword = realPassword.slice(0, deletePosition) +
            realPassword.slice(deletePosition + diff);
    }

    updateStatus();
});

passwordInput.addEventListener('paste', (e) => {  // anti-cheat ctrl+v
    e.preventDefault();
})


function randomPasswordChar() {
    const all = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{};:,.<>/?`~|";
    return all[Math.floor(Math.random() * all.length)];
}

function updateStatus() {
    previousRealPassword = realPassword;
    previousFakePassword = passwordInput.value;

    if (passwordRegex.test(passwordInput.value)) {  // un peu sales comme lignes
        pwdStatus.classList.remove('red');
        pwdStatus.classList.add('green');
        pwdStatus.textContent = "Mot de passe valide !"
    } else {
        pwdStatus.classList.remove('green');
        pwdStatus.classList.add('red');
        pwdStatus.textContent = "Mot de passe visible invalide ! il doit contenir à minima 1 miniscule, 1 majuscule, 1 chiffre et 1 caractère spécial"
    }
}

function getPassword() {
    return realPassword;
}