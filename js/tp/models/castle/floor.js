class Floor extends Objeto3D {
    constructor(menu) {
        super(null, null, menu);
        this.number = -1;
        this.configs = {};
        // this.menu.addFloor(this);
        this.scale = {
            x: this.menu.castleWidth,
            y: 1,
            z: this.menu.castleHeight
        };
    }

    update() {
        this._scale = null;
        this.scale = {
            x: this.menu.castleWidth,
            y: 1,
            z: this.menu.castleHeight
        };

        if(this.configs[this.configName]) {
            this.children = this.configs[this.configName];
        } else {
            this.children = [];
            this.create(this.configName);
        }
    }

    init() {
        this.create(this.configName);
    }

    create(config) {

        let floor = new Box(4 * this.scale.y, 8 * this.scale.x, this.menu)

        floor.color = [0.99, 0.85, 0.35];
        floor.scale = this.scale;
        floor.name = "Floor_" + config;
        floor.reuseBuffer = true;
        floor.build();

        this.addChild(floor);

        let m = (this.scale.x - 3) / 2;
        for (let i = - m; i <= m; i++) {
            this.addChild(this.newFrontCasement(i));
            this.addChild(this.newBackCasement(i));
        }

        m = (this.scale.z - 3) / 2;
        for (let i = - m; i <= m; i++) {
            this.addChild(this.newLeftCasement(i));
            this.addChild(this.newRightCasement(i));
        }

        this.configs[config] = this.children;
    }

    newFrontCasement(pos) {
        let casement = this.newHorizontalCasement();
        casement.setPosition([0, this.scale.z / 2, pos]);
        casement.updateLocalMatrix();
        return casement;
    }

    newBackCasement(pos) {
        let casement = this.newHorizontalCasement();
        casement.setPosition([0, -this.scale.z / 2, pos]);
        casement.updateLocalMatrix();
        return casement;
    }

    newHorizontalCasement() {
        let casement = Casement.create();

        casement.updateRotation();
        casement.setRotation([Math.PI / 2, [1, 0, 0]]);
        return casement;
    }

    newLeftCasement(pos) {
        let casement = Casement.create();

        casement.setPosition([0, -this.scale.x / 2, pos]);
        casement.updateLocalMatrix();
        return casement;
    }

    newRightCasement(pos) {
        let casement = Casement.create();

        casement.setPosition([0, this.scale.x / 2, pos]);
        casement.updateLocalMatrix();
        return casement;
    }

    get configName() {
        return this.scale.x + "x" + this.scale.z;
    }
}