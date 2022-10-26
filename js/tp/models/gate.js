class Gate extends Box {
    constructor(menu) {
        super(20.0, 12.0, menu);
        this.menu.addGate(this);

    }

    init() {
        this.empty = false;
        if (!this.color)
            this.color = [0.8, 0.3, 0.4];
        if (!this.scale)
            this.scale = {
                x: 1.0,
                y: 2.0,
                z: 0.1
            };
        this.setPosition([0.0, 1, 0.0]);
        this.updateLocalMatrix();
    }

    update() {

        let ang = this.menu.angleGateOpen;
        this.renewLocalMatrix();

        this.setRotation([ang, [1, 0, 0]]);
        this.setPosition([0.0, 1, 0.0]);
        this.updateLocalMatrix();

    }

    animate() {

        this.rotateAngle = Math.PI / 360;
        //box.setPosition([-0.01, 0, 0]);
        this.setPosition([0.0, 0.0, 0.01]);
        this.setRotation([this.rotateAngle, [1, 0, 0]]);
        this.updateLocalMatrix();
        //this.updateRotation();

    }
}