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

function drawScene(width, height, camera, menu) {

    try {
        gl.viewport(0, 0, width, height);

        gl.clearColor(0.1, 0.6, 0.7, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Projection matrix
        mat4.identity(projMatrix);
        mat4.perspective(projMatrix, 30, aspect, 0.1, 100.0);
        mat4.scale(projMatrix, projMatrix, [1, -1, 1]); // parche para hacer un flip de Y, parece haber un bug en glmatrix

        // Illumination
        // gl.uniform1f(shaderProgram.frameUniform, time/10.0 );
        gl.uniform3f(shaderProgram.directionalColorUniform, 1.0, 0.8, 0.4); 

        // Camera location
        viewMatrix = camera.viewMatrix;
        mat4.lookAt(viewMatrix,
            camera.eye,
            camera.at,
            camera.up
        );

        gl.uniform1i(shaderProgram.uDirectionalActivated, menu.directionalLight);
        
        var lightDirection = [0.85, 0.2, 0.75];
        vec3.normalize(lightDirection, lightDirection);
        gl.uniform3fv(shaderProgram.lightingDirectionUniform, lightDirection);
        gl.uniform3fv(shaderProgram.viewPositionUniform, camera.eye);
        // gl.uniform3f(shaderProgram.light1PositionUniform, 14.0, 4.0, 7.4); 
        // gl.uniform3fv(shaderProgram.light1ColorUniform, menu.lightColorToVector());

        for (let i = 0; i < 4; i++) {

            gl.uniform3fv(shaderProgram.lights[i].position, menu.lights[i].worldPosition);
            gl.uniform3fv(shaderProgram.lights[i].color, menu.lights[i].lightColor);
        }

        drawConfiguration();

    } catch (error) {
        console.log('Hubo un error: ' + error);
        console.error(error);
        noHasError = false;

    }
}
