        attribute vec3 aPosition;
        attribute vec3 aNormal;


        uniform mat4 projMatrix;
        uniform mat4 modelMatrix;
        uniform mat4 viewMatrix;
        uniform mat3 normalMatrix;

        uniform vec3 uAmbientColor;

        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        varying highp vec3 vLighting;

        void main(void) {

            highp vec3 directionalLightColor = vec3(1, 0.8, 0.4);
            highp vec3 directionalVector = normalize(vec3(0.85, 0.2, 0.75));
            
            vec3 position = aPosition;

            vec4 worldPos = modelMatrix * vec4(position, 1.0);

            gl_Position = projMatrix * viewMatrix * worldPos;

            vWorldPosition = worldPos.xyz;
            vNormal = normalMatrix*aNormal;

            highp float directional = max(dot(vNormal, directionalVector), 0.0);
            vLighting = uAmbientColor + (directionalLightColor * directional);
        }
