const firingSystemConfig = {
    arm: {
        position: [0, 0.0, 0.0],
        rotation: [Math.PI / 2, [1, 0, 0]],
    },
    armFrame: {
        position: [0.0, 0.0, 0.0],
        scaleFactor: 3
    },
    load: {
        position: [0.0, HAND_DISTANCE + 0.2, 0.0]
    }
}

class FiringSystem extends Objeto3D {
    constructor(menu) {
        super(null, null, menu);
    }

    init() {

        this.arm = new Arm(this.menu, this.flyingLoad);
        this.arm.setPosition(firingSystemConfig.arm.position);
        this.arm.updateLocalMatrix();
        this.arm.build();
        this.addChild(this.arm);

        let armFrame = new Frame(4, 10);
        armFrame.setPosition(firingSystemConfig.armFrame.position);
        armFrame.setScale(firingSystemConfig.armFrame.scaleFactor);
        armFrame.updateLocalMatrix();
        armFrame.build();
        this.addChild(armFrame);

        this.flyingLoad = new Load();
        this.flyingLoad.initialPosition = firingSystemConfig.load.position;
        this.flyingLoad.updateLocalMatrix();
        this.flyingLoad.build();
        this.addChild(this.flyingLoad);
        this.menu.flyingLoad = this.flyingLoad;
    }

    animate() {
        this.arm.animate();
        this.flyingLoad.animate();
    }
}