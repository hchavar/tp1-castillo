
var shaderProgram;
var time = 0;

var gl;


var $canvas = $("#myCanvas");
var aspect;

const camera = new Camera();

const viewCanvas = document.getElementById("myCanvas");
viewCanvas.onmousemove = (e) => { 
    camera.mouseMove(e.offsetX, e.offsetY);
};

viewCanvas.onmousedown = (e) => { 
    camera.mouseDown(e.offsetX, e.offsetY);
};

viewCanvas.onmouseup = (e) => { 
    camera.mouseUp(e.offsetX, e.offsetY);
};

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

    initGL(viewCanvas);
    initShaders();

    initScene();

    gl.clearColor(66.2, 0.2, 0.2, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    $(window).on("resize", onResize);
    
    tick();
}


function loadShadersAndStartWebGL() {

    loadShaders(webGLStart);

}


function tick() {

    requestAnimationFrame(tick);
    time += 0.1*1/60;
    drawScene($canvas.width(), $canvas.height());
}


$(document).ready(function() {
    loadShadersAndStartWebGL();
})
