zoom = 5;
frame = 10;
let food;
shouldEnd = false;
paused = false;
const height = 600;
const width = 400;

function setup() {
    var canva = createCanvas(width, height);
    canva.parent('game');
    snake = new Snake();
    food = new Food();
    frameRate(frame);
}

function draw() {
    if (paused) {
        updateBar();
        return;
    }
    scale(zoom);
    background(32, 30, 75);
    if (snake.eat(food.body)) {
        food = new Food();
        snake.grow();
    }
    snake.update();
    if (shouldEnd) end();
    if (snake.endGame()) {
        shouldEnd = true;
        end();
    }
    snake.show();
    food.show();
    updateBar();
}

function end() {
    for (let i = 0; i < snake.len; i++) {
        snake.body.pop();
    }
    textSize(8);
    background(0, 255, 0);
    text("Game Over", 5, 15);
    updateBar();
    noLoop();
}

function updateBar() {
    document.getElementById('score').innerText = ("Score : " + (snake.len - 1));
    document.getElementById('status').innerText = ("Status : " + getStatus());
    document.getElementById('frame').innerText = ("FPS : " + frame);
}

function pauseOrResume() {
    paused = !paused;
}

function restart() {
    shouldEnd = false;
    paused = false;
    snake = new Snake();
    food = new Food();
    loop();
}

function getStatus() {
    if (paused) return "Paused";
    if (shouldEnd) return "Game Over";
    return "Playing";
}

function keyPressed() {
    oldX = snake.xDir;
    oldY = snake.yDir;
    switch (keyCode) {
        case 90:
            if (oldX === 0 && oldY === 1) break;
            snake.setDir(0, -1);
            if (snake.isSelfEating()) shouldEnd = true;
            break;
        case 83:
            if (oldX === 0 && oldY === -1) break;
            snake.setDir(0, 1);
            if (snake.isSelfEating()) shouldEnd = true;
            break;
        case 81:
            if (oldX === 1 && oldY === 0) break;
            snake.setDir(-1, 0);
            if (snake.isSelfEating()) shouldEnd = true;
            break;
        case 68:
            if (oldX === -1 && oldY === 0) break;
            snake.setDir(1, 0);
            if (snake.isSelfEating()) shouldEnd = true;
            break;
    }
}

setup();
draw();

