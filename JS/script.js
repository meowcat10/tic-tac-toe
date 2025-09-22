const cells = document.querySelectorAll('.cell');
const buttons = document.querySelectorAll('button');


const gameText = document.querySelector('.gameResult');

const gameTurn = document.getElementById('playerTurn');
const cursor = document.querySelector('#gameCursor');
let cursorStatus = "OFF";

let X_wins = 0;
let O_wins = 0;

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


setInterval(() => {
    gameText.innerHTML = `Score<br>X: ${X_wins} O: ${O_wins}`;
}, 2500);
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (gameTurn.value === 'X' && cell.innerHTML === ''){
            cell.innerHTML = gameTurn.value;
            gameTurn.value = 'O'
        } else if (gameTurn.value === 'O' && cell.innerHTML === ''){
            cell.innerHTML = gameTurn.value;
            gameTurn.value = 'X';
        }
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
        if (btn.innerHTML === 'Cursor: ON'){
            btn.innerHTML = 'Cursor: OFF';
            cursorStatus = "OFF";
        } else if (btn.innerHTML === 'Cursor: OFF'){
            cursorStatus = "ON";
            btn.innerHTML = 'Cursor: ON';
        }

        console.log(btn.innerHTML);
    })
})




function checkGame() {
    for (let combo of winCombinations) {
        let [a, b, c] = combo;
        let valA = cells[a].innerHTML;
        let valB = cells[b].innerHTML;
        let valC = cells[c].innerHTML;

        if (valA === valB && valA === valC && valA !== ''){
            gameText.innerHTML += `<br>The winner is ${valA}!`;
            if (valA === 'X'){ X_wins++ }
            if (valA === 'O'){ O_wins++ }
            setTimeout(clearCells, 2000);
            return valA;
        }
    }
    let checkCells = 0;
    cells.forEach((cell) => {
        if (cell.innerHTML !== ''){
            checkCells++;
        }
        if (checkCells === 9){
            gameText.innerHTML += `<br>Draw!`;
            setTimeout(clearCells, 2000);
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
        cells.forEach(cell => {
            cell.innerHTML = '';
        })
}