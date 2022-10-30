class Casement extends Objeto3D {

    constructor(menu) {
        super(4, 32, menu);
    }

    init() {
        this.scale = {
            x: 1.0,
            y: 0.1,
            z: 1.0
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
            y = (v - 1 / this.width) / (0.5 - 1 / this.width) * 0.5;
        }

        return [(x - defaultCenter.x) * this.scale.x, (y - defaultCenter.y) * this.scale.y, (z - defaultCenter.z) * this.scale.z];
    }

    getNormal(u, v) {
        return this.getPosition(u, v);
    }

    getTextureCoordinates(u, v) {
        return [u, v];
    }

}