(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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

  this.modelChoices = [modelNames.LOWPOLY_ARM];
}

Arm.prototype.__proto__ = BodyPart.prototype;

Arm.prototype.additionalInit = function() {
  if (this.modelName == modelNames.LOWPOLY_ARM) {
    this.move(0, 10, 0);
    if (this.side == 'left') {
      this.move(13, 0, 0);
      this.mesh.scale.x *= -1;
    } else {
      this.move(-13, 0, 0);
    }
  }
};

Arm.prototype.collisonHandle = function() {
  if (this.collisionHandler) this.collisionHandler();
}

},{"./bodypart":4,"./lib/kutility":10,"./model_names":12}],2:[function(require,module,exports){

var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Artifact;

var COMPUTER_TYPE = 'COMPUTER';
var SPORT_TYPE = 'SPORT';
var MONEY_TYPE = 'MONEY';
var ARTIFACT_TYPES = [COMPUTER_TYPE, SPORT_TYPE, MONEY_TYPE];

var artifactTextureNames = {};
artifactTextureNames[COMPUTER_TYPE] = [
  '/images/finder.jpg',
  '/images/pc_monitor.jpg',
  '/images/mac_monitor.jpg'
];
artifactTextureNames[SPORT_TYPE] = [];
artifactTextureNames[MONEY_TYPE] = [
  '/images/coin.jpg',
  '/images/dollar.jpg'
];

function Artifact(startPos, scale, typeIndex) {
  var self = this;

  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  if (typeIndex === undefined) typeIndex = 0;

  this.artifactType = ARTIFACT_TYPES[typeIndex];
  this.textureName = kt.choice(artifactTextureNames[this.artifactType]);

  this.scale = scale || 20;

  this.ignoreCollisons = false;
}

Artifact.prototype.__proto__ = BodyPart.prototype;

Artifact.prototype.createMesh = function(callback) {
  if (Math.random() < 0.3) {
    this.geometry = new THREE.SphereGeometry(1);
  }
  else {
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
  }

  this.material = new THREE.MeshBasicMaterial();
  this.material.map = THREE.ImageUtils.loadTexture(this.textureName);
  this.material = Physijs.createMaterial(this.material, .4, .6);

  this.mesh = new Physijs.BoxMesh(this.geometry, this.material, 1);
  this.mesh.artifact = true;

  callback();
}

Artifact.prototype.collisonHandle = function(other_object, relative_velocity, relative_rotation, contact_normal) {
  var self = this;
  //console.log('artifact collision with: artifact ' + other_object.artifact + ' ground ' + other_object.ground);
}

},{"./bodypart":4,"./lib/kutility":10,"./model_names":12}],3:[function(require,module,exports){

var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Body;

function Body(startPos, scale) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.scale = scale || 1;
  this.scale *= 0.5;

  this.modelChoices = [modelNames.LOWPOLY_TORSO];
}

Body.prototype.__proto__ = BodyPart.prototype;

Body.prototype.additionalInit = function() {
  var self = this;

  if (self.modelName == modelNames.LOWPOLY_TORSO) {
    self.move(0, -15, -4);
  }
};

},{"./bodypart":4,"./lib/kutility":10,"./model_names":12}],4:[function(require,module,exports){
var kt = require('./lib/kutility');

var modelNames = require('./model_names');

module.exports = BodyPart;

function BodyPart(startPos, scale) {
  this.modelChoices = [];

  this.melting = false;
  this.twitching = false;
}

BodyPart.prototype.move = function(x, y, z) {
  if (!this.mesh) return;

  this.mesh.position.x += x;
  this.mesh.position.y += y;
  this.mesh.position.z += z;

  this.mesh.__dirtyPosition = true;
}

BodyPart.prototype.rotate = function(rx, ry, rz) {
  if (!this.mesh) return;

  this.mesh.rotation.x += rx;
  this.mesh.rotation.y += ry;
  this.mesh.rotation.z += rz;

  this.mesh.__dirtyRotation = true;
}

BodyPart.prototype.moveTo = function(x, y, z) {
  if (!this.mesh) return;

  this.mesh.position.set(x, y, z);

  this.move(0, 0, 0);
}

BodyPart.prototype.scaleBody = function(s) {
  if (!this.mesh) return;

  this.mesh.scale.set(s, s, s);
}

BodyPart.prototype.scaleMultiply = function(s) {
  if (!this.mesh) return;

  this.mesh.scale.set(this.initialScale.x * s, this.initialScale.y * s, this.initialScale.z * s);
}

BodyPart.prototype.swell = function(s) {
  var self = this;

  this.scaleMultiply(s);

  if (!this.materials) return;

  this.materials.forEach(function(material, index) {
    var initialColor = self.initialMaterialColors[index];

    var red = initialColor.r;
    if (s > 1.05) {
      red = Math.max(Math.min(1.0, initialColor.r * s), initialColor.r);
    }

    var swellColor = {r: red, g: initialColor.g, b: initialColor.b};
    material.color = swellColor;
  });
}

BodyPart.prototype.reset = function() {
  this.moveTo(this.initialPosition.x, this.initialPosition.y, this.initialPosition.z);

  this.mesh.rotation.x = this.initialRotation.x;
  this.mesh.rotation.y = this.initialRotation.y;
  this.mesh.rotation.z = this.initialRotation.z;
  this.mesh.__dirtyRotation = true;

  if (this.mesh.setAngularVelocity) {
    this.mesh.setAngularVelocity({x: 0, y: 0, z: 0});
    this.mesh.setLinearVelocity({x: 0, y: 0, z: 0});
  }

  this.cancelMelt();

  this.swell(1.0);
}

BodyPart.prototype.cancelMelt = function(pleaseWait) {
  var self = this;

  this.melting = false;
  this.resetMeltParameters();

  var timeout = 0;
  if (pleaseWait) timeout = 1500;

  setTimeout(function() {
    for (var i = 0; i < self.originalVertices.length; i++) {
      var vert = self.originalVertices[i];
      self.geometry.vertices[i] = {x: vert.x, y: vert.y, z: vert.z};
    }

    self.geometry.verticesNeedUpdate = true;
  }, timeout);
}

BodyPart.prototype.resetMeltParameters = function() {
  this.lastVertexModified = -1;
  this.maxMelt = kt.randInt(150, 20);
  this.meltCount = 0;
  this.step = kt.randInt(1000, 100);
  this.startI = kt.randInt(this.step - 1, 0);
}

BodyPart.prototype.meltValue = function() {
  return (Math.random() - 0.5) * this.meltIntensity;
}

BodyPart.prototype.createMesh = function(callback) {
  var self = this;

  if (self.mass === undefined) self.mass = 20;

  self.modelName = self.specificModelName || kt.choice(self.modelChoices);

  modelNames.loadModel(self.modelName, function (geometry, materials) {
    self.geometry = geometry;
    self.materials = materials;

    self.faceMaterial = new THREE.MeshFaceMaterial(materials);
    self.material = Physijs.createMaterial(self.faceMaterial, .4, .6);

    self.mesh = new Physijs.ConvexMesh(geometry, self.material, self.mass);

    callback();
  });
}

BodyPart.prototype.resetMovement = function() {
  var self = this;
  if (!self.mesh || !self.mesh.setLinearVelocity) return;

  self.mesh.setLinearVelocity({x: 0, y: 0, z: 0});
  self.mesh.setLinearFactor({x: 0, y: 0, z: 0});
  self.mesh.setAngularVelocity({x: 0, y: 0, z: 0});
  self.mesh.setAngularFactor({x: 0, y: 0, z: 0});
}

BodyPart.prototype.addTo = function(scene, callback) {
  var self = this;

  self.createMesh(function() {
    self.mesh.addEventListener('collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
      if (self.ignoreCollisons) {
        self.resetMovement();
      }

      self.collisonHandle(other_object, relative_velocity, relative_rotation, contact_normal);
    });

    self.scaleBody(self.scale);

    self.moveTo(self.startX, self.startY, self.startZ);

    self.additionalInit();

    self.initialPosition = {x: self.mesh.position.x, y: self.mesh.position.y, z: self.mesh.position.z};
    self.initialScale = {x: self.mesh.scale.x, y: self.mesh.scale.y, z: self.mesh.scale.z};
    self.initialRotation = {x: self.mesh.rotation.x, y: self.mesh.rotation.y, z: self.mesh.rotation.z};

    if (self.materials) {
      self.initialMaterialColors = [];
      self.materials.forEach(function(mat) {
        self.initialMaterialColors.push(mat.color);
      });
    }

    self.verts = self.geometry.vertices;

    self.originalVertices = [];
    for (var i = 0; i < self.verts.length; i++) {
      var vert = self.verts[i];
      self.originalVertices.push({x: vert.x, y: vert.y, z: vert.z});
    }

    self.resetMeltParameters();
    if (!self.meltIntensity) self.meltIntensity = 0.1;

    scene.add(self.mesh);

    if (callback) {
      callback(self);
    }
  });
}

BodyPart.prototype.render = function() {
  if (this.melting && this.geometry) {
    for (var i = this.startI; i < this.verts.length; i += this.step) {
      var vert = this.verts[i];

      vert.x += this.meltValue();
      vert.y += this.meltValue();
      vert.z += this.meltValue();

      if (i + this.step >= this.verts.length) {
        this.lastVertexModified = i;
      }
    }

    this.geometry.verticesNeedUpdate = true;

    if (++this.meltCount >= this.maxMelt) {
      this.resetMeltParameters();
    }
  }

  if (this.twitching) {
    this.twitch(1);
  }
  if (this.fluctuating) {
    this.fluctuate(1);
  }

  this.additionalRender();
}

BodyPart.prototype.twitch = function(scalar) {
  var x = (Math.random() - 0.5) * scalar;
  var y = (Math.random() - 0.5) * scalar;
  var z = (Math.random() - 0.5) * scalar;
  this.move(x, y, z);
}

BodyPart.prototype.fluctuate = function(scalar) {
  var x = (Math.random() - 0.5) * scalar;
  var y = (Math.random() - 0.5) * scalar;
  var z = (Math.random() - 0.5) * scalar;
  this.rotate(x, y, z);
}

BodyPart.prototype.fallToFloor = function(threshold, speed) {
  if (!threshold) threshold = 1.5;
  if (!speed) speed = 0.5;

  var self = this;

  var fallInterval = setInterval(function() {
    var dy = Math.random() * -speed;

    self.move(0, dy, 0);

    if (self.mesh && self.mesh.position.y < threshold) {
      clearInterval(fallInterval);
    }
  }, 24);
}

BodyPart.prototype.additionalInit = function() {};
BodyPart.prototype.additionalRender = function() {};
BodyPart.prototype.collisonHandle = function() {}

},{"./lib/kutility":10,"./model_names":12}],5:[function(require,module,exports){

var kt = require('./lib/kutility');

var modelNames = require('./model_names');
var Arm = require('./arm');
var Leg = require('./leg');
var Head = require('./head');
var Body = require('./body');
var Hand = require('./hand');

module.exports = Character;

function Character(startPos, scale) {
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

},{"./arm":1,"./body":3,"./hand":7,"./head":8,"./leg":9,"./lib/kutility":10,"./model_names":12}],6:[function(require,module,exports){

var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Computer;

var MAC = '/images/mac_monitor.jpg';
var PC = '/images/pc_monitor.jpg';
var LINUX = '/images/linux_monitor.jpg';

module.exports.computerNames = [MAC, PC, LINUX];
var computerNames = module.exports.computerNames;
var computerIndex = 0;

var allComputers = [];

function Computer(startPos, scale, mass) {
  var self = this;

  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.textureName = computerNames[computerIndex % computerNames.length];
  computerIndex += 1;

  this.scale = scale || 20;
  this.mass = mass || 1;

  this.ignoreCollisons = true;

  this.meltIntensity = 0.5;

  allComputers.push(this);
}

Computer.prototype.__proto__ = BodyPart.prototype;

Computer.prototype.createMesh = function(callback) {
  this.geometry = new THREE.BoxGeometry(1, 0.75, 0.1);

  this.material = new THREE.MeshBasicMaterial({transparent: true, opacity: 1.0});
  this.material.map = THREE.ImageUtils.loadTexture(this.textureName);
  this.material = Physijs.createMaterial(this.material, .4, .6);

  this.mesh = new Physijs.BoxMesh(this.geometry, this.material, this.mass);

  this.knockable = true;
  this.shatterable = false;

  callback();
}

Computer.prototype.becomeTransparent = function(delta, thresh) {
  var self = this;

  if (!delta) delta = 0.01;
  if (!thresh) thresh = 0.5;

  var int = setInterval(function() {
    self.material.opacity -= delta;
    if (self.material.opacity <= thresh) {
      clearInterval(int);
      self.shatterable = true;
      console.log('SHATTERABLE');
    }
  }, 30);
}

function negrand(scalar, min) {
  var r = (Math.random() - 0.5) * scalar;
  if (r < 0) return r - min;
  else return r + min;
}

Computer.prototype.collisonHandle = function(other_object, relative_velocity, relative_rotation, contact_normal) {
  var self = this;

  if (this.shattering) return;

  if (this.shatterable) {
    allComputers.forEach(function(computer) {
      computer.shatter();
    });
  }
  else if (this.knockable) {
    console.log('KNOCK KNOCK');
    this.twitching = true;
    setTimeout(function() {
      self.twitching = false;
    }, 200);
  }
}

Computer.prototype.shatter = function() {
  this.shattering = true;
  this.ignoreCollisons = false;
  this.mesh.setLinearVelocity({x: negrand(36, 15), y: Math.random() * 36, z: negrand(36, 15)});
  this.mesh.setAngularVelocity({x: negrand(36, 15), y: Math.random() * 36, z: negrand(36, 15)});
  console.log('SHATTERED');
}

},{"./bodypart":4,"./lib/kutility":10,"./model_names":12}],7:[function(require,module,exports){

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

},{"./bodypart":4,"./lib/kutility":10,"./model_names":12}],8:[function(require,module,exports){

var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Head;

var headNames = ['/images/dylan.jpg', '/images/kevin.jpg'];
var headIndex = 0;

function Head(startPos, scale) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.textureName = headNames[++headIndex % headNames.length];

  this.scale = scale || 20;
  this.scale *= 0.4;
}

Head.prototype.__proto__ = BodyPart.prototype;

Head.prototype.createMesh = function(callback) {
  this.geometry = new THREE.SphereGeometry(1, 32, 32);

  this.material = new THREE.MeshBasicMaterial();
  this.material.map = THREE.ImageUtils.loadTexture(this.textureName);

  this.mesh = new THREE.Mesh(this.geometry, this.material);

  callback();
}

Head.prototype.additionalInit = function() {
  var self = this;

  if (self.modelName == modelNames.LOWPOLY_HEAD) {
    self.scale *= 1.5;
    self.scaleBody(self.scale);
    self.move(0, -15, 0);
  }
};

Head.prototype.render = function() {
  this.mesh.rotation.y += 0.02;
}

},{"./bodypart":4,"./lib/kutility":10,"./model_names":12}],9:[function(require,module,exports){

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

  this.modelChoices = [modelNames.LOWPOLY_LEG];
}

Leg.prototype.__proto__ = BodyPart.prototype;

Leg.prototype.additionalInit = function() {
  var self = this;

  if (self.modelName == modelNames.LOWPOLY_LEG) {

  }
};

},{"./bodypart":4,"./lib/kutility":10,"./model_names":12}],10:[function(require,module,exports){
/* export something */
module.exports = new Kutility;

/* constructor does nothing at this point */
function Kutility() {

}

/**
 * get a random object from the array arr
 *
 * @api public
 */

Kutility.prototype.choice = function(arr) {
    var i = Math.floor(Math.random() * arr.length);
    return arr[i];
}

/**
 * return shuffled version of an array.
 *
 * adapted from css tricks
 *
 * @api public
 */
Kutility.prototype.shuffle = function(arr) {
  var newArray = new Array(arr.length);
  for (var i = 0; i < arr.length; i++)
    newArray[i] = arr[i];

  newArray.sort(function() { return 0.5 - Math.random() });
  return newArray;
}

/**
 * returns a random color as an 'rgb(x, y, z)' string
 *
 * @api public
 */
Kutility.prototype.randColor = function() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

Kutility.prototype.randInt = function(max, min) {
  if (min)
    return Math.floor(Math.random() * (max - min)) + min;
  else
    return Math.floor(Math.random() * (max));
}

/**
 * Color wheel 1 -> 1536.
 *
 * Written by Henry Van Dusen, all attribution to the big boy.
 * Slightly modified by Kev.
 *
 * @api public
 */
 Kutility.prototype.colorWheel = function(num) {
    var text = "rgb(";
    var entry = num % 1536;
    var num = entry % 256;

    if(entry < 256 * 1)
    	return text + "0,255," + num + ")";
    else if(entry < 256 * 2)
    	return text + "0," + (255 - num) + ",255)";
    else if(entry < 256 * 3)
      return text + num + ",0,255)";
    else if(entry < 256 * 4)
      return text + "255,0," + (255 - num) + ")";
    else if(entry < 256 * 5)
      return text + "255," + num + ",0)";
    else
      return text + (255 - num) + ",255,0)";
 }

 /**
  * Make an rbg() color string an rgba() color string
  *
  * @api public
  */
Kutility.prototype.alphize = function(color, alpha) {
  color.replace('rgb', 'rgba');
  color.replace(')', ', ' + alpha + ')');
  return color;
}

/**
 * Get an array of two random contrasting colors.
 *
 * @api public
 */
Kutility.prototype.contrasters = function() {
  var num = Math.floor(Math.random() * 1536);
  var fg = this.colorWheel(num);
  var bg = this.colorWheel(num + 650);
  return [fg, bg];
}

/**
 * Add a random shadow to a jquery element
 *
 * @api public
 */
Kutility.prototype.randomShadow = function(el, size) {
  var s = size + 'px';
  var shadow = '0px 0px ' + s + ' ' + s + ' ' + this.randColor();
  addShadow(el, shadow);
}

/**
 * Add shadow with offset x and y pixels, z pixels of blur radius,
 * w pizels of spread radius, and cool color
 *
 * @api public
 */
Kutility.prototype.shadow = function(el, x, y, z, w, color) {
  var xp = x + "px";
  var yp = y + "px";
  var zp = z + "px";
  var wp = w + "px";

  var shadow = xp + " " + yp + " " + zp + " " + wp + " " + color;
  addShadow(el, shadow);
}

function addShadow(el, shadow) {
  el.css('-webkit-box-shadow', shadow);
  el.css('-moz-box-shadow', shadow);
  el.css('box-shadow', shadow);
}

/**
 * Add transform to element with all the lame browser prefixes.
 *
 * @api public
 */
Kutility.prototype.addTransform = function(el, transform) {
  var curTransform = this.getTransform(el);
  curTransform = curTransform.replace('none', '');
  var newTransform = curTransform + transform;
  this.setTransform(el, newTransform);
}

/**
 * Set transform of element with all the lame browser prefixes.
 *
 * @api public
 */
Kutility.prototype.setTransform = function(el, transform) {
  el.css('-webkit-transform', transform);
  el.css('-moz-transform', transform);
  el.css('-ms-transform', transform);
  el.css('-o-transform', transform);
  el.css('transform', transform);
}

/**
 * Check an elements tansform.
 *
 * @api public
 */
Kutility.prototype.getTransform = function(el) {
  var possible = ['transform', '-webkit-transform', '-moz-transform', '-ms-transform', '-o-transform'];

  for (var i = 0; i < possible.length; i++) {
    var f = el.css(possible[i]);
    if (f == 'none' && i + 1 < possible.length) {
      var pf = el.css(possible[i + 1]);
      if (pf)
        continue;
    }
    return f;
  }
}

/**
 * Remove all transforms from element.
 *
 * @api public
 */
Kutility.prototype.clearTransforms = function(el) {
  el.css('-webkit-transform', '');
  el.css('-moz-transform', '');
  el.css('-ms-transform', '');
  el.css('-o-transform', '');
  el.css('transform', '');
}

/**
 * Rotate an element by x degrees.
 *
 * @api public
 */
Kutility.prototype.rotate = function(el, x) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var t = ' rotate(' + x + 'deg)';
  this.setTransform(el, ct  + t);
}

/**
 * Scale an element by x (no units);
 *
 * @api public
 */
Kutility.prototype.scale = function(el, x) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var t = ' scale(' + x + ',' + x + ')';
  this.setTransform(el, ct + t);
}

/**
 * Translate an element by x, y (include your own units);
 *
 * @api public
 */
Kutility.prototype.translate = function(el, x, y) {
  var ct = this.getTransform(el);
  console.log(ct);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var t = ' translate(' + x + ', '  + y + ')';
  this.setTransform(el, ct + t);
}

/**
 * Skew an element by x, y degrees;
 *
 * @api public
 */
Kutility.prototype.skew = function(el, x, y) {
  var ct = this.getTransform(el);
  ct = ct.replace(/skew\(.*?\)/, '').replace(/matrix\(.*?\)/, '').replace('none', '');

  var xd = x + 'deg';
  var yd = y + 'deg';
  var t = ' skew(' + xd + ', ' + yd + ')';
  this.setTransform(el, ct + t);
}

/**
 * Warp an element by rotating and skewing it.
 *
 * @api public
 */
Kutility.prototype.warp = function(el, d, x, y) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var r = ' rotate(' + d + 'deg)';
  var xd = x + 'deg';
  var yd = y + 'deg';
  var s = ' skew(' + xd + ', ' + yd + ')';

  this.setTransform(el, ct + r + s);
}

/**
 * scale by w, translate x y
 *
 * @api public
 */
Kutility.prototype.slaw = function(el, w, x, y) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var s = ' scale(' + w + ',' + w + ')';
  var t = ' translate(' + x + ', '  + y + ')';
  this.setTransform(el, ct + s + t);
}

/**
 * scale by w, rotate by x
 *
 * @api public
 */
Kutility.prototype.straw = function(el, w, x) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var s = ' scale(' + w + ',' + w + ')';
  var r = ' rotate(' + x + 'deg)';
  this.setTransform(el, ct + s + r);
}

/**
 * Set perspective to x pixels
 *
 * @api public
 */
Kutility.prototype.perp = function(el, x) {
  var p = x + 'px';
  el.css('-webkit-perspective', p);
  el.css('-moz-perspective', p);
  el.css('-ms-perspective', p);
  el.css('-o-perspective', p);
  el.css('perspective', p);
}

/**
 * Set perspective-origin to x and y percents.
 *
 * @api public
 */
Kutility.prototype.perpo = function(el, x, y) {
  var p = x + "% " + y + "%";
  el.css('-webkit-perspective-origin', p);
  el.css('-moz-perspective-origin', p);
  el.css('-ms-perspective-origin', p);
  el.css('-o-perspective-origin', p);
  el.css('perspective-origin', p);
}

/**
 * Translate an element by x, y, z pixels
 *
 * @api public
 */
Kutility.prototype.trans3d = function(el, x, y, z) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix3d\(.*?\)/, '').replace('none', '');

  var t = ' translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)';
  this.setTransform(el, ct + t);
}

/**
 * Scale an element by x (no units)
 *
 * @api public
 */
Kutility.prototype.scale3d = function(el, x) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix3d\(.*?\)/, '').replace('none', '');

  var t = ' scale3d(' + x + ', ' + x + ', ' + z + ')';
  this.setTransform(el, ct + t);
}

/**
 * Rotate an element about <x, y, z> by d degrees
 *
 * @api public
 */
Kutility.prototype.rotate3d = function(el, x, y, z, d) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix3d\(.*?\)/, '').replace('none', '');

  var t = ' rotate3d(' + x + ', ' + y + ', ' + z + ', ' + d + 'deg)';
  this.setTransform(el, ct + t);
}

/**
 * Rotate an element about x axis by d degrees
 *
 * @api public
 */
Kutility.prototype.rotate3dx = function(el, d) {
  this.rotate3d(el, 1, 0, 0, d);
}

/**
 * Rotate an element about y axis by d degrees
 *
 * @api public
 */
Kutility.prototype.rotate3dy = function(el, d) {
  this.rotate3d(el, 0, 1, 0, d);
}

/**
 * Rotate an element about z axis by d degrees
 *
 * @api public
 */
Kutility.prototype.rotate3dz = function(el, d) {
  this.rotate3d(el, 0, 0, 1, d);
}

/**
 * Add filter to element with all the lame browser prefixes.
 *
 * @api public
 */
Kutility.prototype.addFilter = function(el, filter) {
  var curFilter = this.getFilter(el);
  curFilter = curFilter.replace('none', '');
  var newFilter = curFilter + ' ' + filter;
  this.setFilter(el, newFilter);
}

/**
 * Set filter to element with all lame prefixes.
 *
 * @api public
 */
Kutility.prototype.setFilter = function(el, filter) {
  el.css('-webkit-filter', filter);
  el.css('-moz-filter', filter);
  el.css('-ms-filter', filter);
  el.css('-o-filter', filter);
  el.css('filter', filter);
}

/**
 * Check an elements filter.
 *
 * @api public
 */
Kutility.prototype.getFilter = function(el) {
  var possible = ['filter', '-webkit-filter', '-moz-filter', '-ms-filter', '-o-filter'];

  for (var i = 0; i < possible.length; i++) {
    var f = el.css(possible[i]);
    if (f == 'none' && i + 1 < possible.length) {
      var pf = el.css(possible[i + 1]);
      if (pf)
        continue;
    }
    return f;
  }
}

/**
 * Remove all filters from element.
 *
 * @api public
 */
Kutility.prototype.clearFilters = function(el) {
  el.css('-webkit-filter', '');
  el.css('-moz-filter', '');
  el.css('-ms-filter', '');
  el.css('-o-filter', '');
  el.css('filter', '');
}

/**

/**
 * Grayscale an element by x percent.
 *
 * @api public
 */
Kutility.prototype.grayscale = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/grayscale\(.*?\)/, '').replace('none', '');

  var f = ' grayscale(' + x + '%)';
  this.setFilter(el, cf  + f);
}

/**
 * Sepia an element by x percent.
 *
 * @api public
 */
Kutility.prototype.sepia = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/sepia\(.*?\)/, '').replace('none', '');

  var f = ' sepia(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Saturate an element by x percent.
 *
 * @api public
 */
Kutility.prototype.saturate = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/saturate\(.*?\)/, '').replace('none', '');

  var f = ' saturate(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Invert an element by x percent.
 *
 * @api public
 */
Kutility.prototype.invert = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/invert\(.*?\)/, '').replace('none', '');

  var f = ' invert(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Hue-rotate an element by x degrees.
 *
 * @api public
 */
Kutility.prototype.hutate = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/hue-rotate\(.*?\)/, '').replace('none', '');

  var f = ' hue-rotate(' + x + 'deg)';
  this.setFilter(el, cf + f);
}

/**
 * Set opacity of an element to x percent.
 *
 * @api public
 */
Kutility.prototype.opace = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/opacity\(.*?\)/, '').replace('none', '');

  var f = ' opacity(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Set brightness of an element to x percent.
 *
 * @api public
 */
Kutility.prototype.brightness = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/brightness\(.*?\)/, '').replace('none', '');

  var f = ' brightness(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Set contrast of an element to x percent.
 *
 * @api public
 */
Kutility.prototype.contrast = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/contrast\(.*?\)/, '').replace('none', '');

  var f = ' contrast(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Blur an element by x pixels.
 *
 * @api public
 */
Kutility.prototype.blur = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/blur\(.*?\)/, '').replace('none', '');

  var f = ' blur(' + x + 'px)';
  this.setFilter(el, cf + f);
}

},{}],11:[function(require,module,exports){
$(function() {

  var kt = require('./lib/kutility');
  var Character = require('./character');
  //var io = require('./io');
  var RonaldWord = require('./ronald_word');
  var Computer = require('./computer');
  var Artifact = require('./artifact');
  var mn = require('./model_names');
  var Hand = require('./hand');

  /*
   * * * * * RENDERIN AND LIGHTIN * * * * *
   */

  var renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

  var scene = new Physijs.Scene;
  scene.setGravity(new THREE.Vector3(0, 0, 0));
  scene.addEventListener('update', function() {
    // here wanna apply new forces to objects and things based on state
    if (active.desperate) {
      desperateState.physicsUpdate();
    }
    if (active.heaven) {
      heavenState.physicsUpdate();
    }

    scene.simulate(undefined, 1);
  });

  var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
  camera.target = {x: 0, y: 0, z: 0};
  scene.add(camera);

  // mainLight shinin from above casting shadows and the like
  var mainLight = new THREE.DirectionalLight(0xffffff);
  mainLight.position.set(20, 20, -10);
  mainLight.target.position.copy(scene.position);
  mainLight.castShadow = true;
  scene.add(mainLight);

  /*
   * * * * * STATE OBJECTS * * * * *
   */

  var active = {ronalds: false, lighting: false, camera: false, phrases: false};
  var history = {};

  var phraseState = {};
  var trappedState = {};
  var desperateState = {};
  var heavenState = {};
  var finalState = {};

  var cameraFollowState = {
    target: null,
    offset: {x: 0, y: 0, z: 0},
  };
  var lightFollowState = {
    target: null,
    offset: {x: 0, y: 0, z: 0}
  };

  var kevinRonald;
  var dylanRonald;
  var ronalds = [];

  /*
   * * * * * STARTIN AND RENDERIN * * * * *
   */

  start();
  function start() {
    //io.begin(kevinRonald, dylanRonald, camera, hueLight);

    enterPhrasesState();

    render();
    scene.simulate();

    $('body').keypress(function(ev) {
      console.log('key press eh? ' + ev.which);
      ev.preventDefault();

      if (ev.which == 32) { // spacebar
        resetRonaldPositions();
      }
      else if (ev.which == 97)  { // left
        moveCameraPosition(-1, 0, 0);
      }
      else if (ev.which == 119)  { // up
        moveCameraPosition(0, 0, 1);
      }
      else if (ev.which == 100)  { // right
        moveCameraPosition(1, 0, 0);
      }
      else if (ev.which == 115)  { // down
        moveCameraPosition(0, 0, -1);
      }
      else if (ev.which == 113) { // q
        moveCameraPosition(0, 1, 0);
      }
      else if (ev.which == 101) { // e
        moveCameraPosition(0, -1, 0);
      }
    });
  }

  function render() {
    requestAnimationFrame(render);

    if (active.ronalds) {
      ronalds.forEach(function(ronald) {
        ronald.render();
      });
    }

    if (active.phrases) {
      phraseState.phrases.forEach(function(phrase) {
        phrase.render();
      });
    }

    if (active.trapped) {
      trappedState.renderObjects.forEach(function(obj) {
        obj.render();
      });
    }

    if (active.desperate) {
      desperateState.render();
    }

    if (active.heaven) {
      heavenState.render();
    }

    if (cameraFollowState.target) {
      camera.position.copy(cameraFollowState.target).add(cameraFollowState.offset);
      camera.lookAt(cameraFollowState.target);
    }
    if (lightFollowState.obj) {
      light.target.position.copy(lightFollowState.target);
      light.position.addVectors(light.target.position, lightFollowState.offset);
    }

    renderer.render(scene, camera);
  }

  /*
   * * * * * UTILITY * * * * *
   */

  function clearScene(meshes) {
    if (!meshes) meshes = scene.children;

    for (var i = meshes.length - 1; i >= 0; i--) {
      var obj = meshes[ i ];
      if (obj !== camera && obj !== mainLight) {
        scene.remove(obj);
      }
    }
  }

  function resetRonaldPositions() {
    ronalds.forEach(function(ronald) {
      ronald.reset();
    });
  }

  function shakeCamera() {
    var dx = (Math.random() - 0.5) * 1;
    var dy = (Math.random() - 0.5) * 0.5;
    var dz = (Math.random() - 0.5) * 1;

    moveCameraPosition(dx, dy, dz);
  }

  function moveCameraPosition(dx, dy, dz) {
    camera.position.x += dx;
    camera.position.y += dy;
    camera.position.z += dz;
  }

  function setCameraPosition(x, y, z) {
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
  }

  function tweenCameraToTarget(position) {
    var tween1 = new TWEEN.Tween(camera.position).to(position)
    .easing(TWEEN.Easing.Linear.None).onUpdate(function() {
      camera.lookAt(camera.target);
    }).onComplete(function() {
      camera.lookAt(position);
    }).start();

    var tween2 = new TWEEN.Tween(camera.target).to(position)
    .easing(TWEEN.Easing.Linear.None).onUpdate(function() {
    }).onComplete(function() {
      camera.lookAt(position);
    }).start();
  }

  function fadeOverlay(fadein, callback, color, time) {
    if (!color) color = 'rgb(255, 255, 255)';
    if (!time) time = 4000;
    if (!callback) callback = function(){};

    if (fadein) {
      $('.overlay').css('background-color', color);
      $('.overlay').fadeIn(time, function() {
        callback();
      });
    } else {
      $('.overlay').fadeOut(time, function() {
        callback();
      });
    }
  }

  function calculateGeometryThings(geometry) {
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
  }

  function middlePosition(p1, p2) {
    return {x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2, z: (p1.z + p2.z) / 2}
  }

  function negrand(scalar) {
    return (Math.random() - 0.5) * scalar;
  }

  /*
   * * * * * STATE CHANGES * * * * *
   */

  function enterPhrasesState() {
    active.phrases = true;

    phraseState.phrases = [];

    phraseState.ground_material = Physijs.createMaterial(
      new THREE.MeshBasicMaterial({color: 0x111111, side: THREE.DoubleSide, transparent: true, opacity: 0.2}),
      .8, // high friction
      .4 // low restitution
    );

    phraseState.ground_geometry = new THREE.PlaneGeometry(100, 100);
    calculateGeometryThings(phraseState.ground_geometry);

    phraseState.leftWallGeometry = new THREE.BoxGeometry(1, 80, 100);
    phraseState.rightWallGeometry = new THREE.BoxGeometry(1, 80, 100);
    phraseState.backWallGeometry = new THREE.BoxGeometry(100, 80, 1);
    phraseState.frontWallGeometry = new THREE.BoxGeometry(100, 80, 1);
    phraseState.wallGeometries = [phraseState.leftWallGeometry, phraseState.rightWallGeometry, phraseState.backWallGeometry, phraseState.frontWallGeometry];
    phraseState.wallGeometries.forEach(function(geometry) {
      calculateGeometryThings(geometry);
    });

    phraseState.leftWall = new Physijs.BoxMesh(phraseState.leftWallGeometry, phraseState.ground_material.clone(), 0);
    phraseState.leftWall.position.z = -50;
    phraseState.leftWall.position.y = 40;
    phraseState.leftWall.position.x = -50;
    phraseState.leftWall.__dirtyPosition = true;
    scene.add(phraseState.leftWall);

    phraseState.rightWall = new Physijs.BoxMesh(phraseState.rightWallGeometry, phraseState.ground_material.clone(), 0);
    phraseState.rightWall.position.z = -50;
    phraseState.rightWall.position.y = 40;
    phraseState.rightWall.position.x = 50;
    phraseState.rightWall.__dirtyPosition = true;
    scene.add(phraseState.rightWall);

    phraseState.backWall = new Physijs.BoxMesh(phraseState.backWallGeometry, phraseState.ground_material.clone(), 0);
    phraseState.backWall.position.z = -100;
    phraseState.backWall.position.y = 40;
    phraseState.backWall.__dirtyPosition = true;
    scene.add(phraseState.backWall);

    phraseState.frontWall = new Physijs.BoxMesh(phraseState.frontWallGeometry, phraseState.ground_material.clone(), 0);
    phraseState.frontWall.position.y = 40;
    phraseState.frontWall.__dirtyPosition = true;
    scene.add(phraseState.frontWall);

    phraseState.ground = new Physijs.BoxMesh(phraseState.ground_geometry, phraseState.ground_material, 0);
    phraseState.ground.rotation.x = -Math.PI / 2;
    phraseState.ground.position.z = -50;
    phraseState.ground.position.y = 0;
    phraseState.ground.__dirtyPosition = true;
    scene.add(phraseState.ground);

    phraseState.ceiling = new Physijs.BoxMesh(phraseState.ground_geometry.clone(), phraseState.ground_material.clone(), 0);
    phraseState.ceiling.rotation.x = -Math.PI / 2;
    phraseState.ceiling.position.z = -50;
    phraseState.ceiling.position.y = 80;
    phraseState.ceiling.__dirtyPosition = true;
    scene.add(phraseState.ceiling);

    setCameraPosition(0, 40, 10);

    var phraseInterval = setInterval(function() {
      var rw = new RonaldWord();
      rw.addTo(scene);
      phraseState.phrases.push(rw);
    }, 500);

    setTimeout(function() {
      fadeOverlay(true, function() {
        clearInterval(phraseInterval);

        var phraseMeshes = [
          phraseState.leftWall,
          phraseState.rightWall,
          phraseState.backWall,
          phraseState.frontWall,
          phraseState.ceiling,
          phraseState.ground
        ];
        phraseState.phrases.forEach(function(phrase) {
          phraseMeshes.push(phrase.mesh);
        });
        clearScene(phraseMeshes);
        active.phrases = false;
        enterTrappedState();
        fadeOverlay(false);
      });
    }, 1000);
  }

  function enterTrappedState() {
    active.ronalds = true;
    active.trapped = true;

    setCameraPosition(0, 0, 0);

    mainLight.position.set(0, 20, 0);
    mainLight.target.position.set(0, 5, -100);
    mainLight.intensity = 5.0;

    trappedState.ambientLight = new THREE.PointLight(0x40404, 1, 200);
    trappedState.ambientLight.position.set(0, 20, -100);
    scene.add(trappedState.ambientLight);

    kevinRonald = new Character({x: -100, y: 5, z: -170}, 20);
    kevinRonald.addTo(scene, function() {
      kevinRonald.rotate(0, Math.PI/4, 0);
    });

    dylanRonald = new Character({x: 100, y: 5, z: -170}, 20);
    dylanRonald.addTo(scene, function() {
      dylanRonald.rotate(0, -Math.PI/4, 0);
    });

    ronalds = [kevinRonald, dylanRonald];

    var mac = new Computer({x: -50, y: 0, z: -80}, 60);
    mac.addTo(scene, function() {
      mac.rotate(0, Math.PI/6, 0);
    });

    var pc = new Computer({x: 50, y: 0, z: -80}, 60);
    pc.addTo(scene, function() {
      pc.rotate(0, -Math.PI/6, 0);
    });

    trappedState.renderObjects = [mac, pc];

    kevinRonald.leftArm.collisionHandler = function() {
      kevinRonald.leftArm.move(-1, 0, -1);
    };

    setTimeout(function() {
      mac.becomeTransparent(0.002);
      pc.becomeTransparent(0.002);

      var shatterChecker = setInterval(function() {
        if (mac.shattering && pc.shattering) {
          clearInterval(shatterChecker);
          endScene();
        }
      }, 100);
    }, 1000);

    function endScene() {
      console.log('IM DONE WITH COMPUTER!!!');

      kevinRonald.reset(); dylanRonald.reset();

      var cameraPosition = {x: 0, y: 40, z: -370};
      setCameraPosition(cameraPosition.x, cameraPosition.y, cameraPosition.z);
      camera.lookAt({x: 0, y: 0, z: -100});
      //tweenCameraToTarget(cameraPosition);

      active.trapped = false;
      enterDesperateFleeState();
    }

    $('body').keypress(function(ev) {
      ev.preventDefault();

      if (ev.which == 98) { // b
        kevinRonald.leftArm.move(1, 0, 1);
      }
      else if (ev.which == 110)  { // n
        kevinRonald.leftArm.move(-1, 0, -1);
      }
    });
  }

  function enterDesperateFleeState() {
    console.log('I AM DESPERATE NOW');

    var groundLength = 2500;
    var darkLength = 1000;

    active.desperate = true;
    desperateState.render = function() {
      var middle = middlePosition(kevinRonald.head.mesh.position, dylanRonald.head.mesh.position);
      middle.z += 70;
      cameraFollowState.target = middle;
      cameraFollowState.offset = {x: 0, y: 40, z: -270};
      lightFollowState.target = middle;
      lightFollowState.offset = {x: 10, y: 20, z: -60};

      if (middle.z > groundLength + darkLength) {
        endState();
      }
      else if (!desperateState.dark && middle.z > groundLength) {
        darkTime();
      }
    };
    desperateState.physicsUpdate = function() {
      dylanRonald.resetMovement();
      kevinRonald.resetMovement();
    };

    desperateState.ground_material = Physijs.createMaterial(
      new THREE.MeshBasicMaterial({color: 0xeeeeee, side: THREE.DoubleSide}),
      .8, .4
    );
    desperateState.ground_geometry = new THREE.PlaneGeometry(500, groundLength * 2);
    desperateState.ground = new Physijs.BoxMesh(desperateState.ground_geometry, desperateState.ground_material, 0);
    desperateState.ground.rotation.x = -Math.PI / 2;
    desperateState.ground.position.y = -30;
    desperateState.ground.ground = true;
    scene.add(desperateState.ground);

    scene.setGravity(new THREE.Vector3(0, -100, 0));

    var dummyForwardInterval = setInterval(function() {
      var z = Math.random() * 0.5 + 6.75;
      kevinRonald.walk(negrand(3), 0, z);
      dylanRonald.walk(negrand(3), 0, z);
    }, 30);

    desperateState.artifacts = [];
    rainArtifacts();
    function rainArtifacts() {
      var middle = middlePosition(kevinRonald.head.mesh.position, dylanRonald.head.mesh.position);
      var future = {x: middle.x + negrand(400), y: kt.randInt(4), z: middle.z + Math.random() * 200 + 100};
      var artifact = new Artifact(future, Math.random() * 9 + 3, 0);
      desperateState.artifacts.push(artifact);
      artifact.addTo(scene);

      if (desperateState.artifacts.length > 300) {
        var firstArtifact = desperateState.artifacts.shift();
        scene.remove(firstArtifact.mesh);
      }

      if (!desperateState.stopRaining) {
        setTimeout(rainArtifacts, kt.randInt(300, 50));
      }
      else {
        setTimeout(function() {
          desperateState.artifacts.forEach(function(artifact) {
            scene.remove(artifact.mesh);
          });
        }, 10000);
      }
    }

    function darkTime() {
      console.log('IT IS DARK TIME');
      desperateState.dark = true;
      desperateState.stopRaining = true;
    }

    function endState() {
      clearInterval(dummyForwardInterval);

      active.desperate = false;
      enterHeavenState();
    }
  }

  function enterHeavenState(startGrassZ) {
    console.log('I AM HEAVEN NOW');

    if (!startGrassZ) startGrassZ = 4500;

    var groundLength = 3000;

    var heavenGroundZ = startGrassZ + groundLength / 2;

    var massiveComputerZ = startGrassZ + groundLength;

    active.heaven = true;
    var grassMeshes = [];
    heavenState.render = function() {
      var middle = middlePosition(kevinRonald.head.mesh.position, dylanRonald.head.mesh.position);
      middle.z += 70;

      if (!heavenState.reachedComputer) {
        cameraFollowState.target = middle;
        cameraFollowState.offset = {x: 0, y: 40, z: -270};
        lightFollowState.target = middle;
        lightFollowState.offset = {x: 10, y: 20, z: -60};
      }

      var distFromStartGrass = startGrassZ - middle.z;

      if (distFromStartGrass > 0) {
        var count = Math.min(10, Math.max(1, (800 - distFromStartGrass) / 100));
        for (var i = 0; i < count; i++) {
          var size = kt.randInt(9, 1);
          var grassGeometry = new THREE.PlaneGeometry(size, size);
          var grassMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide});
          var grassMesh = new THREE.Mesh(grassGeometry, grassMaterial);
          grassMesh.rotation.x = -Math.PI / 2;
          grassMesh.position.z = middle.z + kt.randInt(100);
          grassMesh.position.y = -29;
          grassMesh.position.x = negrand(400);
          scene.add(grassMesh);
        }
      }
      else {
        if (!heavenState.startedRaining) {
          rainArtifacts();
          heavenState.startedRaining = true;
        }

        if (distFromStartGrass < -100) {
          grassMeshes.forEach(function(grassMesh) {
            scene.remove(grassMesh);
          });
        }
      }

      if (middle.z >= massiveComputerZ - 250 && !heavenState.reachedComputer) {
        heavenState.reachedComputer = true;
        reachedComputer();
      }

      if (heavenState.bigGirlHand) {
        heavenState.bigGirlHand.render();
      }
    };
    heavenState.physicsUpdate = function() {
      dylanRonald.resetMovement();
      kevinRonald.resetMovement();
    };

    heavenState.ground_material = Physijs.createMaterial(
      new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide}),
      .8, .4
    );
    heavenState.ground_geometry = new THREE.PlaneGeometry(500, groundLength);
    heavenState.ground = new Physijs.BoxMesh(heavenState.ground_geometry, heavenState.ground_material, 0);
    heavenState.ground.rotation.x = -Math.PI / 2;
    heavenState.ground.position.y = -30;
    heavenState.ground.position.z = heavenGroundZ;
    heavenState.ground.ground = true;
    scene.add(heavenState.ground);

    heavenState.massiveComputer = new Computer({x: 0, y: 300, z: massiveComputerZ}, 600, 1000);
    heavenState.massiveComputer.addTo(scene, function() {
      heavenState.massiveComputer.material.opacity = 0.33;
    });

    var dummyForwardInterval = setInterval(function() {
      var z = Math.random() * 0.5 + 6.75;
      kevinRonald.walk(negrand(3), 0, z);
      dylanRonald.walk(negrand(3), 0, z);
    }, 30);

    heavenState.artifacts = [];
    function rainArtifacts() {
      var middle = middlePosition(kevinRonald.head.mesh.position, dylanRonald.head.mesh.position);
      var future = {x: middle.x + negrand(400), y: kt.randInt(4), z: middle.z + Math.random() * 200 + 100};
      var artifact = new Artifact(future, Math.random() * 9 + 3, 2);
      heavenState.artifacts.push(artifact);
      artifact.addTo(scene);

      if (heavenState.artifacts.length > 300) {
        var firstArtifact = heavenState.artifacts.shift();
        scene.remove(firstArtifact.mesh);
      }

      if (!heavenState.stopRaining) {
        setTimeout(rainArtifacts, kt.randInt(300, 50));
      }
      else {
        setTimeout(function() {
          heavenState.artifacts.forEach(function(artifact) {
            scene.remove(artifact.mesh);
          });
        }, 10000);
      }
    }

    function reachedComputer() {
      console.log('I AM AT LINUX NOW');
      clearInterval(dummyForwardInterval);

      var currentTarget = cameraFollowState.target;
      var initY = currentTarget.y;
      cameraFollowState.target = null;
      cameraFollowState.offset = null;
      var aimCameraUpInterval = setInterval(function() {
        currentTarget.y += 0.4;
        camera.lookAt(currentTarget);

        if (currentTarget.y >= initY + 40) {
          clearInterval(aimCameraUpInterval);
          addHand();
        }
      }, 10);

      function addHand() {
        heavenState.bigGirlHand = new Hand({x: 0, y: 200, z: massiveComputerZ + 64}, 90);
        heavenState.bigGirlHand.mass = 500;
        heavenState.bigGirlHand.ignoreCollisons = true;
        heavenState.bigGirlHand.specificModelName = mn.BASE_HAND;
        heavenState.bigGirlHand.addTo(scene, function() {
          heavenState.bigGirlHand.twitching = true;
          heavenState.bigGirlHand.fluctuating = true;

          var material = heavenState.bigGirlHand.materials[0];
          console.log(material);
          material.color = new THREE.Color(198, 120, 86);
          material.needsUpdate = true;
        });
      }

    }
  }

  function enterEndgameState() {

  }

});

},{"./artifact":2,"./character":5,"./computer":6,"./hand":7,"./lib/kutility":10,"./model_names":12,"./ronald_word":13}],12:[function(require,module,exports){

var prefix = '/js/models/';

function pre(text) {
  return prefix + text;
}

/* LEGS */

module.exports.LOWPOLY_LEG = pre('low_poly_leg.js');

/* HEADS */

module.exports.LOWPOLY_HEAD = pre('low_poly_head.js');

/* ARMS */

module.exports.FOOTBALL_ARM = pre('football_arm.js');

module.exports.LOWPOLY_ARM = pre('low_poly_arm.js');

/* BODIES */

module.exports.FOOTBALL_TORSO = pre('football_torso.js');

module.exports.LOWPOLY_TORSO = pre('low_poly_torso.js');

/* HANDS */

module.exports.FOOTBALL_HAND = pre('football_hand.js');

module.exports.BASE_HAND = pre('base_hand.js');

/* FEET */

module.exports.FOOTBALL_FOOT = pre('football_foot.js');

/* OBJECTS */

module.exports.BOXING_RING = pre('boxing_ring.js');

module.exports.FITNESS_TOWER = pre('fitness_tower.js');

module.exports.IPHONE = pre('iPhone.js');
module.exports.PHONE = pre('phone.js');
module.exports.OFFICE_PHONE = pre('office_phone.js');

module.exports.LAPTOP = pre('laptop.js');

module.exports.SHOWER = pre('shower.js');

module.exports.LOCKER = pre('locker.js');

module.exports.WEIGHTS = pre('weights.js');

/* FUNCTIONS */

module.exports.loadModel = function(modelName, callback) {
  var loader = new THREE.JSONLoader;

  loader.load(modelName, function (geometry, materials) {
    callback(geometry, materials);
  });
}

},{}],13:[function(require,module,exports){
var kt = require('./lib/kutility');

module.exports = RonaldWord;

var phraseBank = [
  'RONALD',
  'MY FRIEND RONALD LIVES INSIDE THE COMPUTER',
  'MY FRIEND RONALD',
  'MY FRIEND RONALD LIVES IN THE COMPUTER TRASH CAN',
  'RONALD EATS ALL THE COMPUTER TRASH',
  'MY FRIEND RONALD SMOKES WEED'
];

function negrand(scalar) {
  return (Math.random() - 0.5) * scalar;
}

function randcolor() {
  var r = kt.randInt(255);
  var g = kt.randInt(255);
  var b = kt.randInt(255);
  return new THREE.Color(r, g, b);
}

function RonaldWord(phrase, config) {
  if (!phrase) {
    phrase = kt.choice(phraseBank);
  }

  if (!config) config = {};
  if (!config.position) {
    config.position = {x: Math.random() * 80 - 40, y: Math.random() * 80, z: Math.random() * -100};
  }
  if (!config.velocity) {
    config.velocity = {x: negrand(50), y: negrand(50), z: negrand(50)};
  }
  if (!config.decay) {
    config.decay = 60000;
  }

  this.phrase = phrase;
  this.position = config.position;
  this.velocity = config.velocity;
  this.decay = config.decay;

  this.geometry = new THREE.TextGeometry(this.phrase, {
    size: 1.5 + negrand(1)
    , height: 0.01
    , curveSegments: 1
    , font: "droid sans"
    , bevelThickness: 0.35
    , bevelSize: 0.15
    , bevelSegments: 1
    , bevelEnabled: true
  });

  var color = randcolor();
  this.material = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({
      ambient: color
      , color: color
      , shininess: 5
      , reflectivity: 0.1
      , side: THREE.DoubleSide
    }),
    .4, // low friction
    .6 // high restitution
  );

  this.mesh = new Physijs.BoxMesh(this.geometry, this.material);
  this.mesh.castShadow = this.mesh.receiveShadow = true;
}

RonaldWord.prototype.move = function(x, y, z) {
  if (!this.mesh) return;

  this.mesh.position.x += x;
  this.mesh.position.y += y;
  this.mesh.position.z += z;

  this.mesh.__dirtyPosition = true;
}

RonaldWord.prototype.rotate = function(rx, ry, rz) {
  if (!this.mesh) return;

  this.mesh.rotation.x += rx;
  this.mesh.rotation.y += ry;
  this.mesh.rotation.z += rz;
}

RonaldWord.prototype.moveTo = function(x, y, z) {
  if (!this.mesh) return;

  this.mesh.position.set(x, y, z);

  this.mesh.__dirtyPosition = true;
}

RonaldWord.prototype.addTo = function(scene, callback) {
  scene.add(this.mesh);

  this.moveTo(this.position.x, this.position.y, this.position.z);
  this.mesh.setLinearVelocity(this.velocity);

  var self = this;
  setTimeout(function() {
    scene.remove(self.mesh);
  }, this.decay);
}

RonaldWord.prototype.render = function() {
  //this.move(this.velocity.x, this.velocity.y, this.velocity.z);
}

},{"./lib/kutility":10}]},{},[11])