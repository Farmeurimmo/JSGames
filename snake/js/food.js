class Food {
  constructor() {
    this.x = floor(random(width / zoom));
    this.y = floor(random(height / zoom));
    this.body = createVector(this.x, this.y);
  }

    show() {
        noStroke();
        fill(255, 0, 0);
        rect(this.body.x, this.body.y, 1, 1);
    }

}