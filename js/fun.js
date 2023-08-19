document.addEventListener("DOMContentLoaded", ()=> {
    initializePhysics()
    initializePiano()
})

let notes = [
    "C4", 
    "Csharp4", 
    "D4", 
    "Dsharp4", 
    "E4", 
    "F4",
    "Fsharp4",
    "G4",
    "Gsharp4",
    "A4",
    "Asharp4",
    "B4",
    "C5",
    "Csharp5",
    "D5",
    "Dsharp5",
    "E5",
    "F5",
    "Fsharp5",
    "G5"];

const ballColors = ['#FF8A00', '#FF0000', '#FFFF00', '#0000FF', '#FF00FF', '#00FF00', '#00FFFF']

let balls = []

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

const worldWidth = .80 * vw;
const worldHeight = .40 * vh;

function initializePhysics() {
 
    var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
    Body = Matter.Body;

    // create an engine
    var engine = Engine.create();

    var funPage = document.getElementsByClassName("physics")[0];

    // create a renderer
    var render = Render.create({
        element: funPage,
        engine: engine,
        options: {
            height: worldHeight,
            width: worldWidth,
            wireframes: false
        }
    });

    ballColors.forEach((color, index)=>{
        balls.push(Bodies.circle((worldWidth*(index / ballColors.length)) + 50, worldHeight-100, 40, {render: {fillstyle: color}}))
    })

    var ground = Bodies.rectangle(worldWidth/2, worldHeight, worldWidth, 20, { isStatic: true });
    var rightWall = Bodies.rectangle(worldWidth, worldHeight / 2, 20, worldHeight, { isStatic: true});
    var leftWall = Bodies.rectangle(0, worldHeight / 2, 20, worldHeight, { isStatic: true});
    var ceiling = Bodies.rectangle(worldWidth/2, 0, worldWidth, 20, { isStatic: true });

    // add all of the bodies to the world
    Composite.add(engine.world, [...balls, ground, rightWall, leftWall, ceiling]);

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
}

function initializePiano() {

    for(let i = 0;i<notes.length; i++){
        const noteName = notes[i];
        const audio = new Audio(`../assets/sounds/${noteName}.mp3`)

        const noteElement = document.getElementById(noteName)

        const startEvents = ["touchstart","click", "mousedown", "mouseenter"]

        startEvents.forEach(function(mouseEvent){
            noteElement.addEventListener(mouseEvent, (event)=>{
                event.stopPropagation()
                if(mouseEvent == "mouseenter" && event.buttons == 1 || mouseEvent == "mousedown"){
                    audio.play()
                    bounceBalls(i)
                }  
            })
        })

        const cancelEvents = ["mouseup", "mouseout"]

        cancelEvents.forEach(function(mouseEvent){
            noteElement.addEventListener(mouseEvent, (event)=>{
                event.stopPropagation()
                audio.pause()
                audio.load()
            })
        })  

    }
}

function bounceBalls(noteIndex){
    const clickedX = worldWidth * noteIndex / notes.length 

    console.log(clickedX)
    balls.forEach((ball)=>{
        console.log(ball.position.x)
        if(Math.abs(ball.position.x - clickedX) < 100){
            Body.setVelocity(ball, {x: (Math.random() * 2) - 1, y: -10})
        }
    })
}