class Objeto3D {
    object = null;
    buffers = null;
    pos = vec3.create();
    rot = vec3.create();
    //scale = vec3.create();
    scale = 1.0;
    localMatrix = mat4.create();
    children = [];

    constructor(object, children) {
        this.object = object;
        if (children) this.children = children;
    }

    draw(_transform = mat4.create()) {
        // el objeto raiz recibe la matriz cero
        // pero los hijos not deben modificar la matriz que reciben por eso se clona
        let transform = mat4.clone(_transform);

        mat4.multiply(transform, transform, this.localMatrix);

        if (this.object) setTransform(this.object, transform);

        this.children.forEach((child) => child.draw(transform));
    }

    setPosition(position) {
        this.pos = position;
    }

    updatePosition() {
        mat4.translate(this.localMatrix, this.localMatrix, this.pos);
    }

    setScale(scale) {
        this.scale = scale;
    }

    updateScale() {
        let scaleVec3 = vec3.fromValues(1, 1, 1);
        if (this.scale > 1.0) {
        vec3.scale(scaleVec3, vec3.fromValues(1, 1, 1), this.scale);
        }
        mat4.scale(this.localMatrix, scaleVec3);
    }

    setRotation(rotation) {
        this.rot = rotation;
    }

    updateRotation() {
        mat4.rotate( this.localMatrix, this.localMatrix, this.rot[0], this.rot[1] );
    }

    updateRotationRespectWorld(worldMatrix) {
        mat4.rotate( this.localMatrix, worldMatrix, this.rot[0], this.rot[1] );
    }

    setGeometry(indexBuffer, vertexBuffer) {
        this.indexBuffer = indexBuffer;
        this.vertexBuffer = vertexBuffer;
    }

    updateLocalMatrix() {
        this.updateScale();
        this.updateRotation();
        this.updatePosition();

    }

}
