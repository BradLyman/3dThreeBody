/**
 * Performs the integration step for moving a mass-object according
 * to the forces acting on it.
 * @module integrater
 **/

var vec3 = require('./vec3.js');

/**
 * Uses a simple euler solver to integrate the body's position
 * and velocity. Modifies the body's position and velocity in-place.
 * @param {MassObject} body - The body to integrate.
 * @param {Vec3} force - A vector representing the net force
 * @param {Number} stepSize - A number representing the temporal step size.
 **/
var eulerSolver = function(body, force, stepSize) {
  var dv = vec3.scale(1.0/body.getMass(), force);
  var dp = body.velocity;

  body.velocity = vec3.add(body.velocity, vec3.scale(stepSize, dv));
  body.position = vec3.add(body.position, vec3.scale(stepSize, dp));
};
