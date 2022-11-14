class Camera {
    constructor(defaultTarget) {
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
        // this.alfa = -0.16;
        // this.beta = 1.35;
        // this.eye = [-3.5, 5, 22];
        // this.offset = [0, 23.0, 0];
        this.zoom = 0.0;
    }

    move(x, y) {
        if (this.moving) {
            this.posX = x;
            this.posY = y;

            let deltaX = 0;
            let deltaY = 0;

            if (this.previousPosX) deltaX = this.posX - this.previousPosX;
            if (this.previousPosY) deltaY = this.posY - this.previousPosY;

            this.target.alfa += deltaX * this.angularVelocity;
            this.target.beta += deltaY * this.angularVelocity;

            // if (this.beta < 0.01) this.beta = 0.01;
            // if (this.beta > (Math.PI / 2 - 0.04)) this.beta = Math.PI / 2 - 0.04;

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
        
        try {
            
            this.target.update(this);
            this.zoom = 0.0;
        } catch (error) {
            console.log('Hubo un error: ' + error);
            console.error(error);
            noHasError = false;
        }

    }

    get at() {
        return this.target.at;
    }

    get eye() {
        return this.target.eye;
    }

    get up() {
        return [0, 1, 0];
    }

}