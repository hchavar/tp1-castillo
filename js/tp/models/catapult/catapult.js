const catapultConfig = {
    firingSystem: {
        position: [0.0, 4.0, 0.0],
        scaleFactor: 0.6
    }
}

class Catapult extends Objeto3D {
    constructor(menu) {
        super(null, null, menu);
        this.menu.addCatapult(this);
    }

    init() {


        this.chasis = new Chasis();
        chasis.build();
        this.addChild(chasis);

        this.firingSystem = new FiringSystem();
        this.firingSystem.setPosition(catapultConfig.firingSystem.position);
        this.firingSystem.setScale(catapultConfig.firingSystem.scaleFactor);
        this.firingSystem.updateLocalMatrix();
        this.firingSystem.build();
        this.addChild(this.firingSystem);

    }

    update() {
        this.firingSystem.renewLocalMatrix();
        this.firingSystem.setRotation([this.menu.catapultRotation * Math.PI / 180, [0, 1, 0]]);
        this.firingSystem.updateLocalMatrix();
    }
}