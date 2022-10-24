class BezierSurface extends Objeto3D {

    constructor(rows, cols, menu) {
        super(rows, cols, menu);
    }

    init() {
        this.curve = getConcatenatedBezierCurve(this.pc);
    }

}
