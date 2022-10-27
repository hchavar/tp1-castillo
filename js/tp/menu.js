class Menu {

    distanciaCamara = 0.2;
    alturaCamara = 15.2;
    modo = "edges";

    set wallScale(newScale) {
        if (this._wallScale != newScale) {
            this._wallScale = newScale;
            this.notifyWalls();
        }
    }

    get wallScale() {
        return this._wallScale;
    }

    set castleFloors(floors) {
        if (this._castleFloors != floors) {
            this._castleFloors = floors;
            this.notifyCastleParts();
        }
    }

    get castleFloors() {
        return this._castleFloors;
    }

    set angleGateOpen(angle) {
        if (this._angleGateOpen != angle) {
            this._angleGateOpen = angle;
            this.notifyGates();
        }
    }

    get angleGateOpen() {
        return this._angleGateOpen;
    }

    set towers(value) {
        if (this._towers != value) {
            this._towers = value;
            this.notifyPerimeters();
        }
    }

    get towers() {
        return this._towers;
    }

    constructor() {
        this.gui = new dat.GUI();
        this.walls = [];
        this.gates = [];
        this.castleParts = [];
        this.perimeters = [];
        this._castleFloors = 4;
        this._wallScale = 3.0;
        this._angleGateOpen = 0.0;
        this._towers = 5;

        this.gui.add(this, "distanciaCamara", 0.2, 20).step(0.1);

        this.gui.add(this, "alturaCamara", -1, 20).step(0.1);

        this.gui.add(this, "modo", ["wireframe", "smooth", "edges"]);

        var f3 = this.gui.addFolder('Parametros');
        f3.add(this, 'wallScale', 2, 5).name("Altura Muralla").step(0.5);
        f3.add(this, 'castleFloors', 1, 4).name("Pisos Castillo").step(1);
        f3.add(this, 'angleGateOpen', 0, Math.PI / 2).name("Apertura Puerta").step(0.2);
        f3.add(this, 'towers', 4, 8).name("Cantidad de torres").step(1);
        f3.open();
    }

    addWall(wall) {
        this.walls.push(wall);
    }

    notifyWalls() {
        this.walls.forEach(w => {
            w.update();
        })
    }

    addCastlePart(castlePart) {
        this.castleParts.push(castlePart);
    }

    notifyCastleParts() {
        this.castleParts.forEach(w => {
            w.update();
        })
    }

    addGate(gate) {
        this.gates.push(gate);
    }

    notifyGates() {
        this.gates.forEach(g => {
            g.update();
        })
    }

    addPerimeter(p) {
        this.perimeters.push(p);
    }

    notifyPerimeters() {
        this.perimeters.forEach(p => {
            p.update();
        })
    }

}