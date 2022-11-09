class BoxTranslation extends TranslationSurface {
    constructor() {

        super(24, 16, menu);

    }

    
    init() {
        this.updateName();
        this.color = [0.2,0.9,0.1];
        this.scale = {
            x: 1,
            y: 1,
            z: 1
        };

        this.empty = false;
        super.init();
    }

    updateBezierControlPoints() {
        

        this.pc = [
            //lateral interior
            [[0.00, 1.00, 0.00], [0.00, 0.75, 0.00], [0.00, 0.25, 0.00], [0.00, 0.00, 0.00]],
            //tapa abajo
            [[0.00, 0.00, 0.00], [0.50, 0.00, 0.00], [0.75, 0.00, 0.00], [1.00, 0.00, 0.00]],
            //lateral externo
            [[1.00, 0.00, 0.00], [1.00, 0.25, 0.00], [1.00, 0.75, 0.00], [1.00, 1.00, 0.00]],
            // tapa arriba
            [[1.00, 1.00, 0.00], [0.75, 1.00, 0.00], [0.50, 1.00, 0.00], [0.00, 1.00, 0.00]]
        ];
    }

    updateName() {
        this.name = this.constructor.name;
    }
}