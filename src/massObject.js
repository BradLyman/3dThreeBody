/**
 * Provides methods for creating and interacting with mass-objects.
 * @module massObject
 **/

var vec3 = require('./vec3.js');

/**
 * Object representing a physical body with mass.
 * @typedef MassObject
 * @type {Object}
 * @property {Function} getMass - Retrieve the object's mass.
 * @property {Vec3} position - Position in meters.
 * @property {Vec3} velocity - Velocity in m/s.
 **/

/** Returns the universal gravitational constant */
var G = function() {
  // lets pretend we are theoretical physisicts :P
  return 1;
};

/**
 * Creates a new mass object.
 * @param {Number} mass - The mass of the object.
 * @param {Vec3} position - The initial position of the object.
 * @param {Vec3} velocity - The initial velocity of the object.
 * @return {MassObject} [Mass object]{@link module:massObject~MassObject}
 **/
module.exports.createMassObject = function(mass, position, velocity) {
  return {
    getMass  : function() { return mass; },
    position : position || [0, 0, 0],
    velocity : velocity || [0, 0, 0]
  };
};

/**
 * Returns the force vector which represents the sum of the forces of
 * gravity currently acting on a given mass object.
 * @param {MassObject} body - The body that we wish to get forces for.
 * @param {MassObject[]} externalObjects - The objects exerting gravity on the
 *                                         body.
 * @return {Vec3} - Force due to gravity acting on the body, pointing in the
 *                  direction that the force is pulling the body.
 **/
module.exports.calculateGravityForce = function(body, externalObjects) {
  // totalForce is the sum of all of the gravitational forces acting on body
  return externalObjects.reduce(function(totalForce, externalObject) {
    var r     = vec3.sub(externalObject.position, body.position);
    var dist  = vec3.mag(r);
    var m1    = body.getMass();
    var m2    = externalObject.getMass();
    var force = G() * m1 * m2 / (dist * dist * dist);

    // add the force vector (force * r) to the total force
    return vec3.add(totalForce, vec3.scale(force, r));
  }, [0, 0, 0]);
};

