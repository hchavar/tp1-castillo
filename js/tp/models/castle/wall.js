const wallScale = {
    x: 1.0,
    y: 1.0,
    z: 5.0
};

class Wall extends AbstractWall {

    constructor(filas, columnas, menu) {
        super(filas, columnas, menu);
        
        this.updateName();
    }
    
    init() {
        this.updateName();
        
        this.scale = wallScale;
        this.empty = false;
        super.init();
        this.reuseBuffer = false;
    }
}