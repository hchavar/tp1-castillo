class Tower extends RevolutionSurface {
    constructor(rows, menu) {

        super(rows, WALL_GRID_ROWS, menu);
        this.menu.addWall(this);

    }

    update() {
        this.updateName();
        super.update();
    }
    
    init() {
        this.updateName();
        this.color = wallColor;

        this.empty = false;
        super.init();
        this.reuseBuffer = true;
    }

    updateBezierControlPoints() {
        // external radius
        let er = -0.50;
        // cop height
        let ch = 0.20;
        //internal radius
        let ir = -0.40;
        // base height (20 percent more than a wall)
        let b = this.menu.wallScale * 1.2;

        this.pc = [
            [[-1.05, 0.00, 0.00], [-1.03, 0.40 * b, 0.00], [0.00, 0.86 * b, 0.00], [-0.50, b, 0.00]],
            [[er, b, 0.00], [er, b + ch, 0.00], [er, b + ch, 0.00], [er, b + ch, 0.00]],
            [[er, b + ch, 0.00], [-0.37, b + ch, 0.00], [-0.35, b + ch, 0.00], [ir, b + ch, 0.00]],
            [[ir, b + ch, 0.00], [ir, b + ch / 2, 0.00], [ir, b + ch / 2, 0.00], [ir, b + ch / 2, 0.00]],
            [[ir, b + ch / 2, 0.00], [-0.20, b + ch / 2, 0.00], [-0.10, b + ch / 2, 0.00], [0.00, b + ch / 2, 0.00]]
        ];
    }

    updateName() {
        this.name = this.constructor.name + '_' + this.menu.wallScale;
    }
}