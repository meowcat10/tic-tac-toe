const cells = document.querySelectorAll('.cell');
const buttons = document.querySelectorAll('button');


const gameText = document.querySelector('.gameResult');

const gameTurn = document.getElementById('playerTurn');
const cursor = document.querySelector('#gameCursor');
let cursorStatus = "OFF";

const clearDuration = 2500;

let X_wins = 0;
let O_wins = 0;
// let Computer_wins = 0;

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
gameText.innerHTML = `Score<br>X: ${X_wins} O: ${O_wins}`;

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
        } else { return }
        checkGame();
    })
})


/*
    gameTurn.addEventListener('click', () => {
        if (gameTurn.value === 'Computer'){
            gameText.innerHTML += `<br>You are now playing against the computer!`;
            gameTurn.value = 'X';
            setTimeout(clearCells, 4000);
        }
    })
*/



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
    })
    btn.addEventListener('dblclick', () => {
        if (btn.innerHTML === 'Reset'){
            O_wins = 0;
            X_wins = 0;
            clearCells();
        }
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
            showText(valA); // Shows winner (text)
            if (valA === 'X'){ X_wins++ }
            if (valA === 'O'){ O_wins++ }
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
    gameOver = false;
}


function showText(input){
    /* Winner || Draw */
    if (input === 'X' || input === 'O'){
        gameText.innerHTML += `<br>The winner is ${input}!`;
    }
    if (input === 'Draw'){
        gameText.innerHTML += `<br>Draw!`;
    }

}