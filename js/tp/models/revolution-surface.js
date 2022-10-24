class RevolutionSurface extends BezierSurface {
    
    constructor(rows, cols, menu) {
        
        super(rows, cols, menu);
        
    }

    getPosition(u,v) {
        
        let pos = Math.round(u * (this.curve.points.length - 1));
      
        let pc = this.curve.points[pos];
        
        let p = [pc[0], pc[1], pc[2], 0];

        let angulo = v *2.0 * Math.PI; 

        vec3.rotateY(p, p, [0, 1, 0], angulo);

        return p;
    }

    getNormal(u,v) {
        return this.getPosition(u, v);
    }
    
    getTextureCoordinates(u,v) {
        return [u,v];
    }

    animate() {

        let rotateAngle = time * Math.PI / 30;
        this.setRotation([rotateAngle, [0, 1, 0]]);
    
    }
}