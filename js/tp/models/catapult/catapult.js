const catapultConfig = {
    firingSystem: {
        position: [2.0, 4.7, 0.0],
        scaleFactor: 0.6
    }
}

class Catapult extends Objeto3D {
    constructor() {
        super();
    }

    init() {
        
        
        let chasis = new Chasis();
        chasis.build();
        this.addChild(chasis);

        let firingSystem = new FiringSystem();
        firingSystem.setPosition(catapultConfig.firingSystem.position);
        firingSystem.setScale(catapultConfig.firingSystem.scaleFactor);
        firingSystem.updateLocalMatrix();
        firingSystem.build();
        this.addChild(firingSystem);

    }
}