
var distanciaCamara = 5;
var alturaCamara = 2;
var velocidadAngular = 0.0;

    
function initMenu() {
    var gui = new dat.GUI();
    gui.add(window, "distanciaCamara",0.2,10).step(0.1);
    
    gui.add(window, "alturaCamara",-1,8).step(0.1);
    
    gui.add(window, "modo",["wireframe","smooth","edges"]);
    gui.add(window, "velocidadAngular",0, 1).step(0.01);
    
    
}