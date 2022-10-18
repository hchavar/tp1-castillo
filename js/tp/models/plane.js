class Plane extends Objeto3D {
    
    constructor(height, width) {
        super();
        this.height = height;
        this.width = width;
    }

    isEmpty() {
        return false;
    }
    
    getPosition(u, v) {

        var x = (u - 0.5) * this.height;
        var z = (v - 0.5) * this.height;
        return [x, 0, z];
    }

    getNormal(u,v) {
        return [0, 1, 0];
    }

    getTextureCoordinates(u, v) {
        return [u, v];
    }

    getColor() {
        return [1, 1, 0];
    }
}