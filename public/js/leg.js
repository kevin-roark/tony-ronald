
var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Leg;

function Leg(startPos, scale) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.scale = scale || 1;
  this.scale *= 0.25;

  this.modelChoices = [modelNames.FOOTBALL_LEG,/* modelNames.LOWPOLY_LEG*/];
}

Leg.prototype.__proto__ = BodyPart.prototype;

Leg.prototype.additionalInit = function() {
  var self = this;

  if (self.modelName == modelNames.FOOTBALL_LEG) {
    self.scale *= 15;
    self.scaleBody(self.scale);
    self.move(3, -20, 0);
  } else if (self.modelName == modelNames.LOWPOLY_LEG) {

  }
};
