class Camera {
    constructor(defaultTarget, menu) {
        this.target = defaultTarget;
        this.moving = false;
        this.posX = 0;
        this.posY = 0;
        this.previousPosX = 0;
        this.previousPosY = 0;
        this.viewMatrix = mat4.create();
        this.left = 0;
        this.right = 0;
        this.front = 0;
        this.back = 0;
        this.alfa = 0;
        this.beta = 0;
        this.menu = menu;
    }

    move(x, y) {
        if (this.moving) {
            this.previousPosX = this.posX;
            this.previousPosY = this.posY;
            this.posX = x;
            this.posY = y;

            let deltaX = 0;
            let deltaY = 0;

            if (this.previousPosX) deltaX = this.posX - this.previousPosX;
            if (this.previousPosY) deltaY = this.posY - this.previousPosY;

            this.alfa += deltaX * this.angularVelocity;
            this.beta += deltaY * this.angularVelocity;

            if (this.beta < 0) this.beta = 0;
            if (this.beta > Math.PI) this.beta = Math.PI;
        }
    }

    hold(x, y) {
        // console.log('Camera. Mouse down x: ' + x + ' y: ' + y);
        this.moving = true;
        this.move(x, y);
    }

    release(x, y) {
        // console.log('Camera. Mouse up x: ' + x + ' y: ' + y);
        this.moving = false;
    }

    update() {
        console.log('Update camara');
    }

    get eye() {
        return [0, this.menu.alturaCamara, this.menu.distanciaCamara];
    }

    get at() {
        return this.target.at;
    }

    get up() {
        return [0, 1, 0];
    }
}