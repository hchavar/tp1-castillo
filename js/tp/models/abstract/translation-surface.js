class TranslationSurface extends BezierSurface {

    constructor(rows, cols, menu) {
        super(rows, cols, menu);

        this.pathBinormal = vec3.fromValues(1, 0, 0);

        this.pathNormal = vec3.fromValues(0, 1, 0);
        this.pathTangent = vec3.fromValues(0, 0, 1);
    }

    getPosition(u, v) {

        let pathPosition = vec3.fromValues(0, 0, v);

        let mat = mat4.fromValues(
            this.pathBinormal[0], this.pathBinormal[1], this.pathBinormal[2], 0,
            this.pathNormal[0], this.pathNormal[1], this.pathNormal[2], 0,
            this.pathTangent[0], this.pathTangent[1], this.pathTangent[2], 0,
            pathPosition[0], pathPosition[1], pathPosition[2], 1
        )

        let pos = Math.round(u * (this.curve.points.length - 1));

        let pc = vec3.clone(this.curve.points[pos]);

        vec3.transformMat4(pc, pc, mat);

        let x = pc[0] * this.scale.x;
        let y = pc[1] * this.scale.y;
        let z = pc[2] * this.scale.z;

        return [x, y, z];

    }

    getNormal(u, v) {

        let mat = mat4.fromValues(
            this.pathBinormal[0], this.pathBinormal[1], this.pathBinormal[2], 0,
            this.pathNormal[0], this.pathNormal[1], this.pathNormal[2], 0,
            this.pathTangent[0], this.pathTangent[1], this.pathTangent[2], 0,
            0, 0, 0, 1
        )

        let pc = this.getNormalAt(u);

        vec3.transformMat4(pc, pc, mat);

        let x = pc[0] * this.scale.x;
        let y = pc[1] * this.scale.y;
        let z = pc[2] * this.scale.z;

        return [x, y, z];
    }



    getTextureCoordinates(u, v) {
        return [u, v];
    }

}
