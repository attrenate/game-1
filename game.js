const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const tileSize = 20;
const tileCount = canvas.width / tileSize;

let snakeX = 10;
let snakeY = 10;
let velocityX = 1;
let velocityY = 0;

let speed = 5;
let lastTime = 0;

let snakeBody = [];
let snakeLength = 5;

let foodX = Math.floor(Math.random() * tileCount);
let foodY = Math.floor(Math.random() * tileCount);

let score = 0;
let gameOver = false;

const restartBtn = document.getElementById("restartBtn");

// Restart game logic
restartBtn.addEventListener("click", () => {
    snakeX = 10;
    snakeY = 10;
    velocityX = 1;
    velocityY = 0;
    snakeBody = [];
    snakeLength = 5;
    score = 0;
    gameOver = false;
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
    restartBtn.style.display = "none";
    drawGame();
});

// Game loop
function drawGame(time = 0){
    const secondsSinceLastFrame = (time - lastTime) / 1000;
    if(secondsSinceLastFrame < 1 / speed){
        requestAnimationFrame(drawGame);
        return;
    }
    lastTime = time;

    // Move snake
    snakeX += velocityX;
    snakeY += velocityY;

    // Check collision with walls
    if (snakeX < 0 || snakeX >= tileCount || snakeY < 0 || snakeY >= tileCount) {
        gameOver = true;
    }

    // Check collision with self
    for (let part of snakeBody.slice(0, -1)) {
        if (part.x === snakeX && part.y === snakeY) {
            gameOver = true;
        }
    }

    // Handle game over
    if(gameOver){
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 20);
        ctx.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 20);
        restartBtn.style.display = "block";
        return;
    }

    // Check if snake eats food
    if (snakeX === foodX && snakeY === foodY){
        snakeLength++;
        score++;
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
    }

    // Add new head to snake body
    snakeBody.push({x: snakeX, y: snakeY});

    // Remove old parts if snake is too long
    while (snakeBody.length > snakeLength) {
        snakeBody.shift();
    }

    // Clear canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(foodX * tileSize, foodY * tileSize, tileSize, tileSize);

    // Draw snake body
    ctx.fillStyle = "lime";
    for (let part of snakeBody) {
        ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize);
    }

    requestAnimationFrame(drawGame);
}

drawGame();

// Keyboard controls
document.addEventListener("keydown", (e) =>{
    switch(e.key) {
        case "ArrowUp":
            if(velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;
        case "ArrowDown":
            if (velocityY !== -1){
                velocityX = 0;
                velocityY = 1;
            }
            break;
        case "ArrowLeft":
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;
        case "ArrowRight":
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
    }
});
