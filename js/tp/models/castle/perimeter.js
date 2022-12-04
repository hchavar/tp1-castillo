const PERIMETER_RADIUS = 8;

class Perimeter extends Objeto3D {
    constructor(menu) {
        super(null, null, menu);
        this.menu.addPerimeter(this);

    }

    init() {
        this.sections = [];
        this.update();

    }

    update() {

        this.children = this.children.filter(c => !((c instanceof PerimeterSection) || (c instanceof PerimeterEntrance)));

        this.menu.walls = [];

        let r = PERIMETER_RADIUS;
        const n = this.menu.towers;
        const a = 2 * Math.PI / n;
        let angle = this.getAngleFunction(n);

        let wallScale = {
            x: 1.0,
            y: 1.0,
            z: Math.sqrt(2 * r * r * (1 - Math.cos(a)))
        };

        for (let i = 1; i <= n; i++) {

            let x = r * Math.cos(angle(i));
            let z = r * Math.sin(angle(i));

            let section;
            if (i > 1) {
                section = new PerimeterSection(menu);
            } else {
                section = new PerimeterEntrance(menu);
            }

            section.scale = wallScale;
            section.build();
            section.setPosition([x, 0, z]);
            section.updateLocalMatrix();
            section.setRotation([-a * (i - 1), [0, 1, 0]]);
            section.updateRotation();

            this.addChild(section);

            this.sections.push(section);
        }
    }

    getAngleFunction(n) {
        this.a = 2.0 * Math.PI / n;
        let func;
        switch (n) {
            case 4:
                func = (i) => {
                    return this.a * i - Math.PI / 4;
                };
                break;
            case 5:
                func = (i) => {
                    return this.a * (i + 1) - Math.PI / 2;
                };
                break;
            case 6:
                func = (i) => {
                    return this.a * i;
                };
                break;
            case 7:
                func = (i) => {
                    return this.a * (i + 2) - Math.PI / 2;
                };
                break;
            default:
                func = (i) => {
                    return this.a * i + Math.PI / 8;
                };
        }

        return func;

    }

}