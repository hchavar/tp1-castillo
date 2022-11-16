const loadConfig = {
    color: [0.5, 0.5, 0.5],
    // scaleFactor: 0.8
}

class Load extends Sphere {
    constructor() {
        super(10, 10);
        this.color = loadConfig.color;
        // this.setScale(loadConfig.scaleFactor);
        this.visible = false;
    }

    
    fire() {
        this.visible = true;
        this.statusTime = time;
        // this.test = true;

    }

    animate() {
        if (this.visible /*&& this.test*/) {
            let currentPosition = vec3.clone(this.initialPosition);
            let t = (time - this.statusTime)*10;
            let deltaX = 35*t;

            let deltaY = (15 - 5*t)*t;
            console.log(deltaY);
            currentPosition[0] += deltaX;
            currentPosition[1] += deltaY;
            this.renewLocalMatrix();
            this.setPosition(currentPosition);
            // this.setPosition([0.5, 14.5, 3.0]);
            
            this.updateLocalMatrix();
            this.visible = (deltaY > -17);
        }
    }

    set initialPosition(value) {
        this._initialPosition = value;
    }

    get initialPosition() {
        return this._initialPosition;
    }
}