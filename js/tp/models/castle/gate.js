class Gate extends Box {
    constructor(menu) {
        super(menu);
        this.menu.addGate(this);

    }

    init() {
        this.empty = false;
        this.material = materials['wood'];

        this.color = [0.8, 0.3, 0.4];

        this.scale = {
            x: 1.0,
            y: 2.0,
            z: 0.1
        };
        this.setPosition([0.0, 1, 0.0]);
        this.updateLocalMatrix();
        this.update();
    }

    update() {

        let ang = this.menu.angleGateOpen;
        this.renewLocalMatrix();

        this.setRotation([ang, [1, 0, 0]]);
        this.setPosition([0.0, 1, 0.0]);
        this.updateLocalMatrix();

    }

}
