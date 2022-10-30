const wallScale = {
    x: 1.0,
    y: 1.0,
    z: 5.0
};

class Wall extends AbstractWall {

    constructor(filas, menu) {
        super(filas, menu);

    }

    init() {

        this.scale = wallScale;
        this.empty = false;
        super.init();
    }
}