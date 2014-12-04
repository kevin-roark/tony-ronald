
var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Head;

function Head(startPos, scale) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.scale = scale || 1;
  this.scale *= 0.3;

  this.modelChoices = [modelNames.HEAD, modelNames.BABY_HEAD/*, modelNames.FOOTBALL_HEAD,modelNames.LOWPOLY_HEAD*/];
}

Head.prototype.__proto__ = BodyPart.prototype;

Head.prototype.additionalInit = function() {
  var self = this;

  if (self.modelName == modelNames.HEAD) {
    self.scale *= 0.35;
    self.scaleBody(self.scale);
    self.move(0, 12, 0);
  } else if (self.modelName == modelNames.BABY_HEAD) {
    self.scale *= 1.2;
    self.scaleBody(self.scale);
    self.move(0, 0, 1.4);
  } else if (self.modelName == modelNames.FOOTBALL_HEAD) {
    self.scale *= 25;
    self.scaleBody(self.scale);
    self.move(1.5, -63, 0);
  } else if (self.modelName == modelNames.LOWPOLY_HEAD) {
    self.scale *= 1.5;
    self.scaleBody(self.scale);
    self.move(0, -15, 0);
  }
};
