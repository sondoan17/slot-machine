// const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOLS_PAY = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  while (true) {
    var depositAmount = prompt("Enter a deposit amount: ");
    depositAmount = parseFloat(depositAmount);
    if (depositAmount && depositAmount > 0) {
      console.log("You deposited " + depositAmount + "$");
      return depositAmount;
    } else {
      console.log("Please enter a valid number");
    }
  }
};

const getNumberOfLine = () => {
  while (true) {
    var numberOfLine = prompt("Enter number of line (1-3): ");
    numberOfLine = parseFloat(numberOfLine);
    if (numberOfLine && numberOfLine > 0 && numberOfLine <= 3) {
      return numberOfLine;
    } else {
      console.log("Please enter a valid number");
    }
  }
};

const getBetAmount = (balance, numberOfLine) => {
  while (true) {
    var betAmount = prompt(
      "Enter bet amount per line (<=" +
        Math.floor(balance / numberOfLine) +
        "): "
    );
    betAmount = parseFloat(betAmount);
    if (betAmount > 0 && betAmount <= Math.floor(balance / numberOfLine)) {
      return betAmount;
    } else {
      console.log("Please enter a valid number");
    }
  }
};

const spin = () => {
  const symbols = [];

  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];

  for (i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);

      reelSymbols.splice(randomIndex, 1);
    }
  }

  return reels;
};

const transpose = (reels) => {
  const rows = [];
  for (i = 0; i < ROWS; i++) {
    rows.push([]);
    for (j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

let balance = deposit();
const numberOfLine = getNumberOfLine();
const betAmount = getBetAmount(balance, numberOfLine);
const reels = spin();
const rows = transpose(reels);

document.getElementById("11").innerText = rows[1][1];
