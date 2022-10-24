class TranslationSurface extends BezierSurface {

    constructor(rows, cols, menu) {
        super(rows, cols, menu);
    }

    getPosition(u,v){
        let pc = this.curve.points[Math.round(u * (this.curve.points.length - 1))];
        let x = pc[0];
        let y = pc[1];
        let z = v;

        return [x, y, z*5];
    }

    getNormal(u,v){
        return this.getPosition(u, v);
    }

    getTextureCoordinates(u,v){
        return [u,v];
    }

}
