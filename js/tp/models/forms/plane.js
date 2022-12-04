class Plane extends Objeto3D {

    constructor(width, height) {
        super(width, height);
    }

    init() {
        this.color = [0.1, 0.1, 0.1];
        this.empty = false;

        this.scale = {
            x: 1.0,
            y: 1.0,
            z: 1.0
        };
    }

    getPosition(u, v) {

        var x = (u - 0.5) * this.width;
        var z = (v - 0.5) * this.height;
        return [x * this.scale.x, 0, z * this.scale.z];
    }

    getNormal(u, v) {
        return [0, 1, 0];
    }

    getTextureCoordinates(u, v) {
        return [u*8, v*8];
    }

}