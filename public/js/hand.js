
var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Hand;

function Hand(startPos, scale, side) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.side = side || 'left';

  this.scale = scale || 1;
  this.scale *= 0.1;

  this.modelChoices = [modelNames.HAND, modelNames.FOOTBALL_HAND];
}

Hand.prototype.__proto__ = BodyPart.prototype;

Hand.prototype.additionalInit = function() {


  if (this.modelName == modelNames.HAND) {
    this.move(0, 9, 0);

    if (this.side == 'left') {
      this.rotate(-Math.PI / 2, Math.PI / 2, 0);
    } else {
      this.rotate(-Math.PI / 2, Math.PI / 2, 0);
    }
  } else if (this.modelName == modelNames.FOOTBALL_HAND) {
    this.scale *= 45;
    this.scaleBody(this.scale);
    this.move(0, -6, 0);

    if (this.side == 'left') {
      this.move(8, 0, 0);
    } else {
      this.move(-10, 0, 0);
      this.mesh.scale.x *= -1;
    }
  }
};
