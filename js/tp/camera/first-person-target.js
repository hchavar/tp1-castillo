class FirstPersonTarget extends Target {
    constructor() {
        super();
        this.eye = [-3.5, 3, 22];
        this.offset = [0, 23.0, 0];
        this.at = [0, 3, 0];
        this.alfa = 2.75;
        this.beta = 1.53;
    }

    update(camera) {
        
        let deltaFront = (camera.front - camera.back + camera.zoom * 0.05) * 0.1;
        let deltaRight = (camera.right - camera.left) * 0.1;
        let dirFront = vec3.create();

        vec3.sub(dirFront, this.at, this.eye );

        
        dirFront[1] = 0;

        vec3.normalize(dirFront, dirFront);
        
        let dirRight = vec3.clone(dirFront);
        vec3.scale(dirFront, dirFront, deltaFront);

        vec3.add(this.eye, this.eye, dirFront);
        vec3.add(this.at, this.at, dirFront);


        vec3.rotateY(dirRight, dirRight, [0,0,0], Math.PI/2);

        vec3.scale(dirRight, dirRight, deltaRight);

        vec3.add(this.eye, this.eye, dirRight);
        vec3.add(this.at, this.at, dirRight);

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