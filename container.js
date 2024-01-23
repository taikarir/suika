class Container {
    constructor(x, y, w, h, decay) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.decay = decay;
        this.strokeSize = 5;
    }
    /*checkHover() {
        //check if mouse is on the box
        if (abs(mouseX-this.x)<=this.strokeSize/2 || abs(mouseX-(this.x+this.w))<=this.strokeSize/2) {
            if (mouseY>=(this.y-this.strokeSize/2) && mouseY<=(this.y+this.h+this.strokeSize/2)) {
                cursor(HAND);
                return;
            }
        }
        if (abs(mouseY-this.y)<=this.strokeSize/2 || abs(mouseY-(this.y+this.h))<=this.strokeSize/2) {
            if (mouseX>=(this.x-this.strokeSize/2) && mouseX<=(this.x+this.w+this.strokeSize/2)) {
                cursor(HAND);
                return;
            }
        }
        cursor(ARROW)
    }*/
    draw() {
        noFill();
        stroke(255,255,255);
        strokeWeight(this.strokeSize);
        rect(this.x, this.y, this.w, this.h);
    }
}
