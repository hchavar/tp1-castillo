const catapultConfig = {
    firingSystem: {
        position: [0.0, 7.4, 0.0],
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
        this.chasis.build();
        this.addChild(this.chasis);

        this.firingSystem = new FiringSystem(this.menu);
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

    animate() {
        this.firingSystem.animate();
    }
}