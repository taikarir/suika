const yunjin = new LoadedImage("./assets/yunjin.png");
const hanni = new LoadedImage("./assets/hanni.png");
const jungkook = new LoadedImage("./assets/jungkook.png");
const kimjongun = new LoadedImage("./assets/kimjongun.png");
const iu = new LoadedImage("./assets/iu.png");
const karina = new LoadedImage("./assets/karina.png");
const wonyoung = new LoadedImage("./assets/wonyoung.png");
const choguesung = new LoadedImage("./assets/choguesung.png");
const tzuyu = new LoadedImage("./assets/tzuyu.png");
const felix = new LoadedImage("./assets/felix.png");
const jisoo = new LoadedImage("./assets/jisoo.png");
const eunwoo = new LoadedImage("./assets/eunwoo.png");

const baseSize = 15;
const scaling = 1.27;
const gameWidth = 600;
const gameHeight = 600;
const wallWidth = 10;
const floorWidth = 50;

const boxFriction = 1;
const ballFriction = 0.2;
const floorRestitution = 0;
const wallRestitution = 0.20;

var score = 0;
var held = randomBall(0,4);
var next = randomBall(0,4);
var type = held;


var types = {
    0: karina,
    1: wonyoung,
    2: tzuyu,
    3: eunwoo,
    4: iu,
    5: felix,
    6: hanni,
    7: jisoo,
    8: jungkook,
    9: yunjin,
    10: kimjongun
}

var scoring = {
    0: 1,
    1: 3,
    2: 7,
    3: 9,
    4: 13,
    5: 21,
    6: 27,
    7: 34,
    8: 44,
    9: 55,
}

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    Collision = Matter.Collision,
    Query = Matter.Query,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: gameWidth,
        height: gameHeight+100,
        wireframes: false, // disable Wireframe
    }
});

// create two boxes and a ground
// var boxA = Bodies.rectangle(400, 200, 80, 80);
// var boxB = Bodies.rectangle(450, 50, 80, 80);
var lwall = Bodies.rectangle(-wallWidth/2, gameHeight/2+100, wallWidth, gameHeight, {isStatic: true, friction: boxFriction, restitution: wallRestitution});
var rwall = Bodies.rectangle(gameWidth+wallWidth/2, gameHeight/2+100, wallWidth, gameHeight, {isStatic: true, friction: boxFriction, restitution: wallRestitution});
var ground = Bodies.rectangle((gameWidth)/2, gameHeight+floorWidth/2, gameWidth+2*wallWidth, floorWidth, {isStatic: true, friction: boxFriction, restitution: floorRestitution});



// add all of the bodies to the world
Composite.add(engine.world, [lwall, rwall, ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

// function isPointOccupied(x, y) {
//     const bodies = Query.point(engine.world.bodies, { x: x, y: y });
//     return bodies.length > 0;
// }

const verticalLine = Bodies.rectangle(0, gameHeight/2, 2, gameHeight,
    {
        isStatic: true,
        isSensor: true,
        render: {
            fillStyle: 'white', // Set the fill color to blue
            visible: true
        }
    }
);

// console.log(held);
// console.log(getSize(held));
// console.log(types[held].img.width);
// console.log(types[held].img.height);
// console.log(types[held].img);
// var heldCircle;
var heldCircle = Bodies.circle(0, 50, getSize(held),
    {
        isStatic: true,
        isSensor: true,
        slop: 0,
        friction: ballFriction,
        restitution: floorRestitution
        // render: {
        //     sprite: {
        //         texture: types[held].img.src,
        //         xScale: getSize(held) * 2 / types[held].img.width, // Adjust based on image dimensions
        //         yScale: getSize(held) * 2 / types[held].img.height
        //     }
        // }
    }
);

// Add the line to the world
Composite.add(engine.world, verticalLine);
// Composite.add(engine.world, heldCircle);

document.body.addEventListener('click', (event) => {
    // console.log(types[held].img.height);

    // Create a new circle at mouse position and add it to the world
    // loadImage("./assets/yunjin.jpeg",)
    var circle;
    // var type = held;
    // type = 0;
    const size = getSize(type);
    // Matter.Body.setMass(heldCircle, 0.001 * (heldCircle.width * heldCircle.height));
    Matter.Body.setStatic(heldCircle, false);
    heldCircle.isSensor = false;
    held = next;
    heldCircle = Bodies.circle(0, 50, getSize(next),
        {
            isStatic: true,
            isSensor: true,
            slop: 0,
            friction: ballFriction,
            restitution: floorRestitution,
            render: {
                sprite: {
                    texture: types[next].img.src,
                    xScale: getSize(next) * 2 / types[next].img.width, // Adjust based on image dimensions
                    yScale: getSize(next) * 2 / types[held].img.height
                }
            }
        }
    );
    // heldCircle.render = {
    //     sprite: {
    //         texture: types[held].img.src,
    //         xScale: getSize(held) * 2 / types[held].img.width, // Adjust based on image dimensions
    //         yScale: getSize(held) * 2 / types[held].img.height
    //     }
    // };
    Composite.add(engine.world, heldCircle);
    next = randomBall(0,4);
    constrain(verticalLine, heldCircle);
});

document.body.addEventListener('mousemove', (event) => {
    // console.log(verticalLine.position.x);
    // Update the position of the vertical line based on the cursor's x-coordinate

    constrain(verticalLine, heldCircle);
});

Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach((pair) => {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;
        // console.log(bodyA,bodyB);
        if (bodyA.id < bodyB.id && bodyA.isSensor === false && bodyB.isSensor === false) {

            // Check if both bodies are circles and have the same radius
            if (Collision.collides(bodyA, bodyB) && Math.round(bodyA.circleRadius) === Math.round(bodyB.circleRadius)) {
                // console.log("yes");
                // Remove the existing circles from the world
                const newX = (bodyA.position.x+bodyB.position.x)/2;
                var newY = (bodyA.position.y+bodyB.position.y)/2;
                const oldR = bodyA.circleRadius;
                const newR = bodyA.circleRadius * scaling; // Adjust the factor for the desired size
                Composite.remove(engine.world, [bodyA, bodyB]);
                // console.log(newR);

                // Create a new circle with a larger radius
                const size = newR / baseSize;
                const type = Math.round(Math.log(size)/Math.log(scaling));
                // console.log(type);

                score += scoring[type-1];

                const newCircle = Bodies.circle(newX, newY, newR,
                    {
                        friction: ballFriction,
                        restitution: floorRestitution,
                        slop: 0,
                        render: {
                            // fillStyle: "blue",
                            // strokeStyle: "blue",
                            // lineWidth: 2,
                            sprite: {
                                texture: types[type].img.src,
                                xScale: newR * 2 / types[type].img.width, // Adjust based on image dimensions
                                yScale: newR * 2 / types[type].img.height
                            }
                        }
                    }
                );
                // Matter.Body.setMass(myBody, 0.001 * (myBody.width * myBody.height))
                // Matter.Body.setStatic(myBody, false)

                // Add the new circle to the world
                Composite.add(engine.world, newCircle);
                // updateScore();
            }
        }
    });
});
