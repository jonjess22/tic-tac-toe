// main

const gameboard = (function () 
{
    let _board = new Array(9);

    const getField = (index) => _board[index];

    const setField = (index, player) => {
        const htmlField = document.querySelector(`.board button[data-index="${index}"]`);
        htmlField.textContent = player.getSymbol();
        _board[index] = player.getSymbol();
    }

    const clear = () => {
        for (var i = 0; i < _board.length; i++) {
            _board[i] = undefined;
        }
    }

    return { getField, setField, clear };
})();

function Player(name, symbol)
{
    let _name = name;
    let _symbol = symbol;
    
    const getSymbol = () => symbol;
    const setSymbol = (newSymbol) => _symbol = newSymbol;

    const getName = () => _name;
    const setName = (newName) => _name = newName;

    return { _name, symbol }
}

const gameController = (() => 
{
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");

    const playerStep = (index) => {
        const field = gameboard.getField(index);

        if (field == undefined) {
            gameboard.setField(index, player1);
        }
    }
})();
