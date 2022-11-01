const ArmStatus = {
    WAITING: 0,
    READY: 1,
    FIRING: 2,
    STOPPING: 3,
    RETURNING: 4,
    GETTING_READY: 5,
    CHARGING: 6,
    CHARGED: 7
}

const armConfig = {
    arm: {
        position: [0, 3.0, 0.0],
        color: [0.9, 0.5, 0.3],
        rotation: [Math.PI / 2, [0, 0, 1]],
        reduction: 0.9,
        scale: {
            x: 0.6,
            y: 10.0,
            z: 0.4
        }
    },
    hand: {
        color: [0.9, 0.5, 0.3],
        position: [-7.5, 0.162, 0.0],
        scale: {
            x: 1.0,
            y: 0.1,
            z: 1.0
        }
    },
    load: {
        color: [0.5, 0.5, 0.5],
        position: [-7.5 / 0.8, 1.2, 0.0],
        scaleFactor: 0.8

    },
    counterWeight: {
        position: [0.5, 0.0, 0.00],
        color: [0.9, 0.5, 0.3],
        rotation: [Math.PI / 2, [1, 0, 0]],
        scaleFactor: 3
    }
}

class Arm extends Objeto3D {
    constructor(menu) {
        super(null, null, menu);
        this.status = ArmStatus.WAITING;
        this.angle = 0.0;
        this.statusTime = time;
        this.velocity = 0.0;
        this.menu.addFireCatapult(this);
    }

    init() {
        let hand = new Box(4, 8);
        hand.scale = armConfig.hand.scale;
        hand.color = armConfig.hand.color;

        let m1 = mat4.create();
        mat4.rotate(m1, m1, Math.PI / 180, [0, 0, 1]);
        hand.setPosition(armConfig.hand.position);
        hand.updateLocalMatrix();
        mat4.multiply(hand.localMatrix, hand.localMatrix, m1);

        hand.build();
        this.addChild(hand);

        this.load = new Sphere(10, 10);
        this.load.color = armConfig.load.color;
        this.load.setScale(armConfig.load.scaleFactor);
        this.load.setPosition(armConfig.load.position);
        this.load.updateLocalMatrix();
        this.load.build();
        this.addChild(this.load);
        this.load.visible = false;

        let arm = new TrapezoidBox(4, 8);
        arm.scale = armConfig.arm.scale;
        arm.reduction = armConfig.arm.reduction;
        arm.color = armConfig.arm.color;
        arm.setRotation(armConfig.arm.rotation);
        arm.setPosition(armConfig.arm.position);
        arm.updateLocalMatrix();
        arm.build();
        this.addChild(arm);

        this.counterWeight = new CounterWeight();
        this.counterWeight.setScale(armConfig.counterWeight.scaleFactor);
        this.counterWeight.setPosition(armConfig.counterWeight.position);
        this.counterWeight.updateLocalMatrix();
        this.counterWeight.build();
        this.addChild(this.counterWeight);

    }

    update() {
        this.status = ArmStatus.READY;
        this.statusTime = time;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
        this.statusTime = time;
    }
    
    animate() {
        if (this.status == ArmStatus.WAITING) return;

        this.load.visible = (this.status == ArmStatus.FIRING || this.status == ArmStatus.CHARGED);
        let deltaTime = () => (time - this.statusTime);

        if (this.status == ArmStatus.FIRING && this.angle < -2 * Math.PI / 5) {
            this.status = ArmStatus.STOPPING;
        } else {
            if (this.status == ArmStatus.STOPPING && this.angle < -41 * Math.PI / 90) {
                this.status = ArmStatus.RETURNING;
                this.velocity = 0.0;
            } else {
                if (this.status == ArmStatus.RETURNING && this.angle >= 0) {
                    this.status = ArmStatus.GETTING_READY;
                    this.velocity = this.velocity * 0.8;
                } else if (this.status == ArmStatus.GETTING_READY && this.velocity < 0.0001) {

                    this.status = ArmStatus.CHARGING;
                    this.velocity = 0.0;

                } else {
                    if (this.status == ArmStatus.CHARGING && this.angle < -0.01) {
                        this.status = ArmStatus.WAITING;
                        this.angle = 0.0;
                    } else {
                        if (this.status == ArmStatus.READY && deltaTime() > 0.05) {
                            this.status = ArmStatus.CHARGED;
                            this.velocity = 0.04;
                        } else {
                            if (this.status == ArmStatus.CHARGED && deltaTime() > 0.05) {
                                this.status = ArmStatus.FIRING;
                            }
                        }
                    }
                }
            }
        }

        let factor = 0.0;
        if (this.status == ArmStatus.FIRING) {
            this.velocity -= (deltaTime() * deltaTime() * 2);
        } else if (this.status == ArmStatus.STOPPING) {
            this.velocity += (deltaTime() * deltaTime() * 0.5);
        } else if (this.status == ArmStatus.RETURNING) {
            this.velocity += deltaTime() / 10;
        } else if (this.status == ArmStatus.GETTING_READY) {
            this.velocity = this.velocity / 2;
        } else if (this.status == ArmStatus.CHARGING) {
            this.velocity -= deltaTime() / 200;
        } else if (this.status == ArmStatus.CHARGED) {
            if (this.velocity > 0)
                this.velocity -= deltaTime() / 200;
            else this.velocity = 0;
        } else return;

        this.angle += this.velocity * Math.PI / 18;

        // rotate the arm
        this.renewLocalMatrix();
        this.setRotation([this.angle, [0, 0, 1]]);
        this.updateLocalMatrix();
        
        // now rotate the conterweight
        
        let m1 = mat4.create();
        mat4.rotate(m1, m1, -this.velocity * Math.PI / 18, [0, 0, 1]);
        
        mat4.multiply(this.counterWeight.localMatrix, this.counterWeight.localMatrix, m1);


    }
}
