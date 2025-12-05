/*
 * Le Train
 */

/** @type { HTMLDivElement[] } */
const wagons = document.querySelectorAll('.train-area .wagon')
let wagonTranform = 0;
let trainCanGatherConsumns = true;
let trainCanGatherVoyels = false;


function moveTrain(delta) {
    wagons.forEach((wagon) => {
        wagon.style.transform = `translateX(${wagonTranform + delta}vw)`
    })
    wagonTranform += delta;
}

async function trainLoop() {
    if (wagonTranform > -10 && wagonTranform < 0) {
        document.querySelectorAll('.consumn.on-rails').forEach((consumn) => {
            consumn.remove();
        })
        trainCanGatherConsumns = true;
    }
    else
        trainCanGatherConsumns = false;

    if (wagonTranform >= 70) {
        wagons.forEach((wagon) => {
            wagon.childNodes.forEach((node) => {
                textFieldResult.value += node.textContent;
            });
            wagon.replaceChildren();
        });
        wagonTranform = -20;
    }
    
    moveTrain(1);
    setTimeout(trainLoop, 100);
}

/** @param {HTMLDivElement} htmlDivElement */
function addLetterToRandomWagon(htmlDivElement) {
    htmlDivElement.classList.remove('falling');
    fallingLetters.delete(htmlDivElement);
    htmlDivElement.classList.add('on-board');
    htmlDivElement.style.transform = 'none';


    const possibilities = ['two', 'three', 'four', 'five'];

    const choosenIndex = possibilities[Math.floor(Math.random() * 4)];

    const choosenWagon = document.querySelector(`.wagon.${choosenIndex}`)

    choosenWagon.appendChild(htmlDivElement);

    choosenWagon.childNodes.forEach((node) => node.style.transform = 'none');
}

trainLoop();



/*
 * Le Train 2
 */

/** @type { HTMLDivElement[] } */
const wagons2 = document.querySelectorAll('.train-area2 .wagon2')
let wagonTranform2 = 0;
let trainCanGatherConsumns2 = true;
let trainCanGatherVoyels2 = false;


function moveTrain2(delta) {
    wagons2.forEach((wagon) => {
        wagon.style.transform = `translateX(${wagonTranform2 + delta}vw)`
    })
    wagonTranform2 += delta;
}

async function trainLoop2() {

    if (wagonTranform2 > 0 && wagonTranform2 < 20) {
        document.querySelectorAll('.voyel.on-rails').forEach((voyel) => {
            voyel.remove();
        })
        trainCanGatherVoyels2 = true;
    }
    else
        trainCanGatherVoyels2 = false;

    if (wagonTranform2 >= 70) {
        wagons2.forEach((wagon) => {
            wagon.childNodes.forEach((node) => {
                textFieldResult2.value += node.textContent;
            });
            wagon.replaceChildren();
        });
        wagonTranform2 = -20;
    }
    
    moveTrain2(1);
    setTimeout(trainLoop2, 75);
}

/** @param {HTMLDivElement} htmlDivElement */
function addLetterToRandomWagon2(htmlDivElement) {
    htmlDivElement.classList.remove('falling');
    fallingLetters.delete(htmlDivElement);
    htmlDivElement.classList.add('on-board');
    htmlDivElement.style.transform = 'none';


    const possibilities = ['two', 'three', 'four', 'five'];

    const choosenIndex = possibilities[Math.floor(Math.random() * 4)];

    const choosenWagon = document.querySelector(`.wagon2.${choosenIndex}`)

    choosenWagon.appendChild(htmlDivElement);

    choosenWagon.childNodes.forEach((node) => node.style.transform = 'none');
}

trainLoop2();

/* 
 * Les lettres qui tombent
 */

/** contient les translations Y de chaque fallingLetters
 * @type {Map<HTMLDivElement, number>} */
const fallingLetters = new Map();

/**
 * @param {String} letter 
 * @param {String} classname
 */
function createFallingLetter(letter, classname) {
    const newLetter = document.createElement('div');
    newLetter.classList.add('letter-container', 'falling');
    newLetter.textContent = letter;
    if (classname)
        newLetter.classList.add(classname);

    const goldbergMainDiv = document.getElementsByClassName('goldberg')[0];

    goldbergMainDiv.appendChild(newLetter);
    fallingLetters.set(newLetter, 0);
}

function lettersFallingLoop() {
    const elementsToDelete = [];
    fallingLetters.forEach((translation, htmlDivElement) => {
        letterFall(htmlDivElement, 1);
        if (translation >= 85) {
            elementsToDelete.push(htmlDivElement);
        }
    });
    // Delete elements after the loop
    elementsToDelete.forEach(el => fallingLetters.delete(el));
    setTimeout(lettersFallingLoop, 100);
}

/** @param {HTMLDivElement} htmlDivElement */
function letterFall(htmlDivElement, delta) {
    const translation = fallingLetters.get(htmlDivElement) + delta;

    if (translation >= 85 && htmlDivElement.classList.contains('consumn') && !htmlDivElement.classList.contains('on-board')) { // Sur les rails
        htmlDivElement.classList.remove('falling');
        htmlDivElement.classList.add('on-rails');
        
        return;
    }
    else if (translation >= 80 && htmlDivElement.classList.contains('consumn')) {

        if (trainCanGatherConsumns) {
            addLetterToRandomWagon(htmlDivElement);
            return;
        }
    }
    if (translation >= 70 && htmlDivElement.classList.contains('voyel') && !htmlDivElement.classList.contains('on-board')) { // Sur les rails
        htmlDivElement.classList.remove('falling');
        htmlDivElement.classList.add('on-rails');
        
        return;
    }
    else if (translation >= 65 && htmlDivElement.classList.contains('voyel')) {

        if (trainCanGatherVoyels2) {
            addLetterToRandomWagon2(htmlDivElement);
            return;
        }
    }
    else if (translation >= 40 && !htmlDivElement.classList.contains('separated')) {
        addToLetterSeparatorChamber(htmlDivElement);
    }
    
    htmlDivElement.style.transform = `translate(${htmlDivElement.classList.contains('separated') ? htmlDivElement.classList.contains('voyel') ? 8 : -2 : 0}vw, ${translation}vh)`;
    fallingLetters.set(htmlDivElement, translation);
}

lettersFallingLoop();


/* 
 * Les TextFields
 */

/** @type {HTMLTextAreaElement} */
const textFieldInitial = document.getElementById('initial-input');
/** @type {HTMLTextAreaElement} */
const textFieldResult = document.getElementById('result-input');
/** @type {HTMLTextAreaElement} */
const textFieldResult2 = document.getElementById('result-input2');


function textFieldDrainLoop() {
    
    const voyels = [
        'a', 'e', 'i', 'o', 'u', 'y',
        'à', 'â', 'ä', 'é', 'è', 'ê', 'ë', 'î', 'ï', 'ô', 'ö', 'ù', 'û', 'ü', 'ÿ',
    ]
    if (textFieldInitial.value.length != 0) {
        console.log(textFieldInitial.value.length);
        const lastChar = textFieldInitial.value.charAt(textFieldInitial.value.length - 1);
        textFieldInitial.value = textFieldInitial.value.slice(0, textFieldInitial.value.length - 1);

        const letterType = voyels.includes(lastChar.toLowerCase()) ? 'voyel' : 'consumn';
        createFallingLetter(lastChar, letterType);
    }
        
    setTimeout(textFieldDrainLoop, 1500);
}

textFieldDrainLoop();


/* 
 * Le séparateur de lettres
 */

/** @type {HTMLDivElement} */
const letterSeparatorChamber = document.querySelector('.letter-separator .separator-chamber');

/** @param {HTMLDivElement} htmlDivElement */
function addToLetterSeparatorChamber(htmlDivElement) {
    htmlDivElement.classList.add('separated');
    if (htmlDivElement.classList.contains('voyel')) {
        letterSeparatorChamber.style.transform = `translateX(8vw)`;
    }
    else if (htmlDivElement.classList.contains('consumn')) {
        letterSeparatorChamber.style.transform = `translateX(-2vw)`;
    }

    setTimeout(() => letterSeparatorChamber.style.transform = `translateX(0)`, 1000);
}