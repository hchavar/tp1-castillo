const level = 0;
const width = 1;
const height = 1;
const border = 0;
const pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue

class Material {
    constructor() {
        this.hasTexture = false;
        this.srcImage = null;
        this.texture = null;
        this.program = globalShaderProgram;
    }

    activate() {
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.uniform1i(this.program.uHasTexture, this.hasTexture);
    }
    
    loadTexture() {
        
        if (!this.srcImage) return;
        
        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        
        gl.texImage2D(
            gl.TEXTURE_2D,
            level,
            gl.RGBA,
            width,
            height,
            border,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            pixel
        );

        this.image = new Image();
        this.image.onload = () => {
            this.bindImage(level, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
            this.hasTexture = true;

        };
        this.image.src = this.srcImage;

    }

    bindImage(level, internalFormat, srcFormat, srcType, image) {
        
        function isPowerOf2(value) {
            return (value & (value - 1)) === 0;
        }
        
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(
            gl.TEXTURE_2D,
            level,
            internalFormat,
            srcFormat,
            srcType,
            image
        );

        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
    }

}
