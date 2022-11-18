        precision highp float;

        varying vec3 vNormal;
        varying vec3 vWorldPosition;


        uniform vec3 uColor;
        uniform bool uColorNormals;

        // uniform int mode;   // Rendering mode
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

        uniform vec3 uColorLight1;

        uniform vec3 uDirLightColor;
        uniform vec3 uDirLightNormal;
        uniform vec3 uViewPosition;


        vec3 color;

        varying highp vec3 vLighting;
        
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
                intensityLight(normalize(lights[j].position - vWorldPosition), lights[j].ambient, ili);
                il = il + ili;
            }

            vec3 ra = Ka * uColor;
            vec3 la = uAmbientColor;

            vec3 i = ra * la + il;

            gl_FragColor = vec4(i, 1.0);

        }

        void intensityLight(in vec3 L, in vec3 A, out vec3 intenLight) {

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
            

            vec3 ld = Kd * lambertian * A;

            vec3 ls = Ks * specular * A;

            vec3 rd = Kd * uColor;
            vec3 rs = vec3(1.0, 1.0, 1.0);

            intenLight = rd * ld + rs * ls;
        }