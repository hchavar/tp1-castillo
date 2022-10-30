const frontWallScale = {
    x: 1.0,
    y: 1.0,
    z: 3.0
};

class FrontWall extends AbstractWall {

    constructor(menu) {
        //TODO actualizar las columnas para que la textura quede bien
        super(10, menu);
        
    }

    init() {
        
        this.scale = wallScale;
        this.empty = false;
        super.init();
    }
}
