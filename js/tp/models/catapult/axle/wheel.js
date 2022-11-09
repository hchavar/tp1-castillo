const wheelConfig = {
    color: [0.9, 0.5, 0.3],
    rotation: [Math.PI/2, [1,0,0]],
    scale: {
        x: 1.0,
        y: 0.1,
        z: 1.0
    }
};

class Wheel extends Cylinder {
    constructor() {
        super(1, 20);
    }

    init() {
        this.empty = false;
        this.scale = wheelConfig.scale;
        this.color = wheelConfig.color;
        this.name = "Wheel";
        this.reuseBuffer = true;
    }
}