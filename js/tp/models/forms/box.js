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
            if (v >= (this.width - 1) / this.width) {
                return this.getPosition(u, v - 1 / this.width);
            } else {
                if (v <= 1 / this.width) {
                    return this.getPosition(u, v + 1 / this.width);
                } else {

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
                    y = (v - 2 / this.width) / (0.5 - 2 / this.width) * 0.5;
                }
            }
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

    getTextureCoordinates(u, v) {
        return [u, v];
    }

    animate() {

        this.rotateAngle = Math.PI / 360;
        //box.setPosition([-0.01, 0, 0]);
        this.setPosition([0.00, 0.004, 0.004]);
        this.setRotation([this.rotateAngle, [1, 0, 0]]);
        this.updateLocalMatrix();

    }
}