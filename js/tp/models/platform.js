class Platform extends RevolutionSurface {
    constructor() {
        super(20, 30);
    }

    init() {

    }

    init() {
        this.color = [0.14, 0.55, 0.14];

        super.update();

        super.init();
        this.empty = false;
    }

    updateBezierControlPoints() {
        // external radius
        let er = 13.00;
        //internal radius
        let ir = 11.40;

        this.pc = [
            [[er, -2.00, 0.00], [er*0.75 + 0.25*ir, -1.5, 0.00], [er*0.50 + 0.50*ir, -0.5, 0.00], [ir, 0.00, 0.00]],
            [[ir, 0.00, 0.00], [ir/2, 0.00, 0.00], [ir/4, 0.00, 0.00], [0.0, 0.00, 0.00]]
        ];
    }
}