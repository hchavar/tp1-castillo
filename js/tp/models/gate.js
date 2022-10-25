class Gate extends Box {
    constructor(menu) {
        super(20.0, 12.0, menu);
        this.menu.addGate(this);

    }

    init() {
        this.color = [0.8, 0.3, 0.4];
        this.xScale = 1.0;
        this.yScale = 2.0;
        this.zScale = 0.1;
        this.setPosition([0.0, 1.0, 0,0]);
        this.updatePosition();
    }

    update() {
        
        let ang = this.menu.angleGateOpen;
        
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