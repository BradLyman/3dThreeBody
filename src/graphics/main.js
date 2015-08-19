var THREE = require('three');
var integrater = require('../integrater.js');
var massObject = require('../massObject.js');
var vec3 = require('../vec3.js');

var p1 = massObject.createMassObject(10e4, [-100, 0, 0], [0, 15, 0]);
var p2 = massObject.createMassObject(10e4, [100, 0, 0], [0, -15, 0]);

var scene, camera, renderer;

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

var light = new THREE.HemisphereLight(0x0000ff, 0x111111, 1);

var planet1 = createPlanetMesh();
var planet2 = createPlanetMesh();

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

var angle = 0.0;
var zero = new THREE.Vector3(0, 0, 0);
module.exports.render = function() {
  angle += 3.1415 / 800;
  camera.position.z = Math.cos(angle) * 500;
  camera.position.x = Math.sin(angle) * 500;
  camera.lookAt(zero);

  var gForce = massObject.calculateGravityForce(p1, [p2]);
  integrater.eulerSolver(p1, gForce, 0.05);
  integrater.eulerSolver(p2, vec3.scale(-1, gForce), 0.05);

  planet1.position.fromArray(p1.position);
  planet2.position.fromArray(p2.position);
  renderer.render(scene, camera);
};

