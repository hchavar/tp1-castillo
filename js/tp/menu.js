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

    constructor() {
        this.gui = new dat.GUI();
        this.walls = [];
        this._wallScale = 3.0;

        this.gui.add(this, "distanciaCamara",0.2,10).step(0.1);
        
        this.gui.add(this, "alturaCamara",-1,8).step(0.1);
        
        this.gui.add(this, "modo",["wireframe","smooth","edges"]);
        
        var f3 = this.gui.addFolder('Parametros Especiales ');
        f3.add(this,'wallScale', 2, 7).name("EscalaMuro");
        f3.open();
    }

    addWall(wall) {
        this.walls.push(wall);
    }

    notifyWalls() {
        this.walls.forEach( w => {
            w.update();
        })
    }


}