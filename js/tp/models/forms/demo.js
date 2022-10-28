class Demo extends Objeto3D {
    
    rotateAngle = 0;

    constructor(width, height) {
        super(width, height);
    }
    
    init() {
        this.color = [1, 0.2, 0.8];
        this.empty = false;
    }

    getName() {
        return "Demo";
    }
    
    getPosition(u, v) {

        let x, y, z, r;
        
        let alfa = (v * this.height)/(this.height - 1) * Math.PI * 2;
        let beta = (0.1 + (this.width * u)/(this.width - 1) * 0.8) * Math.PI;
        
        r = 2;
        let nx = Math.sin(beta) * Math.sin(alfa);
        let ny = Math.sin(beta) * Math.cos(alfa);
        let nz = Math.cos(beta);
    
        let g = beta % 0.5;
        let h = alfa % 1;
        let f = 1;
    
        if (g < 0.25) f = 0.95;
        if (h < 0.5) f = f * 0.95;
    
        x = nx * r * f;
        y = ny * r * f;
        z = nz * r * f;

        return [x, y, z];
    }

    getNormal(u, v) {
        let alfa = (v * this.height)/(this.height - 1) * Math.PI * 2;
        let beta = (0.1 + (this.width * u)/(this.width - 1) * 0.8) * Math.PI;

        let p = this.getPosition(alfa, beta);
        let aVec = vec3.create();
        vec3.normalize(aVec, p);

        let delta = 0.05;
        let p1 = this.getPosition(alfa, beta);
        let p2 = this.getPosition(alfa, beta + delta);
        let p3 = this.getPosition(alfa + delta, beta);

        let v1 = vec3.fromValues(p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]);
        let v2 = vec3.fromValues(p3[0] - p1[0], p3[1] - p1[1], p3[2] - p1[2]);

        vec3.normalize(v1, v1);
        vec3.normalize(v2, v2);
        
        let n = vec3.create();
        vec3.cross(n, v1, v2);
        vec3.scale(n, n, -1);
        return n;
    }

    getTextureCoordinates(u, v) {
        return [u, v];
    }

    animate() {

        this.rotateAngle = time * Math.PI / 60;
        this.setRotation([this.rotateAngle, [0, 0, 1]]);
        //this.updateRotation();
    
    }
}