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
        floor.name = "SingleFloor";
        floor.reuseBuffer = true;
        floor.build();

        this.addChild(floor);

        let m = (floorScale.x - 3) / 2;
        for (let i = - m; i <= m; i++) {
            this.addChild(this.newFrontCasement(i));
            this.addChild(this.newBackCasement(i));
            this.addChild(this.newDepthCasement(i));
        }


    }

    newFrontCasement(pos) {
        let casement = this.newHorizontalCasement();
        casement.setPosition([0, floorScale.z / 2, pos]);
        casement.updateLocalMatrix();
        return casement;
    }

    newBackCasement(pos) {
        let casement = this.newHorizontalCasement();
        casement.setPosition([0, -floorScale.z / 2, pos]);
        casement.updateLocalMatrix();
        return casement;
    }

    newHorizontalCasement() {
        let casement = new Casement();
        casement.build();

        casement.setRotation([Math.PI / 2, [0, 0, 1]]);
        casement.updateRotation();
        casement.setRotation([Math.PI / 2, [1, 0, 0]]);
        return casement;
    }

    newDepthCasement(pos) {
        let casement = new Casement();
        casement.build();

        casement.setRotation([Math.PI / 2, [0, 0, 1]]);
        casement.setPosition([0, -floorScale.x / 2, pos]);
        casement.updateLocalMatrix();
        return casement;
    }
}