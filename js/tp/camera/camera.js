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
        this.beta = 0.01;
        this.menu = menu;
    }

    move(x, y) {
        if (this.moving) {
            this.posX = x;
            this.posY = y;

            let deltaX = 0;
            let deltaY = 0;

            if (this.previousPosX) deltaX = this.posX - this.previousPosX;
            if (this.previousPosY) deltaY = this.posY - this.previousPosY;

            this.alfa += deltaX * this.angularVelocity;
            this.beta += deltaY * this.angularVelocity;

            if (this.beta < 0.01) this.beta = 0.01;
            if (this.beta > Math.PI / 2) this.beta = Math.PI / 2;

            this.previousPosX = this.posX;
            this.previousPosY = this.posY;
        }
    }

    hold(x, y) {
        this.moving = true;
        this.previousPosX = x;
        this.previousPosY = y;
    }

    release(x, y) {
        this.moving = false;
    }

    update() {
        console.log('Update camara');
    }

    get eye() {
        let r = this.menu.distanciaCamara;
        let a = [r * Math.sin(this.alfa) * Math.sin(this.beta), r * Math.cos(this.beta), r * Math.cos(this.alfa) * Math.sin(this.beta)];
        return a;
    }

    get at() {
        return this.target.at;
    }

    get up() {
        return [0, 1, 0];
    }
}