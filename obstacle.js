function Obstacle(pos, width, height) {

  this.pos = pos;
  this.width = width;
  this.height = height;

  this.show = function () {
    fill('blue');
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }

}
