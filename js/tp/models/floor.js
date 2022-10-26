class Floor extends Box {
    constructor(menu) {
        super(10, 20, menu);
        this.number = -1;
    }

    init() {
        this.empty = false;
        this.color = [0.99, 0.85, 0.35];
        this.scale = {
            x: 4.9,
            y: 1.0,
            z: 4.9
        };

    }
}