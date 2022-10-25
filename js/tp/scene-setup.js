
var p, srh, c, d, m, t, cr, col, box, gate;


function createConfiguration(menu){
    
    p = new Plane(25, 25);
    //p.color = [1, 1, 0]; no funciona, el constructor lo necesita
    // srh = new RevolutionSurface(20,20);
    // c = new Cylinder(10, 10);
    // d = new Demo(128, 256);
    m = new Wall(40, 100, menu);
    t = new Tower(50, 50, menu);
    cr = new ConicalRoof(30, 30);
    col = new Column(30, 30, menu);
    box = new Box(8, 16);
    box.setPosition([0.00, 1.8, 0.00]);
    box.updatePosition();
    gate = new Gate(menu);
    
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
    m.setRotation([Math.PI/2, [0, 1, 0]]);
    //m.setPosition([-3,0,-4]);
    m.updateLocalMatrix();
    //m.draw();
    //t.draw();
    //cr.draw();
    //col.draw();
    //box.setRotation([Math.PI/2, [0, 1, 0]]);
    //box.setPosition([0, 0.8,0]);
    //box.updatePosition();
    //box.draw();
    //box.setRotation([Math.PI/3, [0, 1, 0]]);
    //box.updateRotation();
    // box.updateLocalMatrix();
    box.animate();

    
    gate.draw();


}
