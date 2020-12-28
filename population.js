function Population() {
  this.dots = [];
  this.size;
  this.fitnessSum;
  this.generation = 1;

  this.consecutiveFailures = 0;

  this.init = function(size) {
    this.size = size;
    for(var i = 0; i < size; i++) {
      this.dots[i] = new Dot();
      this.dots[i].init();
    }
  }

  this.show = function () {
    for(var i = 1; i < this.size; i++) {
      fill(0);
      this.dots[i].show();
    }
    if(best_dot != null) {
      fill('yellow');
      this.dots[0].show();
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
    var sucess = false;
    for(var i = 0; i < this.size; i++) {
      this.dots[i].calcFitness();
      if(this.dots[i].success)
        sucess = true;
    }
    if(sucess)
      mutation_rate = DEFAULT_MUTATION;
    else {
      this.consecutiveFailures++;
      mutation_rate += this.consecutiveFailures * 0.0001;
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
    this.dots[0] = best_dot;
    this.dots[0].restPosition();
    for(var i = 1; i < this.size; i++) {
      this.dots[i].brain.mutate();
    }
  }

}
