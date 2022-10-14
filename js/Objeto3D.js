class Objeto3D {
  object = null;
  vertexBuffer = null;
  indexBuffer = null;
  pos = vec3.create();
  rot = vec3.create();
  scale = vec3.create();
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

  setRotation(rotation) {
    this.rot = rotation;
  }

  updateRotation() {
    mat4.rotate( this.localMatrix, this.localMatrix, this.rot[0], this.rot[1] );
  }

  updateRotationRespectWorld(worldMatrix) {
    mat4.rotate( this.localMatrix, worldMatrix, this.rot[0], this.rot[1] );
  }

}
