const axleConfig = {
    wheels: [
        {
            position: [0, -1.5, 0.0]
        },
        {
            position: [0, 1.5, 0.0]
        }
    ],
    beam: {
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
        
        for (let wc of axleConfig.wheels) {

            let wheel = new Wheel();
            wheel.setRotation(wheelConfig.rotation);
            wheel.setPosition(wc.position);
            wheel.updateLocalMatrix();
           
            wheel.build();
            this.addChild(wheel);
        }

        let beam = new Cylinder(4, 10);
        beam.scale = axleConfig.beam.scale;
        beam.color = axleConfig.beam.color;
        beam.setRotation(axleConfig.beam.rotation);
        beam.updateLocalMatrix();
        beam.build();
        this.addChild(beam);

    }
}