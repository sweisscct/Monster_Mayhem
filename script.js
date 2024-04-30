const board = document.getElementById('board');
let currentPlayer;
let players;
let gameOver = false;

function startGame() {
    currentPlayer = 0;
    players = [
        // Only two players, can only play 10 monsters
        { name: 'Player 1', monstersLeft: 10, monsters: [] },
        { name: 'Player 2', monstersLeft: 10, monsters: [] }
    ];
    gameOver = false;
    renderBoard();
}

function renderBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.row = i;
            square.dataset.col = j;
            square.addEventListener('click', () => {
                if (!gameOver) {
                    handleSquareClick(square);
                }
            });
            board.appendChild(square);
        }
    }
}

function handleSquareClick(square) {
    const row = parseInt(square.dataset.row);
    const col = parseInt(square.dataset.col);
    // Can only place 10 monsters
    if (players[currentPlayer].monstersLeft > 0) {
        placeMonster(row, col);
    } else {
        moveMonster(row, col);
    }
}

function placeMonster(row, col) {
    const monsterTypes = ['vampire', 'werewolf', 'ghost'];
    // We don't get to chose the monster
    const randomMonster = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
    const monster = { type: randomMonster, row, col };
    players[currentPlayer].monsters.push(monster);
    players[currentPlayer].monstersLeft--;
    updateBoard();
    switchPlayer();
}

function moveMonster(row, col) {
    // Implement monster movement logic here
}

function updateBoard() {
    board.querySelectorAll('.square').forEach(square => {
        // no way to tell which colour is which monster
        square.classList.remove('vampire', 'werewolf', 'ghost');
    });
    players.forEach(player => {
        player.monsters.forEach(monster => {
            const square = board.querySelector(`.square[data-row="${monster.row}"][data-col="${monster.col}"]`);
            square.classList.add(monster.type);
        });
    });
}

function switchPlayer() {
    currentPlayer = (currentPlayer + 1) % 2;
    // each player plays all their monsters, then the other player goes
    if (players[currentPlayer].monstersLeft === 0) {
        endTurn();
    }
}

function endTurn() {
    // Implement logic to check for winner, end round, and eliminate players here
    // Set gameOver to true when game ends
}
