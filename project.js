// const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;
var balance = 0;
var bet = 0;
var line = 1;

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
      balance = depositAmount;
      $("#balance").text("Balance: " + balance + "$");
      return depositAmount;
    } else {
      alert("Please enter a valid number");
    }
  }
};

const getNumberOfLine = () => {
  while (true) {
    var numberOfLine = prompt("Enter number of line (1-3): ");
    numberOfLine = parseFloat(numberOfLine);
    if (numberOfLine && numberOfLine > 0 && numberOfLine <= 3) {
      $("#number-of-line").text("Number of line: " + numberOfLine);
      line = numberOfLine;
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
      $("#bet-amount").text("Bet Amount: " + betAmount + "$");
      bet = betAmount;
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

const getImgPath = (reels) => {
  const rowsFilePath = [];
  for (i = 0; i < ROWS; i++) {
    rowsFilePath.push([]);
    for (j = 0; j < COLS; j++) {
      switch (reels[j][i]) {
        case "A":
          rowsFilePath[i].push("7.png");
          break;
        case "B":
          rowsFilePath[i].push("watermelon.png");
          break;
        case "C":
          rowsFilePath[i].push("apple.png");
          break;
        case "D":
          rowsFilePath[i].push("orange.png");
          break;
      }
    }
  }
  return rowsFilePath;
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

const selectedSymbolsList = (rowsFilePath) => {
  var list = [];
  for (i = 0; i < rowsFilePath.length; i++) {
    list = list.concat(rowsFilePath[i]);
  }
  return list;
};
const onStart = () => {
  // let balance = deposit();
  // const numberOfLine = getNumberOfLine();
  // const betAmount = getBetAmount(balance, numberOfLine);
  const reels = spin();
  const rows = transpose(reels);
  const rowsFilePath = getImgPath(reels);
  const list = selectedSymbolsList(rowsFilePath);

  const imageContainer = document.querySelectorAll("img");

  for (i = 0; i < imageContainer.length; i++) {
    imageContainer[i].src = "./images/" + list[i];
  }
};
$(".start").click(function (e) {
  onStart();
});

$(".deposit-btn").click(function () {
  deposit();
});

$(".change-ln-btn").click(function () {
  getNumberOfLine();
});

$(".change-ba-btn").click(function () {
  getBetAmount(balance, line);
});
