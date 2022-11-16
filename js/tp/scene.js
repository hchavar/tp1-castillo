var lighting = "true";

var mat4 = glMatrix.mat4;
var mat3 = glMatrix.mat3;
var vec3 = glMatrix.vec3;

var projMatrix = mat4.create();
var viewMatrix = mat4.create();
var matrizModelado = mat4.create();


function initScene(menu) {
    
    createConfiguration(menu);
}

function drawScene(width, height, camera) {

    gl.viewport(0, 0, width, height);

    gl.clearColor(0.1, 0.8, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Projection matrix
    mat4.identity(projMatrix);
    mat4.perspective(projMatrix, 30, aspect, 0.1, 100.0);
    mat4.scale(projMatrix, projMatrix, [1, -1, 1]); // parche para hacer un flip de Y, parece haber un bug en glmatrix

    // Illumination
    gl.uniform1f(shaderProgram.frameUniform, time/10.0 );
    gl.uniform3f(shaderProgram.ambientColorUniform, 0.6, 0.6, 0.6 );
    gl.uniform3f(shaderProgram.directionalColorUniform, 1.2, 1.1, 0.7);
    gl.uniform1i(shaderProgram.useLightingUniform, (lighting == "true"));

    // Camera location
    viewMatrix = camera.viewMatrix;
    mat4.lookAt(viewMatrix,
        camera.eye,
        camera.at,
        camera.up
    );

    var lightPosition = [10.0, 0.0, 3.0];
    gl.uniform3fv(shaderProgram.lightingDirectionUniform, lightPosition);

   try {
        drawConfiguration();
    } catch (error) {
        console.log('Hubo un error: ' + error);
        console.error(error);
        noHasError = false;

    }
}
