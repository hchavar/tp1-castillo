const floorScale = {
    x: 5.0,
    y: 1.0,
    z: 5.0
};

class Floor extends Box {
    constructor(menu) {
        super(10, 20, menu);
        this.number = -1;
    }

    init() {
        this.empty = false;
        this.color = [0.99, 0.85, 0.35];
        this.scale = floorScale;

    }
}