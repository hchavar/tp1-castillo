class PerimeterSection extends Objeto3D {
    constructor(menu) {
        super(null, null, menu);

        this.init();
    }

    init() {
        let wall = new Wall(20, 20, this.menu);
        wall.build();

        this.addChild(wall);

        let tower = new Tower(20, 20, this.menu);
        tower.build();

        this.addChild(tower);
    }
}