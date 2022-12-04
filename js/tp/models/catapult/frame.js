const frameConfig = {
    color: [0.9, 0.5, 0.3],
    reduction: 1.35,
    scale: {
        x: 2.5,
        y: 2.0,
        z: 0.1
    },
    legs: [
        {
            position: [0, -0.8, -0.5]
        },
        {
            position: [0, -0.8, 0.5]
        }
    ],
    pivot: {
        color: [0, 0, 0],
        scale: {
            x: 0.07,
            y: 2.4,
            z: 0.07
        },
        rotation: [Math.PI/2, [1,0,0]]
    }
}

class Frame extends Objeto3D {
    constructor() {
        super();
    }

    init() {
        
        for (let leg of frameConfig.legs) {

            let box = new TrapezoidBox(10, 4);
            box.scale = frameConfig.scale;
    
            box.setPosition(leg.position);
            box.updateLocalMatrix();
    
            box.color = frameConfig.color;
            box.material = materials['wood'];
    
            box.reduction = frameConfig.reduction;
    
            box.build();
            this.addChild(box);
        }

        let pivot = new Cylinder(1, 10);
        pivot.scale = frameConfig.pivot.scale;
        pivot.color = frameConfig.pivot.color;
        pivot.material = materials['wood'];
        pivot.setRotation(frameConfig.pivot.rotation);
        pivot.updateLocalMatrix();
        pivot.build();
        this.addChild(pivot);

    }
}