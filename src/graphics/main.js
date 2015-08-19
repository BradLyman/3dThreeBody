var THREE = require('three');
var integrater = require('../integrater.js');
var massObject = require('../massObject.js');
var vec3 = require('../vec3.js');
var vertexBuffer = require('../vertexBuffer.js');

var initialPos = [140, 0, 20];
var p1 = massObject.createMassObject(10e4, [-100, 0, 0], [0, 15, 0]);
var p2 = massObject.createMassObject(10e4, [100, 0, 0], [0, -15, 0]);
var particle = massObject.createMassObject(1, initialPos, [0, 45, 0]);

var scene, camera, renderer,
    lineGeometry, lineMaterial, lineMesh,
    pointVertices;

(function() {
  var w = window.innerWidth - 4,
      h = window.innerHeight - 4;
  scene    = new THREE.Scene();
  camera   = new THREE.PerspectiveCamera(65, w/h, 50, 10000);
  renderer = new THREE.WebGLRenderer({ antialias : true });
  renderer.setSize(w, h);
}());

var createPlanetMesh = function() {
  var geometry = new THREE.SphereGeometry(10, 16, 16);
  var material = new THREE.MeshLambertMaterial({ color : 0xaaffaa });

  return new THREE.Mesh(geometry, material);
};

var light = new THREE.HemisphereLight(0xccccff, 0x111111, 1);

var planet1 = createPlanetMesh();
var planet2 = createPlanetMesh();

pointVertices = vertexBuffer.createVertexBuffer(4000, initialPos);

lineGeometry = new THREE.Geometry();
lineGeometry.vertices = pointVertices.getVertices();

lineMaterial = new THREE.LineBasicMaterial({ linewidth : 2 });

lineMesh = new THREE.Line(lineGeometry, lineMaterial);

scene.add(lineMesh);
scene.add(planet1);
scene.add(planet2);
scene.add(light);
scene.add(new THREE.AxisHelper(200));

camera.position.y = 15;

document.body.appendChild(renderer.domElement);

var resizeScene = function() {
  var w = window.innerWidth - 4,
      h = window.innerHeight - 4;

  camera.aspect = w/h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
};

window.onresize = (function() {
  var timeout = 0;

  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(resizeScene, 100);
  };
}());

var distance = 500;
var angle = 0.0;
var zero = new THREE.Vector3(0, 0, 0);
module.exports.render = function() {
  angle += 3.1415 / 800;
  camera.position.z = Math.cos(angle) * distance;
  camera.position.x = Math.sin(angle) * distance;
  camera.lookAt(zero);

  var gForce = massObject.calculateGravityForce(p1, [p2]);
  integrater.eulerSolver(p1, gForce, 0.05);
  integrater.eulerSolver(p2, vec3.scale(-1, gForce), 0.05);

  var pGForce = massObject.calculateGravityForce(particle, [p1, p2]);
  integrater.eulerSolver(particle, pGForce, 0.05);

  pointVertices.push(particle.position);

  lineGeometry.vertices= pointVertices.getVertices();
  lineGeometry.verticesNeedUpdate = true;

  planet1.position.fromArray(p1.position);
  planet2.position.fromArray(p2.position);
  renderer.render(scene, camera);
};

