const result = document.querySelector('.game-status');

let gameActive = true;
let currentPlayer = "X";
//all the states
let gameConditions = ["","","","","","","","","",""];


const winGame = ()=> `Player ${currentPlayer} has Won!`;
//forgot I can use it in single line also
//arrow function can be used in single line when there is no multilines
const drawGame = () => `Game is Drawn!`;
const currentPlayerTurn = ()=> `It's ${currentPlayer} turn`
result.innerHTML = currentPlayerTurn();


//e stands for event for each cell get clicked
function cellClicked(e){
    const clickCells = e.target;

    //getAttribute are use to take all the string values in the cell and converted into integer by parseint
    const cellIndexes = parseInt(clickCells.getAttribute('data-index'));
    //to checked game is paused or played
    if(gameConditions[cellIndexes] !== '' || !gameActive){
        return;
    }
    cellPlayed(clickCells,cellIndexes);
    resultValidation();
}

//all the possibilites of wining
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

function changePlayer(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    result.innerHTML = currentPlayerTurn();
}


function resultValidation(){
    let roundWon = false;
    let i;
    for(let i=0;i<7;i++){
        const winingConditions = winConditions[i];
        let a = gameConditions[winingConditions[0]];
        let b = gameConditions[winingConditions[1]];
        let c = gameConditions[winingConditions[2]];
        

        if(a==='' || b==='' || c===''){
            continue;
        }if(a===b && b===c){
            roundWon=true;
            break;
        }
    }
    if(roundWon){
        result.innerHTML= winGame();
        gameActive = false
        return;
    }

    let roundDrwan =! gameConditions.includes("");
    if(roundDrwan){
        result.innerHTML = drawGame();
        gameActive = false;
        return;
    }
    changePlayer();
}

function cellPlayed(clickCells,cellIndexes){
    gameConditions[cellIndexes] = currentPlayer;
    clickCells.innerHTML = currentPlayer;
}

function restartGame(){
    gameActive=true;
    currentPlayer="X";
    gameConditions=["","","","","","","","","",""];
    result.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML='');
}

//we can access click and restart game with single foreach fucntion
var cells = document.querySelectorAll('.cell')
cells.forEach((clicks)=>{
    clicks.addEventListener("click",cellClicked)
});
document.querySelector('.restart_game').addEventListener("click",restartGame);