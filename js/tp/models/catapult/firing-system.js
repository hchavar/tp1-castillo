const firingSystemConfig = {
    arm: {
        position: [0, 0.0, 0.0],
        rotation: [Math.PI / 2, [1, 0, 0]],
    },
    armFrame: {
        position: [0.0, 0.0, 0.0],
        scaleFactor: 3
    }
}

class FiringSystem extends Objeto3D {
    constructor() {
        super();
    }

    init() {

        let arm = new Arm();
        arm.setPosition(firingSystemConfig.arm.position);
        arm.updateLocalMatrix();
        arm.build();
        this.addChild(arm);

        let armFrame = new Frame(4, 10);
        armFrame.setPosition(firingSystemConfig.armFrame.position);
        armFrame.setScale(firingSystemConfig.armFrame.scaleFactor);
        armFrame.updateLocalMatrix();
        armFrame.build();
        this.addChild(armFrame);

    }
}