
var shaderProgram;
var time = 0;

var gl;


var $canvas = $("#myCanvas");
var aspect;

const CAMERA_ANGULAR_VELOCITY = Math.PI/360;

const castleTarget = new CastleTarget();
castleTarget.angularVelocity = CAMERA_ANGULAR_VELOCITY;

const catapultTarget = new CatapultTarget();
catapultTarget.angularVelocity = CAMERA_ANGULAR_VELOCITY;

const firstPersonTarget = new FirstPersonTarget();
firstPersonTarget.angularVelocity = CAMERA_ANGULAR_VELOCITY;

const camera = new Camera(castleTarget);

const viewCanvas = document.getElementById("myCanvas");

viewCanvas.onmousemove = (e) => { 
    camera.move(e.offsetX, e.offsetY);
};

viewCanvas.onmousedown = (e) => { 
    camera.hold(e.offsetX, e.offsetY);
};

viewCanvas.onmouseup = (e) => { 
    camera.release(e.offsetX, e.offsetY);
};

window.onkeypress = (e) => {
    if (e.key === '1') {
        camera.target = castleTarget;
    } else if (e.key === '2') {
        camera.target = catapultTarget;
    } else if (e.key === '3') {
        camera.target = firstPersonTarget;
    }
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
    camera.update();
}


$(document).ready(function() {
    loadShadersAndStartWebGL();
})
