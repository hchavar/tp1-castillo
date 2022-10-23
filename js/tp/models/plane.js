class Plane extends Objeto3D {
    
    constructor(width, height) {
        super(width, height);
    }

    isEmpty() {
        return false;
    }
    
    getPosition(u, v) {

        var x = (u - 0.5) * this.width;
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