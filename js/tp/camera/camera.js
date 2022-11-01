class Camera {
    constructor() {

    }

    mouseMove(x, y) {
        console.log('Camera. Mouse x: ' + x + ' y: ' + y);
    }

    mouseDown(x, y) {
        console.log('Camera. Mouse down x: ' + x + ' y: ' + y);
    }

    mouseUp(x, y) {
        console.log('Camera. Mouse up x: ' + x + ' y: ' + y);
    }
}