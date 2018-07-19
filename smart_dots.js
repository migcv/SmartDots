
var population;
var goal;

function setup() {
  var canvas = createCanvas(800,800);
  canvas.parent("sketch-holder");
  canvas.class("canvas");
  population = new Population();
  population.init(1000);
  goal = createVector(width / 2, 50);
}

function draw() {
  background(200);
  fill('red');
  ellipse(goal.x, goal.y, 10, 10);

  if(population.isAllDotsDead()) {
    population.calcFitness();
    population.naturalSelection();
    population.mutateBabies();
  }
  else {
    population.update();
    population.show();
  }
}
