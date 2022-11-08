        attribute vec3 aPosition;
        attribute vec3 aNormal;
        // attribute vec3 aColor;
        // attribute vec2 aUv;


        uniform mat4 projMatrix;
        uniform mat4 modelMatrix;
        uniform mat4 viewMatrix;
        uniform mat3 normalMatrix;

        // uniform float time;

        // uniform sampler2D uSampler;

        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        // varying vec2 vUv;
        // varying vec3 vColor;

        // const float PI = 3.141592653;

        void main(void) {

            vec3 position = aPosition;
            // vec3 normal = aNormal;

            // vec2 uv = aUv;

            // vec4 textureColor = texture2D(uSampler, vec2(uv.s, uv.t));

            // position += normal*(1.0 + sin(uv.x * 18.0 *PI + time * 20.0)) * 0.03;

            vec4 worldPos = modelMatrix * vec4(position, 1.0);

            gl_Position = projMatrix * viewMatrix * worldPos;

            vWorldPosition = worldPos.xyz;
            // vNormal = (normalMatrix*vec4(aNormal,1.0)).xyz;
            vNormal = normalMatrix*aNormal;
            // vNormal = aNormal;
            // vUv = uv;
            // vColor = aColor;
        }
