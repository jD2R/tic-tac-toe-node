const prompt = require('prompt-sync')({sigint: true});

let gameMap = "         ".split("");
let gameOver = false;
let currentMove = "X";

const winningConditions = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
];
const printMap = () => console.log(`
 ${gameMap[0]} | ${gameMap[1]} | ${gameMap[2]}
-----------
 ${gameMap[3]} | ${gameMap[4]} | ${gameMap[5]}
-----------
 ${gameMap[6]} | ${gameMap[7]} | ${gameMap[8]}
`);
const findWin = (turn) => winningConditions.some(a => [gameMap[a[0]], gameMap[a[1]], gameMap[a[2]]].every(e => e === turn));

const gameLoop = (turn) => {

	printMap(gameMap);

	if (gameMap.includes(" ") && !findWin("X") && !findWin("O")) {

		console.log(`It's ${turn}'s turn!\n`);

		let x = 0,
			y = 0;

		do {
			x = parseInt(prompt(`Input the x-coord of the space you want to place: `));
			y = parseInt(prompt(`Input the y-coord of the space you want to place: `));

			if (x >= 0 && x <= 2 && y >= 0 && y <= 2 && gameMap[x + y * 3] == " ") {
				gameMap[x + y * 3] = turn;
				currentMove = (currentMove === "X") ? "O" : "X";
				console.clear();
				break;
			} else {
				console.log("\nCan't place there! Try again...\n")
			}
		}
		while (true);
		

	} else {

		let state = findWin("X") ? "X wins!" : findWin("O") ? "O wins!" : "it's a tie!";
		console.log(`Game over, ${state}`);
		gameOver = true;

	}
}

console.clear();
while (!gameOver) {

	gameLoop(currentMove);

}