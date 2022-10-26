class Floor extends Box {
    constructor(menu) {
        super(10, 20, menu);
        this.number = -1;
    }

    init() {
        this.empty = false;
        this.color = [0.99, 0.85, 0.35];
        this.xScale = 4.9;
        this.yScale = 1.0;
        this.zScale = 4.9;
        this.setPosition([0.0, 1.0, 0,0]);
        this.updatePosition();

    }
}