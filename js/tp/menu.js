class Menu {

    distanciaCamara = 7.8;
    alturaCamara = 6.3;
    modo = "edges";

    set wallScale(newScale) {
        this._wallScale = newScale;
        this.notifyWalls();
    }

    get wallScale() {
        return this._wallScale;
    }

    set castleFloors(floors) {
        this._castleFloors = floors;
        this.notifyCastleParts();
    }

    get castleFloors() {
        return this._castleFloors;
    }

    set angleGateOpen(angle) {
        this._angleGateOpen = angle;
        this.notifyGates();
    }

    get angleGateOpen() {
        return this._angleGateOpen;
    }

    constructor() {
        this.gui = new dat.GUI();
        this.walls = [];
        this.gates = [];
        this.castleParts = [];
        this._castleFloors = 3;
        this._wallScale = 3.0;
        this._angleGateOpen = 0.0;

        this.gui.add(this, "distanciaCamara",0.2,10).step(0.1);
        
        this.gui.add(this, "alturaCamara",-1,8).step(0.1);
        
        this.gui.add(this, "modo",["wireframe","smooth","edges"]);
        
        var f3 = this.gui.addFolder('Parametros');
        f3.add(this,'wallScale', 2, 5).name("Altura Muralla");
        f3.add(this,'castleFloors', 1, 4).name("Pisos Castillo").step(1);
        f3.add(this,'angleGateOpen', 0, Math.PI/2).name("Apertura Puerta").step(0.01);
        f3.open();
    }

    addWall(wall) {
        this.walls.push(wall);
    }

    notifyWalls() {
        this.walls.forEach( w => {
            w.updateSurface();
        })
    }

    addCastlePart(castlePart) {
        this.castleParts.push(castlePart);
    }

    notifyCastleParts() {
        this.castleParts.forEach( w => {
            w.update();
        })
    }

    addGate(gate) {
        this.gates.push(gate);
    }

    notifyGates() {
        this.gates.forEach( g => {
            g.update();
        })
    }

}