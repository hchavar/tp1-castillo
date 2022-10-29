const axleConfig = {
    color: [0.9, 0.5, 0.3],
    reduction: 0.7,
    rotation: [Math.PI/2, [1,0,0]],
    scale: {
        x: 1.0,
        y: 0.1,
        z: 1.0
    },
    wheels: [
        {
            position: [0, -1.5, -1.0]
        },
        {
            position: [0, 1.5, -1.0]
        }
    ],
    beam: {
        position: [0.0, -3.2, -1.0],
        color: [0, 0, 0],
        scale: {
            x: 0.07,
            y: 6.4,
            z: 0.07
        },
        rotation: [Math.PI/2, [1,0,0]]
    }
}

class Axle extends Objeto3D {
    constructor() {
        super();
    }

    init() {
        
        for (let wheelConfig of axleConfig.wheels) {

            let wheel = new Cylinder(4, 20);
            wheel.scale = axleConfig.scale;
    
            wheel.setRotation(axleConfig.rotation);
            wheel.setPosition(wheelConfig.position);
            wheel.updateLocalMatrix();
    
            wheel.color = axleConfig.color;
       
            wheel.build();
            this.addChild(wheel);
        }

        let beam = new Cylinder(4, 10);
        beam.scale = axleConfig.beam.scale;
        beam.color = axleConfig.beam.color;
        beam.setPosition(axleConfig.beam.position);
        beam.setRotation(axleConfig.beam.rotation);
        beam.updateLocalMatrix();
        beam.build();
        this.addChild(beam);

    }
}