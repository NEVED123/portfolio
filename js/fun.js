document.addEventListener("DOMContentLoaded", ()=> {
    initializePhysics()
    initializePiano()
})



const ballColors = ['#FF8A00', '#FF0000', '#FFFF00', '#0000FF', '#FF00FF', '#00FF00', '#00FFFF']

let balls = []

let bottom, rightWall, leftWall, ceiling, ground, grass;

let currVw
let currVh

let worldWidth
let worldHeight

let funPage

function initializePhysics() {

    funPage = document.getElementsByClassName("physics")[0];

    worldWidth = funPage.offsetWidth
    worldHeight = funPage.offsetHeight

    var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
    Body = Matter.Body;

    // create an engine
    var engine = Engine.create();

    // create a renderer
    var render = Render.create({
        element: funPage,
        engine: engine,
        options: {
            height: worldHeight,
            width: worldWidth,
            wireframes: false,
            background: "#55E0FF",
        }})

    ballColors.forEach((color, index)=>{
        const options = {
            render: {
                fillStyle: color,
            }
        }

        balls.push(Bodies.circle((worldWidth*(index / ballColors.length)) + 1, worldHeight-100, worldWidth/30, options))
    })

    const borderOptions = { isStatic: true, render: {fillStyle: '#662D35'}}

    bottom = Bodies.rectangle(worldWidth/2, worldHeight, worldWidth * 10, 30, borderOptions);
    rightWall = Bodies.rectangle(worldWidth, worldHeight / 2, 30, worldHeight, borderOptions);
    leftWall = Bodies.rectangle(0, worldHeight / 2, 30, worldHeight, borderOptions);
    ceiling = Bodies.rectangle(worldWidth/2, 0, worldWidth * 10, 30, borderOptions);
    ground = Bodies.rectangle(worldWidth/2, worldHeight - 30, worldWidth * 10, 30, { isStatic: true, render: {fillStyle: '#605446'}});
    grass = Bodies.rectangle(worldWidth/2, worldHeight - 45, worldWidth * 10, 10, { isStatic: true, render: {fillStyle: '#27A734'}});
    // add all of the bodies to the world
    Composite.add(engine.world, [...balls, ground, grass, bottom, rightWall, leftWall, ceiling]);

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

    let canvas = funPage.querySelectorAll('canvas')[0]

    canvas.height = worldHeight
    canvas.width = worldWidth

    //When window resizes, we must resize all elements accordingly
    window.addEventListener('resize', () => { 

        const newWorldWidth = funPage.innerWidth
        const newWorldHeight = funPage.innerHeight
        
        const xResizeRatio = newVw / currVw
        const yResizeRatio = newVh / currVh

        const xResizeDelta = newVw - currVw
        const yResizeDelta = newVh - currVh

        render.options.width = newWorldWidth
        render.options.height = newWorldHeight

        Body.translate(rightWall, {x : xResizeDelta * .80, y: yResizeDelta * .40})
        Body.translate(bottom, {x : xResizeDelta * .80, y: yResizeDelta * .40})
        Body.translate(ground, {x : xResizeDelta * .80, y: yResizeDelta * .40})
        Body.translate(grass, {x : xResizeDelta * .80, y: yResizeDelta * .40})

        balls.forEach((ball, index)=>{
            Body.scale(ball, xResizeRatio, xResizeRatio)

            const newPos = (newWorldWidth - 100)*((index + 1) / balls.length)
            Body.translate(ball, {x: newPos - ball.position.x, y: yResizeDelta * .40})
        })

        currVw = newVw
        currVh = newVh
    });
}


function bounceBalls(noteIndex){
    const clickedX = worldWidth * noteIndex / document.getElementsByClassName('keyboard-keys')[0].children.length

    //console.log(clickedX)
    balls.forEach((ball)=>{
        console.log(ball.position.x)
        if(Math.abs(ball.position.x - clickedX) < 100){
            Body.setVelocity(ball, {x: (Math.random() * 2) - 1, y: -10})
        }
    })
}

let buffers = [];

const context = new AudioContext();

async function initializePiano() {

    const keys = Array.from(document.getElementsByClassName('keyboard-keys')[0].children)

    keys.forEach((noteElement, i) => { 
        const noteName = noteElement.id
        const audioPath = `../assets/sounds/${noteName}.mp3`

        fetch(audioPath)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
            .then((audioBuffer) => {

                const startEvents = ["touchstart","click", "mousedown", "mouseenter"]

                let source = context.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(context.destination);

                startEvents.forEach(function(mouseEvent){
                    noteElement.addEventListener(mouseEvent, (event)=>{
                        event.stopPropagation()
                        if(mouseEvent == "mouseenter" && event.buttons == 1 || mouseEvent == "mousedown"){
                            source.start();
                            bounceBalls(i)
                        }  
                    })
                })
        
                const cancelEvents = ["touchend", "mouseup", "mouseout"]
        
                cancelEvents.forEach(function(mouseEvent){
                    noteElement.addEventListener(mouseEvent, (event)=>{
                        event.stopPropagation()
                        source = context.createBufferSource();
                        source.buffer = audioBuffer;
                        source.connect(context.destination);
                    })
                })  
            })
    })  
}







