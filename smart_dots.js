var MAX_POPULATION = 1000;
var MAX_STEPS = 1000;
var DEFAULT_MUTATION = 0.01;

var population;
var goal;
var obstacles;
var best_steps = MAX_STEPS;
var mutation_rate = DEFAULT_MUTATION;
var best_dot;

function setup() {
  var canvas = createCanvas(800,800);
  canvas.parent("sketch-holder");
  canvas.class("canvas");
  population = new Population();
  population.init(MAX_POPULATION);
  goal = createVector(width / 2, 50);
  obstacles = [ new Obstacle(createVector(200, 300), 600, 30),
                new Obstacle(createVector(0, 550), 600, 30)
              ];
}

function draw() {
  document.getElementById("generation").innerHTML = population.generation;
  document.getElementById("mutation_rate").innerHTML = mutation_rate;
  background(200);
  fill('red');
  ellipse(goal.x, goal.y, 10, 10);

  for(var i = 0; i < obstacles.length; i++) {
    obstacles[i].show();
  }

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
