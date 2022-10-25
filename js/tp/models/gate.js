class Gate extends Box {
    constructor(menu) {
        super(20.0, 12.0, menu);
        this.menu.addGate(this);

    }

    init() {
        this.xScale = 1.0;
        this.yScale = 2.0;
        this.zScale = 0.1;
        //this.setPosition([0.0, 1.0, 0,0]);
        //this.updatePosition();
    }

    update() {
        this.localMatrix = mat4.create();
        let ang = this.menu.angleGateOpen;
        //let ang2 = Math.PI/3;
        //this.setPosition([0.0, 0.5, 0,0]);
        //this.setRotation([ang, [1.0, 0.0, 0.0]]);
        //this.setPosition([0.0, 0.0, 0.01]);
        this.setRotation([ang, [1, 0, 0]]);
        this.setPosition([0.0, 1, 0.0]);
        this.updateLocalMatrix();
        
    }

    animate() {

        this.rotateAngle = Math.PI/360;
        //box.setPosition([-0.01, 0, 0]);
        this.setPosition([0.0, 0.0, 0.01]);
        this.setRotation([this.rotateAngle, [1, 0, 0]]);
        this.updateLocalMatrix();
        //this.updateRotation();
    
    }
}