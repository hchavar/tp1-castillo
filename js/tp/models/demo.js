class Demo extends Objeto3D {
    
    rotateAngle = -1.57078;

    constructor(height, width) {
        super();
        this.height = height;
        this.width = width;
    }

    isEmpty() {
        return false;
    }
    
    getPosition(u, v) {

        let r = 2;
        let nx = Math.sin(v)*Math.sin(u);
        let ny = Math.sin(v)*Math.cos(u);
        let nz = Math.cos(v);
    
        let g = v % 0.5;
        let h = u % 1;
        let f = 1;
    
        if (g < 0.25) f = 0.95;
        if (h < 0.5) f = f * 0.95;
    
        let x = nx * r * f;
        let y = ny * r * f;
        let z = nz * r * f;
    
        return [x, y, z];
    }

    getNormal(u, v) {
        var p = this.getPosition(u, v);
        var v = vec3.create();
        vec3.normalize(v, p);
    
        var delta = 0.05;
        var p1 = this.getPosition(u, v);
        var p2 = this.getPosition(u, v + delta);
        var p3 = this.getPosition(u + delta, v);
    
        var v1 = vec3.fromValues(p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]);
        var v2 = vec3.fromValues(p3[0] - p1[0], p3[1] - p1[1], p3[2] - p1[2]);
    
        vec3.normalize(v1, v1);
        vec3.normalize(v2, v2);
    
        var n = vec3.create();
        vec3.cross(n, v1, v2);
        vec3.scale(n, n, -1);
        return n;
    }

    getTextureCoordinates(u, v) {
        return [u, v];
    }

    getColor() {
        return [1, 1, 0];
    }

    animate() {

        this.rotateAngle += 0.01;
        //mat4.identity(modelMatrix);
        mat4.rotate(this.localMatrix, this.localMatrix, this.rotateAngle, [1.0, 0.0, 1.0]);
    
        // mat4.identity(normalMatrix);
        // mat4.multiply(normalMatrix,viewMatrix,modelMatrix);
        // mat4.invert(normalMatrix,normalMatrix);
        // mat4.transpose(normalMatrix,normalMatrix);
    
    }
}