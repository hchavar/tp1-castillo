var MAX_CURVE_POINTS = 20;
const defaultPosition = vec3.create();
const defaultRotation = [0, vec3.create()];

const buffersDict = {};

class Objeto3D {
    buffers = null;
    pos = defaultPosition;
    rot = defaultRotation;
    scaleFactor = 1.0;
    localMatrix = mat4.create();
    children = [];

    constructor(width, height, menu) {
        this.width = width;
        this.height = height;
        this.menu = menu;
        this.empty = true;
        this.reuseBuffer = false;
        this.visible = true;
    }

    build() {
        this.init();
        if (!this.empty) {
            this.updateSurface();
        }
    }

    addChild(child) {
        this.children.push(child);
    }

    reuseExistingSurface() {
        return this.reuseBuffer && this.name && buffersDict[this.name];
    }

    updateSurface() {
        if (this.reuseBuffer) {
            if (!this.name) {
                console.error('Cannot reuse unnamed surface: ' + this.constructor.name);
                return;
            }

            if (!buffersDict[this.name]) {
                buffersDict[this.name] = this.generateSurface(this.width, this.height);
            }

            this.buffers = buffersDict[this.name];

        } else {
            this.buffers = this.generateSurface(this.width, this.height);
        }        
    }

    init() {
        // inicialiciar objeto
    }

    animate() {
        // animar objeto
    }

    draw(_transform = mat4.create()) {
        if (!this.visible) return;
        
        // el objeto raiz recibe la matriz cero
        // pero los hijos not deben modificar la matriz que reciben por eso se clona
        let transform = mat4.clone(_transform);

        mat4.multiply(transform, transform, this.localMatrix);

        if (!this.empty) {
            
            this.setMatrixUniforms(transform);
            this.drawFromBuffers();
        }

        this.children.forEach((child) => child.draw(transform));
    }

    setPosition(position) {
        // reseteo la matriz
        //this.localMatrix = mat4.create();
        this.pos = position;
    }

    updatePosition() {
        mat4.translate(this.localMatrix, this.localMatrix, this.pos);
        //this.pos = defaultPosition;
    }

    setScale(scaleFactor) {
        this.scaleFactor = scaleFactor;
    }

    updateScale() {
        let scaleVec3 = vec3.fromValues(1, 1, 1);
        if (this.scaleFactor != 1.0) {
            vec3.scale(scaleVec3, vec3.fromValues(1, 1, 1), this.scaleFactor);
        }
        mat4.scale(this.localMatrix, this.localMatrix, scaleVec3);
    }

    setRotation(rotation) {
        // reseteo la matriz
        //this.localMatrix = mat4.create();
        this.rot = rotation;
    }

    updateRotation() {
        mat4.rotate( this.localMatrix, this.localMatrix, this.rot[0], this.rot[1] );
        //this.rot = defaultRotation;
    }

    updateRotationRespectWorld(worldMatrix) {
        mat4.rotate( this.localMatrix, worldMatrix, this.rot[0], this.rot[1] );
    }

    updateLocalMatrix() {
        //this.renewLocalMatrix();
        this.updateScale();
        this.updateRotation();
        this.updatePosition();

    }

    renewLocalMatrix() {
        this.localMatrix = mat4.create();
    }

    setMatrixUniforms(modelMatrix) {

        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, modelMatrix);
        gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, viewMatrix);
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, projMatrix);
        gl.uniform3f(shaderProgram.uColorUniform, this.color[0], this.color[1], this.color[2]);
    
        let normalMatrix = mat3.create();
        mat3.fromMat4(normalMatrix, modelMatrix); // normalMatrix= (inversa(traspuesta(matrizModelado)));
    
        mat3.invert(normalMatrix, normalMatrix);
        mat3.transpose(normalMatrix, normalMatrix);
    
        gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
    }

    drawFromBuffers() {
    
        // Se configuran los buffers que alimentaron el pipeline
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.positionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.buffers.positionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
        // gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.uvBuffer);
        // gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.buffers.uvBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normalBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.buffers.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
        // gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.colorBuffer);
        // gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, this.buffers.colorBuffer.itemSize, gl.FLOAT, false, 0, 0);
           
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indexBuffer);

        gl.uniform1i(shaderProgram.uColorNormals, true);
    
    
        if (menu.modo != "wireframe"){
            // gl.uniform1i(shaderProgram.useLightingUniform,(lighting=="true"));                    
            gl.drawElements(gl.TRIANGLE_STRIP, this.buffers.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        }
        
        if (menu.modo != "smooth") {
            // gl.uniform1i(shaderProgram.useLightingUniform,false);
            gl.drawElements(gl.LINE_STRIP, this.buffers.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        }
     
    }

    generateSurface(rows, cols) {
    
        let positions = [];
        let normals = [];
        let colors = [];
        let uvList = [];
    
        for (let i = 0; i <= rows; i++) {
            for (let j = 0; j <= cols; j++) {
    
                let u = j/cols;
                let v = i/rows;
    
                let pos = this.getPosition(u, v);
    
                positions.push(pos[0]);
                positions.push(pos[1]);
                positions.push(pos[2]);
    
                let nrm = this.getNormal(u, v);
    
                normals.push(nrm[0]);
                normals.push(nrm[1]);
                normals.push(nrm[2]);
    
                let uvs = this.getTextureCoordinates(u, v);
    
                uvList.push(uvs[0]);
                uvList.push(uvs[1]);
    
                let col = this.color;
    
                colors.push(col[0]);
                colors.push(col[1]);
                colors.push(col[2]);
    
            }
        }
    
        // create index buffer
        let indexes = [];
    
        for (let i = 0; i < rows; i++) {
            let firstThisRow = i*(cols + 1);
            let firstNextRow = (i + 1)*(cols + 1);
            let nextRow = -1;
            
            if (i > 0)
                indexes.push(firstThisRow);
            
            for (let j = 0; j <= cols; j++) {
                indexes.push(j + firstThisRow);
                nextRow = j + firstNextRow;
                indexes.push(nextRow);
    
            }
    
            if (i < (rows - 1))
                indexes.push(nextRow);
    
        }
        
        // Init buffers
    
        let positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        positionBuffer.itemSize = 3;
        positionBuffer.numItems = positions.length / 3;
    
        let normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
        normalBuffer.itemSize = 3;
        normalBuffer.numItems = normals.length / 3;
    
        let uvBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvList), gl.STATIC_DRAW);
        uvBuffer.itemSize = 2;
        uvBuffer.numItems = uvList.length / 2;
    
        let colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        colorBuffer.itemSize = 3;
        colorBuffer.numItems = colors.length / 3;
    
    
        let indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexes), gl.STATIC_DRAW);
        indexBuffer.itemSize = 1;
        indexBuffer.numItems = indexes.length;
    
        return {
            positionBuffer,
            normalBuffer,
            colorBuffer,
            uvBuffer,
            indexBuffer
        }
    }

    getPosition(u, v) {
        return [0, 0, 0];
    }

    getNormal(u, v) {
        return [0, 1, 0];
    }

    getTextureCoordinates(u, v) {
        return [u, v];
    }

    get color() {
        return this._color;
    }

    set color(value) {
        if (!this._color)
            this._color = value;
    }

    get empty() {
        return this._empty;
    }

    set empty(value) {
        this._empty = value;
    }

    get scale() {
        return this._scale;
    }

    set scale(value) {
        if (!this._scale)
            this._scale = value;
    }

    get reuseBuffer() {
        return this._reuseBuffer;
    }

    set reuseBuffer(value) {
        this._reuseBuffer = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get visible() {
        return this._visible;
    }

    set visible(value) {
        this._visible = value;
    }
}
