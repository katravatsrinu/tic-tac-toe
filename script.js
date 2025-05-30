let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let vsAI= true;

let winPatterns = [
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
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("win");
  });
};

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const showWinner = (winner) => {
  msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
};

const highlightWinningBoxes = (pattern) => {
  pattern.forEach((index) => {
    boxes[index].classList.add("win");
  });
};

const aiMove = () =>{
    for(let box of boxes){
        if(box.innerText === "" && !box.disabled){
            box.innerText = "X";
            box.disabled = true;
            turnO =true;
            checkWinner();
            break;
        }
    }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let val1 = boxes[a].innerText;
    let val2 = boxes[b].innerText;
    let val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      highlightWinningBoxes(pattern);
      showWinner(val1);
      disableBoxes();
      return;
    }
  }

  // Draw condition
  let allFilled = [...boxes].every((box) => box.innerText !== "");
  if (allFilled) {
    msg.innerText = "😐 It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "" && !box.disabled) {
      if (turnO) {
        box.innerText = "O";
        box.disabled = true;
        turnO = false;

        const gameOver = checkWinner();
        if (!gameOver && vsAI) {
          setTimeout(aiMove, 500); // slight delay to simulate thinking
        }
      }
    }
  });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
