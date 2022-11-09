class BezierSurface extends Objeto3D {

    constructor(rows, cols, menu) {
        super(rows, cols, menu);
    }

    init() {
        this.reuseBuffer = true;
        this.updateBezierControlPoints();
        this.updateBezierCurve();
    }

    update() {
        if (!this.reuseExistingSurface()) {
            this.updateBezierControlPoints();
            this.updateBezierCurve();
        }
        this.updateSurface();
    }

    updateBezierControlPoints() {
        // always override this function
        this.pc = [];
    }

    updateBezierCurve() {
        this.curve = getConcatenatedBezierCurve(this.pc);
        this.height = this.curve.points.length;
    }

    getNormalAt(u) {
        let pos = this.positionAt(u);

        let pc = vec3.clone(this.curve.normals[pos]);
        return pc;
    }

    positionAt(u) {
        return Math.round(u * (this.curve.points.length - 1));
    }

    getPointAt(u) {
        let pos = this.positionAt(u);

        let pc = vec3.clone(this.curve.points[pos]);
        return pc;
    }
}
