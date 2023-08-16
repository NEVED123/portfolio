document.addEventListener("DOMContentLoaded", ()=> initialize())

function initialize() {
    console.log("Initializing Physics Engine")
    
    var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

var funPage = document.getElementById("fun");

// create a renderer
var render = Render.create({
    element: funPage,
    engine: engine
});

// create two boxes and a ground
var boxA = Bodies.circle(400, 200, 80);
var boxB = Bodies.circle(450, 50, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);
}