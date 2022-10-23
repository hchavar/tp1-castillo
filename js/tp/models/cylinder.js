class Cylinder extends Objeto3D {
    
    rotateAngle = 0;

    constructor(width, height) {
        super(width, height);
    }

    isEmpty() {
        return false;
    }

    getName() {
        return "Cylinder";
    }
    
    getPosition(u, v) {

        let x, y, z, r;
        
        r = 1;
        
        //colapso los extremos para formar la tapa
        if (v == 1) {
            return [0, 1, 0];    
        } else if (v == 0) {
            return [0, 0, 0];
        }

        let a = u * 2.0 * Math.PI; 

        x = r * Math.cos(a);
        y = v;
        z = r * Math.sin(a);

        return [x, y, z];
    }

    getNormal(u, v) {
        return this.getPosition(u, v);
    }

    getTextureCoordinates(u, v) {
        return [u, v];
    }

    getColor() {
        return [0.7, 0.6, 0.1];
    }

    animate() {

        this.rotateAngle = time*Math.PI/3600;
        this.setRotation([this.rotateAngle, [0, 1, 0]]);
        this.updateRotation();
    
    }
}