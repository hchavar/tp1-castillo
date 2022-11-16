const loadConfig = {
    color: [0.5, 0.5, 0.5]
}

class Load extends Sphere {
    constructor() {
        super(10, 10);
        this.color = loadConfig.color;
        this.visible = false;
    }

    
    fire() {
        this.visible = true;
        this.statusTime = time;

    }

    animate() {
        if (this.visible) {
            let currentPosition = vec3.clone(this.initialPosition);
            let t = (time - this.statusTime)*10;
            let deltaX = 35*t;

            let deltaY = (15 - 5*t)*t;
            currentPosition[0] += deltaX;
            currentPosition[1] += deltaY;
            this.renewLocalMatrix();
            this.setPosition(currentPosition);
            
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