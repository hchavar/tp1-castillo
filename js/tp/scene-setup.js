
var p, srh, c, d, m;


function createConfiguration(menu){
    
    p = new Plane(25, 25);
    // srh = new RevolutionSurface(20,20);
    c = new Cylinder(10, 10);
    d = new Demo(128, 256);
    m = new Wall(40, 100, menu);
    
}

function drawConfiguration() {

    
    p.draw();
    c.setPosition([4,0,0]);
    c.updatePosition();
    c.draw();
    d.setPosition([0,0,-3]);
    d.animate();
    d.updateLocalMatrix();
    d.draw();
    // srh.setPosition([-4,0,0]);
    // srh.updatePosition();
    // srh.animate();
    // srh.updateLocalMatrix();
    // srh.draw();
    //m.setRotation([Math.PI/6, [0, 1, 0]]);
    //m.setPosition([-3,0,-4]);
    m.updateLocalMatrix();
    m.draw();

}
