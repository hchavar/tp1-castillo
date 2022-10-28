const chasisConfig = {
    axles: [
        {
            position: [-2, 0.5, 0.0]
        },
        {
            position: [2, 0.5, 0.0]
        }
    ],
    base: {
        position: [0.0, 1.8, 0.07],
        color: [0.9, 0.5, 0.3],
        scale: {
            x: 6.00,
            y: 0.4,
            z: 2.7
        },
        rotation: [Math.PI/2, [1,0,0]]
    },
    armFrame: {
        position: [0.9, 1.7, 0.07],
        color: [0.9, 0.5, 0.3],
        scaleFactor: 2
    }
}

class Chasis extends Objeto3D {
    constructor() {
        super();
    }

    init() {
        
        for (let axleConfig of chasisConfig.axles) {

            let axle = new Axle();
            axle.setPosition(axleConfig.position);
            axle.updateLocalMatrix();
    
            axle.color = chasisConfig.color;
    
            axle.build();
            this.addChild(axle);
        }

        let base = new Box(4, 8);
        base.scale = chasisConfig.base.scale;
        base.color = chasisConfig.base.color;
        base.setPosition(chasisConfig.base.position);
        base.updateLocalMatrix();
        base.build();
        this.addChild(base);

        let armFrame = new Frame(4, 10);
        armFrame.setPosition(chasisConfig.armFrame.position);
        armFrame.setScale(chasisConfig.armFrame.scaleFactor);
        armFrame.updateLocalMatrix();
        armFrame.build();
        this.addChild(armFrame);

    }
}