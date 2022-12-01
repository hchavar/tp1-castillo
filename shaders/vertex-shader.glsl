        attribute vec3 aPosition;
        attribute vec3 aNormal;
        attribute vec2 aUv;


        uniform mat4 projMatrix;
        uniform mat4 modelMatrix;
        uniform mat4 viewMatrix;
        uniform mat3 normalMatrix;


        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        varying vec2 vUv;

        void main(void) {

            vec3 position = aPosition;

            vec4 worldPos = modelMatrix * vec4(position, 1.0);

            gl_Position = projMatrix * viewMatrix * worldPos;

            vWorldPosition = worldPos.xyz;
            vNormal = normalize(normalMatrix * aNormal);
            vUv = aUv;

        }
