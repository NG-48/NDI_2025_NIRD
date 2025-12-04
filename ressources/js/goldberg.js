/*
 * Le Train
 */

const trainContainer = document.getElementsByClassName('train-area');

/** @type { HTMLDivElement[] } */
const wagons = document.querySelectorAll('.train-area .wagon')
let wagonTranform = 0;

function moveTrain(delta) {
    wagons.forEach((wagon) => {
        wagon.style.transform = `translate(${wagonTranform + delta}vw, 0)`
    })
    wagonTranform += delta;
}

async function trainLoop() {
    if (wagonTranform >= 70)
        wagonTranform = -20;
    
    moveTrain(1);
    setTimeout(trainLoop, 100);
}

trainLoop();


/* 
 * 
 */