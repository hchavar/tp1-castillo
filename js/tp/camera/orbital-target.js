class OrbitalTarget extends Target {
    constructor() {
        super();
        this.eye = [-25.5, 4, -5];
        this._alfa = -1.79;
        this._beta = 1.53;
    }

    update(camera) {
        this.offset[1] += (camera.back - camera.front + camera.zoom * 0.05) * 0.1;
        this.offset[1] = Math.max(0.5, this.offset[1]);
        this.updateEye();

    }

    updateEye() {
        let m = glMatrix.mat4.create();

        glMatrix.mat4.translate(m, m, this.at);

        this.rotate(m);

        glMatrix.mat4.translate(m, m, this.offset);


        vec3.transformMat4(this.eye, vec3.create(), m);

        // // debug
        // console.log('a: ' + this.alfa + ' , beta: ' + this.beta);
        // console.log('e: ' + (Math.round(this.eye[0] * 100) / 100) + ' , ' + (Math.round(this.eye[1] * 100) / 100) + ' , ' + (Math.round(this.eye[2] * 100) / 100));
    }
}