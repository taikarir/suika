// const loadImage = (url, onSuccess, onError) => {
//
//   const img = new Image();
//   img.src = url;
// };
class LoadedImage {
    constructor(url) {
        this.img = new Image();
        this.img.src = url;
    }
}

function randomBall(n, m) {
    return Math.round(Math.random()*(m-n)+n);
}

function getSize(type) {
    return baseSize * Math.pow(scaling, type);
}

// function updateScore() {
//     // Clear the canvas
//     Render.clear(render);
//
//     // Draw the score on the canvas
//     Render.text(render, `Score: ${score}`, 20, window.innerHeight - 30, {
//         font: '18px Arial',
//         fillStyle: 'white'
//     });
// }
function newCircle() {
    heldCircle = Bodies.circle(0, 10, getSize(held),
        {
            isStatic: true,
            // isSensor: true,
            friction: ballFriction,
            restitution: floorRestitution,
            render: {
                sprite: {
                    texture: types[held].img.src,
                    xScale: getSize(held) * 2 / types[held].img.width, // Adjust based on image dimensions
                    yScale: getSize(held) * 2 / types[held].img.height
                }
            }
        }
    );
}

function constrain(line, circle) {
    Matter.Body.setPosition(line, { x: event.pageX, y: gameHeight/2 });
    Matter.Body.setPosition(circle, { x: event.pageX, y: 0 });

    if (line.position.x > gameWidth-getSize(held)) {
        Matter.Body.setPosition(line, { x: gameWidth-getSize(held), y: gameHeight/2 });
        Matter.Body.setPosition(circle, { x: gameWidth-getSize(held), y: 0 });
    }
    if (line.position.x < getSize(held)) {
        Matter.Body.setPosition(line, { x: getSize(held), y: gameHeight/2 });
        Matter.Body.setPosition(circle, { x: getSize(held), y: 0 });
    }
}
