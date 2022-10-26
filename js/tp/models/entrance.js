class Entrance extends Objeto3D {
    constructor(menu) {

        super();

        let gate = new Gate(menu);
        gate.build();
        this.addChild(gate);


    }




}