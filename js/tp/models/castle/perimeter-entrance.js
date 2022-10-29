class PerimeterEntrance extends Objeto3D {
    constructor(menu) {
        super(null, null, menu);

    }

    init() {
        this.scale = {
            x: 1.0,
            y: 1.0,
            z: 3.0
        };

        let entrance = new Entrance(this.menu);
        entrance.scale = this.scale;

        entrance.build();
        entrance.setPosition([-entrance.scale.z/2, 0, 0]);
        entrance.updateLocalMatrix();

        this.addChild(entrance);

        let tower = new Tower(20, 20, this.menu);
        tower.build();

        this.addChild(tower);
    }
}