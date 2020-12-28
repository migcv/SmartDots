function Dot() {
  this.pos = createVector(width/2, height - 50);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);

  this.brain = new Brain(MAX_STEPS);

  this.fitness = 0;

  this.isDead = false;
  this.success = false;

  this.init = function() {
    this.brain.randomize();
  }

  this.show = function () {
    ellipse(this.pos.x, this.pos.y, 5, 5);
  }

  this.update = function() {
    if(!this.isDead && !this.success) {
      this.move();
      if(this.pos.x < 2 || this.pos.y < 2 || this.pos.x > width - 2 || this.pos.y > height - 2) {
        // If the dot thouches the borders it dies
        this.isDead = true;
      }
      for(var i = 0; i < obstacles.length; i++) {
        if(this.pos.x > obstacles[i].pos.x && this.pos.x < obstacles[i].pos.x + obstacles[i].width &&
          this.pos.y < obstacles[i].pos.y + obstacles[i].height && this.pos.y > obstacles[i].pos.y) {
          // If the dot thouches an obstacle it dies
          this.isDead = true;
        }
      }
      if(this.brain.steps > best_steps) {
        // If the dot gives more steps than the best_steps it dies
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
      if(this.brain.steps < best_steps)
        best_steps = this.brain.steps;
    } else {
      var distanceToGoal = dist(this.pos.x,this.pos.y,goal.x,goal.y);
      this.fitness = 1.0 / (distanceToGoal * distanceToGoal);
    }
    if(best_dot != null) {
      if(best_dot.fitness < this.fitness) {
        best_dot = this;
      }
    }
    else {
      best_dot = this;
    }
  }

  this.clone = function() {
    var clone = new Dot();
    clone.brain = this.brain.clone();
    return clone;
  }

  this.restPosition = function() {
    this.pos = createVector(width/2, height - 50);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.brain.steps = 0;
    this.isDead = false;
    this.success = false;
  }
}
