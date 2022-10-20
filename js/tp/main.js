var gl = null,
    canvas = null,
    glProgram = null;

var vertexPositionAttribute = null,
    trianglesVerticeBuffer = null,
    vertexNormalAttribute = null,
    trianglesNormalBuffer = null,
    trianglesIndexBuffer = null;


var $canvas = $("#myCanvas");
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


function webGLStart() {
    let canvas = document.getElementById("myCanvas");
    initGL(canvas);
    initShaders();

    initScene();
    
    tick();

    gl.clearColor(66.2, 0.2, 0.2, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    $(window).on("resize", onResize);
    initMenu();
    tick();
}


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


function tick() {

    requestAnimationFrame(tick);
    drawScene();
}


$(document).ready(function() {
    loadShadersAndStartWebGL();
})
