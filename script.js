const gameboard = (function () {
    let cells = new Array(9).fill(null);

    const reset = () => cells = Array(9).fill(null);

    const setCell = (index, symbol) => {
        if (cells[index] === null) {
            cells[index] = symbol;
            return true;
        }
        return false;
    }

    const getBoard = () => cells;

    return { reset, setCell, getBoard };
})();

function createPlayer (name, symbol) {

    const getName = () => name;
    const getSymbol = () => symbol;

    return { getName, getSymbol };
}

const gameController = (function () {
    let currentPlayer;
    let firstPlayer;
    let secondPlayer;
    let winner = null;

    const getCurrentPlayer = () => currentPlayer;
    const getWinner = () => winner;

    const getPlayer1 = () => firstPlayer;
    const getPlayer2 = () => secondPlayer;

    const startGame = (player1, player2) => {
        document.getElementById("player1-game-name").textContent = player1.getName();
        document.getElementById("player2-game-name").textContent = player2.getName();
        firstPlayer = player1;
        secondPlayer = player2;
        currentPlayer = firstPlayer;
        gameboard.reset();
        winner = null;
        displayController.updateBoard();
        document.getElementById("result").textContent = "";
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === firstPlayer ? secondPlayer : firstPlayer;
        console.log(`Current player: ${currentPlayer.getName()}`);
    };

    const checkWinner = () => {
        const board = gameboard.getBoard();

        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        for (var pattern of winPatterns) {
            const [a, b, c] = pattern;

            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                winner = currentPlayer.getName();
                return true;
            }
        }

        if (!board.includes(null)) {
            winner = "Tie";
            return true;
        }
    };

    return { startGame, checkWinner, switchPlayer, getCurrentPlayer, getWinner, getPlayer1, getPlayer2 };
})();

const displayController = (function () {
    const boardFields = document.querySelectorAll(".board-field");

    const updateBoard = () => {
        boardFields.forEach((field, index) => {
            const fieldValue = gameboard.getBoard()[index];
            field.textContent = fieldValue;
            field.disabled = fieldValue !== null;
        });
    };

    boardFields.forEach(field => {
        field.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            console.log(index);

            if (gameboard.setCell(index, gameController.getCurrentPlayer().getSymbol())) {
                updateBoard();
                const winner = gameController.checkWinner();

                if (winner) {
                    document.getElementById("result").textContent = 
                        winner === "Tie" ? "It's a tie!" : `${gameController.getWinner()} wins!`;
                }
                else {
                    gameController.switchPlayer();
                }
            }
        });
    });

    return { updateBoard };
})();

// MAIN

document.getElementById("start-btn").addEventListener("click", () => {
    const player1 = createPlayer(document.getElementById("player1-name").value || "Player 1", "X");
    const player2 = createPlayer(document.getElementById("player2-name").value || "Player 2", "O");

    gameController.startGame(player1, player2);
});

document.getElementById("reset-btn").addEventListener("click", () => {
    gameboard.reset();
    gameController.startGame(gameController.getPlayer1(), gameController.getPlayer2());
});

