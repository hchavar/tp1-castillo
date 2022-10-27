class Perimeter extends Objeto3D {
    constructor(menu) {
        super(null, null, menu);
        this.menu.addPerimeter(this);

    }

    init() {
        this.update();

    }

    update() {
        let r = 8;
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

            if (i > 1) {
                let section = new PerimeterSection(menu);
                section.scale = wallScale;
                section.build();
                section.setPosition([x, 0, z]);
                section.updateLocalMatrix();
                section.setRotation([-a * (i - 1), [0, 1, 0]]);
                section.updateRotation();

                this.addChild(section);
            } else {
                let section = new PerimeterEntrance(menu);
                section.scale = wallScale;
                section.build();
                section.setPosition([x, 0, z]);
                section.updateLocalMatrix();
                section.setRotation([-a * (i - 1), [0, 1, 0]]);
                section.updateRotation();
                this.addChild(section);
            }
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