class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(0, 0);
    this.xDir = 0;
    this.yDir = 0;
    this.len = 1;
  }

  update() {
    let head = this.body[this.len - 1].copy();
    this.body.shift();
    head.x += this.xDir;
    head.y += this.yDir;
    this.body.push(head);
  }

  show() {
    noStroke();
    for (let i = 0; i !== this.len; i++) {
      if (i === this.len - 1) fill(0, 0, 255);
      else fill(0);
      rect(this.body[i].x, this.body[i].y, 1, 1);
    }
  }

  setDir(x, y) {
    this.xDir = x;
    this.yDir = y;
  }

  eat(pos) {
    let x = this.body[this.len - 1].x;
    let y = this.body[this.len - 1].y;
    return x === pos.x && y === pos.y;
  }

  grow() {
    let h = this.body[this.body.length - 1].copy();
    this.len++;
    this.body.push(h);
  }

  endGame() {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x >= width / zoom || x < 0 || y >=
      height / zoom || y < 0) return true;
  }

  isSelfEating() {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    for (let i = 0; i < this.body.length - 2; i++) {
      if (x === this.body[i].x && y === this.body[i].y) return true;
    }
  }
}
