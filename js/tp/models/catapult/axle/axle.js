const axleConfig = {
    wheels: [
        {
            position: [0, -1.5, 0.0]
        },
        {
            position: [0, 1.5, 0.0]
        }
    ]
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

        let beam = new AxlePivot();
        beam.setRotation(axlePivotConfig.rotation);
        beam.updateLocalMatrix();
        beam.build();
        this.addChild(beam);

    }
}