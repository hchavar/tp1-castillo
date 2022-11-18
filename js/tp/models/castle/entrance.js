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
    constructor(menu) {

        super(null, null, menu);

    }

    init() {
        let gate = new Gate(this.menu);
        gate.scale = entranceConfig.gate.scale;
        gate.build();
        this.addChild(gate);

        for (const lidConfig of entranceConfig.lids) {
            let box = new Box();
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

        let wall1 = new FrontWall(this.menu);
        wall1.scale = we;

        wall1.build();
        wall1.setRotation([-Math.PI / 2, [0, 1, 0]]);
        wall1.setPosition([0, 0, -(wall1.scale.z + HEIGHT / 2)]);
        wall1.updateLocalMatrix();

        this.addChild(wall1);

        let wall2 = new FrontWall(this.menu);
        wall2.scale = we;

        wall2.build();
        wall2.setRotation([-Math.PI / 2, [0, 1, 0]]);

        wall2.setPosition([0, 0, (HEIGHT / 2)]);
        wall2.updateLocalMatrix();

        this.addChild(wall2);

        let light1 = new Lamp(this.menu);
        light1.name = "Lamp1";
        let m1 = mat4.create();
        mat4.rotate(m1, m1, -Math.PI / 4, [1, 0, 0]);
        
        light1.setScale(0.3);
        light1.setPosition([-3 * HEIGHT, 1.5, -2.5]);
        light1.updateLocalMatrix();
        mat4.multiply(light1.localMatrix, light1.localMatrix, m1);
        light1.build();



        this.addChild(light1);

        this.menu.lights.push(light1.light);

        let light2 = new Lamp(this.menu);
        light2.name = "Lamp2";
        m1 = mat4.create();
        mat4.rotate(m1, m1, -Math.PI / 4, [1, 0, 0]);
        
        light2.setScale(0.3);
        light2.setPosition([3 * HEIGHT, 1.5, -2.5]);
        light2.updateLocalMatrix();
        mat4.multiply(light2.localMatrix, light2.localMatrix, m1);
        light2.build();

        this.addChild(light2);

        this.menu.lights.push(light2.light);

    }

}
