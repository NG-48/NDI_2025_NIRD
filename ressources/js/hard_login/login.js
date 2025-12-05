let chars = [
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
    "0","1","2","3","4","5","6","7","8","9"
];

let isRunning = false;

const keyboard = document.getElementById("keyboard");
const loginInput = document.getElementById("login");
for (let i = 0; i < chars.length; i++) {
    let key = document.createElement("button");
    key.textContent = chars[i];
    key.classList.add("key");
    key.addEventListener("click", (e) => {
        e.preventDefault();
        iteraction();
        loginInput.value += key.textContent;
        shuffle();
    })
    keyboard.appendChild(key);
}

shuffle();
const login = document.getElementById('timer');

loginInput.addEventListener("keypress", (e) => {  // anti-cheat html
    e.preventDefault();
})

loginInput.addEventListener('paste', (e) => {  // anti-cheat ctrl+v
    e.preventDefault();
})

function iteraction(){
    let inter 
    if(isRunning || inter!==undefined) return;
    let timeLeft = 21;
    isRunning = true;
    loginInput.value = ""
    inter = setInterval(function () {
        timeLeft--;
        if (timeLeft === 0) {
            isRunning = false;
            clearInterval(inter)
            inter=undefined;
        }
        login.textContent = timeLeft;
    }, 1000); //ms
}


function shuffle() {
    const buttons = Array.from(keyboard.children);

    for (let i = buttons.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [buttons[i], buttons[j]] = [buttons[j], buttons[i]];
    }

    keyboard.innerHTML = "";
    buttons.forEach(btn => keyboard.appendChild(btn));
}

function getLogin() {
    return loginInput.value;
}