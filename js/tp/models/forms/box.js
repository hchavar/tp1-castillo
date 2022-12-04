const defaultCenter = {
    x: 0.5,
    y: 0.5,
    z: 0.5
}

const defaultScale = {
    x: 1.0,
    y: 1.0,
    z: 1.0
}

class Box extends Objeto3D {

    constructor(menu) {
        super(6, 12, menu);
    }

    init() {
        this.scale = defaultScale;
        this.color = [0.2, 0.6, 0.9];
        this.empty = false;
        this.calculateFactor();

    }

    getPosition(u, v) {

        let x, y, z;

        //colapso los extremos para formar la tapa
        if (v >= 1.0) {
            x = defaultCenter.x;
            y = v;
            z = defaultCenter.z;
        } else if (v <= 0.0) {
            x = defaultCenter.x;
            y = 0.0;
            z = defaultCenter.z;
        } else {
            let newV = v;
            // hago coincidir los puntos en los bordes
            if (v >= (this.width - 1) / this.width) {
                newV = v - 1 / this.width;
            }
            if (v <= 1 / this.width) {
                newV = v + 1 / this.width;
            }

            if (u < 0.125) {
                x = 0.0;
                z = 0.0;
            } else if (u <= 0.25) {
                x = 0.0;
                z = 1.0;
            } else if (u < 0.375) {
                x = 0.0;
                z = 1.0;
            } else if (u <= 0.5) {
                x = 1.0;
                z = 1.0;
            } else if (u < 0.625) {
                x = 1.0;
                z = 1.0;
            } else if (u <= 0.75) {
                x = 1.0;
                z = 0.0;
            } else if (u < 0.875) {
                x = 1.0;
                z = 0.0;
            } else {
                z = 0.0;
                x = 0.0;
            }
            y = (newV - 2 / this.width) / (0.5 - 2 / this.width) * 0.5;

        }

        return [(x - defaultCenter.x) * this.scale.x, (y - defaultCenter.y) * this.scale.y, (z - defaultCenter.z) * this.scale.z];
    }

    getNormal(u, v) {
        if (this.isTopFace(v)) {
            return [0, 1, 0];
        } else if (this.isBottomFace(v)) {
            return [0, -1, 0];
        } else {

            if (u <= 0.25) {
                return [-1, 0, 0];
            } else if (u <= 0.5) {
                return [0, 0, 1];
            } else if (u <= 0.75) {
                return [1, 0, 0];
            } else {
                return [0, 0, -1];
            }

        }

    }

    isBottomFace(v) {
        return v <= 1 / this.width;
    }

    isTopFace(v) {
        return v >= (this.width - 1) / this.width;
    }

    calculateFactor() {

        const result = [this.scale.x, this.scale.y, this.scale.z].sort((x, y) => y - x).slice(0, 2);
        this.textureFactor = result[1] / result[0];

    }

    getTextureCoordinates(u, v) {
        let pos = this.getPosition(u, v);

        if (this.isTopFace(v) || this.isBottomFace(v)) {
            return [pos[0] * this.textureFactor, pos[2] * this.textureFactor];
        } else {

            if (u <= 0.25) {
                return [pos[1] * this.textureFactor, pos[2] * this.textureFactor];
            } else if (u <= 0.5) {
                return [pos[0] * this.textureFactor, pos[1] * this.textureFactor];
            } else if (u <= 0.75) {
                return [pos[1] * this.textureFactor, pos[2] * this.textureFactor];
            } else {
                return [pos[0] * this.textureFactor, pos[1] * this.textureFactor];
            }

        }
    }

    animate() {

        this.rotateAngle = Math.PI / 360;
        this.setPosition([0.00, 0.004, 0.004]);
        this.setRotation([this.rotateAngle, [1, 0, 0]]);
        this.updateLocalMatrix();

    }
}