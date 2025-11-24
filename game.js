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

function drawGame(time = 0){
    const secondsSinceLastFrame = (time - lastTime) / 1000;
    if(secondsSinceLastFrame < 1 / speed){
        requestAnimationFrame(drawGame);
        return;
    }
    lastTime = time;

    // move snake
    snakeX += velocityX;
    snakeY += velocityY;

    // check if snake eats food
    if (snakeX === foodX && snakeY === foodY){
        snakeLength++;
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
    }

    // add new head to snake body
    snakeBody.push({x: snakeX, y: snakeY});

    // remove old parts if snake is too long
    while (snakeBody.length > snakeLength) {
        snakeBody.shift();
    }

    // clear canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw food
    ctx.fillStyle = "red";
    ctx.fillRect(foodX * tileSize, foodY * tileSize, tileSize, tileSize);

    // draw snake body
    ctx.fillStyle = "lime";
    for (let part of snakeBody) {
        ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize);
    }

    requestAnimationFrame(drawGame);
}

drawGame();

// keyboard controls
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
