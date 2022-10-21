
var shaderProgram;
var time = 0;

var gl;


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

    gl.clearColor(66.2, 0.2, 0.2, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    $(window).on("resize", onResize);
    initMenu();
    tick();
}


function loadShadersAndStartWebGL() {

    loadShaders(webGLStart);

}


function tick() {

    requestAnimationFrame(tick);
    time += 1/60;
    drawScene();
}


$(document).ready(function() {
    loadShadersAndStartWebGL();
})
