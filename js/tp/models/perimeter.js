class Perimeter extends Objeto3D {
    constructor(menu) {
        super();

        this.init();

    }                                       

    init() {
        let r = 8;
        const n = 4;
        let angle = this.getAngleFunction(n);
        for (let i = 1; i <= n; i++) {
            
            let x = r * Math.cos(angle(i));
            let z = r * Math.sin(angle(i));
            if (i > 1) {
                let tower = new Tower(20, 20, menu);
                tower.build();
                tower.setPosition([x, 0, z]);
                tower.updateLocalMatrix();

                this.addChild(tower);
            } else {
                let column = new Column(30, 30, menu);
                column.build();
                column.setPosition([x, 0, z]);
                column.updateLocalMatrix();

                this.addChild(column);
            }
        }

    }

    getAngleFunction(n) {
        this.a = 2.0 * Math.PI / n;
        let func;
        switch (n) {
            case 4:
                func = (i) => {
                    return this.a * i- Math.PI /4;
                };
                break;
            case 5:
                func = (i) => {
                    return this.a * (i+1)- Math.PI /2;
                };
                break;
            case 6:
                func = (i) => {
                    return this.a * i;
                };
                break;
            case 7:
                func = (i) => {
                    return this.a * (i+2)- Math.PI /2;
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