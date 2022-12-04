
var water, srh, c, d, m, t, f, cr, col, col2, box, gate;

var castle;
var entrance;
var perimeter, ps, pe, platform;
var sphere;
var tb;
var fr, lamp;
var axle, chasis, cw, arm, fs;
var vp, vp2, catapult;

function createConfiguration(menu){
    
    // vp =  new Plane(25, 25);
    // vp.setRotation([-Math.PI / 2, [0, 0, 1]]);
    // vp.updateLocalMatrix();
    // vp.build();
    // vp2 =  new Plane(25, 25);
    // vp2.setRotation([-Math.PI / 2, [0, 0, 1]]);
    // vp2.updateLocalMatrix();
    // vp2.build();
    water =  new Plane(25, 25);
    water.color = [0, 0.55, 0.8];
    water.material = materials['water'];
    water.scale = {
        x: 2.0,
        y: 1.0,
        z: 1.5
    };
    water.ks = 1.0;
    water.build();
    water.setPosition([0, -0.4, 0]);
    water.updateLocalMatrix();
    // srh = new RevolutionSurface(20,20);
    // c = new Cylinder(10, 10);
    // d = new Demo(128, 256);
    // m = new Wall(20, menu);
    // m.build();
    // //m.setRotation([-Math.PI / 2, [0, 1, 0]]);
    // m.setPosition([0,0,-6]);
    // m.updateLocalMatrix();
    // t = new Tower(30, menu);
    // t.build();
    // t.setPosition([6,0,0]);
    // t.updateLocalMatrix();
    // cr = new ConicalRoof(30, 30);
    // cr.build();
    // col = new Column(30, 30, menu);
    // col.build();
    // col2 = new Column(30, 30, menu);
    // col2.build();
    // col2.setPosition([3.00, 0, -5.00]);
    // col2.updatePosition();
    // box = new Box();
    // box.build();
    // box.setPosition([0.00, 0.0, 9.00]);
    // box.updatePosition();
    // gate = new Gate(menu);
    // gate.build();
    // gate.setPosition([0, 1, 5.5]);
    // gate.updateLocalMatrix();
    castle = new Castle(menu);
    // entrance = new Entrance(menu);
    // entrance.scale = {
    //     x: 1.0,
    //     y: 1.0,
    //     z: 11.0
    // };
    // entrance.build();
    // //entrance.setPosition([0, 0, 5.5]);
    // entrance.updateLocalMatrix();

    castle.setPosition([-2.50, 0, -2.50]);
    castle.updatePosition();

    // f = new Floor(menu);

    // f.build();
    // f.setPosition([0, 1.0, 5.5]);
    // // f.updatePosition();
    // f.updateLocalMatrix();

    perimeter = new Perimeter(menu);
    perimeter.build();

    // ps = new PerimeterSection(menu);
    // ps.build();
    // ps.setPosition([0,0,-3]);
    // ps.updateLocalMatrix();

    // pe = new PerimeterEntrance(menu);
    // pe.scale = {
    //     x: 1.0,
    //     y: 1.0,
    //     z: 11.0
    // };
    // pe.build();
    // pe.setPosition([0,0,-3]);
    // pe.updateLocalMatrix();

    platform = new Platform();
    platform.build();

    sphere = new Sphere(20, 20);
    sphere.ambientColor = [1, 1, 1];
    sphere.color = [1, 1, 1];
    sphere.ka = 1.0;
    // sphere.ks = -2.0;
    sphere.build();
    sphere.setPosition([14.0, 4.0, 7.4]);
    sphere.updateLocalMatrix();

    // tb = new TrapezoidBox();
    // tb.reduction = 0.6;
    // tb.build();
    // tb.setPosition([0, 0, 17]);
    // tb.updateLocalMatrix();

    // fr = new Frame();
    // fr.build();
    // fr.setRotation([Math.PI*time, [0, 0, 1]]);
    // // fr.setPosition([0, 0, 17]);
    // fr.updateLocalMatrix();

    // axle = new Axle();
    // axle.build();
    // chasis = new Chasis();
    // chasis.build();
    // cw = new CounterWeight();
    // cw.setPosition([0, 0.8, 0]);
    // cw.updateLocalMatrix();
    // cw.build();

    // arm = new Arm(menu);
    // arm.build();

    // // arm.setPosition([7.5, -0.2, 0]);
    // arm.updateLocalMatrix();

    // fs = new FiringSystem(menu);

    // fs.build();

    // lamp = new Lamp(menu);
    // lamp.setPosition([14.0, 2.0, 7.4]);
    // lamp.updateLocalMatrix();
    // // lamp.ambientColor = [1, 1, 1];
    // // lamp.color = [1, 1, 1];
    // // lamp.ka = 1.0;
    // lamp.build();


    catapult = new Catapult(menu);
    catapult.build();
    catapult.setScale(0.6);
    catapult.updateLocalMatrix();
    catapult.setRotation([-Math.PI/3, [0, 1, 0]]);
    catapult.updateLocalMatrix();
    catapult.setPosition([80, 0, 0]);
    catapult.updateLocalMatrix();
    
}

function drawConfiguration() {

    
    water.draw();
    castle.draw();
    perimeter.draw();
    platform.draw();
    catapult.draw();
    catapult.animate();
    // vp.draw();
    // c.setPosition([4,0,0]);
    // c.updatePosition();
    // c.draw();
    // lamp.update();
    // lamp.draw();
    // d.setPosition([0,0,-3]);
    // d.animate();
    // d.updateLocalMatrix();
    // d.draw();
    // srh.setPosition([-4,0,0]);
    // srh.updatePosition();
    // srh.animate();
    // srh.updateLocalMatrix();
    // srh.draw();
    
    // m.draw();
    
    // t.draw();
    // cr.draw();
    // col.draw();
    // box.setRotation([Math.PI/2, [0, 1, 0]]);
    // box.setPosition([0, 0.8,0]);
    // box.updatePosition();
    // box.draw();
    // box.setRotation([Math.PI/3, [0, 1, 0]]);
    // box.updateRotation();
    // box.updateLocalMatrix();
    // box.animate();

    
    // gate.draw();
    // entrance.draw();


    // ps.draw();
    // pe.draw();

    // col2.draw();
    // f.draw();
    // sphere.draw();
    //tb.draw();
    // fr.setRotation([Math.PI*time, [0, 0, 1]]);
    // fr.updateLocalMatrix();
    // fr.draw();
    // axle.draw();
    // chasis.draw();
    // cw.draw();
    // arm.animate();
    // arm.draw();
    // fs.draw();
}
