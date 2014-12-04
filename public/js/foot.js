
var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Foot;

function Foot(startPos, scale, side) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.scale = scale || 1;
  this.scale *= 0.1;

  this.side == side || 'left';

  this.modelChoices = [modelNames.FOOT, modelNames.FOOTBALL_FOOT];
}

Foot.prototype.__proto__ = BodyPart.prototype;

Foot.prototype.additionalInit = function() {
  if (this.modelName == modelNames.FOOT) {
    this.rotate(0, -Math.PI / 2, 0);
    this.scale *= 1.5;
    this.scaleBody(this.scale);
    this.move(0, -5, 0);

    if (this.side == 'right') {
      this.mesh.scale.x *= -1;
    }
  } else if (this.modelName == modelNames.FOOTBALL_FOOT) {
    this.scale *= 60;
    this.scaleBody(this.scale);
    this.move(0, -13, 0);

    if (this.side == 'right') {
      this.mesh.scale.x *= -1;
    }
  }
};
