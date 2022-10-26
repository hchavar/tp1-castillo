const THICKNESS = 0.1;
const DEPTH = 1.0;
const HEIGHT = 2.0;

const entranceConfig = {
    lids: [
        {
            position: [0, HEIGHT, 0],
            scale: {
                x: HEIGHT,
                y: THICKNESS,
                z: DEPTH
            }
        },
        {
            position: [-(HEIGHT - THICKNESS)/2, HEIGHT / 2, 0],
            scale: {
                x: THICKNESS,
                y: HEIGHT,
                z: DEPTH
            }
        },
        {
            position: [(HEIGHT- THICKNESS)/2, HEIGHT / 2, 0],
            scale: {
                x: THICKNESS,
                y: HEIGHT,
                z: DEPTH
            }
        }
    ],
    gate: {
        //position: [(HEIGHT- THICKNESS)/2, HEIGHT / 2, 0],
        scale: {
            x: (HEIGHT - THICKNESS),
            y: (HEIGHT - THICKNESS),
            z: THICKNESS
        }
    }
}

class Entrance extends Objeto3D {
    constructor(menu) {

        super();

        let gate = new Gate(menu);
        gate.scale = entranceConfig.gate.scale;
        gate.build();
        this.addChild(gate);

        for (const lidConfig of entranceConfig.lids) {
            let box = new Box(20, 20);
            box.scale = lidConfig.scale;
            box.color = [1, 1, 1];
            box.build();
            box.setPosition(lidConfig.position);
            box.updateLocalMatrix();
            this.addChild(box);
        }


    }




}