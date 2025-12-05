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
        wagon.style.transform = `translate(${wagonTranform + delta}vw, 0)`
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

    if (wagonTranform > 10 && wagonTranform < 30) {
        document.querySelectorAll('.voyel.on-rails').forEach((voyel) => {
            voyel.remove();
        })
        trainCanGatherVoyels = true;
    }
    else
        trainCanGatherVoyels = false;

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

    console.log(htmlDivElement);
    

    const possibilities = ['two', 'three', 'four', 'five'];

    const choosenIndex = possibilities[Math.floor(Math.random() * 3)];

    const choosenWagon = document.querySelector(`.wagon.${choosenIndex}`)

    choosenWagon.appendChild(htmlDivElement);

    choosenWagon.childNodes.forEach((node) => node.style.transform = 'none');
}

trainLoop();


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

    if (translation >= 85 && !htmlDivElement.classList.contains('on-board')) { // Sur les rails
        htmlDivElement.classList.remove('falling');
        htmlDivElement.classList.add('on-rails');
        
        return;
    }
    else if (translation >= 65) {

        if (htmlDivElement.classList.contains('voyel') && trainCanGatherVoyels) {
            addLetterToRandomWagon(htmlDivElement);
            return;
        }
        else if (htmlDivElement.classList.contains('consumn') && trainCanGatherConsumns) {
            addLetterToRandomWagon(htmlDivElement);
            return;
        }
    }
    
    htmlDivElement.style.transform = `translate(0, ${translation}vh)`;
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
        
    setTimeout(textFieldDrainLoop, 1000);
}

textFieldDrainLoop();