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

function initializePhysics() {
    console.log("Initializing Physics Engine")
    
    var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

var funPage = document.getElementsByClassName("physics")[0];

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

function initializePiano() {

    for(let i = 0;i<notes.length; i++){
        const noteName = notes[i];
        const audio = new Audio(`../assets/sounds/${noteName}.mp3`)

        const noteElement = document.getElementById(noteName)

        const startEvents = ["mousedown", "mouseenter"]

        startEvents.forEach(function(e){
            noteElement.addEventListener(e, (event)=>{

                if(noteName.includes("sharp")){
                    event.stopPropagation()
                }
                
                if(e == "mouseenter" && event.buttons == 1 || e == "mousedown"){
                    audio.play()
                }  
            })
        })

        const cancelEvents = ["mouseup", "mouseout"]

        cancelEvents.forEach(function(e){
            noteElement.addEventListener(e, ()=>{
                audio.pause()
                audio.load()
            })
        })  

    }
}

// function fadeAudio(audio){

//     let miliseconds = 0;
//     const interval = 10;

//     let fadeInterval = setInterval(()=>{
//         audio.volume = parseFloat(audio.volume - .2).toPrecision(12)
//         miliseconds += interval
//         if(Math.floor(miliseconds) == 50){
//             audio.pause()
//             audio.volume = 1;
//             audio.load()
//             clearInterval(fadeInterval)
//         }
//     },interval)
// }