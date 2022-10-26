const xCenter = 0.5,
    yCenter = 0.5,
    zCenter = 0.5,
    xSize = 1.0,
    ySize = 1.0,
    zSize = 1.0;

class Box extends Objeto3D {

    constructor(width, height, menu) {
        super(width, height, menu);
    }

    init() {
        this.empty = false;
        this.xScale = xSize;
        this.yScale = ySize;
        this.zScale = zSize;
        this.color = [0.2, 0.6, 0.9];
    }

    getName() {
        return "Box";
    }

    getPosition(u, v) {

        let x, y, z;

        //colapso los extremos para formar la tapa
        if (v >= 1.0) {
            x = xCenter;
            y = v;
            z = zCenter;
        } else if (v <= 0.0) {
            x = xCenter;
            y = 0.0;
            z = zCenter;
        } else {

            if (u < 0.25) {
                x = 0.0;
                z = 4 * u;
            } else if (u < 0.5) {
                z = 1.0;
                x = 4 * (u - 0.25);
            } else if (u < 0.75) {
                x = 1.0;
                z = 1 - 4 * (u - 0.5);
            } else {
                z = 0.0;
                x = 1 - 4 * (u - 0.75);
            }
            y = (v - 1 / this.width) / (0.5 - 1 / this.width) * 0.5;
        }

        return [(x - xCenter) * this.xScale, (y - yCenter) * this.yScale, (z - zCenter) * this.zScale];
    }

    getNormal(u, v) {
        return this.getPosition(u, v);
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