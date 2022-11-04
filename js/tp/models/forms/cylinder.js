class Cylinder extends Objeto3D {

    rotateAngle = 0;

    constructor(width, height) {
        super(width*6, height);
    }

    init() {
        this.color = [0.7, 0.6, 0.1];
        this.empty = false;
        this.scale = {
            x: 1.0,
            y: 1.0,
            z: 1.0
        }
    }

    getPosition(u, v) {

        let x, y, z, r;

        r = 1;

        //colapso los extremos para formar la tapa
        if (v == 1) {
            return [0, this.scale.y * (0.5 - 1 / this.width), 0];
        } else if (v == 0) {
            return [0, this.scale.y * (1 / this.width - 0.5), 0];
        }

        // las penultimas 2 filas las mando al mismo nivel para 
        // que tengan la misma normal
        if (v >= (this.width - 1) / this.width) {
            return this.getPosition(u, v - 1 / this.width);
        }

        if (v <= 1 / this.width) {
            return this.getPosition(u, v + 1 / this.width);
        }

        let a = u * 2.0 * Math.PI;

        x = r * Math.cos(a);
        y = v;
        z = r * Math.sin(a);

        return [x * this.scale.x, (y - 0.5) * this.scale.y, z * this.scale.z];
    }

    getNormal(u, v) {
        if (v >= 1.0) {
            return [0, 1, 0];
        } else if (v <= 0.0) {
            return [0, -1, 0];
        } else {
            if (v >= (this.width - 1) / this.width) {
                return [0, 1, 0];
            } else {
                if (v <= 1 / this.width) {
                    return [0, -1, 0];
                } else {
                    let a = u * 2.0 * Math.PI;

                    return [Math.cos(a), 0, Math.sin(a)];

                }
            }
        }

    }

    getTextureCoordinates(u, v) {
        return [u, v];
    }

    animate() {

        this.rotateAngle = time * Math.PI / 3600;
        this.setRotation([this.rotateAngle, [0, 1, 0]]);
        this.updateRotation();

    }
}