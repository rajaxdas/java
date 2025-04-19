const board = document.getElementById("game");
const statusText = document.getElementById("status");
let cells = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;

function createBoard() {
    board.innerHTML = "";
    cells.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("box");
        cell.dataset.index = index;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    });
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (!gameActive || cells[index]) return;

    cells[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            document.querySelectorAll(".box")[a].classList.add("winner");
            document.querySelectorAll(".box")[b].classList.add("winner");
            document.querySelectorAll(".box")[c].classList.add("winner");
            gameActive = false;
            statusText.textContent = `${cells[a]} Wins!`;
            // return;
        }
    }

    if (!cells.includes(null)) {
        gameActive = false;
        statusText.textContent = "It's a Draw!";
        cells.forEach((_, index) => {
            document.querySelectorAll(".box")[index].classList.add("draw");
        });
        statusText.classList.add("drawText");
        statusText.removeAttribute("id");

    }
}

function restartGame() {
    cells = Array(9).fill(null);
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "";
    createBoard();
}

createBoard();