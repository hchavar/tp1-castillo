const floorScale = {
    x: 5.0, // only odd numbers >= 3
    y: 1.0,
    z: 5.0
};

class Floor extends Objeto3D {
    constructor(menu) {
        super(null, null, menu);
        this.number = -1;
    }

    init() {

        let floor = new Box(4 * floorScale.y, 8 * floorScale.x, this.menu)

        floor.color = [0.99, 0.85, 0.35];
        floor.scale = floorScale;
        floor.name = "Floor";
        floor.reuseBuffer = true;
        floor.build();

        this.addChild(floor);

        let m = (floorScale.x - 3) / 2;
        for (let i = - m; i <= m; i++) {
            let casement = this.newCasement(i);
            this.addChild(casement);
        }


    }

    newCasement(pos) {
        let casement = new Casement();
        // casement.reuseBuffer = true;
        casement.build();
        let scaleFactor = 0.4;
        casement.setScale(scaleFactor);
        casement.setRotation([Math.PI / 2, [0, 0, 1]]);
        casement.updateRotation();
        casement.setRotation([Math.PI / 2, [1, 0, 0]]);
        casement.setPosition([0, floorScale.z / (2 * scaleFactor), pos/scaleFactor]);
        casement.updateLocalMatrix();
        return casement;
    }
}