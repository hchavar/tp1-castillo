    precision highp float;

    attribute vec3 aPosition;
    attribute vec3 aNormal;  
    attribute vec3 aColor;   
    attribute vec2 aUv;      

    uniform mat4 modelMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 projMatrix;

    uniform mat4 normalMatrix;

    varying vec3 vNormal;
    varying vec3 vPosWorld;

    void main(void) {
        gl_Position = projMatrix * viewMatrix * modelMatrix * vec4(aPosition, 1.0);

        vPosWorld = (modelMatrix * vec4(aPosition, 1.0)).xyz;    //la posicion en coordenadas de mundo
        vNormal = (normalMatrix * vec4(aNormal, 1.0)).xyz;       //la normal en coordenadas de mundo

    }