        precision mediump float;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        varying vec3 vColor;


        uniform vec3 uAmbientColor;
        uniform vec3 uDirectionalColor;
        uniform vec3 uLightPosition;

        uniform bool uUseLighting;

        uniform sampler2D uSampler;

        void main(void) {
            
            vec3 lightDirection = normalize(uLightPosition - vec3(vWorldPosition));
            
            vec3 color = (uAmbientColor + uDirectionalColor *max(dot(vNormal, lightDirection), 0.0));
           
            color.x = vUv.x;
            color.y = vUv.y;
            color.z = 0.0;
           
            if (uUseLighting)
                gl_FragColor = vec4(vColor, 1.0);
            else
                gl_FragColor = vec4(0.7, 0.7, 0.7, 1.0);
            
        }
