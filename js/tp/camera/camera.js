class Camera {
    constructor(defaultTarget) {
        this.target = defaultTarget;
        this.moving = false;
        this.posX = 0;
        this.posY = 0;
    }

    move(x, y) {
        if (this.moving) {
            this.posX = x;
            this.posY = y;
        }
    }

    hold(x, y) {
        console.log('Camera. Mouse down x: ' + x + ' y: ' + y);
        this.moving = true;
        this.move(x, y);
    }

    release(x, y) {
        console.log('Camera. Mouse up x: ' + x + ' y: ' + y);
        this.moving = false;
    }

    update() {
        console.log('Update camara');
    }
}