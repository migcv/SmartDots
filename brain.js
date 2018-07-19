function Brain(size) {

  this.directions = [];
  this.size = size;
  this.steps = 0;

  this.randomize = function() {
    for(var i = 0; i < this.size; i++) {
      var randomAngle = random(2*PI);
      this.directions[i] = p5.Vector.fromAngle(randomAngle);
    }
  }

  this.clone = function() {
    var clone = new Brain(this.size);
    for(var i = 0; i < this.size; i++) {
      clone.directions[i] = this.directions[i].copy();
    }
    return clone;
  }

  this.mutate = function() {
    var mutationRate = 0.01;
    for(var i = 0; i < this.size; i++) {
      var rand = random();
      if(rand < mutationRate) {
        var randomAngle = random(2*PI);
        this.directions[i] = p5.Vector.fromAngle(randomAngle);
      }
    }
  }
}
