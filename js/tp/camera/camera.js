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
            this.target.offset[1] += (this.back - this.front + this.zoom * 0.05) * 0.1;
            this.target.offset[1] = Math.max(0.5, this.target.offset[1]);
            this.zoom = 0.0;
            // this.updateEye();
            this.target.update(this);
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

    // updateEye() {

    //     let m = glMatrix.mat4.create();

    //     glMatrix.mat4.translate(m, m, this.target.at);

    //     glMatrix.mat4.rotateY(m, m, this.alfa);
    //     glMatrix.mat4.rotateX(m, m, this.beta);

    //     glMatrix.mat4.translate(m, m, this.target.offset);


    //     vec3.transformMat4(this.eye, vec3.create(), m);

    //     // // debug
    //     // console.log('a: ' + this.alfa + ' , beta: ' + this.beta);
    //     // console.log('e: ' + (Math.round(this.eye[0] * 100) / 100) + ' , ' + (Math.round(this.eye[1] * 100) / 100) + ' , ' + (Math.round(this.eye[2] * 100) / 100));
    // }
}