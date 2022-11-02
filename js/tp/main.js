
var shaderProgram;
var time = 0;

var gl;
const menu = new Menu();

var $canvas = $("#myCanvas");
var aspect;

const CAMERA_ANGULAR_VELOCITY = Math.PI / 360;

const castleTarget = new CastleTarget();
// castleTarget.angularVelocity = CAMERA_ANGULAR_VELOCITY;

const catapultTarget = new CatapultTarget();
// catapultTarget.angularVelocity = CAMERA_ANGULAR_VELOCITY;

const firstPersonTarget = new FirstPersonTarget();
// firstPersonTarget.angularVelocity = CAMERA_ANGULAR_VELOCITY;

const camera = new Camera(castleTarget, menu);
camera.angularVelocity = CAMERA_ANGULAR_VELOCITY;

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
    console.log('Keypress:' + e.key);
    if (e.key === '1') {
        camera.target = castleTarget;
    } else if (e.key === '2') {
        camera.target = catapultTarget;
    } else if (e.key === '3') {
        camera.target = firstPersonTarget;
    }
};

const manageKey = (key, value) => {

    let letter = key.toLowerCase();
    switch (letter) {
        case 'a':
            camera.left = value;
            break;
        case 's':
            camera.back = value;
            break;
        case 'd':
            camera.right = value;
            break;
        case 'w':
            camera.front = value;
            break;
    }
}

window.onkeydown = (e) => {
    console.log('KeyDown:' + e.key);
    manageKey(e.key, 1);
}

window.onkeyup = (e) => {
    console.log('KeyUp:' + e.key);
    manageKey(e.key, 0);
}

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

    initScene(menu);

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
    time += 0.1 * 1 / 60;
    drawScene($canvas.width(), $canvas.height(), camera);
    camera.update();
}


$(document).ready(function () {
    loadShadersAndStartWebGL();
})
