
var vertexShaderSource;
var fragmentShaderSource;


function loadShaders(callback){

    $.when(loadVS(), loadFS()).done(function(res1,res2){
        //this code is executed when all ajax calls are done 
        callback();    
        return true;
    });

    function loadVS() {
        return  $.ajax({
            url: "shaders/vertex-shader.glsl",
            success: function(result){
                vertexShaderSource = result;
            }
        });
    }   

    function loadFS() {
        return  $.ajax({
            url: "shaders/fragment-shader.glsl",
            success: function(result){
                fragmentShaderSource = result;
            }
        });
    }
}

function getShader(gl,code,type) {

    var shader;

    if (type == "fragment") 
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    else // "vertex"
        shader = gl.createShader(gl.VERTEX_SHADER);
    
    gl.shaderSource(shader, code);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        return null;
    }    
    return shader;
}

function initShaders() {

    var fragmentShader= getShader(gl, vertexShaderSource,"vertex");
    var vertexShader= getShader(gl, fragmentShaderSource,"fragment");

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    // shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aUv");
    // gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

    shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aNormal");
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

    // shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aColor");
    // gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "projMatrix");
    shaderProgram.mMatrixUniform = gl.getUniformLocation(shaderProgram, "modelMatrix");
    shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "viewMatrix");
    shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "normalMatrix");
    // shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    // shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, "uUseLighting");
    shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor");
    // shaderProgram.frameUniform = gl.getUniformLocation(shaderProgram, "time");
    shaderProgram.lightingDirectionUniform = gl.getUniformLocation(shaderProgram, "uDirLightNormal");
    shaderProgram.directionalColorUniform = gl.getUniformLocation(shaderProgram, "uDirLightColor");
    shaderProgram.viewPositionUniform = gl.getUniformLocation(shaderProgram, "uViewPosition");
    shaderProgram.glossinessFactorUniform = gl.getUniformLocation(shaderProgram, "shininessVal");
    shaderProgram.kaFactorUniform = gl.getUniformLocation(shaderProgram, "Ka");
    shaderProgram.kdFactorUniform = gl.getUniformLocation(shaderProgram, "Kd");
    shaderProgram.ksFactorUniform = gl.getUniformLocation(shaderProgram, "Ks");
    shaderProgram.light1PositionUniform = gl.getUniformLocation(shaderProgram, "uPosLight1");

    shaderProgram.uColorUniform = gl.getUniformLocation(shaderProgram, "uColor");

    shaderProgram.uColorNormals = gl.getUniformLocation(shaderProgram, "uColorNormals");
}