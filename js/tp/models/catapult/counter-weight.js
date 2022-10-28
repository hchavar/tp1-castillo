const counterWeightConfig = {
    load: {
        position: [0.0, -0.3, 0.0],
        color: [0.6, 0.6, 0.6],
        scale: {
            x: 0.4,
            y: 0.4,
            z: 0.4
        },
        rotation: [Math.PI/2, [1,0,0]]
    },
    hangerFrame: {
        position: [0.0, 0.0, 0.0],
        color: [0.9, 0.5, 0.3],
        scaleFactor: 0.2
    }
}

class CounterWeight extends Objeto3D {
    constructor() {
        super();
    }

    init() {
        
        // counter weight load
        let load = new Box(4, 4);
        load.scale = counterWeightConfig.load.scale;
        load.color = counterWeightConfig.load.color;
        load.setPosition(counterWeightConfig.load.position);
        load.updateLocalMatrix();
        load.build();
        this.addChild(load);

        // swing hanger
        let hangerFrame = new Frame(4, 10);
        hangerFrame.setPosition(counterWeightConfig.hangerFrame.position);
        hangerFrame.setScale(counterWeightConfig.hangerFrame.scaleFactor);
        hangerFrame.updateLocalMatrix();
        hangerFrame.build();
        this.addChild(hangerFrame);

    }
}