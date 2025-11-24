const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// grid size
const tileSize = 20;
const tileCount = canvas.width / tileSize;

// snake starting position 
let snakeX = 10;
let snakeY = 10;

// snake movement direction
let velocityX = 1;
let velocityY = 0;

let speed = 5;
let lastTime = 0;

// game loop
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

    // clear canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw snake
    ctx.fillStyle = "lime";
    ctx.fillRect(snakeX * tileSize, snakeY * tileSize, tileSize, tileSize);

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
