class Stone extends Material {
    constructor() {
        super();
        this.srcImage = "img/stone.jpg";
        this.glossiness = 3.0;
        this.loadTexture();
    }
}