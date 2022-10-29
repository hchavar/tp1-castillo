const axlePivotConfig = {
    color: [0, 0, 0],
    rotation: [Math.PI/2, [1,0,0]],
    scale: {
        x: 0.07,
        y: 6.4,
        z: 0.07
    }
};

class AxlePivot extends Cylinder {
    constructor() {
        super(4, 10);
    }

    init() {
        this.empty = false;
        this.scale = axlePivotConfig.scale;
        this.color = axlePivotConfig.color;
        this.name = "AxlePivot";
    }
}