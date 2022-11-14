class FirstPersonTarget extends Target {
    constructor() {
        super();
        this.eye = [-3.5, 5, 22];
        this.offset = [0, 23.0, 0];
        this.at = [0, 0, 0];
        this.alfa = 2.75;
        this.beta = 1.53;
    }

    update() {

        this.updateAt();

    }

    updateAt() {
        let m = glMatrix.mat4.create();

        glMatrix.mat4.translate(m, m, this.eye);

        this.rotate(m);

        glMatrix.mat4.translate(m, m, this.offset);


        vec3.transformMat4(this.at, vec3.create(), m);
        
        // // debug
        // console.log('a: ' + this.alfa + ' , beta: ' + this.beta);
        // console.log('e: ' + (Math.round(this.eye[0] * 100) / 100) + ' , ' + (Math.round(this.eye[1] * 100) / 100) + ' , ' + (Math.round(this.eye[2] * 100) / 100));
    }
}