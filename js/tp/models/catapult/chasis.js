const chasisConfig = {
    axles: [
        {
            position: [-2, 1.0, 0.0]
        },
        {
            position: [2, 1.0, 0.0]
        }
    ],
    base: {
        position: [0.0, 1.0, 0.0],
        color: [0.9, 0.5, 0.3],
        scale: {
            x: 6.00,
            y: 0.4,
            z: 2.7
        },
        rotation: [Math.PI/2, [1,0,0]]
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

        let base = new Box();
        base.scale = chasisConfig.base.scale;
        base.color = chasisConfig.base.color;
        base.material = materials['wood'];
        base.setPosition(chasisConfig.base.position);
        base.updateLocalMatrix();
        base.build();
        this.addChild(base);

    }
}