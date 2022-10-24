class Box extends Objeto3D {
    
    rotateAngle = 0;

    constructor(width, height) {
        super(width, height);
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
            return [0.5, v, 0.5];
        } else if (v <= 0.0) {
            return [0.5, 0, 0.5];
        }

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

        return [x, y, z];
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

        this.rotateAngle = time*Math.PI/3600;
        this.setRotation([this.rotateAngle, [0, 1, 0]]);
        this.updateRotation();
    
    }
}