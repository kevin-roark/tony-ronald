
var kt = require('./lib/kutility');

var modelNames = require('./model_names');
var Arm = require('./arm');
var Leg = require('./leg');
var Head = require('./head');
var Body = require('./body');
var Hand = require('./hand');

module.exports = Character;

function Character(startPos, scale) {
  var self = this;

  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.position = startPos;

  this.scale = scale || 5;

  this.leftArm = new Arm({x: this.startX - scale, y: this.startY - scale, z: this.startZ}, scale, 'left');

  this.rightArm = new Arm({x: this.startX + scale, y: this.startY - scale, z: this.startZ}, scale, 'right');

  this.leftLeg = new Leg({x: this.startX - scale * 0.4, y: this.startY - scale * 0.75, z: this.startZ}, scale);

  this.rightLeg = new Leg({x: this.startX + scale * 0.4, y: this.startY - scale * 0.75, z: this.startZ}, scale);

  this.torso = new Body({x: this.startX, y: this.startY, z: this.startZ}, scale);

  this.head = new Head({x: this.startX, y: this.startY + 0.75 * scale, z: this.startZ}, scale);

  this.bodyParts = [this.leftArm, this.rightArm,
                    this.leftLeg, this.rightLeg,
                    this.torso, this.head];
  this.bodyParts.forEach(function(bodyPart) {
    bodyPart.ignoreCollisons = true;
    bodyPart.hostBody = self;
  });

  this.twitching = false; // random motion and rotation

  this.melting = false; // bone shaking
}

Character.prototype.addTo = function(scene, callback) {
  var self = this;

  this.scene = scene;

  var bodyCount = 0;
  this.bodyParts.forEach(function(part) {
    part.addTo(scene, function() {
      part.mesh.humanPart = true;

      bodyCount += 1;
      if (bodyCount == self.bodyParts.length) {
        if (callback) callback();
      }
    });
  });
}

Character.prototype.move = function(x, y, z) {
  this.position.x += x;
  this.position.y += y;
  this.position.z += z;

  this.bodyParts.forEach(function(part) {
    part.move(x, y, z);
  });
}

Character.prototype.walk = function(x, y, z) {
  this.move(x, y, z);

  this.leftLeg.twitch(0.9);
  this.rightLeg.twitch(0.9);
}

Character.prototype.moveTo = function(x, y, z) {
  var dx = x - this.position.x;
  var dy = y - this.position.y;
  var dz = z - this.position.z;

  this.move(dx, dy, dz);
}

Character.prototype.resetMovement = function() {
  this.bodyParts.forEach(function(part) {
    part.resetMovement();
  });
}

Character.prototype.rotate = function(rx, ry, rz) {
  this.bodyParts.forEach(function(part) {
    part.rotate(rx, ry, rz);
  });
}

Character.prototype.scaleBody = function(s) {
  this.bodyParts.forEach(function(part) {
    part.scaleBody(s);
  });
}

Character.prototype.scaleMultiply = function(s) {
  this.bodyParts.forEach(function(part) {
    part.scaleMultiply(s);
  });
}

Character.prototype.reset = function() {
  this.melting = false;

  this.bodyParts.forEach(function(part) {
    part.reset();
  });
}

Character.prototype.swell = function(s) {
  this.bodyParts.forEach(function(part) {
    part.swell(s);
  });
}

Character.prototype.cancelMelt = function(pleaseWait) {
  this.melting = false;

  this.bodyParts.forEach(function(part) {
    part.cancelMelt(pleaseWait);
  });
}

Character.prototype.discombobulate = function(callback1) {
  var self = this;

  var downInterval = setInterval(function() {
    var allDown = true;
    self.bodyParts.forEach(function(part) {
      if (part.mesh.position.y > -33) {
        part.move(0, -0.6, 0);
        allDown = false;
      }
    });

    if (allDown) {
      clearInterval(downInterval);
      callback1();
      spreadWide();
    }
  }, 20);

  function spreadWide() {
    var spreadDeltas = [];
    for (var i = 0; i < self.bodyParts.length; i++) {
      var delta = {x: posNegRandom() * 1.25, y: posNegRandom() * 1.25, z: Math.random() * -1.25};
      spreadDeltas.push(delta);
    }

    var spreadCount = 0;
    spreadThem();
    function spreadThem() {
      for (var i = 0; i < self.bodyParts.length; i++) {
        var part = self.bodyParts[i];
        var delta = spreadDeltas[i];
        part.move(delta.x, delta.y, delta.z);
      }

      if (++spreadCount < 250) setTimeout(spreadThem, kt.randInt(30, 15));
    }

  }
}

Character.prototype.render = function() {
  var self = this;

  if (this.twitching) {
    var x = (Math.random() - 0.5) * 2;
    var y = 0;
    var z = (Math.random() - 0.5) * 2;
    this.move(x, y, z);

    var rx = (Math.random() - 0.5) * 0.0001;
    var ry = (Math.random() - 0.5) * 0.4;
    var rz = (Math.random() - 0.5) * 0.0001;
    this.rotate(rx, ry, rz);
  }

  this.bodyParts.forEach(function(part) {
    part.melting = self.melting;
    part.render();
  });
}

function posNegRandom() {
  return (Math.random() - 0.5) * 2;
}
