class TrapezoidBox extends Box {
    constructor(width, height) {
        super(width, height, menu);
    }

    getPosition(u, v) {
        let pos = super.getPosition(u, v);
        pos[0] = pos[0] * (1 - v * this.reduction);
        return pos;
    }

    set reduction(value) {
        this._reduction = value;
    }

    get reduction() {
        return this._reduction;
    }
}
