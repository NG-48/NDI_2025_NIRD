let age_div = document.getElementById("age_div");
let base16 = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];

function addScrollor(obj){
    obj.value = 0;
    obj.button = document.createElement("button");
    obj.button.textContent = "0";

    obj.inter = setInterval(() => { increment_timer_age(obj); }, tempsRandomScrollor());

    obj.button.addEventListener("click", (e) => {
        e.preventDefault();
        alternateStateScrollor(obj);
    });

    age_div.appendChild(obj.button);
}

function increment_timer_age(obj){
    obj.value += 1;
    obj.value%=16;
    obj.button.textContent = `${base16[obj.value]}`;
}

function tempsRandomScrollor(){
    return Math.floor(200 + Math.random() * 800)
}

function alternateStateScrollor(obj){
    if(obj.inter){
        clearInterval(obj.inter);
        obj.inter = null;
    } else {
        obj.inter = setInterval(() => { increment_timer_age(obj); }, tempsRandomScrollor());
    }
}


let compteurLeft = { coeff: 16 };
addScrollor(compteurLeft);
let compteurRight = { coeff: 1 };
addScrollor(compteurRight);

function getAgeForm(){
    return compteurLeft.coeff * compteurLeft.value + compteurRight.coeff * compteurRight.value
}