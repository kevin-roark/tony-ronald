
var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Arm;

function Arm(startPos, scale, side) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.scale = scale || 1;
  this.scale *= 0.33;

  this.side = side || 'left';

  this.modelChoices = [modelNames.BABY_ARM, modelNames.FOOTBALL_ARM, modelNames.LOWPOLY_ARM];
}

Arm.prototype.__proto__ = BodyPart.prototype;

Arm.prototype.additionalInit = function() {
  //this.rotate(0, -Math.PI / 2, 0);

  if (this.modelName == modelNames.BABY_ARM) {
    this.rotate(0, Math.PI / 2, 0);
    this.move(0, 19, -20);
    if (this.side == 'left') {
      this.move(20, 0, 0);
    } else {
      this.move(11.5, 0, 0);
    }
  } else if (this.modelName == modelNames.FOOTBALL_ARM) {
    this.scale *= 15;
    this.scaleBody(this.scale);
    this.move(0, -10, 0);
    if (this.side == 'left') {
      this.move(16, 0, 0);
    } else {
      this.move(-10, 0, 0);
      this.mesh.scale.x *= -1;
    }
  } else if (this.modelName == modelNames.LOWPOLY_ARM) {
    this.move(0, 10, 0);
    if (this.side == 'left') {
      this.move(13, 0, 0);
      this.mesh.scale.x *= -1;
    } else {
      this.move(-13, 0, 0);
    }
  }
};
