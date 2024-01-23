class Fruit {
    constructor(x,y,v,theta,type,id) {
        this.r = {x: x, y: y};
        this.v = {x: 0, y: 0};
        this.a = {x: 0, y: 0};
        this.theta = theta;
        this.type = type;
        this.mass = 2**type;
        this.radius = 50;
        //this.radius = sqrt(this.mass/2/PI);
        this.id = id;
    }
    applyGravity() {
        this.a.y += gravity;
    }
    applyForces() {
        this.a = {x: 0, y: 0};
        this.applyGravity();
        this.v.x += this.a.x;
        this.v.y += this.a.y;
        this.r.x += this.v.x;
        this.r.y += this.v.y;
    }
    restrictBounds(container) {
        if ((this.r.x-this.radius)<container.x) {
            this.r.x = container.x+this.radius;
            this.v.x *= -1 * container.decay;
        }
        if ((this.r.y-this.radius)<container.y) {
            this.r.y = container.y+this.radius;
            this.v.y *= -1 * container.decay;
        }
        if ((this.r.x+this.radius)>(container.x+container.w)) {
            this.r.x = container.x+container.w-this.radius;
            this.v.x *= -1 * container.decay;
        }
        if ((this.r.y+this.radius)>(container.y+container.h)) {
            this.r.y = container.y+container.h-this.radius;
            this.v.y *= -1 * 0;
        }
    }

    checkCollision(fruits) {
	    for(var j = 0; j < fruits.length; j++){
            // var this = this;
		    var b2 = fruits[j];
	        if(this.r.x != b2.r.x && this.r.y != b2.r.y){
		//quick check for potential collisions using AABBs
		        if(this.r.x + this.radius + b2.radius > b2.r.x
			        && this.r.x < b2.r.x + this.radius + b2.radius
			        && this.r.y + this.radius + b2.radius > b2.r.y
			        && this.r.y < b2.r.y + this.radius + b2.radius) {

			//pythagoras
    				var distX = this.r.x - b2.r.x;
    				var distY = this.r.y - b2.r.y;
    				var d = sqrt((distX) * (distX) + (distY) * (distY));

    				//checking circle vs circle collision
    				if(d < this.radius + b2.radius){
                        console.log("yes");
    					var nx = (b2.r.x - this.r.x) / d;
    					var ny = (b2.r.y - this.r.y) / d;
    					var p = 2 * (this.v.x * nx + this.v.y * ny - b2.v.x * nx - b2.v.y * ny) / (this.mass + b2.mass);

    					// calulating the point of collision
    					var colPointX = ((this.r.x * b2.radius) + (b2.r.x * this.radius)) / (this.radius + b2.radius);
    					var colPointY = ((this.r.y * b2.radius) + (b2.r.y * this.radius)) / (this.radius + b2.radius);

    					//stoping overlap
    					this.r.x = colPointX + this.radius * (this.r.x - b2.r.x) / d;
    					this.r.y = colPointY + this.radius * (this.r.y - b2.r.y) / d;
    					b2.r.x = colPointX + b2.radius * (b2.r.x - this.r.x) / d;
    					b2.r.y = colPointY + b2.radius * (b2.r.y - this.r.y) / d;

    					//updating velocity to reflect collision
    					this.v.x -= p * this.mass * nx;
    					this.v.y -= p * this.mass * ny;
    					b2.v.x += p * b2.mass * nx;
    					b2.v.y += p * b2.mass * ny;
    				}
		        }
            }
        }
    }
    draw() {
        fill(255,0,0);
        ellipse(this.r.x,this.r.y,this.radius*2,this.radius*2);
    }
}
