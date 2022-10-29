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
            position: [-(HEIGHT - THICKNESS) / 2, HEIGHT / 2, 0],
            scale: {
                x: THICKNESS,
                y: HEIGHT,
                z: DEPTH
            }
        },
        {
            position: [(HEIGHT - THICKNESS) / 2, HEIGHT / 2, 0],
            scale: {
                x: THICKNESS,
                y: HEIGHT,
                z: DEPTH
            }
        }
    ],
    gate: {
        scale: {
            x: (HEIGHT - 2 * THICKNESS),
            y: (HEIGHT - THICKNESS),
            z: THICKNESS
        }
    }
}

class Entrance extends Objeto3D {
    constructor(menu, wallSizeFactor) {

        super(null, null, menu);
        this.wallSizeFactor = wallSizeFactor;

    }

    init() {
        let gate = new Gate(this.menu);
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

        let we = {
            x: 1.0,
            y: 1.0,
            z: (this.scale.z - HEIGHT - 0.5) / 2
        };

        let wall1 = new Wall(20, 20, this.menu, "ent" + this.wallSizeFactor);
        wall1.scale = we;

        wall1.build();
        wall1.setRotation([-Math.PI / 2, [0, 1, 0]]);
        wall1.setPosition([0, 0, -(wall1.scale.z + HEIGHT / 2)]);
        wall1.updateLocalMatrix();

        this.addChild(wall1);

        let wall2 = new Wall(20, 20, this.menu, "ent" + this.wallSizeFactor);
        wall2.scale = we;

        wall2.build();
        wall2.setRotation([-Math.PI / 2, [0, 1, 0]]);

        wall2.setPosition([0, 0, (HEIGHT / 2)]);
        wall2.updateLocalMatrix();

        this.addChild(wall2);

    }

}
