function Dot() {
  this.pos = createVector(width/2, height - 50);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);

  this.brain = new Brain(1000);

  this.fitness = 0;

  this.isDead = false;
  this.success = false;

  this.init = function() {
    this.brain.randomize();
  }

  this.show = function () {
    fill(0);
    ellipse(this.pos.x, this.pos.y, 5, 5);
  }

  this.update = function() {
    if(!this.isDead && !this.success) {
      this.move();
      if(this.pos.x < 2 || this.pos.y < 2 || this.pos.x > width - 2 || this.pos.y > height - 2) {
        // If the dot thouches the borders it dies
        this.isDead = true;
      }
      if(dist(this.pos.x,this.pos.y,goal.x,goal.y) < 5) {
        // If the dot thouches the goal it successeds
        this.success = true;
      }
    }
  }

  this.move = function () {
    this.acc = this.brain.directions[this.brain.steps];
    this.brain.steps++;
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
  }

  this.calcFitness = function() {
    if(this.success) {
      this.fitness = 1.0 / 16 + 100000 / (this.brain.steps * this.brain.steps);
    } else {
      var distanceToGoal = dist(this.pos.x,this.pos.y,goal.x,goal.y);
      this.fitness = 1.0 / (distanceToGoal * distanceToGoal);
    }
  }

  this.clone = function() {
    var clone = new Dot();
    clone.brain = this.brain.clone();
    return clone;
  }

}
