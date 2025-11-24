const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// grid size
const tileSize = 20;
const tileCount = canvas.width / tileSize;


// draw first frame
function drawGame(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "lime";
    ctx.fillRect(0, 0, tileSize, tileSize)

    requestAnimationFrame(drawGame);
}

drawGame();