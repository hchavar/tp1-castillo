class Menu {

    distanciaCamara = 5.9;
    alturaCamara = 0.0;
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

    constructor() {
        this.gui = new dat.GUI();
        this.walls = [];
        this.castleParts = [];
        this._castleFloors = 3;
        this._wallScale = 3.0;

        this.gui.add(this, "distanciaCamara",0.2,10).step(0.1);
        
        this.gui.add(this, "alturaCamara",-1,8).step(0.1);
        
        this.gui.add(this, "modo",["wireframe","smooth","edges"]);
        
        var f3 = this.gui.addFolder('Parametros');
        f3.add(this,'wallScale', 2, 5).name("Altura Muralla");
        f3.add(this,'castleFloors', 1, 4).name("Pisos Castillo").step(1.0);
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
            w.updateSurface();
        })
    }

}