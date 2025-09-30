const cells = document.querySelectorAll('.cell');
const buttons = document.querySelectorAll('button');


const gameText = document.querySelector('.gameResult');

const gameTurn = document.getElementById('playerTurn');
const cursor = document.querySelector('#gameCursor');
let cursorStatus = "OFF";

const clearDuration = 2500;

let X_wins = 0;
let O_wins = 0;

/* Game Status */
let gameOver = false;

const winCombinations = [
    [0, 1, 2], // Line ~ 1
    [3, 4, 5], // Line ~ 2
    [6, 7, 8], // Line ~ 3

    [0, 3, 6], // Column ~ 1
    [1, 4, 7], // Column ~ 2
    [2, 5, 8], // Column ~ 3

    [0, 4, 8], // Diagonal ~ 1
    [2, 4, 6], // Diagonal ~ 2
];


/* Show score (on load) */
window.onload = function(){
    let savedX = localStorage.getItem('xWins');
    let savedO = localStorage.getItem('oWins');

    if (savedX !== null && savedO !== null){
        X_wins = parseInt(savedX);
        O_wins = parseInt(savedO);
    }
    gameText.innerHTML = `Score<br>X: ${X_wins} O: ${O_wins}`;
}

function saveScore(){
    localStorage.setItem("xWins", X_wins);
    localStorage.setItem("oWins", O_wins);
}


cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (gameOver === false){
            if (gameTurn.value === 'X' && cell.innerHTML === ''){
                cell.innerHTML = gameTurn.value;
                gameTurn.value = 'O'
            } else if (gameTurn.value === 'O' && cell.innerHTML === ''){
                cell.innerHTML = gameTurn.value;
                gameTurn.value = 'X';
            }
            playSound('Files/Sound/playerClick.mp3');
        } else { return }
        checkGame();
    })
})


/* Buttons */
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        /* RESET */
        if (btn.innerHTML === 'Reset'){
            clearCells();
        }

        /* CURSOR */
        if (btn.innerHTML === 'Cursor'){
            if (cursorStatus === "ON"){
                cursorStatus = "OFF";
            } else if (cursorStatus === "OFF"){
                cursorStatus = "ON";
            }
        }
        playSound('Files/Sound/btnClick.mp3');
    })
    btn.addEventListener('dblclick', () => {

        /* Safety question in case of misclick */
        /* TIMEOUT to avoid sound not playing before pop-up */
        playSound('Files/Sound/question-mark.mp3');
        setTimeout(() => {
            if (confirm('Do you wish to reset the score completely?')){
                if (btn.innerHTML === 'Reset'){
                    O_wins = 0;
                    X_wins = 0;
                    clearCells();
                }
                playSound('Files/Sound/dblClick.mp3');
            } else {
                alert('The score has not been changed.')
            }
        }, 250)
    })
})




function checkGame() {
    for (let combo of winCombinations) {
        let [a, b, c] = combo;
        let valA = cells[a].innerHTML;
        let valB = cells[b].innerHTML;
        let valC = cells[c].innerHTML;

        if (valA === valB && valA === valC && valA !== ''){
            gameOver = true; // ~ Stops input from user
            playSound('Files/Sound/winning-sound-effect.mp3');
            showText(valA); // Shows winner (text)
            if (valA === 'X'){ X_wins++ }
            if (valA === 'O'){ O_wins++ }
            saveScore();
            setTimeout(clearCells, clearDuration);
            return valA;
        }
    }
    let checkCells = 0;
    cells.forEach((cell) => {
        if (cell.innerHTML !== ''){
            checkCells++;
        }
        if (checkCells === 9){
            showText('Draw');
            setTimeout(clearCells, clearDuration);
        }
    })
    return null;
}





/* Mouse - Cursor */
    document.addEventListener('mousemove', (e) => {
        if (cursorStatus === "ON"){
            cursor.style.display = "inline-block";
            cursor.innerHTML = gameTurn.value;
            cursor.animate({
                left: e.clientX + 15 + "px",
                top: e.clientY + 15 + "px",
            },{duration: 500, fill: "forwards"});
        } else {
            cursor.style.display = "none";
        }
    })



function clearCells(){
    /* Update score - then clear */
    gameText.innerHTML = `Score<br>X: ${X_wins} O: ${O_wins}`
        cells.forEach(cell => {
            cell.innerHTML = '';
        })
    saveScore();
    gameOver = false;
}


function showText(input){
    /* Winner || Draw */
    if (input === 'X' || input === 'O'){
        gameText.innerHTML += `<br>The winner is ${input}!`;
    }
    if (input === 'Draw'){
        gameText.innerHTML += `<br>Draw!`;
        playSound('Files/Sound/error.mp3');
    }
}

function playSound(src){
    new Audio(src).play();
}



