const board = document.getElementById('board');
let currentPlayer;
let players;
let gameOver = false;

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
    addEdgeClasses();
}

function handleSquareClick(square) {
    const row = parseInt(square.dataset.row);
    const col = parseInt(square.dataset.col);
    if (players[currentPlayer].monstersLeft > 0) {
        placeMonster(row, col);
    } else {
        moveMonster(row, col);
    }
}

function placeMonster(row, col) {
    const monsterTypes = ['vampire', 'werewolf', 'ghost'];
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
    if (players[currentPlayer].monstersLeft === 0) {
        endTurn();
    }
}

function endTurn() {
    // Implement logic to check for winner, end round, and eliminate players here
    // Set gameOver to true when game ends
}



/************************************************ */

function startGame() {
    currentPlayer = 0;
    players = [
        { name: 'Player 1', monstersLeft: 10, monsters: [], edge: 'top' },
        { name: 'Player 2', monstersLeft: 10, monsters: [], edge: 'right' },
        { name: 'Player 3', monstersLeft: 10, monsters: [], edge: 'bottom' },
        { name: 'Player 4', monstersLeft: 10, monsters: [], edge: 'left' }
    ];
    gameOver = false;
    renderBoard();
    renderLegend();
}


function addEdgeClasses() {
    board.querySelectorAll('.square').forEach(square => {
        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);
        if (row === 0) {
            square.classList.add('player1');
        }
        if (col === 9) {
            square.classList.add('player2');
        }
        if (row === 9) {
            square.classList.add('player3');
        }
        if (col === 0) {
            square.classList.add('player4');
        }
    });
}

const legend = document.getElementById('legend');
function renderLegend() {
    legend.innerHTML = '';
    const legendItems = [
        { type: 'Vampire', color: 'red' },
        { type: 'Werewolf', color: 'green' },
        { type: 'Ghost', color: 'blue' }
    ];
    legendItems.forEach(item => {
        const legendItem = document.createElement('div');
        legendItem.classList.add('legend-item');
        legendItem.style.color = item.color;
        legendItem.textContent = item.type;
        legend.appendChild(legendItem);
    });
}

// Other functions (placeMonster, moveMonster, updateBoard, switchPlayer, endTurn) remain the same
