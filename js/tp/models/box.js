class Box extends Objeto3D {
    
    
    constructor(width, height) {
        super(width, height);
    }
    
    init() {
        this.xScale = 1.0;
        this.yScale = 1.0;
        this.zScale = 1.0;
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



        return [x*this.xScale, y*this.yScale, z*this.zScale];
    }

    getNormal(u, v) {
        return this.getPosition(u, v);
    }

    getTextureCoordinates(u, v) {
        return [u, v];
    }

    getColor() {
        return [0.2, 0.6, 0.9];
    }

    animate() {

        this.rotateAngle = time*Math.PI/36;
        this.setRotation([this.rotateAngle, [0, 1, 0]]);
        this.updateRotation();
    
    }
}