class Column extends RevolutionSurface {
    constructor(rows, cols, menu) {
        
        super(rows, cols, menu);
        this.menu.addCastlePart(this);
        
    }

    init() {
        
        // cop height
        let ch = 0.50;
        let sh = 0.90;
        //internal radius
        let ir = 0.30;
        // external radius
        let dr = 0.2;
        let er = ir + dr;
        // base height 
        let b = this.menu.castleFloors*0.8;
        let x0 = 0.0;
        let y0 = 0.0;
        let z0 = 0.0;
        let origin = [x0, y0, z0];

        this.pc = [
            [origin, origin, origin, origin],
            [[ir, y0, z0], [ir, 0.40*b, z0], [ ir, 0.86*b, z0], [ir, b, z0]],
            [[ir, b, z0], [ir, b + ch/2, z0], [er, b + ch/2, z0], [er, b + ch, z0]],
            [[er, b + ch, z0], [er, b + ch + sh/3, z0], [er, b + ch + 2*sh/3, z0], [er, b + ch + sh, z0]],
            [[x0, b + ch, z0], [x0, b + ch + sh/3, z0], [x0, b + ch + 2*sh/3, z0], [x0, b + ch + sh, z0]]
        ];

        super.init();
    }

    isEmpty(){
        return false;
    }

    getColor() {
        return [0.99, 0.85, 0.35];
    }

}