class Platform extends RevolutionSurface {
    constructor() {
        super(20, 30);
    }

    init() {
        this.color = [0.14, 0.55, 0.14];
        this.name = this.constructor.name;

        super.init();
        this.empty = false;
    }

    updateBezierControlPoints() {
        // horizont radius
        let hr = 50.00;
        // outside radius
        let or = 14.00;
        // water external radius
        let wer = 14.00;
        // water internal radius
        let wir = 13.00;
        //castle radius
        let cr = 11.40;

        this.pc = [
            [[hr, 0.00, 0.00], [hr*0.75 + 0.25*or, 0.0, 0.00], [hr*0.50 + 0.50*or, 0.0, 0.00], [or, 0.00, 0.00]],
            [[or, 0.00, 0.00], [or*0.75 + 0.25*wer, -0.5, 0.00], [or*0.50 + 0.50*wer, -1.5, 0.00], [or, -2.00, 0.00]],
            [[wer, -2.00, 0.00], [wer*0.75 + 0.25*wir, -2.0, 0.00], [wer*0.50 + 0.50*wir, -2.0, 0.00], [wir, -2.00, 0.00]],
            [[wir, -2.00, 0.00], [wir*0.75 + 0.25*cr, -1.5, 0.00], [wir*0.50 + 0.50*cr, -0.5, 0.00], [cr, 0.00, 0.00]],
            [[cr, 0.00, 0.00], [cr/2, 0.00, 0.00], [cr/4, 0.00, 0.00], [0.0, 0.00, 0.00]]
        ];
    }
}