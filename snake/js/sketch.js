zoom = 9;
let frame = 8;
let food;
shouldEnd = false;
paused = false;
const height = 600;
const width = 400;
startedAt = Date.now();

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
  document.getElementById('fps').innerText = ("FPS : " + frame);
  document.getElementById('zoom').innerText = ("Zoom : " + zoom);
  document.getElementById('elapsed').innerText = ("Elapsed : " + Math.floor((Date.now() - startedAt) / 1000) + "s");
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
  startedAt = Date.now();
}

function getStatus() {
  if (paused) return "Paused";
  if (shouldEnd) return "Game Over";
  return "Playing";
}

function up() {
  oldX = snake.xDir;
  oldY = snake.yDir;
  if (oldX === 0 && oldY === 1) return;
  snake.setDir(0, -1);
  if (snake.isSelfEating()) shouldEnd = true;
}

function down() {
  oldX = snake.xDir;
  oldY = snake.yDir;
  if (oldX === 0 && oldY === -1) return;
  snake.setDir(0, 1);
  if (snake.isSelfEating()) shouldEnd = true;
}

function left() {
  oldX = snake.xDir;
  oldY = snake.yDir;
  if (oldX === 1 && oldY === 0) return;
  snake.setDir(-1, 0);
  if (snake.isSelfEating()) shouldEnd = true;
}

function right() {
  oldX = snake.xDir;
  oldY = snake.yDir;
  if (oldX === -1 && oldY === 0) return;
  snake.setDir(1, 0);
  if (snake.isSelfEating()) shouldEnd = true;
}

function keyPressed() {
  switch (keyCode) {
    case 90:
      up();
      break;
    case 83:
      down();
      break;
    case 81:
      left();
      break;
    case 68:
        right();
      break;
  }
}

setup();
draw();

