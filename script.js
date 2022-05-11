const X_CLASS = 'x'
const CIRCLE_CLASS = "circle"
const WINNING_COMBINATIONS =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton')

const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

//start the game ; initialize the default elements of the board
startGame()
restartButton.addEventListener('click', startGame)
function startGame(){
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(CIRCLE_CLASS)
        cell.classList.remove(X_CLASS)
        cell.addEventListener('click', handleClick, {once:true})
    });
    setBoadHoverClass();
    winningMessageElement.classList.remove('show')
}


function handleClick(e){
    cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else{
        swapTurns();  
        setBoadHoverClass()
    }
    
    
}
function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerHTML = 'Draw!'
    }else{
        winningMessageTextElement.innerHTML = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function placeMark(cell , currentClass){
    cell.classList.add(currentClass)
}
function swapTurns(){
    circleTurn = !circleTurn
}

function setBoadHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)

    circleTurn ? board.classList.add(CIRCLE_CLASS) :board.classList.add(X_CLASS)
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combinnation => {
        return combinnation.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

