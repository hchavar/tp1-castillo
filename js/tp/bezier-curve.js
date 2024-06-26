
var b0 = function(u) {
    return (1.0 - u) * (1.0 - u) * (1.0 - u);
}

var b1 = function(u) {
    return 3.0 * (1.0 - u) * (1.0 - u) * u;
}

var b2 = function(u) {
    return 3.0 * (1.0 - u) * u * u;
}

var b3 = function(u) {
    return u  * u  * u;
}

var b0d = function(u) {
    return -3.0 * u  * u + 6.0 * u - 3.0;
}

var b1d = function(u) {
    return 9.0 * u  * u - 12.0 * u + 3.0;
}

var b2d = function(u) {
    return -9.0 * u  * u + 6.0 * u;
}

var b3d = function(u) {
    return 3.0 * u  * u;
}


function getPointAt(u, ctrlPoints) {

    let p0 = ctrlPoints[0];
    let p1 = ctrlPoints[1];
    let p2 = ctrlPoints[2];
    let p3 = ctrlPoints[3];

    let x = b0(u) * p0[0] + b1(u) * p1[0] + b2(u) * p2[0] + b3(u) * p3[0];
    let y = b0(u) * p0[1] + b1(u) * p1[1] + b2(u) * p2[1] + b3(u) * p3[1];
    let z = b0(u) * p0[2] + b1(u) * p1[2] + b2(u) * p2[2] + b3(u) * p3[2];

    return [x, y, z];
}


function getDerivativePointAt(u, ctrlPoints) {

    let p0 = ctrlPoints[0];
    let p1 = ctrlPoints[1];
    let p2 = ctrlPoints[2];
    let p3 = ctrlPoints[3];


    let x = b0d(u) * p0[0] + b1d(u) * p1[0] + b2d(u) * p2[0] + b3d(u) * p3[0];
    let y = b0d(u) * p0[1] + b1d(u) * p1[1] + b2d(u) * p2[1] + b3d(u) * p3[1];
    let z = b0d(u) * p0[2] + b1d(u) * p1[2] + b2d(u) * p2[2] + b3d(u) * p3[2];

    return [x, y, z];
}


function getNormalAt(u, ctrlPoints) {

    let tangent = getDerivativePointAt(u, ctrlPoints);
    let normal = [];
    glMatrix.vec3.cross(normal, tangent, [0, 0, 1]);

    glMatrix.vec3.normalize(normal,normal);

    return normal;
}

function getBezierCurve(ctrlPoints) {
    
    if (ctrlPoints.length != 4) {
        console.error("Cubic Bezier requires 4 control points");
        return null;
    }
    
    var delta = 1.0/MAX_CURVE_POINTS;
    var points = [];
    var tangents = [];
    var normals = [];

    for (let u = 0; u <= 1.01; u = u + delta) {
        points.push(getPointAt(u, ctrlPoints));
        tangents.push(getDerivativePointAt(u, ctrlPoints));
        normals.push(getNormalAt(u, ctrlPoints))
    }
    return {points, tangents, normals};
}

function getConcatenatedBezierCurve(controlPointsArray) {
    
    let concatenatedCurve = {
        points : [],
        cumulative : [],
        tangents: [],
        normals: []
    };
    
    controlPointsArray.forEach(controlPoints => { 
        let bezierCurve = getBezierCurve(controlPoints);
        concatenatedCurve.points = concatenatedCurve.points.concat(bezierCurve.points);
        concatenatedCurve.tangents = concatenatedCurve.tangents.concat(bezierCurve.tangents);
        concatenatedCurve.normals = concatenatedCurve.normals.concat(bezierCurve.normals);
    });

    let cumulativeDistance = [];
    cumulativeDistance.push(0.0);

    let c = 0.0;

    for (let i = 1; i < concatenatedCurve.points.length; i++) {
        let a = concatenatedCurve.points[i - 1];
        let b = concatenatedCurve.points[i];
        c += vec3.distance(a, b);
        cumulativeDistance.push(c)
        
    }

    for (let i = 0; i < concatenatedCurve.points.length; i++) {
        concatenatedCurve.cumulative.push(cumulativeDistance[i]/c);
    }

    return concatenatedCurve;
}
