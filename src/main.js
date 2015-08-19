(function() {
  var graphics = require('./graphics/main.js');

  var update = function() {
    graphics.render();

    requestAnimationFrame(update);
  };

  update();
}());
