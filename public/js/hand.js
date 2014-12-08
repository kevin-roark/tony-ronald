
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

  this.modelChoices = [modelNames.FOOTBALL_HAND, modelNames.BASE_HAND];
}

Hand.prototype.__proto__ = BodyPart.prototype;

Hand.prototype.additionalInit = function() {
  if (this.modelName == modelNames.FOOTBALL_HAND) {
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
  else if (this.modelName == modelNames.BASE_HAND) {
    this.rotate(0, 0, Math.PI);
  }
};

Hand.prototype.pokeUntilCollision = function(backwardsDistance, callback) {
  var self = this;

  var startZ = self.mesh.position.z;
  function moveback(cb) {
    var backInterval = setInterval(function() {
      self.move(0, 0, 2);
      if (self.mesh.position.z >= startZ + backwardsDistance) {
        clearInterval(backInterval);
        cb();
      }
    }, 20);
  }

  moveback(function() {
    var forwardInterval = setInterval(function() {
      self.move(0, 0, -2);
    }, 20);

    self.pokeCollisonHandler = function() {
      clearInterval(forwardInterval);
      self.pokeCollisonHandler = null;

      callback();
    };
  });
};

Hand.prototype.collisonHandle = function() {
  if (this.pokeCollisonHandler) {
    this.pokeCollisonHandler();
  }
};
