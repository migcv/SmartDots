function Population() {
  this.dots = [];
  this.size;
  this.fitnessSum;
  this.generation = 1;

  this.init = function(size) {
    this.size = size;
    for(var i = 0; i < size; i++) {
      this.dots[i] = new Dot();
      this.dots[i].init();
    }
  }

  this.show = function () {
    for(var i = 0; i < this.size; i++) {
      this.dots[i].show();
    }
  }

  this.update = function() {
    for(var i = 0; i < this.size; i++) {
      this.dots[i].update();
    }
  }

  this.isAllDotsDead = function() {
    for(var i = 0; i < this.size; i++) {
      if(!this.dots[i].isDead && !this.dots[i].success)
        return false;
    }
    return true;
  }

  this.calcFitness = function() {
    for(var i = 0; i < this.size; i++) {
      this.dots[i].calcFitness();
    }
  }

  this.calcFitnessSum = function() {
    this.fitnessSum = 0;
    for(var i = 0; i < this.size; i++) {
      this.fitnessSum += this.dots[i].fitness;
    }
  }

  this.naturalSelection = function() {
    var babies = [];
    this.calcFitnessSum();

    for(var i = 0; i < this.size; i++) {
      // select parent based on fitness
      var parent = this.selectParent();
      // get baby
      babies[i] = parent.clone();
    }

    this.dots = babies.slice(0);
    this.generation++;
  }

  this.selectParent = function() {
    var rand = random(this.fitnessSum);

    var performanceSum = 0;

    for(var i = 0; i < this.size; i++) {
      performanceSum += this.dots[i].fitness;
      if(rand < performanceSum) {
        return this.dots[i];
      }
    }
  }

  this.mutateBabies = function() {
    for(var i = 0; i < this.size; i++) {
      this.dots[i].brain.mutate();
    }
  }

}
