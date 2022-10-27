
var p, srh, c, d, m, t, f, cr, col, col2, box, gate;

var castle;
var entrance;
var perimeter, ps, pe;

function createConfiguration(menu){
    
    p = new Plane(25, 25);
    p.build();
    //p.color = [1, 1, 0]; no funciona, el constructor lo necesita
    // srh = new RevolutionSurface(20,20);
    // c = new Cylinder(10, 10);
    // d = new Demo(128, 256);
    m = new Wall(20, 40, menu);
    m.build();
    //m.setRotation([-Math.PI / 2, [0, 1, 0]]);
    m.setPosition([0,0,-6]);
    m.updateLocalMatrix();
    t = new Tower(30, 30, menu);
    t.build();
    t.setPosition([6,0,0]);
    t.updateLocalMatrix();
    cr = new ConicalRoof(30, 30);
    cr.build();
    col = new Column(30, 30, menu);
    col.build();
    col2 = new Column(30, 30, menu);
    col2.build();
    col2.setPosition([3.00, 0, -5.00]);
    col2.updatePosition();
    box = new Box(8, 16);
    box.build();
    box.setPosition([0.00, 0.0, 9.00]);
    box.updatePosition();
    gate = new Gate(menu);
    gate.build();
    // gate.setPosition([0, 1, 5.5]);
    // gate.updateLocalMatrix();
    castle = new Castle(menu);
    entrance = new Entrance(menu);
    entrance.scale = {
        x: 1.0,
        y: 1.0,
        z: 11.0
    };
    entrance.build();
    //entrance.setPosition([0, 0, 5.5]);
    entrance.updateLocalMatrix();

    castle.setPosition([-2.50, 0, -2.50]);
    castle.updatePosition();
    box.updatePosition();

    f = new Floor(menu);

    f.build();
    f.setPosition([0, 1.0, 5.5]);
    // f.updatePosition();
    f.updateLocalMatrix();

    perimeter = new Perimeter(menu);
    perimeter.build();

    ps = new PerimeterSection(menu);
    ps.build();
    ps.setPosition([0,0,-3]);
    ps.updateLocalMatrix();

    pe = new PerimeterEntrance(menu);
    pe.scale = {
        x: 1.0,
        y: 1.0,
        z: 11.0
    };
    pe.build();
    // pe.setPosition([0,0,-3]);
    // pe.updateLocalMatrix();
    
}

function drawConfiguration() {

    
    p.draw();
    // c.setPosition([4,0,0]);
    // c.updatePosition();
    // c.draw();
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

    castle.draw();

    perimeter.draw();
    // ps.draw();
    // pe.draw();

    // col2.draw();
    // f.draw();


}
