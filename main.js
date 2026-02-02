const CANVAS_Size = 400;
const TILE_SIZE = 20;
const TILE_COUNT = CANVAS_Size / TILE_SIZE;
const GAME_SPEED = 100; // ms per frame

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const finalScoreEl = document.getElementById('finalScore');
const gameOverScreen = document.getElementById('gameOverScreen');
const restartBtn = document.getElementById('restartBtn');

// Game State
let snake = [];
let food = { x: 0, y: 0 };
let dx = 0;
let dy = 0;
let score = 0;
let gameLoopInterval = null;
let isGameOver = false;
let isPaused = false;

// Initialize Game
function initGame() {
    // Start in the middle
    const startX = 10;
    const startY = 10;
    
    snake = [
        { x: startX, y: startY },
        { x: startX - 1, y: startY },
        { x: startX - 2, y: startY }
    ];
    
    // Start moving right
    dx = 1;
    dy = 0;
    
    score = 0;
    scoreEl.textContent = score;
    isGameOver = false;
    isPaused = false;
    
    gameOverScreen.classList.add('hidden');
    
    spawnFood();
    
    if (gameLoopInterval) clearInterval(gameLoopInterval);
    gameLoopInterval = setInterval(gameLoop, GAME_SPEED);
}

function spawnFood() {
    let validPosition = false;
    while (!validPosition) {
        food.x = Math.floor(Math.random() * TILE_COUNT);
        food.y = Math.floor(Math.random() * TILE_COUNT);
        
        // Ensure food doesn't spawn on snake
        validPosition = true;
        for (let segment of snake) {
            if (segment.x === food.x && segment.y === food.y) {
                validPosition = false;
                break;
            }
        }
    }
}

function update() {
    if (isGameOver || isPaused) return;

    // Calculate new head position
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Wall Collision
    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        endGame();
        return;
    }

    // Self Collision
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
            return;
        }
    }

    snake.unshift(head);

    // Check Food Collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreEl.textContent = score;
        spawnFood();
    } else {
        snake.pop(); // Remove tail if no food eaten
    }
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, CANVAS_Size, CANVAS_Size);

    // Draw Food
    ctx.fillStyle = '#ff5252';
    ctx.beginPath();
    // Slightly smaller than tile for nice spacing
    const pad = 2;
    ctx.rect(food.x * TILE_SIZE + pad, food.y * TILE_SIZE + pad, TILE_SIZE - pad*2, TILE_SIZE - pad*2);
    ctx.fill();

    // Draw Snake
    ctx.fillStyle = '#4caf50';
    for (let i = 0; i < snake.length; i++) {
        const segment = snake[i];
        // Head is slightly different color or lighter
        ctx.fillStyle = i === 0 ? '#66bb6a' : '#4caf50';
        ctx.fillRect(segment.x * TILE_SIZE + pad, segment.y * TILE_SIZE + pad, TILE_SIZE - pad*2, TILE_SIZE - pad*2);
    }
}

function gameLoop() {
    update();
    draw();
}

function endGame() {
    isGameOver = true;
    clearInterval(gameLoopInterval);
    finalScoreEl.textContent = score;
    gameOverScreen.classList.remove('hidden');
}

// Input Handling
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (dy !== 1) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (dy !== -1) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (dx !== 1) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (dx !== -1) { dx = 1; dy = 0; }
            break;
        case ' ': // Spacebar
            if (isGameOver) {
                initGame();
            } else {
                // Optional: Pause toggle
                // isPaused = !isPaused;
            }
            break;
    }
});

restartBtn.addEventListener('click', initGame);

// Start game initially
initGame();
