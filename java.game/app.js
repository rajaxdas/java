let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Player O starts

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true; // Reset turn to 'O'
    enableBoxes();
    msgContainer.classList.add("hide"); // Hide the winner message
};

// Function to enable boxes and reset text
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.innerText = ""; // Clear box text
        box.disabled = false; // Enable all boxes
    });
};

// Function to disable all boxes
const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

// Function to display the winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}!`;
    msgContainer.classList.remove("hide"); // Show message
    disableBoxes(); // Disable further moves
};

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            console.log("Winner:", pos1val);
            showWinner(pos1val);
            return;
        }
    }
};

// Add event listeners for boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box clicked");
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true; // Disable the clicked box
        checkWinner(); // Check for a winner
    });
});

// Add event listeners to buttons
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
