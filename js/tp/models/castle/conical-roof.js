class ConicalRoof extends RevolutionSurface {
    constructor(rows, cols) {
        
        super(rows, cols);
        
    }

    init() {
        this.material = materials['roofTile'];
        this.color = [0.3, 0.3, 0.9];
        this.name = "ConicalRoof";
        super.init();
        this.empty = false;
    }


    updateBezierControlPoints() {
        let h = 2.0;
        let r = 1;
        let x0 = 0.0;
        let y0 = 0.0;
        let z0 = 0.0;
        let origin = [x0, y0, z0];
        let head = [x0, h, z0];

        this.pc = [
            [origin, origin, origin, origin],
            [[0.85 * r, y0, z0], [0.20 * r, 0.40 * h, z0], [0.10 * r, 0.86 * h, z0], head],
            [head, head, head, head]
        ];
    }
}