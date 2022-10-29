class BezierSurface extends Objeto3D {

    constructor(rows, cols, menu) {
        super(rows, cols, menu);
    }

    init() {
        this.reuseBuffer = true;
        this.update();
    }

    update() {
        this.updateBezierControlPoints();
        this.updateBezierCurve();
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
