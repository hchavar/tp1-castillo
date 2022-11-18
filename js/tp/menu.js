class Menu {

    // modo = "edges";
    _mode = "Default";

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

    set castleWidth(value) {
        if (this._castleWidth != value) {
            this._castleWidth = value;
            this.notifyFloors();
        }
    }

    get castleWidth() {
        return this._castleWidth + 1;
    }

    set castleHeight(value) {
        if (this._castleHeight != value) {
            this._castleHeight = value;
            this.notifyFloors();
        }
    }

    get castleHeight() {
        return this._castleHeight + 1;
    }

    set catapultRotation(value) {
        if (this._catapultRotation == value) return;
        if (this.flyingLoad.visible) return;
        
        this._catapultRotation = value;
        this.notifyCatapults();
    }

    get catapultRotation() {
        return this._catapultRotation;
    }

    set mode(value) {
        this._mode = value;
        normalsMode = (value == "Normales");
    }

    get mode() {
        return this._mode;
    }

    set lightColor(value) {
        if (this._lightColor != value) {
            this._lightColor = value;
            // this.notifyLights();
        }
    }

    get lightColor() {
        return this._lightColor;
    }

    lightColorToVector() {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this._lightColor);
        return result ? [
          parseInt(result[1], 16) / 255.0,
          parseInt(result[2], 16) / 255.0,
          parseInt(result[3], 16) / 255.0
        ] : null;
      }

    constructor() {
        this.gui = new dat.GUI();
        this.walls = [];
        this.gates = [];
        this.castleParts = [];
        this.perimeters = [];
        this.floors = [];
        this.catapults = [];
        this.firecatapults = [];
        this._castleFloors = 4;
        this._wallScale = 3.0;
        this._angleGateOpen = 0.0;
        this._towers = 5;
        this._castleWidth = 4;
        this._castleHeight = 4;
        this._catapultRotation = 180;
        this._lightColor = "#ffffff";
        this.gui.addColor(this,'lightColor').name("Color luz");

        this.gui.add(this, "mode", ["Default", "Normales"]);

        var f2 = this.gui.addFolder('Catapulta');
        f2.add(this, 'catapultRotation', 0, 360).name("Rotacion").step(2);
        f2.add(this, 'fireCatapult').name("Cargar y disparar");
        f2.open();

        var f3 = this.gui.addFolder('Perimetro');
        f3.add(this, 'wallScale', 2, 5).name("Altura Muralla").step(0.5);
        f3.add(this, 'angleGateOpen', 0, Math.PI / 2).name("Apertura Puerta").step(0.15);
        f3.add(this, 'towers', 4, 8).name("Torres").step(1);
        //f3.open();

        var f4 = this.gui.addFolder('Castillo');
        f4.add(this, 'castleFloors', 1, 4).name("Pisos").step(1);
        f4.add(this, 'castleWidth', 2, 10).name("Ancho").step(2);
        f4.add(this, 'castleHeight', 2, 10).name("Profundidad").step(2);
        // f4.open();


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

    addFloor(floor) {
        this.floors.push(floor);
    }

    notifyFloors() {
        this.floors.forEach(f => {
            f.update();
        })
    }

    addCatapult(catapult) {
        this.catapults.push(catapult);
    }

    notifyCatapults() {
        this.catapults.forEach(w => {
            w.update();
        })
    }

    addFireCatapult(fireSystem) {
        this.firecatapults.push(fireSystem);
    }

    fireCatapult() {
        this.firecatapults.forEach(w => {
            w.update();
        })
    }

}