const cells = document.querySelectorAll('.cell');
const buttons = document.querySelectorAll('button');


// const gameText = document.querySelector('.gameAction');

const gameTurn = document.getElementById('playerTurn');
const cursor = document.querySelector('#gameCursor');
let cursorStatus = "ON";

gameField.forEach(field => {
    field.addEventListener('click', () => {
        if (gameTurn.value === 'X' && field.innerHTML === ''){
            field.innerHTML = gameTurn.value;
            gameTurn.value = 'O'
        } else if (gameTurn.value === 'O' && field.innerHTML === ''){
            field.innerHTML = gameTurn.value;
            gameTurn.value = 'X';
        }
        checkGame();
    })
})




/* Buttons */
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        /* RESET */
        if (btn.innerHTML === 'Reset' || btn.innerHTML === 'New Game'){
            cells.forEach(cell => {
                cell.innerHTML = '';
            })
            btn.innerHTML = 'Reset';
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



/* If all are filled - New Game*/
function checkGame() {
    let checkCount = 0;
    cells.forEach(cell => {
        if (cell.innerHTML !== ''){
            checkCount++;
            if (checkCount === 9){
                buttons.forEach(btn => {
                    if (btn.innerHTML === 'Reset'){
                        btn.innerHTML = 'New Game';
                    }
                })
            }
        }
    })
}





/* Mouse - Cursor */
    document.addEventListener('mousemove', (e) => {
        if (cursorStatus === "ON"){
            cursor.style.display = "inline-block";
            cursor.innerHTML = gameTurn.value;
            cursor.animate({
                left: e.clientX + "px",
                top: e.clientY + "px",
            },{duration: 500, fill: "forwards"});
        } else {
            cursor.style.display = "none";
        }
    })

