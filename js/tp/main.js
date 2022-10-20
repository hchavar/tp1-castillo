var mat4 = glMatrix.mat4;
var mat3 = glMatrix.mat3;
var vec3 = glMatrix.vec3;
var lighting = "true";

var gl = null,
    canvas = null,
    glProgram = null,
    fragmentShader = null,
    vertexShader = null;

var vertexPositionAttribute = null,
    trianglesVerticeBuffer = null,
    vertexNormalAttribute = null,
    trianglesNormalBuffer = null,
    trianglesIndexBuffer = null;

var modelMatrix = mat4.create();
var viewMatrix = mat4.create();
var projMatrix = mat4.create();
var normalMatrix = mat4.create();
//var rotate_angle = -1.57078;

var demo = new Demo();

var $canvas = $("#myCanvas");
// var canvas = document.getElementById("myCanvas");
var aspect;

function onResize() {
    gl.canvas.width = $canvas.width();
    gl.canvas.height = $canvas.height();
    aspect = $canvas.width() / $canvas.height();
}

function initGL(canvas) {

    try {
        gl = canvas.getContext("webgl");
        onResize();
    } catch (e) {
        console.error(e);
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}


// function initWebGL() {

//     canvas = document.getElementById("my-canvas");

//     try {
//         gl = canvas.getContext("webgl");

//     } catch(e) {
//         alert(  "Error: Your browser does not appear to support WebGL.");
//     }

//     if (gl) {

//         setupWebGL();
//         initShaders();
//         setupBuffers();
//         setupVertexShaderMatrix();
//         tick();

//     } else {
//         alert(  "Error: Your browser does not appear to support WebGL.");
//     }

// }

function webGLStart() {
    let canvas = document.getElementById("myCanvas");
    initGL(canvas);
    initShaders();

    // TODO: here create figures
    //setupBuffers();
    //setupVertexShaderMatrix();
    tick();

    gl.clearColor(66.2, 0.2, 0.2, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    $(window).on("resize", onResize);
    initMenu();
    tick();
}


// function setupWebGL() {
//     gl.enable(gl.DEPTH_TEST);
//     //set the clear color
//     gl.clearColor(0.1, 0.1, 0.2, 1.0);
//     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

//     gl.viewport(0, 0, canvas.width, canvas.height);

//     // Matrix de Proyeccion Perspectiva

//     mat4.perspective(projMatrix,45, canvas.width / canvas.height, 0.1, 100.0);

//     mat4.identity(modelMatrix);
//     mat4.rotate(modelMatrix,modelMatrix, -1.57078, [1.0, 0.0, 0.0]);

//     mat4.identity(viewMatrix);
//     mat4.translate(viewMatrix,viewMatrix, [0.0, 0.0, -5.0]);
// }

// function getPos(alfa,beta) {

//     var r = 2;
//     var nx = Math.sin(beta)*Math.sin(alfa);
//     var ny = Math.sin(beta)*Math.cos(alfa);
//     var nz = Math.cos(beta);

//     var g = beta%0.5;
//     var h = alfa%1;
//     var f = 1;

//     if (g < 0.25) f = 0.95;
//     if (h < 0.5) f = f*0.95;

//     var x = nx * r *f;
//     var y = ny * r *f;
//     var z = nz * r *f;

//     return [x, y, z];
// }


// function getNrm(alfa, beta) {
//     var p = getPos(alfa, beta);
//     var v = vec3.create();
//     vec3.normalize(v, p);

//     var delta = 0.05;
//     var p1 = getPos(alfa, beta);
//     var p2 = getPos(alfa, beta + delta);
//     var p3 = getPos(alfa + delta, beta);

//     var v1 = vec3.fromValues(p2[0]-p1[0], p2[1]-p1[1], p2[2]-p1[2]);
//     var v2 = vec3.fromValues(p3[0]-p1[0], p3[1]-p1[1], p3[2]-p1[2]);

//     vec3.normalize(v1,v1);
//     vec3.normalize(v2,v2);

//     var n = vec3.create();
//     vec3.cross(n, v1, v2);
//     vec3.scale(n, n, -1);
//     return n;
// }


// function setupBuffers() {
//     var pos = [];
//     var normal = [];
//     var r = 2;
//     var rows = 128;
//     var cols = 256;

//     for (var i = 0; i < rows; i++) {
//         for (var j = 0; j < cols; j++) {

//             var alfa = j/(cols - 1) * Math.PI * 2;
//             var beta = (0.1 + i/(rows - 1) * 0.8) * Math.PI;

//             var p = getPos(alfa, beta);

//             pos.push(p[0]);
//             pos.push(p[1]);
//             pos.push(p[2]);

//             var n = getNrm(alfa, beta);

//             normal.push(n[0]);
//             normal.push(n[1]);
//             normal.push(n[2]);
//         }

//     }

//     trianglesVerticeBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);


//     trianglesNormalBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normal), gl.STATIC_DRAW);

//     var index = [];

//     for (var i = 0; i < rows - 1;i++) {
//         index.push(i * cols);
//         for (var j = 0; j < cols - 1; j++) {
//             index.push(i *cols + j);
//             index.push((i + 1) * cols + j);
//             index.push(i * cols + j + 1);
//             index.push((i + 1)* cols + j + 1);
//         }
//         index.push((i + 1) * cols + cols - 1);
//     }

//     trianglesIndexBuffer = gl.createBuffer();
//     trianglesIndexBuffer.number_vertex_point = index.length;
//     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, trianglesIndexBuffer);
//     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), gl.STATIC_DRAW);
// }

function setupVertexShaderMatrix() {
    var modelMatrixUniform = gl.getUniformLocation(shaderProgram, "modelMatrix");
    var viewMatrixUniform  = gl.getUniformLocation(shaderProgram, "viewMatrix");
    var projMatrixUniform  = gl.getUniformLocation(shaderProgram, "projMatrix");
    var normalMatrixUniform  = gl.getUniformLocation(shaderProgram, "normalMatrix");

    gl.uniformMatrix4fv(modelMatrixUniform, false, modelMatrix);
    gl.uniformMatrix4fv(viewMatrixUniform, false, viewMatrix);
    gl.uniformMatrix4fv(projMatrixUniform, false, projMatrix);
    gl.uniformMatrix4fv(normalMatrixUniform, false, normalMatrix);
}

function loadShadersAndStartWebGL() {

    loadShaders(webGLStart);

}


function drawScene() {
    // setupVertexShaderMatrix();

    // vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aPosition");
    // gl.enableVertexAttribArray(vertexPositionAttribute);
    // gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffer);
    // gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    // vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aNormal");
    // gl.enableVertexAttribArray(vertexNormalAttribute);
    // gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffer);
    // gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, trianglesIndexBuffer);
    // gl.drawElements( gl.TRIANGLE_STRIP, trianglesIndexBuffer.number_vertex_point, gl.UNSIGNED_SHORT, 0);

    // demo.animate();
    // demo.draw();
    let plane = new Plane(20, 20);
    plane.draw();
}


// function animate() {

//     rotate_angle += 0.01;
//     mat4.identity(modelMatrix);
//     mat4.rotate(modelMatrix,modelMatrix, rotate_angle, [1.0, 0.0, 1.0]);

//     mat4.identity(normalMatrix);
//     mat4.multiply(normalMatrix,viewMatrix,modelMatrix);
//     mat4.invert(normalMatrix,normalMatrix);
//     mat4.transpose(normalMatrix,normalMatrix);

// }

function tick() {

    requestAnimationFrame(tick);
    drawScene();
    // animate();
}


$(document).ready(function() {
    loadShadersAndStartWebGL();
})
