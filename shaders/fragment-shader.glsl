        precision highp float;

        // varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        // varying vec3 vColor;


        uniform vec3 uAmbientColor;
        // uniform vec3 uDirectionalColor;
        // uniform vec3 uLightPosition;
        uniform vec3 uColor;
        uniform bool uColorNormals;

        // uniform bool uUseLighting;

        // uniform sampler2D uSampler;
        vec3 color;
        

        void main(void) {
            
            vec3 lightDirection = normalize(vec3(0.0, 3.0, 5.0) - vWorldPosition);

            
            vec3 diffColor = uColor;
            // color = dot(lightDirection, vNormal) * diffColor + vec3(0.2, 0.2, 0.2);
            // color = dot(uAmbientColor, vNormal) * diffColor;
            // color = mix(uColor, color, 0.3);

            color = uAmbientColor * diffColor;

            if (uColorNormals) { 
                diffColor = mix(vec3(0.5,0.5,0.5), vNormal, 0.4);
                // color = dot(lightDirection, vNormal) * diffColor + vec3(0.2, 0.2, 0.2);
                // gl_FragColor = vec4(vNormal * .5 + .5, 1);
                gl_FragColor = vec4(vNormal, 1);
            } else {

                gl_FragColor = vec4(color, 1.0);
            }
            
            
            // vec3 color = (uAmbientColor + uDirectionalColor *max(dot(vNormal, lightDirection), 0.0));
           
            // color.x = vUv.x;
            // color.y = vUv.y;
            // color.z = 0.0;
           
            // if (uUseLighting)
            //     gl_FragColor = vec4(vColor, 1.0);
            // else
            //     gl_FragColor = vec4(0.7, 0.7, 0.7, 1.0);
            
        }
