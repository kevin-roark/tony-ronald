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

},{"./bodypart":5,"./lib/kutility":14,"./model_names":16}],2:[function(require,module,exports){

var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Artifact;

var COMPUTER_TYPE = 'COMPUTER';
var SPORT_TYPE = 'SPORT';
var HORSE_TYPE = 'HORSE';
var BUZZFEED_TYPE = 'BUZZFEED';
var HOTDOG_TYPE = 'HOTDOG';

var MONEY_TYPE = 'MONEY';
var BALOON_TYPE = 'BALOON';
var HALO_TYPE = 'HALO';
var TV_TYPE = 'TV';
var SWORD_TYPE = 'SWORD';

var COMPUTER_ARTIFACT_TYPES = [COMPUTER_TYPE, SPORT_TYPE, HORSE_TYPE, BUZZFEED_TYPE, HOTDOG_TYPE];
var EARTH_ARTIFACT_TYPES = [BALOON_TYPE, HALO_TYPE, TV_TYPE, SWORD_TYPE, MONEY_TYPE];

var artifactTextureNames = {};
artifactTextureNames[COMPUTER_TYPE] = [
  '/images/finder.jpg',
  '/images/server.jpg',
  '/images/microsoft_word.jpg',
  '/images/imovie.jpg',
  '/images/computer_trash.jpg'
];
artifactTextureNames[SPORT_TYPE] = [
  '/images/basketball.jpg',
  '/images/football.jpg',
  '/images/frame.jpg',
  '/images/framed_sports.jpg',
  '/images/quarterback.jpg'
];
artifactTextureNames[HORSE_TYPE] = [
  '/images/barn.jpg',
  '/images/black_horse.jpg',
  '/images/horse_diagram.jpg',
  '/images/lasso.jpg',
  '/images/sky_horse.jpg'
];
artifactTextureNames[BUZZFEED_TYPE] = [
  '/images/buzzfeed_1.jpg',
  '/images/buzzfeed_2.jpg',
  '/images/listicle_1.jpg',
  '/images/listicle_2.jpg',
  '/images/fishboy.jpg'
];
artifactTextureNames[HOTDOG_TYPE] = [
  '/images/chicago_dog.jpg',
  '/images/turtle_dog.jpg',
  '/images/profit_dog.jpg',
  '/images/mom_dog.jpg',
  '/images/hawaii_dog.jpg'
];

artifactTextureNames[MONEY_TYPE] = [
  '/images/coin.jpg',
  '/images/dollar.jpg',
  '/images/canada_dollar.jpg',
  '/images/ruby.jpg',
];
artifactTextureNames[BALOON_TYPE] = [
  '/images/green_baloon.jpg',
  '/images/red_baloon.jpg',
  '/images/blue_baloon.jpg'
];
artifactTextureNames[HALO_TYPE] = [
  '/images/halo.jpg',
  '/images/stairs.jpg',
  '/images/angel_fig.jpg',
  '/images/moses.jpg',
  '/images/demon_fig.jpg'
];
artifactTextureNames[TV_TYPE] = [
  '/images/remote.jpg',
  '/images/tv_1.jpg',
  '/images/tv_2.jpg',
  '/images/tv_3.jpg'
];
artifactTextureNames[SWORD_TYPE] = [
  '/images/sword_1.jpg',
  '/images/sword_2.jpg',
  '/images/daggers.jpg'
];

function Artifact(startPos, scale, earthType, typeIndex) {
  var self = this;

  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  if (typeIndex === undefined) typeIndex = 0;

  var artifactTypes = earthType? EARTH_ARTIFACT_TYPES : COMPUTER_ARTIFACT_TYPES;
  this.artifactType = artifactTypes[typeIndex];
  this.textureName = kt.choice(artifactTextureNames[this.artifactType]);

  this.scale = scale || 20;

  this.ignoreCollisons = false;
}

Artifact.prototype.__proto__ = BodyPart.prototype;

Artifact.prototype.createMesh = function(callback) {
  if (Math.random() < 0.24) {
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
  if (other_object.humanPart && this.humanCollisionHandler) {
    this.humanCollisionHandler(other_object);
  }
}

},{"./bodypart":5,"./lib/kutility":14,"./model_names":16}],3:[function(require,module,exports){

var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Billboard;

var DEFAULT_VID_WIDTH = 300;
var DEFAULT_VID_HEIGHT = 240;

function Billboard(startPos, scale, videoDomElementObject) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  if (!videoDomElementObject.width) videoDomElementObject.width = DEFAULT_VID_WIDTH;
  if (!videoDomElementObject.height) videoDomElementObject.height = DEFAULT_VID_HEIGHT;

  this.scale = scale || 1;

  this.width = videoDomElementObject.width;
  this.height = videoDomElementObject.height;

  this.video = videoDomElementObject.vid;

  this.videoImage = document.createElement('canvas');
  this.videoImage.width = videoDomElementObject.width;
  this.videoImage.height = videoDomElementObject.height;

  this.videoImageContext = this.videoImage.getContext('2d');
	this.videoImageContext.fillStyle = '#ffffff'; // background color if no video present
	this.videoImageContext.fillRect( 0, 0, this.width, this.height);
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

  this.geometry = new THREE.PlaneGeometry(this.width, this.height);
  this.mesh = new THREE.Mesh(this.geometry, this.material);

  callback();
}

Billboard.prototype.render = function() {
  if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
    this.videoImageContext.drawImage(this.video, 0, 0);

    if (this.videoTexture) this.videoTexture.needsUpdate = true;
  }
}

},{"./bodypart":5,"./lib/kutility":14,"./model_names":16}],4:[function(require,module,exports){

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

},{"./bodypart":5,"./lib/kutility":14,"./model_names":16}],5:[function(require,module,exports){
var kt = require('./lib/kutility');

var modelNames = require('./model_names');

module.exports = BodyPart;

function BodyPart(startPos, scale, model) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.scale = scale || 1;

  if (model) {
    this.specificModelName = model;
  }

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

},{"./lib/kutility":14,"./model_names":16}],6:[function(require,module,exports){

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

},{"./arm":1,"./body":4,"./hand":8,"./head":9,"./leg":13,"./lib/kutility":14,"./model_names":16}],7:[function(require,module,exports){

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

function Computer(startPos, scale, mass, twitchtime) {
  var self = this;

  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.textureName = computerNames[computerIndex % computerNames.length];
  computerIndex += 1;

  this.scale = scale || 20;
  this.mass = mass || 0;
  this.twitchtime = twitchtime || 200;

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

Computer.prototype.becomeTransparent = function(delta, thresh, shatterAfter) {
  var self = this;

  if (!delta) delta = 0.01;
  if (!thresh) thresh = 0.5;

  var int = setInterval(function() {
    self.material.opacity -= delta;
    if (self.material.opacity <= thresh) {
      clearInterval(int);
      if (shatterAfter) {
        self.shatterable = true;
      }
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
  else if (this.knockable && other_object.humanPart) {
    this.knock(other_object);
  }
}

Computer.prototype.knock = function(other_object) {
  console.log('KNOCK!!!');

  var self = this;
  this.twitching = true;
  setTimeout(function() {
    self.twitching = false;
  }, this.twitchtime);

  if (this.knockHandler) {
    this.knockHandler(other_object);
  }
}

Computer.prototype.shatter = function() {
  this.shattering = true;
  this.ignoreCollisons = false;
  this.mesh.setLinearVelocity({x: negrand(36, 15), y: Math.random() * 36, z: negrand(36, 15)});
  this.mesh.setAngularVelocity({x: negrand(36, 15), y: Math.random() * 36, z: negrand(36, 15)});
  console.log('SHATTERED');
}

},{"./bodypart":5,"./lib/kutility":14,"./model_names":16}],8:[function(require,module,exports){

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

},{"./bodypart":5,"./lib/kutility":14,"./model_names":16}],9:[function(require,module,exports){

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

},{"./bodypart":5,"./lib/kutility":14}],10:[function(require,module,exports){

var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');
var Head = require('./head');

module.exports = Hotdog;

var teeShirts = [
  '/images/linkin_park.jpg'
  , '/images/trapt.jpg'
  , '/images/soad.jpg'
  , '/images/eminem.jpg'
  , '/images/drowning_pool.jpg'
  , '/images/creed.jpg'
  , '/images/dmx.jpg'
  , '/images/korn.jpg'
  , '/images/grace.jpg'
  , '/images/wyte.jpg'
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
  this.centerHotdogGeometry = new THREE.BoxGeometry(4, 1.7, 1.7);
  this.rightHotdogGeometry = new THREE.CylinderGeometry(1, 1, 2);

  this.centerHotdogMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(250 / 255, 128 / 255, 114 / 255) // salmon
    , map: THREE.ImageUtils.loadTexture(teeShirts[0])
  });
  this.sideHotdogMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(250 / 255, 128 / 255, 114 / 255) // salmon
  });

  this.centerHotdogMesh = new THREE.Mesh(this.centerHotdogGeometry, this.centerHotdogMaterial);
  this.leftHotdogMesh = new THREE.Mesh(this.leftHotdogGeometry, this.sideHotdogMaterial.clone());
  this.rightHotdogMesh = new THREE.Mesh(this.leftHotdogGeometry, this.sideHotdogMaterial.clone());
  this.hotDogs = [this.centerHotdogMesh, this.leftHotdogMesh, this.rightHotdogMesh];

  this.leftHotdogMesh.rotation.z = -Math.PI / 2;
  this.rightHotdogMesh.rotation.z = -Math.PI / 2;

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
  this.centerHotdogMesh.material.map = THREE.ImageUtils.loadTexture(teeShirt);
  this.centerHotdogMesh.material.needsUpdate = true;
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

},{"./bodypart":5,"./head":9,"./lib/kutility":14,"./model_names":16}],11:[function(require,module,exports){

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

},{"./bodypart":5,"./lib/kutility":14,"./model_names":16}],12:[function(require,module,exports){

// CONTROLS::::

// move torso to move character
// shake head to swell character
// left and right hands correspond to left and right arms for the character
// delta between hands corresponds to degree of melt (closer together means more melt)
// left and right knees handle the legs of the character
// delta between knees controls rotation about y
// delta between elbows controls rotation about x
// elbows fuckily control the secondary light source

// what does closest hand do?

// TODO: all these things are separate and repetitive right now because there is no
// guarantee that each wrestler will behave the same. please fix later.

var socket = io('http://localhost:8888');

var previousPositions = {};
var positionDeltas = {};
var previousPositionDeltas = {};

var eventsWithRapidHeadVelocity = {one: 0, two: 0};

var startDate = new Date();
var meltingHistory = {one: {meltEndTime: startDate, meltStartTime: startDate}, two: {meltEndTime: startDate, meltStartTime: startDate}};

var kneeHistory = {one: {rotating: false}, two: {rotating: false}};

var elbowHistory = {one: {rotUp: false, rotDown: false}, two: {rotUp: false, rotDown: false}};

var MIN_TIME_BETWEEN_GESTURES = 800;
var PHRASE_GESTURE_DELTA_MULT = 4.0;
var MIN_PHRASE_VEL = 120.0;
var phraseGestureTimes = {left1: new Date(), right1: new Date(), left2: new Date(), right2: new Date()};
var phraseGestureStartPositions = {left1: blankpos(), right1: blankpos(), left2: blankpos(), right2: blankpos()};
var phraseGestureVelocities = {left1: blankpos(), right1: blankpos(), left2: blankpos(), right2: blankpos()};

var BIG_HEAD_MAG = 15;
var MAX_HEAD_SWELL = 40;
var TORSO_CLOSE_MAG = 11;

var CLOSE_KNEE_MAG = 60;
var CLOSE_ELBOW_MAG = 60;
var FAR_ELBOW_MAG = 300;
var RIDICULOUS_ELBOW_MAG = 600;

var CLOSE_HANDS_MAG = 100;

var TORSO_MOVEMENT_MAG_MULT = 0.25;

module.exports.PHRASE = 1;
module.exports.KNOCK  = 2;
module.exports.RUN    = 3;

var wrestler1, wrestler2, camera, light;

module.exports.mode = module.exports.PHRASE;

function blankpos() { return {x: 0, y: 0, z: 0}; };

function phrasePos(left) {
  var pos = blankpos();
  pos.x = left? -60 : 60;
  pos.y = Math.random() * 80;
  pos.z = (Math.random() * -150) - 50;
  return pos;
}

module.exports.eventHandler = function(event, data) {};

module.exports.socket = socket;

module.exports.maxPositions = {
  z: 1000,
  x: 1000,
  y: 1000
};
module.exports.minPositions = {
  z: -1000,
  x: -1000,
  y: -1000
};

module.exports.begin = function(w1, w2, cam, l) {
  wrestler1 = w1;
  wrestler2 = w2;
  camera = cam;
  light = l;

  socket.emit('rollcall', 'browser');

  socket.on('leftHand', function(data) {
    if (data.wrestler == 1) {
      leftHand1(data.position);
    } else {
      leftHand2(data.position);
    }
  });

  socket.on('rightHand', function(data) {
    if (data.wrestler == 1) {
      rightHand1(data.position);
    } else {
      rightHand2(data.position);
    }
  });

  socket.on('closestHand', function(data) {
    if (data.wrestler == 1) {
      closestHand1(data.position);
    } else {
      closestHand2(data.position);
    }
  });

  socket.on('head', function(data) {
    if (data.wrestler == 1) {
      head1(data.position);
    } else {
      head2(data.position);
    }
  });

  socket.on('leftKnee', function(data) {
    if (data.wrestler == 1) {
      leftKnee1(data.position);
    } else {
      leftKnee2(data.position);
    }
  });

  socket.on('rightKnee', function(data) {
    if (data.wrestler == 1) {
      rightKnee1(data.position);
    } else {
      rightKnee2(data.position);
    }
  });

  socket.on('leftElbow', function(data) {
    if (data.wrestler == 1) {
      leftElbow1(data.position);
    } else {
      leftElbow2(data.position);
    }
  });

  socket.on('rightElbow', function(data) {
    if (data.wrestler == 1) {
      rightElbow1(data.position);
    } else {
      rightElbow2(data.position);
    }
  });

  socket.on('torso', function(data) {
    if (data.wrestler == 1) {
      torso1(data.position);
    } else {
      torso2(data.position);
    }
  });

  socket.on('resetPlayer', function(player) {
    if (player == 1) {
      wrestler1.reset();
    } else {
      wrestler2.reset();
    }
  });

  socket.on('endPhrases', function() {
    module.exports.eventHandler('endPhrases');
  });
  socket.on('transparentComputers', function() {
    module.exports.eventHandler('transparentComputers');
  });
  socket.on('phoneShatter', function() {
    module.exports.eventHandler('phoneShatter');
  });
  socket.on('endPokes', function() {
    module.exports.eventHandler('endPokes');
  });
}

function moveDelta(bodypart, position, lastPos, divisor, directions) {
  if (!directions) directions = {x: true, y: true, z: true};

  var deltaX = 0;
  var deltaY = 0;
  var deltaZ = 0;

  if (directions.x) {
    deltaX = (position.x - lastPos.x) / divisor;
  }

  if (directions.y) {
    deltaY = (position.y - lastPos.y) / -divisor;
  }

  if (directions.z) {
    deltaZ = (position.z - lastPos.z) / -divisor;
  }

  if (bodypart.mesh) {
    if (bodypart.mesh.position.x + deltaX < module.exports.minPositions.x ||
      bodypart.mesh.position.x + deltaX > module.exports.maxPositions.x) {
          deltaX = 0;
    }
    if (bodypart.mesh.position.y + deltaY < module.exports.minPositions.y ||
      bodypart.mesh.position.y + deltaY > module.exports.maxPositions.y) {
        deltaY = 0;
    }
    if (bodypart.mesh.position.z + deltaZ < module.exports.minPositions.z ||
      bodypart.mesh.position.z + deltaZ > module.exports.maxPositions.z) {
        deltaZ = 0;
    }
  }

  bodypart.move(deltaX, deltaY, deltaZ);
}

function scaleWrestler(wrestler, rapidHeadTicks) {
  var s = 1.0 + 20.0 * (rapidHeadTicks / MAX_HEAD_SWELL);
  wrestler.swell(s);
}

function checkShatter(rapidHeadCount) {
  return rapidHeadCount >= MAX_HEAD_SWELL;
}

function delta(current, previous) {
  return {x: current.x - previous.x, y: current.y - previous.y, z: current.z - previous.z};
}

function totalMagnitude(pos) {
  return Math.abs(pos.x) + Math.abs(pos.y) + Math.abs(pos.z);
}

function phraseBlast(player, pos, vel) {
  var data = {player: player, pos: pos, vel: vel};
  module.exports.eventHandler('phraseBlast', data);
}

function rightHand1(position) {
  if (previousPositions.rightHand1) {
    if (module.exports.mode == module.exports.KNOCK || module.exports.mode == module.exports.RUN) {
      var denom = (module.exports.mode == module.exports.KNOCK)? 2.5 : 7;
      var directions = {x: true, y: true, z: true};
      if (module.exports.mode == module.exports.KNOCK) {
        directions.y = false;
        directions.x = false;
      }
      moveDelta(wrestler1.rightArm, position, previousPositions.rightHand1, denom, directions);
    }
    else if (module.exports.mode == module.exports.PHRASE) {
      var now = new Date();
      if (now - phraseGestureTimes.right1 >= MIN_TIME_BETWEEN_GESTURES) {
        var pdelta = delta(position, previousPositions.rightHand1);
        var vel = {
          x: pdelta.x * PHRASE_GESTURE_DELTA_MULT,
          y: pdelta.y * PHRASE_GESTURE_DELTA_MULT,
          z: pdelta.z * PHRASE_GESTURE_DELTA_MULT
        };
        if (totalMagnitude(vel) >= MIN_PHRASE_VEL) {
          var pos = phrasePos(false);

          phraseGestureTimes.right1 = now;
          phraseGestureVelocities.right1 = vel;
          phraseGestureStartPositions.right1 = pos;

          phraseBlast(1, pos, vel);
        }
      }
    }
  }

  previousPositions.rightHand1 = position;
}

function leftHand1(position) {
  if (previousPositions.rightHand1) {
    var rh = previousPositions.rightHand1;
    positionDeltas.hand1 = {x: position.x - rh.x, y: position.y - rh.y, z: position.z - rh.z};
    hand1DeltaAction(positionDeltas.hand1);
  }

  if (previousPositions.leftHand1) {
    if (module.exports.mode == module.exports.KNOCK || module.exports.mode == module.exports.RUN) {
      var denom = (module.exports.mode == module.exports.KNOCK)? 2.5 : 7;
      var directions = {x: true, y: true, z: true};
      if (module.exports.mode == module.exports.KNOCK) {
        directions.y = false;
        directions.x = false;
      }
      moveDelta(wrestler1.leftArm, position, previousPositions.leftHand1, denom, directions);
    }
    else if (module.exports.mode == module.exports.PHRASE) {
      var now = new Date();
      if (now - phraseGestureTimes.left1 >= MIN_TIME_BETWEEN_GESTURES) {
        var pdelta = delta(position, previousPositions.leftHand1);
        var vel = {
          x: pdelta.x * PHRASE_GESTURE_DELTA_MULT,
          y: pdelta.y * PHRASE_GESTURE_DELTA_MULT,
          z: pdelta.z * PHRASE_GESTURE_DELTA_MULT
        };
        if (totalMagnitude(vel) >= MIN_PHRASE_VEL) {
          var pos = phrasePos(true);

          phraseGestureTimes.left1 = now;
          phraseGestureVelocities.left1 = vel;
          phraseGestureStartPositions.left1 = pos;

          phraseBlast(1, pos, vel);
        }
      }
    }
  }

  previousPositions.leftHand1 = position;
}

function closestHand1(position) {}

function head1(position) {
  if (previousPositions.head1) {
    if (positionDeltas.torso1 && totalMagnitude(positionDeltas.torso1) < TORSO_CLOSE_MAG) {
      var positionChange = delta(position, previousPositions.head1);
      var mag = totalMagnitude(positionChange);

      if (mag > BIG_HEAD_MAG) {
        if (eventsWithRapidHeadVelocity.one == 0) {
          socket.emit('startSwell', 1);
        }

        eventsWithRapidHeadVelocity.one = Math.min(eventsWithRapidHeadVelocity.one + 1, MAX_HEAD_SWELL);
      } else {
        if (eventsWithRapidHeadVelocity.one == 1) {
          socket.emit('endSwell', 1);
        }

        eventsWithRapidHeadVelocity.one = Math.max(eventsWithRapidHeadVelocity.one - 1, 0);
      }

      if (module.exports.mode == module.exports.KNOCK) {
        if (checkShatter(eventsWithRapidHeadVelocity.one)) {
          module.exports.eventHandler('shatter', {});
        }

        //scaleWrestler(wrestler1, eventsWithRapidHeadVelocity.one);
      }

    }
  }

  previousPositions.head1 = position;
}

function leftKnee1(position) {
  if (previousPositions.rightKnee1) {
    var rh = previousPositions.rightKnee1;
    positionDeltas.knee1 = {x: position.x - rh.x, y: position.y - rh.y, z: position.z - rh.z};
    knee1DeltaAction(positionDeltas.knee1);
  }

  if (previousPositions.leftKnee1) {
    if (module.exports.mode == module.exports.KNOCK || module.exports.mode == module.exports.PHRASE) {
      moveDelta(wrestler1.leftLeg, position, previousPositions.leftKnee1, 8);
    }
  }

  previousPositions.leftKnee1 = position;
}

function rightKnee1(position) {
  if (previousPositions.rightKnee1) {
    if (module.exports.mode == module.exports.KNOCK || module.exports.mode == module.exports.PHRASE) {
      moveDelta(wrestler1.rightLeg, position, previousPositions.rightKnee1, 8);
    }
  }

  previousPositions.rightKnee1 = position;
}

function leftElbow1(position) {
  if (previousPositions.rightElbow1) {
    var rh = previousPositions.rightElbow1;
    positionDeltas.elbow1 = {x: position.x - rh.x, y: position.y - rh.y, z: position.z - rh.z};
    elbow1DeltaAction(positionDeltas.elbow1);
  }

  previousPositions.leftElbow1 = position;
}

function rightElbow1(position) {
  previousPositions.rightElbow1 = position;
}

function torso1(position) {
  if (previousPositions.torso1) {
    if (module.exports.mode == module.exports.KNOCK) {
      //moveDelta(wrestler1, position, previousPositions.torso1, 8, {x: false, y: false, z: true});
    }
    else if (module.exports.mode == module.exports.RUN) {
      var d = delta(position, previousPositions.torso1);
      var mag = totalMagnitude(d);
      var dist = TORSO_MOVEMENT_MAG_MULT * mag;
      wrestler1.move(d.x / 30, 0, dist);
    }

    positionDeltas.torso1 = delta(position, previousPositions.torso1);
  }

  previousPositions.torso1 = position;
}

function rightHand2(position)  {
  if (previousPositions.rightHand2) {
    if (module.exports.mode == module.exports.KNOCK || module.exports.mode == module.exports.RUN) {
      var denom = (module.exports.mode == module.exports.KNOCK)? 2.5 : 7;
      var directions = {x: true, y: true, z: true};
      if (module.exports.mode == module.exports.KNOCK) {
        directions.y = false;
        directions.x = false;
      }
      moveDelta(wrestler2.rightArm, position, previousPositions.rightHand2, denom, directions);
    }
    else if (module.exports.mode == module.exports.PHRASE) {
      var now = new Date();
      if (now - phraseGestureTimes.right2 >= MIN_TIME_BETWEEN_GESTURES) {
        var pdelta = delta(position, previousPositions.rightHand2);
        var vel = {
          x: pdelta.x * PHRASE_GESTURE_DELTA_MULT,
          y: pdelta.y * PHRASE_GESTURE_DELTA_MULT,
          z: pdelta.z * PHRASE_GESTURE_DELTA_MULT
        };
        if (totalMagnitude(vel) >= MIN_PHRASE_VEL) {
          var pos = phrasePos(false);

          phraseGestureTimes.right2 = now;
          phraseGestureVelocities.right2 = vel;
          phraseGestureStartPositions.right2 = pos;

          phraseBlast(2, pos, vel);
        }
      }
    }
  }

  previousPositions.rightHand2 = position;
}

function leftHand2(position) {
  if (previousPositions.rightHand2) {
    var rh = previousPositions.rightHand2;
    positionDeltas.hand2 = {x: position.x - rh.x, y: position.y - rh.y, z: position.z - rh.z};
    hand2DeltaAction(positionDeltas.hand2);
  }

  if (previousPositions.leftHand2) {
    if (module.exports.mode == module.exports.KNOCK || module.exports.mode == module.exports.RUN) {
      var denom = (module.exports.mode == module.exports.KNOCK)? 2.5 : 7;
      var directions = {x: true, y: true, z: true};
      if (module.exports.mode == module.exports.KNOCK) {
        directions.y = false;
        directions.x = false;
      }
      moveDelta(wrestler2.leftArm, position, previousPositions.leftHand2, denom, directions);
    }
    else if (module.exports.mode == module.exports.PHRASE) {
      var now = new Date();
      if (now - phraseGestureTimes.left2 >= MIN_TIME_BETWEEN_GESTURES) {
        var pdelta = delta(position, previousPositions.leftHand2);
        var vel = {
          x: pdelta.x * PHRASE_GESTURE_DELTA_MULT,
          y: pdelta.y * PHRASE_GESTURE_DELTA_MULT,
          z: pdelta.z * PHRASE_GESTURE_DELTA_MULT
        };
        if (totalMagnitude(vel) >= MIN_PHRASE_VEL) {
          var pos = phrasePos(true);

          phraseGestureTimes.left2 = now;
          phraseGestureVelocities.left2 = vel;
          phraseGestureStartPositions.left2 = pos;

          phraseBlast(2, pos, vel);
        }
      }
    }
  }

  previousPositions.leftHand2 = position;
}

function closestHand2(position) {

}

function head2(position) {
  if (previousPositions.head2) {
    if (positionDeltas.torso2 && totalMagnitude(positionDeltas.torso2) < TORSO_CLOSE_MAG) {
      var positionChange = delta(position, previousPositions.head2);
      var mag = totalMagnitude(positionChange);

      if (mag > BIG_HEAD_MAG) {
        if (eventsWithRapidHeadVelocity.two == 0) {
          socket.emit('startSwell', 2);
        }

        eventsWithRapidHeadVelocity.two = Math.min(eventsWithRapidHeadVelocity.two + 1, MAX_HEAD_SWELL);
      } else {
        if (eventsWithRapidHeadVelocity.two == 1) {
          socket.emit('endSwell', 2);
        }

        eventsWithRapidHeadVelocity.two = Math.max(eventsWithRapidHeadVelocity.two - 1, 0);
      }

      if (module.exports.mode == module.exports.KNOCK) {
        if (checkShatter(eventsWithRapidHeadVelocity.two)) {
          module.exports.eventHandler('shatter', {});
        }

        //scaleWrestler(wrestler2, eventsWithRapidHeadVelocity.two);
      }
    }
  }

  previousPositions.head2 = position;
}

function leftKnee2(position) {
  if (previousPositions.rightKnee2) {
    var rh = previousPositions.rightKnee2;
    positionDeltas.knee2 = {x: position.x - rh.x, y: position.y - rh.y, z: position.z - rh.z};
    knee2DeltaAction(positionDeltas.knee2);
  }

  if (previousPositions.leftKnee2) {
    if (module.exports.mode == module.exports.KNOCK || module.exports.mode == module.exports.PHRASE) {
      moveDelta(wrestler2.leftLeg, position, previousPositions.leftKnee2, 8, {x: true, y: true, z: true});
    }
  }

  previousPositions.leftKnee2 = position;
}

function rightKnee2(position) {
  if (previousPositions.rightKnee2) {
    if (module.exports.mode == module.exports.KNOCK || module.exports.mode == module.exports.PHRASE) {
      moveDelta(wrestler2.rightLeg, position, previousPositions.rightKnee2, 8, {x: true, y: true, z: true});
    }
  }

  previousPositions.rightKnee2 = position;
}

function leftElbow2(position) {
  if (previousPositions.rightElbow2) {
    var rh = previousPositions.rightElbow2;
    positionDeltas.elbow2 = {x: position.x - rh.x, y: position.y - rh.y, z: position.z - rh.z};
    elbow2DeltaAction(positionDeltas.elbow2);
  }

  previousPositions.leftElbow2 = position;
}

function rightElbow2(position) {
  previousPositions.rightElbow2 = position;
}

function torso2(position) {
  if (previousPositions.torso2) {
    if (module.exports.mode == module.exports.KNOCK) {
      //moveDelta(wrestler2, position, previousPositions.torso2, 8, {x: false, y: false, z: true});
    }
    else if (module.exports.mode == module.exports.RUN) {
      var d = delta(position, previousPositions.torso2);
      var mag = totalMagnitude(d);
      var dist = TORSO_MOVEMENT_MAG_MULT * mag;
      wrestler2.move(d.x / 30, 0, dist);
    }

    positionDeltas.torso2 = delta(position, previousPositions.torso2);
  }

  previousPositions.torso2 = position;
}

function hand1DeltaAction(positionDelta) {
  var mag = totalMagnitude(positionDelta);
  var date = new Date();

  if (mag < CLOSE_HANDS_MAG) {

  } else {

  }
}

function hand2DeltaAction(positionDelta) {
  var mag = totalMagnitude(positionDelta);
  var date = new Date();

  if (mag < CLOSE_HANDS_MAG) {

  } else {

  }
}

function knee1DeltaAction(positionDelta) {
  var mag = totalMagnitude(positionDelta);

  if (mag < CLOSE_KNEE_MAG) {

  } else {

  }
}

function knee2DeltaAction(positionDelta) {
  var mag = totalMagnitude(positionDelta);

  if (mag < CLOSE_KNEE_MAG) {

  } else {

  }
}

function elbow1DeltaAction(positionDelta) {
  var mag = totalMagnitude(positionDelta);

  if (mag > FAR_ELBOW_MAG && handsBetweenElbows(1)) {
    if (previousPositions.rightHand1.y < previousPositions.rightElbow1.y - 10 &&
        previousPositions.leftHand1.y > previousPositions.leftElbow1.y + 10) {

    } else {
      checkPlayer1ElbowNonRot(true, false);
    }

    if (previousPositions.rightHand1.y > previousPositions.rightElbow1.y + 10 &&
             previousPositions.leftHand1.y < previousPositions.leftElbow1.y - 10) {

    } else {
      checkPlayer1ElbowNonRot(false, true);
    }
  } else {
    checkPlayer1ElbowNonRot(true, true);
  }

  previousPositionDeltas.elbow1 = positionDelta;
}

function elbow2DeltaAction(positionDelta) {
  var mag = totalMagnitude(positionDelta);

  if (mag > FAR_ELBOW_MAG && handsBetweenElbows(2)) {
    if (previousPositions.rightHand2.y < previousPositions.rightElbow2.y - 10 &&
        previousPositions.leftHand2.y > previousPositions.leftElbow2.y + 10) {

    } else {
      checkPlayer2ElbowNonRot(true, false);
    }

    if (previousPositions.rightHand2.y > previousPositions.rightElbow2.y + 10 &&
             previousPositions.leftHand2.y < previousPositions.leftElbow2.y - 10) {

    } else {
      checkPlayer2ElbowNonRot(false, true);
    }
  } else {
    checkPlayer2ElbowNonRot(true, true);
  }

  previousPositionDeltas.elbow2 = positionDelta;
}

function checkPlayer1ElbowNonRot(rotUp, rotDown) {
  if (rotUp && elbowHistory.one.rotUp) {
    elbowHistory.one.rotUp = false;
  }

  if (rotDown && elbowHistory.one.rotDown) {
    elbowHistory.one.rotDown = false;
  }
}

function checkPlayer2ElbowNonRot(rotUp, rotDown) {
  if (rotUp && elbowHistory.two.rotUp) {
    elbowHistory.two.rotUp = false;
  }

  if (rotDown && elbowHistory.two.rotDown) {
    elbowHistory.two.rotDown = false;
  }
}

function handsBetweenElbows(playerNum) {
  var leftHand, rightHand, leftElbow, rightElbow;

  if (playerNum == 1) {
    leftHand = previousPositions.leftHand1;
    rightHand = previousPositions.rightHand1;
    leftElbow = previousPositions.leftElbow1;
    rightElbow = previousPositions.rightElbow1;
  } else {
    leftHand = previousPositions.leftHand2;
    rightHand = previousPositions.rightHand2;
    leftElbow = previousPositions.leftElbow2;
    rightElbow = previousPositions.rightElbow2;
  }

  if (!leftHand || !rightHand || !leftElbow || !rightElbow) return false;

  // left hand above and to right of left elbow
  // right hand below and to the left of the right elbow

  // left hand below and to the right of left elbow
  // right hand above and to the left of right elbow

  return (leftHand.x > leftElbow.x) && (rightHand.x < rightElbow.x);
}

},{}],13:[function(require,module,exports){

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

},{"./bodypart":5,"./lib/kutility":14,"./model_names":16}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
$(function() {

  var kt = require('./lib/kutility');
  var BodyPart = require('./bodypart');
  var Character = require('./character');
  var io = require('./io');
  var RonaldWord = require('./ronald_word');
  var Computer = require('./computer');
  var Artifact = require('./artifact');
  var mn = require('./model_names');
  var Hand = require('./hand');
  var Human = require('./human');
  var Billboard = require('./billboard');
  var Hotdog = require('./hotdog');
  var SKYBOX = require('./skybox');

  var TEST_MODE = false;
  var SKIP_PHRASE = false;

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

  var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 20000);
  camera.target = {x: 0, y: 0, z: 0};
  scene.add(camera);

  // mainLight shinin from above casting shadows and the like
  var mainLight = new THREE.DirectionalLight(0xffffff);
  mainLight.position.set(20, 20, -10);
  mainLight.target.position.copy(scene.position);
  mainLight.castShadow = true;
  scene.add(mainLight);

  var tonyRonaldVideo = document.querySelector('#tony-ronald');
  var chatroomVideo = document.querySelector('#chatroom');
  var walkLikeRonald = document.querySelector('#walk-like-ronald');
  var ronaldGUI = $('#ronald-gui');

  io.eventHandler = function(event, data) {
    if (event == 'phraseBlast') {
      var rw = new RonaldWord(data.player, undefined, {position: data.pos, velocity: data.vel});
      rw.addTo(scene);
      phraseState.phrases.push(rw);

      io.socket.emit('phrase', data.player, rw.phraseIndex, data.vel);
    }
    else if (event == 'shatter') {
      trappedState.startShatter();
    }
    else if (event == 'phoneShatter') {
      trappedState.doShatter();
    }
    else if (event == 'endPhrases') {
      phraseState.endScene();
    }
    else if (event == 'transparentComputers') {
      trappedState.makeTransparent();
    }
    else if (event == 'endPokes') {
      heavenState.stopPoking = true;
    }
  };

  /*
   * * * * * STATE OBJECTS * * * * *
   */

  var active = {ronalds: false, lighting: false, camera: false, phrases: false};
  var history = {lastArtifactTime: new Date()};

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

  kevinRonald = new Character({x: -700, y: -200, z: -1000}, 20);
  kevinRonald.addTo(scene);

  dylanRonald = new Character({x: -600, y: -200, z: -1000}, 20);
  dylanRonald.addTo(scene);
  var ronalds = [kevinRonald, dylanRonald];

  /*
   * * * * * STARTIN AND RENDERIN * * * * *
   */

  start();
  function start() {
    if (!TEST_MODE) {
      io.begin(kevinRonald, dylanRonald, camera);
    }

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
    if (lightFollowState.target) {
      mainLight.target.position.copy(lightFollowState.target);
      mainLight.position.addVectors(mainLight.target.position, lightFollowState.offset);
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

  function flash(text, timeout) {
    if (!text) return;
    if (!timeout) timeout = 275;

    $('#flash').text(text);
    $('#flash').show();
    setTimeout(function() {
      $('#flash').hide();
    }, timeout);
  }

  function artifactCollision(object) {
    var now = new Date();
    if (now - history.lastArtifactTime >= 150) {
      var player = (object.hostBody == kevinRonald)? 1 : 2;
      io.socket.emit('artifact', player);

      history.lastArtifactTime = now;
    }
  }

  function computerKnock(object) {
    var player = (object.hostBody == kevinRonald)? 1 : 2;
    io.socket.emit('knock', player);
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

  function tweenCamera(position, callback) {
    var tween = new TWEEN.Tween(camera.position).to(position)
    .easing(TWEEN.Easing.Linear.None).onUpdate(function() {
      console.log('got that update');
    }).onComplete(function() {
      callback();
    });
    tween.start();
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
    io.mode = io.PHRASE;

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

    if (TEST_MODE) {
      var phraseInterval = setInterval(function() {
        var rw = new RonaldWord();
        rw.addTo(scene);
        phraseState.phrases.push(rw);
      }, 500);
    }

    phraseState.endScene = function() {
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
    };

    if (TEST_MODE || SKIP_PHRASE) {
      setTimeout(function() {
        phraseState.endScene();
      }, 5000);
    }
  }

  function enterTrappedState() {
    flash('RONALD IS BORN');

    active.ronalds = true;
    active.trapped = true;
    io.mode = io.KNOCK;

    setCameraPosition(0, 0, 0);

    mainLight.position.set(0, 20, 0);
    mainLight.target.position.set(0, 5, -100);
    mainLight.intensity = 5.0;

    trappedState.ambientLight = new THREE.PointLight(0x40404, 1, 200);
    trappedState.ambientLight.position.set(0, 20, -100);
    scene.add(trappedState.ambientLight);

    kevinRonald.moveTo(-80, 8, -140);
    kevinRonald.rotate(0, Math.PI/4, 0);

    dylanRonald.moveTo(80, 8, -140);
    dylanRonald.rotate(0, -Math.PI/4, 0);

    makeArmsTransparent();
    changeArmOpacity(0);

    ronalds = [kevinRonald, dylanRonald];

    var mac = new Computer({x: -50, y: 0, z: -80}, 60, 10000, 200);
    mac.addTo(scene, function() {
      mac.rotate(0, Math.PI/8, 0);
    });
    mac.knockHandler = function(otherObject) {
      computerKnock(otherObject);
    };

    var pc = new Computer({x: 50, y: 0, z: -80}, 60, 10000, 200);
    pc.addTo(scene, function() {
      pc.rotate(0, -Math.PI/8, 0);
    });
    pc.knockHandler = function(otherObject) {
      computerKnock(otherObject);
    };

    trappedState.startShatter = function() {
      mac.shatterable = false;
      pc.shatterable = false;

      walkLikeRonald.play();
    };
    trappedState.doShatter = function() {
      mac.shatter();
      pc.shatter();
    };

    var shatterChecker = setInterval(function() {
      if (mac.shattering && pc.shattering) {
        clearInterval(shatterChecker);
        endScene();
      }
    }, 100);

    io.maxPositions = {x: 50, y: 50, z: -70};
    io.minPositions = {x: -50, y: -50, z: -400};

    trappedState.renderObjects = [mac, pc];
    trappedState.mac = mac;
    trappedState.pc = pc;

    kevinRonald.leftArm.collisionHandler = function() {
      kevinRonald.leftArm.move(-10, 0, -10);
    };
    kevinRonald.rightArm.collisionHandler = function() {
      kevinRonald.rightArm.move(-10, 0, -10);
    };
    dylanRonald.leftArm.collisionHandler = function() {
      dylanRonald.leftArm.move(-10, 0, -10);
    };
    dylanRonald.rightArm.collisionHandler = function() {
      dylanRonald.rightArm.move(-10, 0, -10);
    };

    var resetInterval = setInterval(function() {
      mac.reset();
      mac.rotate(0, Math.PI/8, 0);
      pc.reset();
      pc.rotate(0, -Math.PI/8, 0);
    }, 5000);

    var knockInterval = setInterval(function() {
      var arms = [kevinRonald.leftArm, kevinRonald.rightArm, dylanRonald.leftArm, dylanRonald.rightArm];
      arms.forEach(function(arm) {
        if (Math.abs(arm.mesh.position.z - mac.mesh.position.z) <= 18) {
          if (arm == kevinRonald.leftArm || arm == kevinRonald.rightArm) {
            mac.knock(arm);
          }
          else {
            pc.knock(arm);
          }
        }
      });
    }, 333);

    function changeArmOpacity(op) {
      var arms = [kevinRonald.leftArm, kevinRonald.rightArm, dylanRonald.leftArm, dylanRonald.rightArm];
      arms.forEach(function(arm) {
        arm.material.opacity = op;
      });
    }

    function makeArmsTransparent() {
      var arms = [kevinRonald.leftArm, kevinRonald.rightArm, dylanRonald.leftArm, dylanRonald.rightArm];
      arms.forEach(function(arm) {
        arm.mesh.material.transparent = true;
        arm.mesh.material.needsUpdate = true;
      });
    }

    trappedState.makeTransparent = function() {
      changeArmOpacity(1.0);

      var delta = TEST_MODE? 0.02 : 0.002;
      mac.becomeTransparent(delta, undefined, TEST_MODE);
      pc.becomeTransparent(delta, undefined, TEST_MODE);

      if (TEST_MODE || SKIP_PHRASE) {
        trappedState.startShatter();
        setTimeout(function() {
          trappedState.doShatter();
        }, 10000);
      }
    }

    if (TEST_MODE || SKIP_PHRASE) {
      setTimeout(function() {
        trappedState.makeTransparent();
      }, 4000);
    }

    function endScene() {
      console.log('IM DONE WITH COMPUTER!!!');
      clearInterval(resetInterval);
      clearInterval(knockInterval);

      var endCameraZ = -150;
      var panInterval = setInterval(function() {
        camera.position.z -= 2.5;
        if (camera.position.z <= endCameraZ) {
          clearInterval(panInterval);
          active.trapped = false;
          enterDesperateFleeState();
        }
      }, 15);
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
    io.maxPositions = {x: 20000, y: 20000, z: 20000};
    io.minPositions = {x: -20000, y: -20000, z: -20000};

    console.log('I AM DESPERATE NOW');
    flash('RONALD ESCAPES');
    io.socket.emit('running');

    kevinRonald.moveTo(-100, 5, -170);
    dylanRonald.moveTo(100, 5, -170);
    setCameraPosition(0, 40, -370);
    camera.lookAt({x: 0, y: 0, z: -100});

    var groundLength = 2500;
    var darkLength = 1000;
    var endRainZ = groundLength;
    var endZ = groundLength + darkLength;
    var numberOfArtifactTypes = 5;

    active.desperate = true;
    io.mode = io.RUN;

    var helicopter = {x: 0, y: 0, z: 0};
    var heliInterval = setInterval(function() {
      //helicopter.x = (Math.random() - 0.5);
      //helicopter.x = (Math.random() - 0.5);
    }, 6666);

    var camOffset = {x: 0, y: 40, z: -270};

    desperateState.render = function() {
      camOffset.x += helicopter.x;
      camOffset.y += helicopter.y;

      var middle = middlePosition(kevinRonald.head.mesh.position, dylanRonald.head.mesh.position);
      middle.z += 70;
      cameraFollowState.target = middle;
      cameraFollowState.offset = camOffset;
      lightFollowState.target = middle;
      lightFollowState.offset = {x: 10, y: 20, z: -60};

      if (middle.z > endZ) {
        endState();
      }
      else if (!desperateState.dark && middle.z > endRainZ) {
        darkTime();
      }
    };
    desperateState.physicsUpdate = function() {
      dylanRonald.resetMovement();
      kevinRonald.resetMovement();
    };

    var groundTexture = THREE.ImageUtils.loadTexture('/images/circuit.jpg');
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(6, 24);

    desperateState.ground_material = Physijs.createMaterial(
      new THREE.MeshBasicMaterial({map: groundTexture, side: THREE.DoubleSide}),
      .8, .4
    );
    desperateState.ground_geometry = new THREE.PlaneGeometry(500, groundLength * 2);
    desperateState.ground = new Physijs.BoxMesh(desperateState.ground_geometry, desperateState.ground_material, 0);
    desperateState.ground.rotation.x = -Math.PI / 2;
    desperateState.ground.position.y = -30;
    desperateState.ground.ground = true;
    scene.add(desperateState.ground);

    scene.setGravity(new THREE.Vector3(0, -100, 0));

    if (TEST_MODE) {
      var dummyForwardInterval = setInterval(function() {
        var z = Math.random() * 0.5 + 10;
        kevinRonald.walk(negrand(6), 0, z);
        dylanRonald.walk(negrand(6), 0, z);
      }, 30);
    }

    desperateState.artifacts = [];
    rainArtifacts();
    function rainArtifacts() {
      var middle = middlePosition(kevinRonald.head.mesh.position, dylanRonald.head.mesh.position);
      var future = {x: middle.x + negrand(400), y: kt.randInt(10), z: middle.z + Math.random() * 320 + 80};

      var percentageThroughRain = Math.min(0.99, Math.max(0, middle.z / endRainZ));
      var artifactIndex = Math.floor(percentageThroughRain * numberOfArtifactTypes);
      var artifact = new Artifact(future, Math.random() * 20 + 9.8, false, artifactIndex);
      artifact.humanCollisionHandler = function(otherObject) {
        artifactCollision(otherObject);
      };

      desperateState.artifacts.push(artifact);
      artifact.addTo(scene);

      if (desperateState.artifacts.length > 300) {
        var firstArtifact = desperateState.artifacts.shift();
        scene.remove(firstArtifact.mesh);
      }

      if (!desperateState.stopRaining) {
        setTimeout(rainArtifacts, kt.randInt(250, 90));
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
      if (TEST_MODE) clearInterval(dummyForwardInterval);
      clearInterval(heliInterval);

      active.desperate = false;
      enterHeavenState();
    }
  }

  function enterHeavenState(startGrassZ) {
    console.log('I AM HEAVEN NOW');
    flash('RONALD LIVES');
    io.socket.emit('heaven');

    if (!startGrassZ) startGrassZ = 4500;

    var groundLength = 3000;
    var heavenGroundZ = startGrassZ + groundLength / 2;
    var massiveComputerZ = startGrassZ + groundLength;
    var numberOfArtifactTypes = 5;
    var grassPath = '/images/grass.jpg';

    active.heaven = true;
    var grassMeshes = [];

    var patchTexture = THREE.ImageUtils.loadTexture(grassPath);
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
          var grassMaterial = new THREE.MeshBasicMaterial({
            map: patchTexture,
            side: THREE.DoubleSide
          });
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

      if (middle.z >= massiveComputerZ - 1150 && !heavenState.visualizedComputer) {
        heavenState.visualizedComputer = true;
        heavenState.massiveComputer.material.opacity = 0.33;
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

    heavenState.skybox = SKYBOX.create(undefined, '/images/mountain.jpg');
    scene.add(heavenState.skybox);

    heavenState.skyBlocker = SKYBOX.blocker();
    scene.add(heavenState.skyBlocker);

    var grassTexture = THREE.ImageUtils.loadTexture(grassPath);
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(4, 20);

    heavenState.ground_material = Physijs.createMaterial(
      new THREE.MeshBasicMaterial({map: grassTexture, side: THREE.DoubleSide}),
      .8, .4
    );
    heavenState.ground_geometry = new THREE.PlaneGeometry(500, groundLength);
    heavenState.ground = new Physijs.BoxMesh(heavenState.ground_geometry, heavenState.ground_material, 0);
    heavenState.ground.rotation.x = -Math.PI / 2;
    heavenState.ground.position.y = -30;
    heavenState.ground.position.z = heavenGroundZ;
    heavenState.ground.ground = true;
    scene.add(heavenState.ground);

    heavenState.massiveComputer = new Computer({x: 0, y: 300, z: massiveComputerZ}, 600, 1000, 200);
    heavenState.massiveComputer.knockHandler = function(otherObject) {
      computerKnock(otherObject);
    };
    heavenState.massiveComputer.twitchIntensity = 5;
    heavenState.massiveComputer.addTo(scene, function() {
      heavenState.massiveComputer.material.opacity = 0.01;
    });

    if (TEST_MODE) {
      var dummyForwardInterval = setInterval(function() {
        var z = Math.random() * 0.5 + 10;
        kevinRonald.walk(negrand(3), 0, z);
        dylanRonald.walk(negrand(3), 0, z);
      }, 30);
    }

    heavenState.artifacts = [];
    function rainArtifacts() {
      var middle = middlePosition(kevinRonald.head.mesh.position, dylanRonald.head.mesh.position);

      var z = (heavenState.artifactZOffset)? heavenState.artifactZOffset() : Math.random() * 200 + 80;
      var future = {x: middle.x + negrand(400), y: kt.randInt(10), z: middle.z + z};

      var percentageThroughGrass = Math.min(0.99, Math.max(0, (middle.z - startGrassZ) / (massiveComputerZ - startGrassZ)));
      var artifactIndex = Math.floor(percentageThroughGrass * numberOfArtifactTypes);
      var artifact = new Artifact(future, Math.random() * 20 + 9.8, true, artifactIndex);
      artifact.humanCollisionHandler = function(otherObject) {
        artifactCollision(otherObject);
      };

      heavenState.artifacts.push(artifact);
      artifact.addTo(scene);

      if (heavenState.artifacts.length > 300) {
        var firstArtifact = heavenState.artifacts.shift();
        scene.remove(firstArtifact.mesh);
      }

      heavenState.skyBlocker.material.opacity = Math.max(0, heavenState.skyBlocker.material.opacity - 0.01);
      heavenState.skyBlocker.material.needsUpdate = true;

      if (!heavenState.stopRaining) {
        setTimeout(rainArtifacts, kt.randInt(250, 90));
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
      if (TEST_MODE) clearInterval(dummyForwardInterval);

      heavenState.artifactZOffset = function() {return (Math.random() - 0.5) * -12};

      var currentTarget = cameraFollowState.target;
      var initY = currentTarget.y;
      cameraFollowState.target = null;
      cameraFollowState.offset = null;
      var aimCameraUpInterval = setInterval(function() {
        currentTarget.y += 0.4;
        camera.lookAt(currentTarget);

        if (currentTarget.y >= initY + 40) {
          clearInterval(aimCameraUpInterval);
          scene.remove(heavenState.skybox);
          scene.remove(heavenState.skyBlocker);
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
          heavenState.bigGirlHand.mesh.humanPart = true;

          var material = heavenState.bigGirlHand.materials[0];
          material.color = new THREE.Color(198, 120, 86);
          material.needsUpdate = true;

          pokeHandMany(z, function() {
            io.socket.emit('noHeaven');
            
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
        var maxPokes = TEST_MODE? 3 : 1000;

        poke();
        function poke() {
          hand.pokeUntilCollision(dist, function() {
            pokeCount += 1;
            if (!heavenState.stopPoking && pokeCount < maxPokes) {
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
    flash('RONALD?');
    active.endgame = true;
    io.mode = -1;

    scene.setGravity(new THREE.Vector3(0, 0, 0));

    // modify things from previous state y not
    heavenState.bigGirlHand.move(-300, 170, 400);
    linux.material.opacity = 0.975;
    linux.reset();
    linux.mesh.position.y = 200;
    kevinRonald.move(0, -5, -25);
    dylanRonald.move(0, -5, -25);

    var skybox = SKYBOX.create();
    scene.add(skybox);

    var girlZ = linux.mesh.position.z + 200;
    cameraFollowState.target = {x: 0, y: 50, z: girlZ};
    cameraFollowState.offset = {x: 500, y: 25, z: 50};
    lightFollowState.target = cameraFollowState.target;
    lightFollowState.offset = {x: 0, y: 40, z: 0};

    finalState.girl = new Human({x: 295, y: 50, z: girlZ - 10}, 29, 'girl');
    finalState.girl.addTo(scene);

    finalState.boy = new Human({x: -300, y: 50, z: girlZ - 50}, 45, 'boy');
    finalState.boy.addTo(scene);

    var tonyRonaldVideoStruct = {vid: tonyRonaldVideo};
    finalState.tonyRonaldScreen = new Billboard({x: -127, y: 280, z: girlZ - 165}, 1, tonyRonaldVideoStruct);
    finalState.tonyRonaldScreen.addTo(scene);

    var chatroomVideoStruct = {vid: chatroomVideo, width: 340, height: 120};
    finalState.chatroomScreen = new Billboard({x: -100, y: 75, z: girlZ - 165}, 1, chatroomVideoStruct);
    finalState.chatroomScreen.addTo(scene);

    finalState.hotdog = new Hotdog({x: 30, y: 110, z: girlZ - 145}, 25);
    finalState.hotdog.addTo(scene);

    finalState.keyboard = new BodyPart({x: 0, y: -10, z: girlZ - 30}, 15, '/js/models/keyboard.js');
    finalState.keyboard.addTo(scene);

    fadeOverlay(false, function() {
      girlGonnaTalkNow();
    }, null);

    finalState.render = function() {
      finalState.girl.render();
      if (finalState.tonyRonaldScreen) finalState.tonyRonaldScreen.render();
      if (finalState.chatroomScreen) finalState.chatroomScreen.render();
    };
    finalState.physicsUpdate = function() {

    };

    function girlGonnaTalkNow() {
      console.log('can you see me, ronald?');

      setTimeout(function() {
        tonyRonaldVideo.play();
        chatroomVideo.play();
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
      var panTimes = 0;
      var panInterval = setInterval(function() {
        moveTowardsTarget(cameraFollowState.target, camTarget, amt);
        moveTowardsTarget(cameraFollowState.offset, camOffset, amt);
        moveTowardsTarget(lightFollowState.target, lightTarget, amt);
        moveTowardsTarget(lightFollowState.offset, lightOffset, amt);

        panTimes += 1;
        if (panTimes >= 1000) {
          startComputerActivity();
        }

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

      ronaldGUI.fadeIn(800);
    }

    // fallbacks to position the GUI
    finalState.movingGUI = false;
    $('body').keypress(function(ev) {
      ev.preventDefault();

      if (ev.which == 98) { // b
        finalState.movingGUI = !finalState.movingGUI;
      }
    });
    $('body').mousemove(function(ev) {
      if (finalState.movingGUI) {
        console.log(parseInt(ronaldGUI.css('left')));
        console.log(parseInt(ronaldGUI.css('top')));

        ronaldGUI.css('left', ev.clientX + 'px');
        ronaldGUI.css('top', ev.clientY + 'px');
      }
    });

    // reacting to button clicks in the GUI
    $('.ronald-button').click(function(ev) {
      var target = $(ev.target);
      var id = target[0].id;
      var shirtNumber = parseInt(id.replace('shirt', ''));
      finalState.hotdog.changeTeeShirt(shirtNumber);
      io.socket.emit('rock', shirtNumber);
    });
  }

});

},{"./artifact":2,"./billboard":3,"./bodypart":5,"./character":6,"./computer":7,"./hand":8,"./hotdog":10,"./human":11,"./io":12,"./lib/kutility":14,"./model_names":16,"./ronald_word":17,"./skybox":18}],16:[function(require,module,exports){

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

module.exports.TWEEN_GIRL = pre('manga.js');
module.exports.BOY = pre('chubby.js');

/* FUNCTIONS */

module.exports.loadModel = function(modelName, callback) {
  var loader = new THREE.JSONLoader;

  loader.load(modelName, function (geometry, materials) {
    callback(geometry, materials);
  });
}

},{}],17:[function(require,module,exports){
var kt = require('./lib/kutility');

module.exports = RonaldWord;

var player1PhraseBank = [
  'RONALD',
  'MY FRIEND RONALD LIVES INSIDE THE COMPUTER',
  'MY FRIEND RONALD',
  'MY FRIEND RONALD LIVES IN THE COMPUTER TRASH CAN',
  'RONALD EATS ALL THE COMPUTER TRASH',
  'MY FRIEND RONALD SMOKES WEED',
  "MY FRIEND RONALD'S DEAD",
  'MY FRIEND RONALD USES ADOBE CREATIVE CLOUD',
  'MY FRIEND RONALD HAS A STARTUP',
  'MY FRIEND RONALD NEVER HAS TO GO OUTSIDE',
  "RONALD'S NOT AFRAID",
  "WHERE'D YOU GO, RONALD?",
  'MY FRIEND RONALD WEARS BAND TEES',
  'MY FRIEND RONALD HAS DESIRES',
  'MY FRIEND RONALD SEEKS CLOSURE',
  'MY FRIEND RONALD HELPS ME ESCAPE'
];

var player2PhraseBank =  [
  'I SEE MY FRIEND RONALD INSIDE OF EVERYONE',
  'MY FRIEND RONALD IS ON SNAPCHAT',
  'MY FRIEND RONALD BETA TESTED IOS 8',
  'MY FRIEND RONALD IS A DEVELOPER',
  'MY FRIEND RONALD PREFERS XBOX',
  'MY FRIEND RONALD HAS CONNECTIONS',
  'MY FRIEND RONALD WAKES UP EVERY MORNING WITH A SMILE',
  "RONALD'S ONLY FRIEND IS ME",
  'MY ONLY FRIEND IS RONALD',
  'MY FRIEND RONALD USES VSCO CAM',
  'MY FRIEND RONALD LOVES TV PARTY',
  'RONALD USES ANGULAR.JS FOR FRONTEND WEB DEVELOPMENT',
  "RONALD'S FAVORITE TRASH IS PICTURES",
  "RONALD'S HOME IS TRASH",
  "MY FRIEND RONALD IS AN EXPERT WHEN IT COMES TO CLEANING COMPUTERS",
  'YOU HAVE TO FEED MY FRIEND RONALD TRASH OR HE WILL DIE'
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

function RonaldWord(player, phrase, config) {
  if (!player) {
    player = 1;
  }

  var phraseBank = (player == 1)? player1PhraseBank : player2PhraseBank;
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

  this.phraseIndex = phraseBank.indexOf(phrase) + 1;
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

},{"./lib/kutility":14}],18:[function(require,module,exports){

var kt = require('./lib/kutility');

var girlRoomPath = '/images/girl_room.jpg';

function cubify(url) {
  return [url, url, url, url, url, url];
}

function makeCubemap(textureURL, repeatX, repeatY) {
  if (!textureURL) return;
  if (!repeatX) repeatX = 4;
  if (!repeatY) repeatY = 4;

  var textureCube = cubify(textureURL);

  var cubemap = THREE.ImageUtils.loadTextureCube(textureCube); // load textures
  cubemap.format = THREE.RGBFormat;
  cubemap.wrapS = THREE.RepeatWrapping;
  cubemap.wrapT = THREE.RepeatWrapping;
  cubemap.repeat.set(repeatX, repeatY);

  return cubemap;
}

function makeShader(cubemap) {
  var shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
  shader.uniforms['tCube'].value = cubemap; // apply textures to shader
  return shader;
}

function skyboxMaterial(textureURL) {
  var cubemap = makeCubemap(textureURL);
  var shader = makeShader(cubemap);

  return new THREE.ShaderMaterial({
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide,
    opacity: 0.5
  });
}

module.exports.create = function(size, textureURL) {
  if (!textureURL) textureURL = girlRoomPath;
  if (!size) size = {x: 20000, y: 20000, z: 20000};

  var geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
  var material = skyboxMaterial(textureURL);
  return new THREE.Mesh(geometry, material);
}

module.exports.blocker = function(size) {
  if (!size) size = {x: 19500, y: 19500, z: 19500};

  var geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
  var material = new THREE.MeshBasicMaterial({
      color: 0x000000
    , side: THREE.DoubleSide
    , opacity: 1.0
    , transparent: true
  });
  return new THREE.Mesh(geometry, material);
}

},{"./lib/kutility":14}]},{},[15])