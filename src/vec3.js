/**
 * Functions for creating and manipulating 3-vectors.
 * @module vec3
 **/

/**
 * 3-Dimensional vector is just an array of 3 numbers.
 * @typedef Vec3
 * @type {Number[]}
 **/

/**
 * Adds two vectors and returns the result.
 * @param {Vec3} a
 * @param {Vec3} b
 * @return {Vec3} - Sum of a + b.
 **/
module.exports.add = function(a, b) {
  return [
    a[0] + b[0],
    a[1] + b[1],
    a[2] + b[2]
  ];
};

/**
 * Subtracts two vectors and returns the result.
 * @param {Vec3} a
 * @param {Vec3} b
 * @return {Vec3} - Difference of a - b.
 **/
module.exports.sub = function(a, b) {
  return [
    a[0] - b[0],
    a[1] - b[1],
    a[2] - b[2]
  ];
};

/**
 * Returns the magnitude of the vector.
 * @param {Vec3} vec
 * @return {Number} - Magnitude of vec.
 **/
module.exports.mag = function(vec) {
  return Math.sqrt(
    vec[0]*vec[0] + vec[1]*vec[1] + vec[2]*vec[2]
  );
};

/**
 * Multiplies the vector by a scalar.
 * @param {Number} scale
 * @param {Vec3} vec
 * @return {Vec3} - scale * vec
 **/
module.exports.scale = function(scale, vec) {
  return [
    scale * vec[0],
    scale * vec[1],
    scale * vec[2]
  ];
};

