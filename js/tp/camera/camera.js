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
        this.alfa = 0.3;
        this.beta = 1.3;
        this.eye = [0, 0, 10];
        this.offset = [0, 6.8, 0];
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
            if (this.beta > Math.PI) this.beta = Math.PI;

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
        this.offset[1] += (this.back - this.front)*0.1;
        this.updateEye();

    }

    get at() {
        return this.target.at;
    }

    get up() {
        return [0, 1, 0];
    }

    updateEye() {

        let m = glMatrix.mat4.create();

        glMatrix.mat4.translate(m, m, this.target.at);

        glMatrix.mat4.rotateY(m, m, this.alfa);
        glMatrix.mat4.rotateX(m, m, this.beta);
        
        glMatrix.mat4.translate(m, m, this.offset);


        vec3.transformMat4(this.eye, vec3.create(), m);

        // // debug
        // console.log('a: ' + this.alfa + ' , beta: ' + this.beta);
        // console.log('e: ' + (Math.round(this.eye[0] * 100) / 100) + ' , ' + (Math.round(this.eye[1] * 100) / 100) + ' , ' + (Math.round(this.eye[2] * 100) / 100));
    }
}