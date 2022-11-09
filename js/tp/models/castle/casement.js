class Casement extends Objeto3D {

    constructor(menu) {
        super(6, 32, menu);
    }

    static create() {
        let casement = new Casement();
        casement.build();

        casement.setRotation([Math.PI / 2, [0, 0, 1]]);

        return casement;
    }

    init() {
        this.scale = {
            x: 0.4,
            y: 0.04,
            z: 0.4
        };
        this.color = [0.2, 0.1, 0.01];
        this.empty = false;
        this.reuseBuffer = true;
        this.name = this.constructor.name;
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
            // las penultimas 2 filas las mando al mismo nivel para 
            // que tengan la misma normal
            if (v >= (this.width - 2) / this.width) {
                newV = (this.width - 1) / this.width;
            }
            if (v <= 2 / this.width) {
                newV = 1 / this.width;
            }

            if (u < 0.25) {
                x = 0.0;
                z = 4 * u;
                
            } else if (u < 0.5) {
                z = 1.0;
                x = 4 * (u - 0.25);

            } else if (u < 0.75) {
                
                let aux = 0.5 + 4*(u-0.5);
                let a = aux * Math.PI;
                
                x = 1.0 - Math.cos(a)/3;
                z = 1 - 4 * (u - 0.5);
                
            } else {
                z = 0.0;
                x = 1 - 4 * (u - 0.75);
                
            }
            y = (newV - 1 / this.width) / (0.5 - 1 / this.width) * 0.5;
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

}