        precision highp float;

        varying vec3 vNormal;
        varying vec3 vWorldPosition;


        uniform vec3 uColor;
        uniform bool uColorNormals;

        vec3 color;

        varying highp vec3 vLighting;
        

        void main(void) {
            
            vec3 lightDirection = normalize(vec3(0.0, 3.0, 5.0) - vWorldPosition);

            
            vec3 diffColor = uColor;
            if (uColorNormals) { 
                diffColor = mix(vec3(0.5,0.5,0.5), vNormal, 0.4);
                gl_FragColor = vec4(vNormal, 1);
            } else {

                gl_FragColor = vec4(uColor * vLighting, 1.0);
            }

            
        }
