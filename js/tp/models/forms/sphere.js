class Sphere extends Objeto3D {

    constructor(width, height) {
        super(width, height);
    }

    init() {
        this.color = [0.7, 0.6, 0.1];
        this.empty = false;
    }

    getPosition(u, v) {

        let x, y, z, r;

        r = 1;


        let a = u * 2.0 * Math.PI;
        let b = (v - 0.5) * Math.PI;

        x = (r * Math.cos(b) * Math.cos(a));
        y = (r * Math.cos(b) * Math.sin(a));
        z = (r * Math.sin(b));

        return [x, y, z];
    }

    getNormal(u, v) {
        let p = this.getPosition(u, v);
        vec3.normalize(p, p);
        return p;
    }

    getTextureCoordinates(u, v) {
        return [u, v];
    }

    get lightColor() {
        if (this.visible) return this.ambientColor;

        return [0, 0, 0];
    }
}