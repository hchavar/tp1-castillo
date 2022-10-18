class Objeto3D {
    buffers = null;
    pos = vec3.create();
    rot = vec3.create();
    //scale = vec3.create();
    scale = 1.0;
    localMatrix = mat4.create();
    children = [];

    constructor(children, buffers) {
        this.buffers = buffers;
        if (children) this.children = children;
    }

    draw(_transform = mat4.create()) {
        // el objeto raiz recibe la matriz cero
        // pero los hijos not deben modificar la matriz que reciben por eso se clona
        let transform = mat4.clone(_transform);

        mat4.multiply(transform, transform, this.localMatrix);

        //if (this.object) setTransform(this.object, transform);

        if (this.buffers) {
            this.setMatrixUniforms();
            this.drawFromBuffers();
        }

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

    setMatrixUniforms() {

        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, this.localMatrix);
        gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, matrizVista);
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, matrizProyeccion);
    
        let normalMatrix = mat3.create();
        mat3.fromMat4(normalMatrix, this.localMatrix); // normalMatrix= (inversa(traspuesta(matrizModelado)));
    
        mat3.invert(normalMatrix, normalMatrix);
        mat3.transpose(normalMatrix, normalMatrix);
    
        gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
    }

    drawFromBuffers() {
    
        // Se configuran los buffers que alimentaron el pipeline
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.positionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.buffers.positionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.uvBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.buffers.uvBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normalBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.buffers.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.colorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, this.buffers.colorBuffer.itemSize, gl.FLOAT, false, 0, 0);
           
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indexBuffer);
    
    
        if (modo != "wireframe"){
            gl.uniform1i(shaderProgram.useLightingUniform,(lighting=="true"));                    
            gl.drawElements(gl.TRIANGLE_STRIP, this.buffers.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        }
        
        if (modo != "smooth") {
            gl.uniform1i(shaderProgram.useLightingUniform,false);
            gl.drawElements(gl.LINE_STRIP, this.buffers.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        }
     
    }

}
