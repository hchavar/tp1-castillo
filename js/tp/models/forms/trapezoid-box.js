class TrapezoidBox extends Box {
    constructor(width, height) {
        super();
    }

    getPosition(u, v) {
        let pos = super.getPosition(u, v);
        pos[0] = pos[0] * (1 - v * this.reduction);
        return pos;
    }

    //TODO: Fix normals

    set reduction(value) {
        this._reduction = value;
    }

    get reduction() {
        return this._reduction;
    }
}
