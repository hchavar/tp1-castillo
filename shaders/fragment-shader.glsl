        precision highp float;

        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        varying vec2 vUv;


        uniform vec3 uColor;
        uniform bool uColorNormals;
        uniform bool uDirLight;
        uniform bool uHasTexture;

        uniform float Ka;   // Ambient reflection coefficient
        uniform float Kd;   // Diffuse reflection coefficient
        uniform float Ks;   // Specular reflection coefficient
        uniform float shininessVal; // Shininess

        // // Material color
        uniform vec3 uAmbientColor;

        struct Light {
            vec3 position;
            vec3 ambient;
        };

        uniform Light lights[4];

        uniform vec3 uDirLightColor;
        uniform vec3 uDirLightNormal;
        uniform vec3 uViewPosition;

        uniform sampler2D uSampler2D;

        
        void colorNormals();
        void colorDefault();
        void intensityLight(in vec3 L, in vec3 A, out vec3 intenLight);

        void main(void) {
            
            if (uColorNormals) { 
                colorNormals();
            } else {
                colorDefault();
            }            
        }


        void colorNormals() {

            gl_FragColor = vec4(vNormal, 1);
            
        }

        void colorDefault() {
            // compute intensity for every light
            vec3 il = vec3(0.0);
            for (int j = 0; j < 4; j++) {
                vec3 ili = vec3(0.0);
                intensityLight(lights[j].position - vWorldPosition, lights[j].ambient, ili);
                il = il + ili;
            }

            if (uDirLight) {
                vec3 ild = vec3(0.0);
                intensityLight(uDirLightNormal, uDirLightColor, ild);
                il = il + ild;
            }

            vec4 color = vec4(uColor, 1.0);

            if (uHasTexture) {
                color = texture2D(uSampler2D, vUv);
            }

            vec4 ra = Ka * color;
            vec4 la = vec4(uAmbientColor, 1.0);

            vec4 i = ra * la + vec4(il, 1.0);

            // gl_FragColor = texture2D(uSampler2D, vUv);
            gl_FragColor = i;

        }

        void intensityLight(in vec3 positionToLightSource, in vec3 A, out vec3 intenLight) {

            float attenuation = 1.0 / length(positionToLightSource);
            vec3 L = normalize(positionToLightSource);
            vec3 N = normalize(vNormal);

            vec3 viewDir = normalize(uViewPosition - vWorldPosition);

            // Lambert's cosine law
            float lambertian = max(dot(N, L), 0.0);
            float specular = 0.0;
            
            vec3 R = reflect(-L, N);      // Reflected light vector
            vec3 V = normalize(viewDir); // Vector to viewer
            // Compute the specular term
            float specAngle = max(dot(R, V), 0.0);
            specular = pow(specAngle, shininessVal);
            

            vec3 ld = Kd * lambertian * A * attenuation;

            vec3 ls = Ks * specular * A * attenuation;

            vec3 rd = Kd * uColor;
            vec3 rs = vec3(1.0, 1.0, 1.0);

            intenLight = rd * ld + rs * ls;
        }