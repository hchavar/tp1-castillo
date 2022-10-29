class PerimeterSection extends Objeto3D {
    constructor(menu) {
        super(null, null, menu);

    }

    init() {
        this.scale = {
            x: 1.0,
            y: 1.0,
            z: 3.0
        };

        let wall = new Wall(20, 20, this.menu);
        wall.scale = this.scale;

        wall.build();
        wall.setRotation([-Math.PI / 2, [0, 1, 0]]);
        wall.updateRotation();

        this.addChild(wall);

        let tower = new Tower(20, 20, this.menu);
        tower.build();

        this.addChild(tower);
    }
}