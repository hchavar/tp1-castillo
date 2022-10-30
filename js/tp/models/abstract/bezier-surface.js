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
    }
}
