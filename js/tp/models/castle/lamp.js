const lampConfig = {
    light: {
        color: [1.0, 1.0, 0.8],
        position: [0.0, 2.8, 0.0],
        scaleFactor: 1.0
    },
    handle: {
        position: [0.0, 0.0, 0.0],
        color: [0, 0, 0],
        rotation: [Math.PI/2, [1, 0, 0]],
        scale: {
            x: 0.07,
            y: 6.4,
            z: 0.07
        }        
    }
}

class Lamp extends Objeto3D {
    constructor(menu) {
        super(null, null, menu);
        
        
    }
    
    init() {
        this.name = this.name ? this.name : this.constructor.name;
        this.light = new Sphere(20, 20);
        this.light.ambientColor = [1, 1, 1];
        this.light.ka = 1.0;
        this.light.kd = 0.8;
        this.light.color = [1, 1, 1];
        this.light.name = "LampLight"
        // this.light.color = lampConfig.light.color;
        this.light.setScale(lampConfig.light.scaleFactor);
        this.light.setPosition(lampConfig.light.position);
        this.light.updateLocalMatrix();
        this.light.build();
        this.addChild(this.light);

        let handle = new LampHandle();
        handle.build();
        this.addChild(handle);

    }

    update() {
        // this.light.color = this.menu.lightColorToVector();
        let color = this.menu.lightColorToVector();
        let m = (1 - Math.max(color[0], color[1], color[2]));
        this.light.ambientColor[0] = (color[0]  + m);
        this.light.ambientColor[1] = (color[1] + m);
        this.light.ambientColor[2] = (color[2] + m);
        // this.light.ambientColor = this.menu.lightColorToVector();

    }

}



class LampHandle extends Cylinder {
    constructor() {
        super(1, 10);
    }

    init() {
        this.name = this.constructor.name;
        this.empty = false;
        this.scale = lampConfig.handle.scale;
        this.color = lampConfig.handle.color;
        this.reuseBuffer = true;
    }
}