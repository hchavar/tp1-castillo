
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

    globalShaderProgram = gl.createProgram();
    gl.attachShader(globalShaderProgram, vertexShader);
    gl.attachShader(globalShaderProgram, fragmentShader);
    gl.linkProgram(globalShaderProgram);

    if (!gl.getProgramParameter(globalShaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(globalShaderProgram);

    globalShaderProgram.vertexPositionAttribute = gl.getAttribLocation(globalShaderProgram, "aPosition");
    gl.enableVertexAttribArray(globalShaderProgram.vertexPositionAttribute);

    // globalShaderProgram.textureCoordAttribute = gl.getAttribLocation(globalShaderProgram, "aUv");
    // gl.enableVertexAttribArray(globalShaderProgram.textureCoordAttribute);

    globalShaderProgram.vertexNormalAttribute = gl.getAttribLocation(globalShaderProgram, "aNormal");
    gl.enableVertexAttribArray(globalShaderProgram.vertexNormalAttribute);

    // globalShaderProgram.vertexColorAttribute = gl.getAttribLocation(globalShaderProgram, "aColor");
    // gl.enableVertexAttribArray(globalShaderProgram.vertexColorAttribute);

    globalShaderProgram.pMatrixUniform = gl.getUniformLocation(globalShaderProgram, "projMatrix");
    globalShaderProgram.mMatrixUniform = gl.getUniformLocation(globalShaderProgram, "modelMatrix");
    globalShaderProgram.vMatrixUniform = gl.getUniformLocation(globalShaderProgram, "viewMatrix");
    globalShaderProgram.nMatrixUniform = gl.getUniformLocation(globalShaderProgram, "normalMatrix");
    // globalShaderProgram.samplerUniform = gl.getUniformLocation(globalShaderProgram, "uSampler");
    // globalShaderProgram.useLightingUniform = gl.getUniformLocation(globalShaderProgram, "uUseLighting");
    globalShaderProgram.ambientColorUniform = gl.getUniformLocation(globalShaderProgram, "uAmbientColor");
    // globalShaderProgram.frameUniform = gl.getUniformLocation(globalShaderProgram, "time");
    globalShaderProgram.lightingDirectionUniform = gl.getUniformLocation(globalShaderProgram, "uDirLightNormal");
    globalShaderProgram.directionalColorUniform = gl.getUniformLocation(globalShaderProgram, "uDirLightColor");
    globalShaderProgram.viewPositionUniform = gl.getUniformLocation(globalShaderProgram, "uViewPosition");
    globalShaderProgram.glossinessFactorUniform = gl.getUniformLocation(globalShaderProgram, "shininessVal");
    globalShaderProgram.kaFactorUniform = gl.getUniformLocation(globalShaderProgram, "Ka");
    globalShaderProgram.kdFactorUniform = gl.getUniformLocation(globalShaderProgram, "Kd");
    globalShaderProgram.ksFactorUniform = gl.getUniformLocation(globalShaderProgram, "Ks");
    globalShaderProgram.lights = [];
    for (let i = 0; i < 4; i++) {
        const light = {
            position: gl.getUniformLocation(globalShaderProgram, "lights["+ i + "].position"),
            color: gl.getUniformLocation(globalShaderProgram, "lights["+ i + "].ambient")
        };
        globalShaderProgram.lights.push(light);
    }

    globalShaderProgram.uColorUniform = gl.getUniformLocation(globalShaderProgram, "uColor");

    globalShaderProgram.uColorNormals = gl.getUniformLocation(globalShaderProgram, "uColorNormals");
    globalShaderProgram.uDirectionalActivated = gl.getUniformLocation(globalShaderProgram, "uDirLight");
}