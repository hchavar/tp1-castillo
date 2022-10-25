class Box extends Objeto3D {
    
    
    constructor(width, height, menu) {
        super(width, height, menu);
    }
    
    init() {
        this.xScale = 1.0;
        this.yScale = 1.0;
        this.zScale = 1.0;
        this.color = [0.2, 0.6, 0.9];
    }

    isEmpty() {
        return false;
    }

    getName() {
        return "Box";
    }
    
    getPosition(u, v) {

        let x, y, z;
        
        //colapso los extremos para formar la tapa
        if (v >= 1.0) {
            x = 0.5;
            y = v;
            z = 0.5;
        } else if (v <= 0.0) {
            x = 0.5;
            y = 0.0;
            z = 0.5;
        } else {
            
            if (u < 0.25) {
                x = 0.0;
                z = 4*u;
            } else if (u < 0.5) {
                z = 1.0;
                x = 4*(u - 0.25);
            } else if ( u < 0.75) {
                x = 1.0;
                z = 1 - 4*(u - 0.5);
            } else {
                z = 0.0;
                x = 1 - 4*(u - 0.75);
            }
            y = (v - 1/this.width)/(0.5 - 1/this.width) * 0.5;
        }

        return [(x-0.5)*this.xScale, (y-0.5)*this.yScale, (z-0.5)*this.zScale];
    }

    getNormal(u, v) {
        return this.getPosition(u, v);
    }

    getTextureCoordinates(u, v) {
        return [u, v];
    }

    animate() {

        this.rotateAngle = Math.PI/360;
        //box.setPosition([-0.01, 0, 0]);
        this.setPosition([0.00, 0.004, 0.004]);
        this.setRotation([this.rotateAngle, [1, 0, 0]]);
        this.updateLocalMatrix();
    
    }
}