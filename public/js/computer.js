
var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Computer;

function Computer(startPos, scale) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.scale = scale || 1;

  this.specificModelName = modelNames.LAPTOP;
}

Computer.prototype.__proto__ = BodyPart.prototype;

Computer.prototype.additionalInit = function() {

};
