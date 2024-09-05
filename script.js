const gameInfo = document.querySelector('.gameInfo');
const boxes = document.querySelectorAll('.box');
const newGameBtn = document.querySelector('.btn');
const xWinCountElement = document.querySelector('.x-win-count');
const oWinCountElement = document.querySelector('.O-win-count');

let currentPlayer;
let startturn='X';
let gameGrid;
let xWinCount =0;
let oWinCount =0;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize the game
function initialize() {
    // Set Current Player to X 
    currentPlayer = startturn;
    gameInfo.textContent = `Current Player: ${currentPlayer}`;

    // Empty Kar Do Boxes 
    gameGrid = ["", "", "", "", "", "", "", "", ""]

    // Make Boxes Empty
    boxes.forEach((box,index) => {
        box.textContent = "";
        box.style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });

    
   
   

}

initialize();
function swapTurns() {
    startturn = startturn === "X" ? "O" : "X";
}

// Handle Click Game 
function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].style.pointerEvents = "none";
        boxes[index].textContent = currentPlayer;
        gameGrid[index] = currentPlayer;
        swapTurns();
        gameInfo.textContent = `Current Player : ${currentPlayer}`;
        checkGameOver();
    }
}


//update win count
function updateWinCount(winner) {
    if (winner === 'X') {
        xWinCount++;
        xWinCountElement.textContent = xWinCount;
    } else if (winner === 'O') {
        oWinCount++;
        oWinCountElement.textContent = oWinCount;
    }
}


// Check Game is Over or Not 
function checkGameOver() {
    let winner = "";
    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            winner = gameGrid[position[0]] === "X" ? "X" : "O";

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            updateWinCount(winner);
        }
    });

    if (winner !== "") {
        gameInfo.textContent = `Winner is - ${winner}`;
        newGameBtn.classList.add("active");
        setTimeout(() => {
            swapTurns();
            initialize(); // Start a new game after 1 second
            
        }, 1000);
        return;
    }


    // Here is not winner yet Check for tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    });

    if (fillCount === 9) {
        gameInfo.textContent = "Game Tied !";
        newGameBtn.classList.add("active");
        setTimeout(() => {
            swapTurns();
            initialize(); // Start a new game after 1 second
            
        }, 1000);
    }
}

// Swapping Turns 
function swapTurns() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}


// Add Event Listener to all Boxes to Get Player Input
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    });
});

// Add Event Listener to Button 
newGameBtn.addEventListener('click', ()=>{
    xWinCount =0;
    oWinCount =0;
    xWinCountElement.textContent = xWinCount;
    oWinCountElement.textContent = oWinCount;
    startturn='X';
    initialize();
    
});