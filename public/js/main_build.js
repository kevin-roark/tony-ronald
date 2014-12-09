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

},{"./bodypart":5,"./lib/kutility":13,"./model_names":15}],2:[function(require,module,exports){

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

},{"./bodypart":5,"./lib/kutility":13,"./model_names":15}],3:[function(require,module,exports){

var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Billboard;

var VID_WIDTH = 300;
var VID_HEIGHT = 240;

function Billboard(startPos, scale, videoDomElementObject) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.scale = scale || 1;

  this.video = videoDomElementObject.vid;

  this.videoImage = document.createElement('canvas');
  this.videoImage.width = videoDomElementObject.width;
  this.videoImage.height = videoDomElementObject.height;

  this.videoImageContext = this.videoImage.getContext('2d');
	this.videoImageContext.fillStyle = '#ffffff'; // background color if no video present
	this.videoImageContext.fillRect( 0, 0, VID_WIDTH, VID_HEIGHT);
}

Billboard.prototype.__proto__ = BodyPart.prototype;

Billboard.prototype.createMesh = function(callback) {
  this.videoTexture = new THREE.Texture(this.videoImage);
  this.videoTexture.minFilter = THREE.LinearFilter;
  this.videoTexture.magFilter = THREE.LinearFilter;
  this.videoTexture.format = THREE.RGBFormat;
  this.videoTexture.generateMipmaps = false;

  this.material = new THREE.MeshBasicMaterial({
    map: this.videoTexture
    , overdraw: true
    , side: THREE.DoubleSide
  });

  this.geometry = new THREE.PlaneGeometry(VID_WIDTH, VID_HEIGHT);
  this.mesh = new THREE.Mesh(this.geometry, this.material);

  callback();
}

Billboard.prototype.render = function() {
  if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
    this.videoImageContext.drawImage(this.video, 0, 0);

    if (this.videoTexture) this.videoTexture.needsUpdate = true;
  }
}

},{"./bodypart":5,"./lib/kutility":13,"./model_names":15}],4:[function(require,module,exports){

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

},{"./bodypart":5,"./lib/kutility":13,"./model_names":15}],5:[function(require,module,exports){
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
    this.twitch(this.twitchIntensity || 1);
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

},{"./lib/kutility":13,"./model_names":15}],6:[function(require,module,exports){

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

},{"./arm":1,"./body":4,"./hand":8,"./head":9,"./leg":12,"./lib/kutility":13,"./model_names":15}],7:[function(require,module,exports){

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
  this.twitchIntensity = 3;

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

},{"./bodypart":5,"./lib/kutility":13,"./model_names":15}],8:[function(require,module,exports){

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

},{"./bodypart":5,"./lib/kutility":13,"./model_names":15}],9:[function(require,module,exports){

var kt = require('./lib/kutility');

var BodyPart = require('./bodypart');

module.exports = Head;

var headNames = ['/images/kevin.jpg', '/images/dylan.jpg'];
var headIndex = 0;

function Head(startPos, scale) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.textureName = headNames[headIndex % headNames.length];
  headIndex += 1;

  this.scale = scale || 20;
  this.scale *= 0.4;

  this.revolving = true;
}

Head.prototype.__proto__ = BodyPart.prototype;

Head.prototype.createMesh = function(callback) {
  this.geometry = new THREE.SphereGeometry(1, 32, 32);

  this.material = new THREE.MeshBasicMaterial();
  this.material.map = THREE.ImageUtils.loadTexture(this.textureName);

  this.mesh = new THREE.Mesh(this.geometry, this.material);

  callback();
}

Head.prototype.render = function() {
  if (this.revolving) {
    this.mesh.rotation.y += 0.02;
  }
}

},{"./bodypart":5,"./lib/kutility":13}],10:[function(require,module,exports){

var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');
var Head = require('./head');

module.exports = Hotdog;

var teeShirts = [
  '/images/finder.jpg'
];

function Hotdog(startPos, scale) {
  var self = this;

  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;
  this.startPos = startPos;

  this.scale = scale || 1;

  this.leftDogOffset = {x: -2.2 * this.scale, y: 0, z: 0};
  this.rightDogOffset = {x: 2.2 * this.scale, y: 0, z: 0};
  this.leftHeadOffset = {x: -3.5 * this.scale, y: 0, z: 10};
  this.rightHeadOffset = {x: 3.5 * this.scale, y: 0, z: 10};
}

Hotdog.prototype.__proto__ = BodyPart.prototype;

Hotdog.prototype.move = function(x, y, z) {
  if (!this.hotDogs) return;

  this.hotDogs.forEach(function(dog) {
    dog.position.x += x;
    dog.position.y += y;
    dog.position.z += z;
  });

  this.heads.forEach(function(head) {
    head.move(x, y, z);
  });
}

Hotdog.prototype.rotate = function(rx, ry, rz) {
  if (!this.hotDogs) return;

  this.hotDogs.forEach(function(dog) {
    dog.rotation.x += rx;
    dog.rotation.y += ry;
    dog.rotation.z += rz;
  });

  this.heads.forEach(function(head) {
    head.rotate(rx, ry, rz);
  });
}

Hotdog.prototype.moveTo = function(x, y, z) {
  if (!this.hotDogs) return;

  this.centerHotdogMesh.position.set(x, y, z);
  this.leftHotdogMesh.position.set(x + this.leftDogOffset.x, y + this.leftDogOffset.y, z + this.leftDogOffset.z)
  this.rightHotdogMesh.position.set(x + this.rightDogOffset.x, y + this.rightDogOffset.y, z + this.rightDogOffset.z)

  this.move(0, 0, 0);

  this.leftHead.moveTo(x + this.leftHeadOffset.x, y + this.leftHeadOffset.y, z + this.leftHeadOffset.z);
  this.rightHead.moveTo(x + this.rightHeadOffset.x, y + this.rightHeadOffset.y, z + this.rightHeadOffset.z);
}

Hotdog.prototype.scaleBody = function(s) {
  if (!this.hotDogs) return;

  this.hotDogs.forEach(function(dog) {
    dog.scale.set(s, s, s);
  });

  this.heads.forEach(function(head) {
    head.scaleBody(s);
  });
}

Hotdog.prototype.createMesh = function(callback) {
  // radius bottom, radius top, height
  this.leftHotdogGeometry = new THREE.CylinderGeometry(1, 1, 2);
  this.centerHotdogGeometry = new THREE.CylinderGeometry(1, 1, 4);
  this.rightHotdogGeometry = new THREE.CylinderGeometry(1, 1, 2);

  this.hotdogMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(250 / 255, 128 / 255, 114 / 255) // salmon
  });

  this.centerHotdogMesh = new THREE.Mesh(this.centerHotdogGeometry, this.hotdogMaterial);
  this.leftHotdogMesh = new THREE.Mesh(this.leftHotdogGeometry, this.hotdogMaterial.clone());
  this.rightHotdogMesh = new THREE.Mesh(this.leftHotdogGeometry, this.hotdogMaterial.clone());
  this.hotDogs = [this.centerHotdogMesh, this.leftHotdogMesh, this.rightHotdogMesh];
  this.hotDogs.forEach(function(dog) {
    dog.rotation.z = -Math.PI / 2;
  });

  this.leftHead = new Head({
    x: this.startX + this.leftHeadOffset.x,
    y: this.startY + this.leftHeadOffset.y,
    z: this.startZ + this.leftHeadOffset.z
  }, this.scale * 2);

  this.rightHead = new Head({
    x: this.startX + this.rightHeadOffset.x,
    y: this.startY + this.rightHeadOffset.y,
    z: this.startZ + this.rightHeadOffset.z
  }, this.scale * 2);

  this.heads = [this.leftHead, this.rightHead];

  callback();
}

Hotdog.prototype.changeTeeShirt = function(index) {
  var teeShirt = teeShirts[index % teeShirts.length];
  this.hotdogMaterial.map = THREE.ImageUtils.loadTexture(teeShirt);
  this.hotdogMaterial.needsUpdate = true;
};

Hotdog.prototype.addTo = function(scene, callback) {
  var self = this;

  self.createMesh(function() {
    self.scaleBody(self.scale);

    self.moveTo(self.startX, self.startY, self.startZ);

    scene.add(self.centerHotdogMesh);
    scene.add(self.leftHotdogMesh);
    scene.add(self.rightHotdogMesh);
    self.leftHead.addTo(scene, function() {
      self.leftHead.rotate(0, -0.6, 0);
    });
    self.rightHead.addTo(scene, function() {
      self.rightHead.rotate(0, -1.5, 0);
    });

    if (callback) {
      callback(self);
    }
  });
}

},{"./bodypart":5,"./head":9,"./lib/kutility":13,"./model_names":15}],11:[function(require,module,exports){

var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Human;

function Human(startPos, scale, gender) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.scale = scale || 20;

  if (!gender) gender = 'girl';

  if (gender == 'girl') {
    this.specificModelName = modelNames.TWEEN_GIRL;
  } else {
    this.specificModelName = modelNames.BOY;
  }
}

Human.prototype.__proto__ = BodyPart.prototype;

Human.prototype.createMesh = function(callback) {
  var self = this;

  modelNames.loadModel(self.specificModelName, function (geometry, materials) {
    self.geometry = geometry;
    self.materials = materials;

    self.faceMaterial = new THREE.MeshFaceMaterial(materials);
    self.material = self.faceMaterial;

    self.mesh = new THREE.SkinnedMesh(geometry, self.material);

    callback();
  });
}

Human.prototype.additionalInit = function() {
  var self = this;
};

},{"./bodypart":5,"./lib/kutility":13,"./model_names":15}],12:[function(require,module,exports){

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

},{"./bodypart":5,"./lib/kutility":13,"./model_names":15}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
$(function() {

  var kt = require('./lib/kutility');
  var Character = require('./character');
  //var io = require('./io');
  var RonaldWord = require('./ronald_word');
  var Computer = require('./computer');
  var Artifact = require('./artifact');
  var mn = require('./model_names');
  var Hand = require('./hand');
  var Human = require('./human');
  var Billboard = require('./billboard');
  var Hotdog = require('./hotdog');

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
    if (active.endgame) {
      finalState.render();
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

  var tonyRonaldVideo = document.querySelector('#tony-ronald');

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
        if (cameraFollowState.offset) {
          cameraFollowState.offset.x += -1;
        }
      }
      else if (ev.which == 119)  { // up
        moveCameraPosition(0, 0, 1);
        if (cameraFollowState.offset) {
          cameraFollowState.offset.y += 1;
        }
      }
      else if (ev.which == 100)  { // right
        moveCameraPosition(1, 0, 0);
        if (cameraFollowState.offset) {
          cameraFollowState.offset.x += 1;
        }
      }
      else if (ev.which == 115)  { // down
        moveCameraPosition(0, 0, -1);
        if (cameraFollowState.offset) {
          cameraFollowState.offset.y += -1;
        }
      }
      else if (ev.which == 113) { // q
        moveCameraPosition(0, 1, 0);
        if (cameraFollowState.offset) {
          cameraFollowState.offset.z += 1;
        }
      }
      else if (ev.which == 101) { // e
        moveCameraPosition(0, -1, 0);
        if (cameraFollowState.offset) {
          cameraFollowState.offset.z += -1;
        }
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

    if (active.endgame) {
      finalState.render();
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

  function moveTowardsTarget(pos, target, amt) {
    if (pos.x < target.x) {
      pos.x += amt.x;
    } else if (pos.x > target.x) {
      pos.x -= amt.x;
    }

    if (pos.y < target.y) {
      pos.y += amt.y;
    } else if (pos.y > target.y) {
      pos.y -= amt.y;
    }

    if (pos.z < target.z) {
      pos.z += amt.z;
    } else if (pos.z > target.z) {
      pos.z -= amt.z;
    }
  }

  function distanceMagnitude(pos1, pos2) {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y) + Math.abs(pos1.z - pos2.z);
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
      mac.becomeTransparent(0.02);
      pc.becomeTransparent(0.02);

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
        kevinRonald.leftArm.move(3, 0, 3);
      }
      else if (ev.which == 110)  { // n
        kevinRonald.leftArm.move(-3, 0, -3);
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
      var z = Math.random() * 0.5 + 10;
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
      if (heavenState.massiveComputer) {
        heavenState.massiveComputer.render();
      }
    };
    heavenState.physicsUpdate = function() {
      dylanRonald.resetMovement();
      kevinRonald.resetMovement();

      if (heavenState.bigGirlHand) {
        heavenState.bigGirlHand.resetMovement();
      }
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
    heavenState.massiveComputer.twitchIntensity = 5;
    heavenState.massiveComputer.addTo(scene, function() {
      heavenState.massiveComputer.material.opacity = 0.33;
    });

    var dummyForwardInterval = setInterval(function() {
      var z = Math.random() * 0.5 + 10;
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
        var z = massiveComputerZ + 150;
        heavenState.bigGirlHand = new Hand({x: 0, y: 200, z: z}, 90);
        heavenState.bigGirlHand.mass = 500;
        heavenState.bigGirlHand.ignoreCollisons = true;
        heavenState.bigGirlHand.specificModelName = mn.BASE_HAND;
        heavenState.bigGirlHand.addTo(scene, function() {
          var material = heavenState.bigGirlHand.materials[0];
          console.log(material);
          material.color = new THREE.Color(198, 120, 86);
          material.needsUpdate = true;

          pokeHandMany(z, function() {
            setTimeout(function() { // lets give some time to twitch
              endState();
            }, 10000);
          });
        });
      }

      function endState() {
        heavenState.massiveComputer.knockable = false;
        heavenState.stopRaining = true;

        var time = 11000;

        var ascendInterval = setInterval(function() {
          kevinRonald.move(0, 0.5, 1);
          dylanRonald.move(0, 0.5, 1);
        }, 30);

        fadeOverlay(true, function() {
          clearInterval(ascendInterval);
          active.heaven = false;
          enterEndgameState(heavenState.massiveComputer);
        }, null, time);
      }

      function pokeHandMany(startZ, callback) {
        var dist = 60;
        var hand = heavenState.bigGirlHand;
        var pokeCount = 0;
        var maxPokes = 3;

        poke();
        function poke() {
          hand.pokeUntilCollision(dist, function() {
            pokeCount += 1;
            if (pokeCount < maxPokes) {
              setTimeout(poke, 1);
            } else {
              donePoking();
            }
          });
        }

        function donePoking() {
          heavenState.bigGirlHand.twitching = true;
          heavenState.bigGirlHand.fluctuating = true;
          callback();
        }
      }

    }
  }

  function enterEndgameState(linux) {
    console.log('IT IS TIME TO DIE RONALD');
    active.endgame = true;

    scene.setGravity(new THREE.Vector3(0, 0, 0));

    // modify things from previous state y not
    heavenState.bigGirlHand.move(-300, 170, 400);
    linux.material.opacity = 0.975;
    linux.reset();
    linux.mesh.position.y = 200;
    kevinRonald.move(0, -5, -25);
    dylanRonald.move(0, -5, -25);

    var girlZ = linux.mesh.position.z + 200;
    cameraFollowState.target = {x: 0, y: 50, z: girlZ};
    cameraFollowState.offset = {x: 400, y: 25, z: 0};
    lightFollowState.target = cameraFollowState.target;
    lightFollowState.offset = {x: 100, y: 40, z: 0};

    finalState.girl = new Human({x: 220, y: 50, z: girlZ}, 35, 'girl');
    finalState.girl.addTo(scene);

    finalState.boy = new Human({x: -300, y: 50, z: girlZ - 50}, 45, 'boy');
    finalState.boy.addTo(scene);

    var tonyRonaldVideoStruct = {vid: tonyRonaldVideo, width: 320, height: 240};
    finalState.tonyRonaldScreen = new Billboard({x: -127, y: 280, z: girlZ - 165}, 1, tonyRonaldVideoStruct);
    finalState.tonyRonaldScreen.addTo(scene, function() {});

    finalState.hotdog = new Hotdog({x: 30, y: 110, z: girlZ - 145}, 25);
    finalState.hotdog.addTo(scene, function() {
      finalState.hotdog.changeTeeShirt(0);
    });

    fadeOverlay(false, function() {
      girlGonnaTalkNow();
    }, null);

    finalState.render = function() {
      finalState.girl.render();
      if (finalState.tonyRonaldScreen) finalState.tonyRonaldScreen.render();
    };
    finalState.physicsUpdate = function() {

    };

    function girlGonnaTalkNow() {
      console.log('can you see me, ronald?');

      setTimeout(function() {
        panToShowScreen();
      }, 4444);
    }

    function panToShowScreen() {
      var camTarget = {x: 0, z: girlZ, y: 120};
      var camOffset = {x: 0, z: 275, y: 6};
      var lightTarget = camTarget;
      var lightOffset = {x: 20, y: 40, z: 100};

      var amt = {x: 0.75, y: 0.15, z: 0.65};
      var thresh = 1;
      var panInterval = setInterval(function() {
        moveTowardsTarget(cameraFollowState.target, camTarget, amt);
        moveTowardsTarget(cameraFollowState.offset, camOffset, amt);
        moveTowardsTarget(lightFollowState.target, lightTarget, amt);
        moveTowardsTarget(lightFollowState.offset, lightOffset, amt);

        if (distanceMagnitude(cameraFollowState.target, camTarget) <= thresh &&
            distanceMagnitude(cameraFollowState.offset, camOffset) <= thresh &&
            distanceMagnitude(lightFollowState.target, lightTarget) <= thresh &&
            distanceMagnitude(lightFollowState.offset, lightOffset) <= thresh) {
              console.log('DONE PANNING');
              clearInterval(panInterval);
              startComputerActivity();
        }
      }, 20);
    }

    function startComputerActivity() {
      console.log('can u see the video and dress my ronald?');

      tonyRonaldVideo.play();
    }

  }

});

},{"./artifact":2,"./billboard":3,"./character":6,"./computer":7,"./hand":8,"./hotdog":10,"./human":11,"./lib/kutility":13,"./model_names":15,"./ronald_word":16}],15:[function(require,module,exports){

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

/* HUMANS */

module.exports.TWEEN_GIRL = pre('chubby.js');
module.exports.BOY = pre('chubby.js');

/* FUNCTIONS */

module.exports.loadModel = function(modelName, callback) {
  var loader = new THREE.JSONLoader;

  loader.load(modelName, function (geometry, materials) {
    callback(geometry, materials);
  });
}

},{}],16:[function(require,module,exports){
var kt = require('./lib/kutility');

module.exports = RonaldWord;

var phraseBank = [
  'RONALD',
  'MY FRIEND RONALD LIVES INSIDE THE COMPUTER',
  'MY FRIEND RONALD',
  'MY FRIEND RONALD LIVES IN THE COMPUTER TRASH CAN',
  'RONALD EATS ALL THE COMPUTER TRASH',
  'MY FRIEND RONALD SMOKES WEED',
  "MY FRIEND RONALD'S DEAD",
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

},{"./lib/kutility":13}]},{},[14])