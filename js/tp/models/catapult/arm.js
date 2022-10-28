const armConfig = {
    arm: {
        position: [0, 3.0, 0.0],
        color: [0.9, 0.5, 0.3],
        rotation: [Math.PI / 2, [0, 0, 1]],
        reduction: 0.9,
        scale: {
            x: 0.6,
            y: 10.0,
            z: 0.4
        }
    },
    hand: {
        color: [0.9, 0.5, 0.3],
        position: [-7.5, 0.2, 0.0],
        rotation: [Math.PI / 90, [0, 0, 1]],
        scale: {
            x: 1.0,
            y: 0.1,
            z: 1.0
        }
    },
    counterWeight: {
        position: [0.5, 0.0, 0.00],
        color: [0.9, 0.5, 0.3],
        rotation: [Math.PI / 2, [1, 0, 0]],
        scaleFactor: 3
    }
}

class Arm extends Objeto3D {
    constructor() {
        super();
    }

    init() {
        let hand = new Box(4, 8);
        hand.scale = armConfig.hand.scale;
        hand.color = armConfig.hand.color;
        hand.setPosition(armConfig.hand.position);
        hand.updateLocalMatrix();
        // hand.setRotation(armConfig.hand.rotation);
        // hand.updateLocalMatrix();
        hand.build();
        this.addChild(hand);

        let arm = new TrapezoidBox(4, 8);
        arm.scale = armConfig.arm.scale;
        arm.reduction = armConfig.arm.reduction;
        arm.color = armConfig.arm.color;
        arm.setRotation(armConfig.arm.rotation);
        arm.setPosition(armConfig.arm.position);
        arm.updateLocalMatrix();
        arm.build();
        this.addChild(arm);

        let counterWeight = new CounterWeight();
        counterWeight.setScale(armConfig.counterWeight.scaleFactor);
        counterWeight.setPosition(armConfig.counterWeight.position);
        counterWeight.updateLocalMatrix();
        counterWeight.build();
        this.addChild(counterWeight);

    }
}
