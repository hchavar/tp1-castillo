class OrbitalTarget {
    constructor() {
        this.eye = [-3.5, 5, 22];
    }

    update(camera) {

        this.updateEye(camera);

    }

    updateEye(camera) {
        let m = glMatrix.mat4.create();

        glMatrix.mat4.translate(m, m, this.at);

        glMatrix.mat4.rotateY(m, m, camera.alfa);
        glMatrix.mat4.rotateX(m, m, camera.beta);

        glMatrix.mat4.translate(m, m, this.offset);


        vec3.transformMat4(this.eye, vec3.create(), m);

        // // debug
        // console.log('a: ' + this.alfa + ' , beta: ' + this.beta);
        // console.log('e: ' + (Math.round(this.eye[0] * 100) / 100) + ' , ' + (Math.round(this.eye[1] * 100) / 100) + ' , ' + (Math.round(this.eye[2] * 100) / 100));
    }
}