// Cached Elements:
const gameBoardEl = document.querySelector("#game-board");
const colEls = gameBoardEl.children;
const statusMessageEl = document.querySelector("#status-message");
const restartButton = document.getElementById("restartGame");

// State:
const gameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const players = [1, 2];

let playerTurn = 1;

restartButton.style.visibility = "hidden";

statusMessageEl.textContent = "It's strawberry's turn.";

let winner = null;

let numMoves = 0;

// Event Listeners:
gameBoardEl.addEventListener("click", function (e) {
  if (e.target.className !== "cell" || winner) return;

  restartButton.style.visibility = "";

  const col = e.target.parentElement;
  const row = e.target;

  addMoveToBoard(col.getAttribute("data-num"), row.getAttribute("data-num"));
});

const addMoveToBoard = (colNum, rowNum) => {
  if (gameBoard[colNum][rowNum] === null) {
    gameBoard[colNum][rowNum] = playerTurn;
    numMoves++;
    checkWinner();
    render();
    changePlayer();
  }
};

const changePlayer = () => {
  playerTurn = players[playerTurn % 2];
};

const checkWinner = () => {
  gameBoard.forEach((col, colIdx) => {
    col.forEach((cell, cellIdx) => {
      if (!winner && cell) {
        if (col[cellIdx + 1] === cell && col[cellIdx + 2] === cell) {
          winner = cell;
        } else if (
          gameBoard[colIdx + 2] &&
          gameBoard[colIdx + 1][cellIdx] === cell &&
          gameBoard[colIdx + 2][cellIdx] === cell
        ) {
          winner = cell;
        } else if (
          gameBoard[colIdx + 2] &&
          gameBoard[colIdx + 2][cellIdx + 2] &&
          gameBoard[colIdx + 1][cellIdx + 1] === cell &&
          gameBoard[colIdx + 2][cellIdx + 2] === cell
        ) {
          winner = cell;
        } else if (
          gameBoard[colIdx - 2] &&
          gameBoard[colIdx - 2][cellIdx + 2] &&
          gameBoard[colIdx - 1][cellIdx + 1] === cell &&
          gameBoard[colIdx - 2][cellIdx + 2] === cell
        ) {
          winner = cell;
        }
      }
    });
  });
};

const render = () => {
  const colElsArr = Array.from(colEls);
  colElsArr.forEach((col, colIdx) => {
    const colArr = Array.from(col.children);
    colArr.forEach((cell, cellIdx) => {
      if (gameBoard[colIdx][cellIdx]) {
        cell.style.backgroundImage =
          gameBoard[colIdx][cellIdx] === 1
            ? "url('./assets/strawberry.png')"
            : "url('./assets/blueberry.png')";
      }
    });
  });

  if (winner) {
    statusMessageEl.textContent = `${
      winner === 1 ? "Strawberry" : "Blueberry"
    } is the winner!`;
  } else if (numMoves <= 8 && !winner) {
    statusMessageEl.textContent = `It's ${
      playerTurn !== 1 ? "strawberry" : "blueberry"
    }'s turn.`;
  } else {
    statusMessageEl.textContent = "It's a tie!";
  }
};

document.querySelector("#restartGame").onclick = function (e) {
  const colElsArr = Array.from(colEls);
  colElsArr.forEach((col, colIdx) => {
    const colArr = Array.from(col.children);
    colArr.forEach((cell, cellIdx) => {
      if (gameBoard[colIdx][cellIdx]) {
        cell.style.backgroundImage = "";
        gameBoard[colIdx][cellIdx] = null;
      }
    });
  });

  playerTurn = 1;
  statusMessageEl.textContent = "It's strawberry's turn.";
  statusMessageEl.style.backgroundColor = "";
  winner = null;
  numMoves = 0;
  restartButton.style.visibility = "hidden";
};
