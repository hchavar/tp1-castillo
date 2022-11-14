class Target {
    constructor() {

    }

    get alfa() {
        return this._alfa;
    }

    set alfa(value) {
        this._alfa = value;
    }

    get beta() {
        return this._beta;
    }

    set beta(value) {
        this._beta = value;

        if (this._beta < 0.01) this._beta = 0.01;
        if (this._beta > (Math.PI / 2 - 0.04)) this._beta = Math.PI / 2 - 0.04;
    }

    rotate(m) {
        glMatrix.mat4.rotateY(m, m, this.alfa);
        glMatrix.mat4.rotateX(m, m, this.beta);
    }
}