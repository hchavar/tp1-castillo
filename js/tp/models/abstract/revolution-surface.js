class RevolutionSurface extends BezierSurface {

    constructor(rows, cols, menu) {

        super(rows, cols, menu);

    }

    getPosition(u, v) {

        let pathBinormal = vec3.fromValues(0, 1, 0);

        let pathNormal = vec3.fromValues(1, 0, 0);
        let pathTangent = vec3.fromValues(0, 0, 1);

        let angle = v * 2.0 * Math.PI;

        vec3.rotateY(pathNormal, pathNormal, [0, 1, 0], angle);
        vec3.rotateY(pathTangent, pathTangent, [0, 1, 0], angle);

        let pathPosition = vec3.fromValues(0, 0, 0);

        let mat = glMatrix.mat4.fromValues(
            pathNormal[0], pathBinormal[0], pathTangent[0], pathPosition[0],
            pathNormal[1], pathBinormal[1], pathTangent[1], pathPosition[1],
            pathNormal[2], pathBinormal[2], pathTangent[2], pathPosition[2],
            0, 0, 0, 1
        );

        let pos = Math.round(u * (this.curve.points.length - 1));

        let pc = vec3.clone(this.curve.points[pos]);

        glMatrix.vec3.transformMat4(pc, pc, mat);

        return pc;
    }

    getNormal(u, v) {
        let pathBinormal = vec3.fromValues(0, 1, 0);

        let pathNormal = vec3.fromValues(1, 0, 0);
        let pathTangent = vec3.fromValues(0, 0, 1);

        let angle = v * 2.0 * Math.PI;

        vec3.rotateY(pathNormal, pathNormal, [0, 1, 0], angle);
        vec3.rotateY(pathTangent, pathTangent, [0, 1, 0], angle);

        let pathPosition = vec3.fromValues(0, 0, 0);

        let mat = glMatrix.mat4.fromValues(
            pathNormal[0], pathBinormal[0], pathTangent[0], pathPosition[0],
            pathNormal[1], pathBinormal[1], pathTangent[1], pathPosition[1],
            pathNormal[2], pathBinormal[2], pathTangent[2], pathPosition[2],
            0, 0, 0, 1
        );

        let pos = Math.round(u * (this.curve.points.length - 1));

        let pn = vec3.clone(this.curve.normals[pos]);
        glMatrix.vec3.transformMat4(pn, pn, mat);

        return pn;

    }

    getTextureCoordinates(u, v) {
        return [u, v];
    }

    animate() {

        let rotateAngle = time * Math.PI / 30;
        this.setRotation([rotateAngle, [0, 1, 0]]);

    }
}