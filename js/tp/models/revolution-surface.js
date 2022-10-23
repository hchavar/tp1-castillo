class RevolutionSurface extends Objeto3D {
    
    constructor(rows, cols) {
        
        super(rows, cols);
        
    }

    init() {
        // todo lo que se necesite para contruir la curva ANTES de construirla debe estar aca
        let pc = [[0.0,0.0,0.0], [0.6,1.6,0.0], [1.8,0.4,0.0], [2.0,2.0,0.0]];
        this.curve = getBezierCurve(pc);
    }


    getPosition(u,v) {
        
        if (u == 1) {
            return [0, 2, 0];    
        } else if (u == 0) {
            return [0, 0, 0];
        }
        
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

    isEmpty() {
        return false;
    }

    getColor() {
        return [0.2, 0.3, 0.8];
    }

    animate() {

        let rotateAngle = time * Math.PI / 30;
        this.setRotation([rotateAngle, [0, 1, 0]]);
    
    }
}