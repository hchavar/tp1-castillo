const WALL_GRID_ROWS = 24;
const wallColor = [0.3, 0.3, 0.3];

class AbstractWall extends TranslationSurface {

    constructor(columns, menu) {
        super(columns, WALL_GRID_ROWS, menu);
        this.menu.addWall(this);

    }

    update() {
        this.updateName();
        super.update();
    }
    
    init() {
        this.material = materials['brick'];
        this.updateName();
        this.color = wallColor;
        this.reuseBuffer = true;
        super.init();
    }

    updateBezierControlPoints() {
        let c = this.menu.wallScale;

        this.pc = [
            [[0.95, 0.00, 0.00], [1.03, 0.36 * c, 0.00], [0.00, 0.86 * c, 0.00], [0.50, c, 0.00]],
            [[0.50, c, 0.00], [0.59, c + 0.07, 0.00], [0.50, c + 0.28, 0.00], [0.43, c + 0.34, 0.00]],
            [[0.43, c + 0.34, 0.00], [0.37, c + 0.36, 0.00], [0.35, c + 0.35, 0.00], [0.30, c + 0.35, 0.00]],
            [[0.30, c + 0.35, 0.00], [0.30, c + 0.28, 0.00], [0.30, c + 0.21, 0.00], [0.30, c + 0.18, 0.00]],
            [[0.30, c + 0.18, 0.00], [0.20, c + 0.18, 0.00], [-0.20, c + 0.18, 0.00], [-0.30, c + 0.18, 0.00]],
            [[-0.30, c + 0.18, 0.00], [-0.30, c + 0.21, 0.00], [-0.30, c + 0.28, 0.00], [-0.30, c + 0.35, 0.00]],
            [[-0.30, c + 0.35, 0.00], [-0.35, c + 0.35, 0.00], [-0.37, c + 0.36, 0.00], [-0.43, c + 0.34, 0.00]],
            [[-0.43, c + 0.34, 0.00], [-0.50, c + 0.28, 0.00], [-0.59, c + 0.07, 0.00], [-0.50, c, 0.00]],
            [[-0.50, c, 0.00], [0.00, 0.86 * c, 0.00], [-1.03, 0.36 * c, 0.00], [-0.95, 0.00, 0.00]]
        ];
    }

    updateName() {
        this.name = this.constructor.name + '_' + this.menu.towers + '_' + this.menu.wallScale;
    }
}