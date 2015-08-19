/**
 * Contains methods for creating a finite line buffer which
 * allows for insertion at the front of the buffer and forms
 * a conveyer belt pushing old elements off the end of the
 * buffer.
 * @module vertexBuffer
 **/

var THREE = require('three');

/**
 * The VertexBuffer is little more than an array of vec3's.
 * It allows new vec3's to be pushed onto the front of the buffer
 * and old values get pushed off the back.
 * @typedef VertexBuffer
 * @type {Object}
 * @property {Function} getVertices - Returns the raw array of Three.Vector3's.
 * @property {Function} push - Accepts a single Vec3 and pushes its value
 *                             into the array of vertices.
 **/

/**
 * Creates a new vertexBuffer with the size specified.
 * @param {Number} size - vertexBuffer's size
 * @param {Vec3} initial - initial value for elements
 * @return {VertexBuffer}
 **/
module.exports.createVertexBuffer = function(size, initial) {
  var vertices = new Array(size);
  var i;
  for (i = 0; i < vertices.length; i++) {
    vertices[i] = new THREE.Vector3(initial[0], initial[1], initial[2]);
  }

  return {
    getVertices : function() { return vertices; },
    push     : function(val) {
      var i = vertices.length-1;
      for (i; i > 0; i--) {
        vertices[i] = vertices[i-1];
      }

      vertices[0] = new THREE.Vector3(val[0], val[1], val[2]);
    }
  };
};
