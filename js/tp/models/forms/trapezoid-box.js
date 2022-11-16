class TrapezoidBox extends Box {
    constructor() {
        super();

    }

    getPosition(u, v) {
        let pos = super.getPosition(u, v);
        let factor = v;
        if (v < 2 / this.width)
            factor = 2 / this.width;
        if (v > (this.width - 2) / this.width)
            factor = (this.width - 2) / this.width;
        pos[0] = pos[0] * (1 - factor * this.reduction);
        return pos;
    }

    getNormal(u, v) {
        let angle = Math.atan( this.reduction / (this.width *this.scale.y ));
        let sn = super.getNormal(u, v);
        vec3.rotateZ(sn, sn, [0, 0, 0], sn[0]*angle);
        return sn;
    }

    set reduction(value) {
        this._reduction = value;
    }

    get reduction() {
        return this._reduction;
    }
}
