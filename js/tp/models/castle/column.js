const copHeight = 0.50;
const sHeight = 0.90;

class Column extends RevolutionSurface {
    constructor(rows, cols, menu) {

        super(rows, cols, menu);
        this.menu.addCastlePart(this);

    }

    updateRoofPosition() {
        this.roof.renewLocalMatrix();
        this.roof.setScale(0.75);
        this.roof.setPosition([0, (copHeight + sHeight + this.menu.castleFloors * 0.78) / 0.75, 0]);
        this.roof.updateLocalMatrix();
    }

    update() {
        this.updateRoofPosition();
        super.update();
    }

    init() {
        this.name = "Column";
        this.color = [0.99, 0.85, 0.35];
        this.roof = new ConicalRoof(20, 20);
        this.roof.build();
        this.addChild(this.roof);

        this.update();
        this.empty = false;
    }

    updateBezierControlPoints() {
        // cop height
        let ch = 0.60;
        let sh = 0.90;
        //internal radius
        let ir = 0.30;
        // external radius
        let dr = 0.2;
        let er = ir + dr;
        // base height 
        let b = this.menu.castleFloors * 0.8;
        let x0 = 0.0;
        let y0 = 0.0;
        let z0 = 0.0;
        let origin = [x0, y0, z0];

        this.pc = [
            [origin, origin, origin, origin],
            [[ir, y0, z0], [ir, 0.40 * b, z0], [ir, 0.86 * b, z0], [ir, b, z0]],
            [[ir, b, z0], [ir, b + ch / 2, z0], [er, b + ch / 2, z0], [er, b + ch, z0]],
            [[er, b + ch, z0], [er, b + ch + sh / 3, z0], [er, b + ch + 2 * sh / 3, z0], [er, b + ch + sh, z0]],
            [[x0, b + ch, z0], [x0, b + ch + sh / 3, z0], [x0, b + ch + 2 * sh / 3, z0], [x0, b + ch + sh, z0]]
        ];
    }
}