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

function constrainLine(line) {
    Matter.Body.setPosition(line, { x: event.pageX, y: gameHeight/2 });

    if (line.position.x > gameWidth-getSize(held)) {
        Matter.Body.setPosition(line, { x: gameWidth-getSize(held), y: gameHeight/2 });
    }
    if (line.position.x < getSize(held)) {
        Matter.Body.setPosition(line, { x: getSize(held), y: gameHeight/2 });
    }
}
