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

},{"./bodypart":3,"./lib/kutility":14,"./model_names":17}],2:[function(require,module,exports){

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

  this.modelChoices = [modelNames.BABY_TORSO, /*modelNames.FOOTBALL_TORSO,*/ modelNames.LOWPOLY_TORSO];
}

Body.prototype.__proto__ = BodyPart.prototype;

Body.prototype.additionalInit = function() {
  var self = this;

  if (self.modelName == modelNames.BABY_TORSO) {
    self.scale *= 0.75;
    self.scaleBody(self.scale);
    self.move(1.5, 6, 0);
  } else if (self.modelName == modelNames.FOOTBALL_TORSO) {
    self.scale *= 7.5;
    self.scaleBody(self.scale);
    self.move(-2, -24, 0);
  } else if (self.modelName == modelNames.LOWPOLY_TORSO) {
    self.move(0, -15, -4);
  }
};

},{"./bodypart":3,"./lib/kutility":14,"./model_names":17}],3:[function(require,module,exports){
var kt = require('./lib/kutility');

var modelNames = require('./model_names');

module.exports = BodyPart;

function BodyPart(startPos, scale) {
  this.modelChoices = [];

  this.melting = false;
}

BodyPart.prototype.move = function(x, y, z) {
  if (!this.mesh) return;

  this.mesh.position.x += x;
  this.mesh.position.y += y;
  this.mesh.position.z += z;
}

BodyPart.prototype.rotate = function(rx, ry, rz) {
  if (!this.mesh) return;

  this.mesh.rotation.x += rx;
  this.mesh.rotation.y += ry;
  this.mesh.rotation.z += rz;
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

BodyPart.prototype.addTo = function(scene, callback) {
  var self = this;

  self.modelName = self.specificModelName || kt.choice(self.modelChoices);

  modelNames.loadModel(self.modelName, function (geometry, materials) {
    self.geometry = geometry;
    self.materials = materials;

    self.mesh = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));

    self.scaleBody(self.scale);

    self.moveTo(self.startX, self.startY, self.startZ);

    self.additionalInit();

    self.initialPosition = {x: self.mesh.position.x, y: self.mesh.position.y, z: self.mesh.position.z};
    self.initialScale = {x: self.mesh.scale.x, y: self.mesh.scale.y, z: self.mesh.scale.z};
    self.initialRotation = {x: self.mesh.rotation.x, y: self.mesh.rotation.y, z: self.mesh.rotation.z};

    self.initialMaterialColors = [];
    self.materials.forEach(function(mat) {
      self.initialMaterialColors.push(mat.color);
    });

    self.verts = geometry.vertices;

    self.originalVertices = [];
    for (var i = 0; i < self.verts.length; i++) {
      var vert = self.verts[i];
      self.originalVertices.push({x: vert.x, y: vert.y, z: vert.z});
    }

    self.resetMeltParameters();
    self.meltIntensity = 0.1;

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

  this.additionalRender();
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

},{"./lib/kutility":14,"./model_names":17}],4:[function(require,module,exports){

var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = BoxingRing;

function BoxingRing(startPos, scale) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.scale = scale || 1;

  this.specificModelName = modelNames.BOXING_RING;
}

BoxingRing.prototype.__proto__ = BodyPart.prototype;

BoxingRing.prototype.additionalInit = function() {

};

},{"./bodypart":3,"./lib/kutility":14,"./model_names":17}],5:[function(require,module,exports){

var element = document.body;

var cam = {};

var kt = require('./lib/kutility');

function onWindowResize() {
	cam.aspect = window.innerWidth / window.innerHeight;
	cam.updateProjectionMatrix();
}

module.exports = exports = Camera;

function Camera(window, scene, config) {
	if (!config) config = {};
	if (!config.near) config.near = 0.1;
	if (!config.far) config.far = 20000;


  this.cam = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, config.near, config.far);
	cam = this.cam;

  window.addEventListener('resize', onWindowResize, false);

  this.window = window;

	this.objects = [];
}

Camera.prototype.addObject = function(object) {
	this.objects.push(object);
}

Camera.prototype.render = function() {
	// doesn't actually need to do anything yet
}

},{"./lib/kutility":14}],6:[function(require,module,exports){

var kt = require('./lib/kutility');

var modelNames = require('./model_names');
var Arm = require('./arm');
var Leg = require('./leg');
var Head = require('./head');
var Body = require('./body');
var Hand = require('./hand');
var Foot = require('./foot');

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

  this.leftHand = new Hand({x: this.startX - scale, y: this.startY - scale, z: this.startZ}, scale, 'left');

  this.rightHand = new Hand({x: this.startX + scale, y: this.startY - scale, z: this.startZ}, scale, 'right');

  this.leftLeg = new Leg({x: this.startX - scale * 0.4, y: this.startY - scale * 0.75, z: this.startZ}, scale);

  this.rightLeg = new Leg({x: this.startX + scale * 0.4, y: this.startY - scale * 0.75, z: this.startZ}, scale);

  this.leftFoot = new Foot({x: this.startX - scale * 0.5, y: this.startY - scale * 1.5, z: this.startZ}, scale, 'left');

  this.rightFoot = new Foot({x: this.startX + scale * 0.5, y: this.startY - scale * 1.5, z: this.startZ}, scale, 'right');

  this.torso = new Body({x: this.startX, y: this.startY, z: this.startZ}, scale);

  this.head = new Head({x: this.startX, y: this.startY + 0.25 * scale, z: this.startZ}, scale);

  this.bodyParts = [this.leftArm, this.rightArm,
                    this.leftHand, this.rightHand,
                    this.leftLeg, this.rightLeg,
                    this.leftFoot, this.rightFoot,
                    this.torso, this.head];

  this.twitching = false; // random motion and rotation

  this.melting = false; // bone shaking
}

Character.prototype.addTo = function(scene) {
  this.scene = scene;

  this.bodyParts.forEach(function(part) {
    part.addTo(scene);
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

Character.prototype.moveTo = function(x, y, z) {
  var dx = x - this.position.x;
  var dy = y - this.position.y;
  var dz = z - this.position.z;

  this.move(dx, dy, dz);
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

},{"./arm":1,"./body":2,"./foot":9,"./hand":10,"./head":11,"./leg":13,"./lib/kutility":14,"./model_names":17}],7:[function(require,module,exports){

var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Computer;

function Computer(startPos, scale) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.scale = scale || 1;

  this.specificModelName = modelNames.LAPTOP;
}

Computer.prototype.__proto__ = BodyPart.prototype;

Computer.prototype.additionalInit = function() {

};

},{"./bodypart":3,"./lib/kutility":14,"./model_names":17}],8:[function(require,module,exports){

var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = FitnessTower;

function FitnessTower(startPos, scale) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.scale = scale || 1;

  this.specificModelName = modelNames.FITNESS_TOWER;
}

FitnessTower.prototype.__proto__ = BodyPart.prototype;

FitnessTower.prototype.additionalInit = function() {

};

FitnessTower.prototype.additionalRender = function() {
  this.move(posNegRandom(0.04), posNegRandom(0.04), posNegRandom(0.04));
};

function posNegRandom(max) {
  if (!max) max = 1;

  return (Math.random() - 0.5) * 2 * max;
}

},{"./bodypart":3,"./lib/kutility":14,"./model_names":17}],9:[function(require,module,exports){

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

},{"./bodypart":3,"./lib/kutility":14,"./model_names":17}],10:[function(require,module,exports){

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

},{"./bodypart":3,"./lib/kutility":14,"./model_names":17}],11:[function(require,module,exports){

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

},{"./bodypart":3,"./lib/kutility":14,"./model_names":17}],12:[function(require,module,exports){

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

var BIG_HEAD_MAG = 15;
var MAX_HEAD_SWELL = 500;
var TORSO_CLOSE_MAG = 11;

var CLOSE_KNEE_MAG = 60;
var CLOSE_ELBOW_MAG = 60;
var FAR_ELBOW_MAG = 300;
var RIDICULOUS_ELBOW_MAG = 600;

var CLOSE_HANDS_MAG = 100;

var wrestler1, wrestler2, camera, light;

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
    console.log('big reset');

    if (player == 1) {
      wrestler1.reset();
    } else {
      wrestler2.reset();
    }
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

  bodypart.move(deltaX, deltaY, deltaZ);
}

function scaleWrestler(wrestler, rapidHeadTicks) {
  var s = 1.0 + 20.0 * (rapidHeadTicks / MAX_HEAD_SWELL);
  wrestler.swell(s);
}

function delta(current, previous) {
  return {x: current.x - previous.x, y: current.y - previous.y, z: current.z - previous.z};
}

function totalMagnitude(pos) {
  return Math.abs(pos.x) + Math.abs(pos.y) + Math.abs(pos.z);
}

function rightHand1(position) {
  if (previousPositions.rightHand1) {
    [wrestler1.rightHand, wrestler1.rightArm].forEach(function(part) {
      moveDelta(part, position, previousPositions.rightHand1, 10);
    });
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
    [wrestler1.leftHand, wrestler1.leftArm].forEach(function(part) {
      moveDelta(part, position, previousPositions.leftHand1, 10);
    });
  }

  previousPositions.leftHand1 = position;
}

function closestHand1(position) {

}

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

      scaleWrestler(wrestler1, eventsWithRapidHeadVelocity.one);
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
    [wrestler1.leftLeg, wrestler1.leftFoot].forEach(function(part) {
      moveDelta(part, position, previousPositions.leftKnee1, 8);
    });
  }

  previousPositions.leftKnee1 = position;
}

function rightKnee1(position) {
  if (previousPositions.rightKnee1) {
    [wrestler1.rightLeg, wrestler1.rightFoot].forEach(function(part) {
      moveDelta(part, position, previousPositions.rightKnee1, 8);
    });
  }

  previousPositions.rightKnee1 = position;
}

function leftElbow1(position) {
  if (previousPositions.rightElbow1) {
    var rh = previousPositions.rightElbow1;
    positionDeltas.elbow1 = {x: position.x - rh.x, y: position.y - rh.y, z: position.z - rh.z};
    elbow1DeltaAction(positionDeltas.elbow1);
  }

  light.target.position = position;

  previousPositions.leftElbow1 = position;
}

function rightElbow1(position) {
  light.intensity = Math.abs(position.y) / 30;
  previousPositions.rightElbow1 = position;
}

function torso1(position) {
  if (previousPositions.torso1) {
    moveDelta(wrestler1, position, previousPositions.torso1, 8, {x: true, y: false, z: true});

    positionDeltas.torso1 = delta(position, previousPositions.torso1);
  }

  previousPositions.torso1 = position;
}

function rightHand2(position)  {
  if (previousPositions.rightHand2) {
    [wrestler2.rightHand, wrestler2.rightArm].forEach(function(part) {
      moveDelta(part, position, previousPositions.rightHand2, 10, {x: true, y: false, z: true});
    });
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
    [wrestler2.leftHand, wrestler2.leftArm].forEach(function(part) {
      moveDelta(part, position, previousPositions.leftHand2, 10);
    });
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

      scaleWrestler(wrestler2, eventsWithRapidHeadVelocity.two);
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
    [wrestler2.leftLeg, wrestler2.leftFoot].forEach(function(part) {
      moveDelta(part, position, previousPositions.leftKnee2, 8, {x: true, y: true, z: true});
    });
  }

  previousPositions.leftKnee2 = position;
}

function rightKnee2(position) {
  if (previousPositions.rightKnee2) {
    [wrestler2.rightLeg, wrestler2.rightFoot].forEach(function(part) {
      moveDelta(part, position, previousPositions.rightKnee2, 8, {x: true, y: true, z: true});
    });
  }

  previousPositions.rightKnee2 = position;
}

function leftElbow2(position) {
  if (previousPositions.rightElbow2) {
    var rh = previousPositions.rightElbow2;
    positionDeltas.elbow2 = {x: position.x - rh.x, y: position.y - rh.y, z: position.z - rh.z};
    elbow2DeltaAction(positionDeltas.elbow2);
  }

  var mag = totalMagnitude(position);
  light.distance = position.y;

  previousPositions.leftElbow2 = position;
}

function rightElbow2(position) {
  var mag = totalMagnitude(position);
  light.angle = Math.PI / 2 * Math.min(1, (Math.abs(position.y) / 400));

  previousPositions.rightElbow2 = position;
}

function torso2(position) {
  if (previousPositions.torso2) {
    moveDelta(wrestler2, position, previousPositions.torso2, 8);

    positionDeltas.torso2 = delta(position, previousPositions.torso2);
  }

  previousPositions.torso2 = position;
}

function hand1DeltaAction(positionDelta) {
  var mag = totalMagnitude(positionDelta);
  var date = new Date();

  if (mag < CLOSE_HANDS_MAG) {
    if (!meltingHistory.one.melting && date - meltingHistory.one.meltEndTime > 1500) {
      meltingHistory.one.melting = true;
      meltingHistory.one.meltStartTime = new Date();
      wrestler1.melting = true;
    }

    var intensity = (CLOSE_HANDS_MAG - mag) * 0.01 + 0.03;
    wrestler1.meltIntensity = intensity;
  } else {
    if (meltingHistory.one.melting && date - meltingHistory.one.meltStartTime > 1500) {
      meltingHistory.one.melting = false;
      meltingHistory.one.meltEndTime = date;
      wrestler1.cancelMelt(true);
    }
  }

  socket.emit('handDelta', 1, mag);
}

function hand2DeltaAction(positionDelta) {
  var mag = totalMagnitude(positionDelta);
  var date = new Date();

  if (mag < CLOSE_HANDS_MAG) {
    if (!meltingHistory.two.melting && date - meltingHistory.two.meltEndTime > 1500) {
      meltingHistory.two.melting = true;
      meltingHistory.two.meltStartTime = new Date();
      wrestler2.melting = true;
    }

    var intensity = (CLOSE_HANDS_MAG - mag) * 0.01 + 0.03;
    wrestler2.meltIntensity = intensity;
  } else {
    if (meltingHistory.two.melting && date - meltingHistory.two.meltStartTime > 1500) {
      meltingHistory.two.melting = false;
      meltingHistory.two.meltEndTime = date;
      wrestler2.cancelMelt(true);
    }
  }

  socket.emit('handDelta', 2, mag);
}

function knee1DeltaAction(positionDelta) {
  var mag = totalMagnitude(positionDelta);

  if (mag < CLOSE_KNEE_MAG) {
    if (!kneeHistory.one.rotating) {
      socket.emit('startKnees', 1);
      kneeHistory.one.rotating = true;
    }

    wrestler1.rotate(0, 0.1, 0);
  } else {
    if (kneeHistory.one.rotating) {
      socket.emit('endKnees', 1);
      kneeHistory.one.rotating = false;
    }
  }
}

function knee2DeltaAction(positionDelta) {
  var mag = totalMagnitude(positionDelta);

  if (mag < CLOSE_KNEE_MAG) {
    if (!kneeHistory.two.rotating) {
      socket.emit('startKnees', 2);
      kneeHistory.two.rotating = true;
    }

    wrestler2.rotate(0, -0.1, 0);
  } else {
    if (kneeHistory.two.rotating) {
      socket.emit('endKnees', 2);
      kneeHistory.two.rotating = false;
    }
  }
}

function elbow1DeltaAction(positionDelta) {
  var mag = totalMagnitude(positionDelta);

  if (mag > FAR_ELBOW_MAG && handsBetweenElbows(1)) {
    if (previousPositions.rightHand1.y < previousPositions.rightElbow1.y - 10 &&
        previousPositions.leftHand1.y > previousPositions.leftElbow1.y + 10) {
          if (!elbowHistory.one.rotUp) {
            elbowHistory.one.rotUp = true;
            socket.emit('startElbowRotUp', 1);
          }

          wrestler1.rotate(0.08, 0, 0);
    } else {
      checkPlayer1ElbowNonRot(true, false);
    }

    if (previousPositions.rightHand1.y > previousPositions.rightElbow1.y + 10 &&
             previousPositions.leftHand1.y < previousPositions.leftElbow1.y - 10) {

          if (!elbowHistory.one.rotDown) {
            elbowHistory.one.rotDown = true;
            socket.emit('startElbowRotDown', 1);
          }

          wrestler1.rotate(-0.08, 0, 0);
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
          if (!elbowHistory.two.rotUp) {
            elbowHistory.two.rotUp = true;
            socket.emit('startElbowRotUp', 2);
          }

          wrestler2.rotate(-0.08, 0, 0);
    } else {
      checkPlayer2ElbowNonRot(true, false);
    }

    if (previousPositions.rightHand2.y > previousPositions.rightElbow2.y + 10 &&
             previousPositions.leftHand2.y < previousPositions.leftElbow2.y - 10) {

          if (!elbowHistory.two.rotDown) {
            elbowHistory.two.rotDown = true;
            socket.emit('startElbowRotDown', 2);
          }

          wrestler2.rotate(0.08, 0, 0);
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
    socket.emit('endElbowRotUp', 1);
  }

  if (rotDown && elbowHistory.one.rotDown) {
    elbowHistory.one.rotDown = false;
    socket.emit('endElbowRotDown', 1);
  }
}

function checkPlayer2ElbowNonRot(rotUp, rotDown) {
  if (rotUp && elbowHistory.two.rotUp) {
    elbowHistory.two.rotUp = false;
    socket.emit('endElbowRotUp', 2);
  }

  if (rotDown && elbowHistory.two.rotDown) {
    elbowHistory.two.rotDown = false;
    socket.emit('endElbowRotDown', 2);
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

},{"./bodypart":3,"./lib/kutility":14,"./model_names":17}],14:[function(require,module,exports){
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

var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Locker;

function Locker(startPos, scale) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.scale = scale || 1;

  this.specificModelName = modelNames.LOCKER;
}

Locker.prototype.__proto__ = BodyPart.prototype;

Locker.prototype.additionalInit = function() {

};

},{"./bodypart":3,"./lib/kutility":14,"./model_names":17}],16:[function(require,module,exports){
$(function() {

  var kt = require('./lib/kutility');
  var Camera = require('./camera');
  var Character = require('./character');
  var Skybox = require('./skybox');
  var io = require('./io');

  var Shower = require('./shower');
  var Locker = require('./locker');
  var Phone = require('./phone');
  var Computer = require('./computer');
  var BoxingRing = require('./boxing_ring');
  var FitnessTower = require('./fitness_tower');
  var Weights = require('./weights');

  var scene = new THREE.Scene();

  var renderer;
  var rendermode = 'webgl';
  try {
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x111111, 1);
  } catch(e) {
    $('.error').show();
  }

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

  var canvas = document.querySelector('canvas');
  var $canvas = $(canvas);

  var skybox = new Skybox();
  skybox.addTo(scene);

  var camera = new Camera(window, scene);

  // spotlight shinin from above casting shadows and the like
  var spotlight = new THREE.SpotLight(0xffffff, 5.0);
  spotlight.position.set(0, 200, -25);
  spotlight.castShadow = true;
  scene.add(spotlight);

  var hueLight = new THREE.SpotLight(0xffffff, 1.0);
  hueLight.castShadow = true;
  hueLight.position.set(0, 100, -25);
  scene.add(hueLight);

  // soft blue light //\\ can modify this sucker to change mood
  var ambientLight = new THREE.AmbientLight(0xeeeeff);
  ambientLight.intensity = 0.4;
  //scene.add(ambientLight);

  var active = {wrestlers: true, lighting: true, sliding: false, camera: false};
  var history = {};

  var kevinWrestler;
  var dylanWrestler;
  var wrestlers = [];

  var boxingRing;
  var fitnessTowers = [];
  var weights = [];

  var slideOb = {left: true, moveCount: 0};
  var cameraOb = {};

  var shower;
  var lockers = [];
  var computers = [];

  var particleEngine;

  start();

  function start() {
    kevinWrestler = new Character({x: -25, y: 5, z: -25}, 20);
    dylanWrestler = new Character({x: 25, y: 5, z: -25}, 20);
    wrestlers = [kevinWrestler, dylanWrestler];

    for (var i = 0; i < wrestlers.length; i++) {
      wrestlers[i].addTo(scene);
    }

    boxingRing = new BoxingRing({x: 0, y: -70, z: -140}, 18);
    boxingRing.addTo(scene, function() {
      boxingRing.mesh.scale.x *= 1.5;
    });

    for (var i = 0; i < 2; i++) {
      var pos;
      if (i == 0) {
        pos = {x: -50, y: 20, z: 0};
      } else if (i == 1) {
        pos = {x: 50, y: 20, z: 0};
      }

      var tower = new FitnessTower(pos, 10);
      tower.addTo(scene);
      fitnessTowers.push(tower);
    }

    for (var i = 0; i < 3; i++) {
      var pos;
      if (i == 0) {
        pos = {x: 0, y: 68, z: -100};
      } else if (i == 1) {
        pos = {x: -130, y: -66, z: -150};
      } else if (i == 2) {
        pos = {x: 130, y: -66, z: -150};
      }

      var weight = new Weights(pos, 10);
      weight.addTo(scene, function(w) {
        if (w.mesh.position.y < 0) {
          w.rotate(0, Math.PI / 2, 0);
        }
      });
      weights.push(weight);
    }

    camera.cam.position.set(0, 6, 110);

    io.begin(kevinWrestler, dylanWrestler, camera.cam, hueLight);

    render();

    $('body').keypress(function(ev) {
      console.log(ev.which);
      if (ev.which == 32) { // spacebar
        resetWrestlerPositions();
      }
      else if (ev.which == 113) { // q
        initiateShower();
      }
      else if (ev.which == 122) { // z
        active.camera = !active.camera;
      }
      else if (ev.which == 120) { // x
        kevinWrestler.melting = !kevinWrestler.melting;
        dylanWrestler.melting = !dylanWrestler.melting;
      }
      else if (ev.which == 99) { // c
        active.lighting = !active.lighting;
      }
    });
  }

  function render() {
    requestAnimationFrame(render);

    if (active.wrestlers) {
      // render the wrestlers
      wrestlers.forEach(function(wrestler) {
        wrestler.render();
      });
    }

    if (active.character) {
      mainCharacterModel.render();
    }

    if (active.sliding) {
      slideWrestlers();
    }

    if (active.lighting) {
      changeLights();
    }

    if (active.camera) {
      changeCamera();
    }

    fitnessTowers.forEach(function(tower) {
      tower.render();
    });

    computers.forEach(function(computer) {
      computer.render();
    });

    if (particleEngine) {
      particleEngine.update(0.01 * 0.5);
    }

    camera.render();

    renderer.render(scene, camera.cam);
  }

  function clearScene() {
    for (i = scene.children.length - 1; i >= 0; i--) {
      var obj = scene.children[ i ];
      if (obj !== camera.cam && obj !== spotlight && obj !== hueLight) {
        scene.remove(obj);
      }
    }
  }

  function resetWrestlerPositions() {
    wrestlers.forEach(function(wrestler) {
      wrestler.reset();
    });

    if (history.startedShower) {
      camera.cam.position.set(0, 1, 0);
    } else {
      camera.cam.position.set(0, 6, 110);
    }
  }

  var lightOb = {};
  function changeLights() {
    if (!lightOb) lightOb = {};

    if (lightOb.movingUp) {
      spotlight.position.y += 1;
      if (spotlight.position.z > 400) {
        lightOb.movingUp = false;
      }
    } else {
      spotlight.position.y -= 1;
      if (spotlight.position.z < 50) {
        lightOb.movingUp = true;
      }
    }

    spotlight.intensity = Math.random() * 5.0;

    spotlight.position.x += (Math.random() - 0.5) * 20;
    spotlight.position.z += (Math.random() - 0.5) * 20;

    var gray = Math.random();
    spotlight.color.setRGB(gray, gray, gray);
  }

  function changeCamera() {
    var dx = (Math.random() - 0.5) * 1;
    var dy = (Math.random() - 0.5) * 0.5;
    var dz = (Math.random() - 0.5) * 1;

    camera.cam.position.x += dx;
    camera.cam.position.y += dy;
    camera.cam.position.z += dz;
  }

  function slideWrestlers() {
    wrestlers.forEach(function(wrestler) {
      if (slideOb.left) {
        wrestler.move(-1, 0, 0);
      } else {
        wrestler.move(1, 0, 0);
      }
    });

    slideOb.moveCount++;
    if (slideOb.moveCount > 40) {
      slideOb.moveCount = 0;
      slideOb.left = !slideOb.left;
    }
  }

  function landscapeWarp() {
    active.landscape = true;
    warp();

    function warp() {
      if (!active.landscape) return;

      kt.brightness($canvas, kt.randInt(350, 150));
      kt.hutate($canvas, kt.randInt(360));

      setTimeout(function() {
        kt.brightness($canvas, 100);
        kt.hutate($canvas, 0);
        setTimeout(warp, kt.randInt(1200, 600));
      }, kt.randInt(350, 100));
    }
  }

  function initiateShower() {
    if (history.startedShower) return;

    history.startedShower = true;

    dylanWrestler.discombobulate(function() {

    });

    kevinWrestler.discombobulate(function() {
      var backCameraAwayInterval = setInterval(function() {
        camera.cam.position.z += 0.85;
        if (camera.cam.position.z > 555) {
          clearInterval(backCameraAwayInterval);
          fadeToWhite();
        }
      }, 20);
    });

    var otherObjects = [boxingRing];
    fitnessTowers.forEach(function(tower) { otherObjects.push(tower); });
    weights.forEach(function(weight) { otherObjects.push(weight); });
    otherObjects.forEach(function(otherObject) {
      otherObject.fallToFloor(-200, 5);
    });

    function fadeToWhite() {
      $('.overlay').fadeIn(9000, function() {
          changeToShowerMode();
      });
    }

    function changeToShowerMode() {
      clearScene();
      renderer.setClearColor(0xffff99, 1);
      camera.cam.position.set(0, 1, 0);

      shower = new Shower({x: 0, y: 0, z: -10}, 1.15);
      shower.addTo(scene);

      for (var i = 0; i < 4; i++) {
        var x = 0;
        if (i < 2) {
          x = (i - 2) * 4;
        } else {
          x = (i - 1) * 4;
        }

        var locker = new Locker({x: x, y: 2, z: -25}, 0.35);
        locker.addTo(scene);
        lockers.push(locker);
      }

      $('.overlay').fadeOut(5000, function() {
        startAddingComputers();
      });
    }

    function startAddingComputers() {
      addComputer();

      function addComputer() {
        var skyPos = {x: (Math.random() - 0.5) * 10, y: kt.randInt(12, 8), z: Math.random() * -10 - 2};
        var scale = 1;
        var computer;

        if (Math.random() < 0.99999) {
          scale = Math.random() * 0.3 + 0.05;
          computer = new Phone(skyPos, scale);
        } else {
          scale = 0.2;
          computer = new Computer(skyPos, scale);
        }

        computer.addTo(scene);
        computer.fallToFloor();
        computers.push(computer);

        if (computers.length < 44) {
          setTimeout(addComputer, 1000);
        } else {
          growComputersForever();
        }
      }
    }

    function growComputersForever() {
      computers.forEach(function(computer) {
        computer.melting = true;
      });

      var scale = 1.05;
      scaleComputers();
      function scaleComputers() {
        scale *= 1.03;
        computers.forEach(function(computer) {
          computer.scaleMultiply(scale);
          computer.move(0.03 * scale, 0.025 * scale, 0);
        });

        camera.cam.position.z = Math.min(60, camera.cam.position.z + 0.05);

        if (scale < 666) {
          setTimeout(scaleComputers, 30);
        } else {
          enterEndgameState();
        }
      }
    }

    function enterEndgameState() {
      setTimeout(function() {
        fadeToRed();
      }, 10000);

      function fadeToRed() {
        $('.overlay').css('background-color', 'rgb(160, 10, 10)');
        $('.overlay').fadeIn(5000, function() {
          makeItRain();
        });
      }

      function makeItRain() {
        clearScene();
        renderer.setClearColor(0x000000, 1);
        camera.cam.position.set(0, 0, 0);

        var particleSettings = {
          positionStyle    : Type.CUBE,
          positionBase     : new THREE.Vector3( 0, 50, 0 ),
          positionSpread   : new THREE.Vector3( 200, 200, 200 ),

          velocityStyle    : Type.CUBE,
          velocityBase     : new THREE.Vector3( 0, -400, 0),
          velocitySpread   : new THREE.Vector3( 50, 50, 50 ),
          accelerationBase : new THREE.Vector3( 0, -5, 0 ),

          particleTexture : THREE.ImageUtils.loadTexture( 'images/raindrop2flip.png' ),

          sizeBase    : 4.0,
          sizeSpread  : 2.0,
          colorBase   : new THREE.Vector3(0.66, 1.0, 0.7), // H,S,L
          colorSpread : new THREE.Vector3(0.00, 0.0, 0.2),
          opacityBase : 0.6,

          particlesPerSecond : 3600,
          particleDeathAge   : 1.0,
          emitterDeathAge    : 60
        };

        particleEngine = new ParticleEngine();
        particleEngine.setValues(particleSettings);
        particleEngine.initialize(scene);

        var phone = new Phone({x: 0, y: 5, z: -64}, 3);
        phone.addTo(scene);
        setInterval(function() {
          phone.rotate(0, 0.02, 0);
        }, 20);

        var weight = new Weights({x: 0, y: 0, z: -50}, 4);
        weight.addTo(scene);

        active.lighting = false;

        $('.overlay').fadeOut(5000);
      }
    }

  }

});

},{"./boxing_ring":4,"./camera":5,"./character":6,"./computer":7,"./fitness_tower":8,"./io":12,"./lib/kutility":14,"./locker":15,"./phone":18,"./shower":19,"./skybox":20,"./weights":21}],17:[function(require,module,exports){

var prefix = '/js/models/';

function pre(text) {
  return prefix + text;
}

/* LEGS */

module.exports.ANIMAL_LEGS = pre('animal_legs.js');

module.exports.BABY_LEG = pre('baby_leg.js');

module.exports.FOOTBALL_LEG = pre('football_leg.js');

module.exports.LOWPOLY_LEG = pre('low_poly_leg.js');

/* HEADS */

module.exports.ANIME_HEAD = pre('anime_heads.js');

module.exports.HEAD = pre('head.js');

module.exports.BABY_HEAD = pre('baby_head.js');

module.exports.FOOTBALL_HEAD = pre('football_head.js');

module.exports.LOWPOLY_HEAD = pre('low_poly_head.js');

/* ARMS */

module.exports.ARM = pre('arm.js');

module.exports.ARMS = pre('arms.js');

module.exports.BABY_ARM = pre('baby_arm.js');

module.exports.FOOTBALL_ARM = pre('football_arm.js');

module.exports.LOWPOLY_ARM = pre('low_poly_arm.js');

/* BODIES */

module.exports.CHILD = pre('child.js');

module.exports.FEMALE = pre('female.js');

module.exports.MALE = pre('male.js');

module.exports.TORSO = pre('torso.js');

module.exports.FOOTBALL_PLAYER = pre('football_player.js');

module.exports.BABY_TORSO = pre('baby_torso.js');

module.exports.FOOTBALL_TORSO = pre('football_torso.js');

module.exports.LOWPOLY_TORSO = pre('low_poly_torso.js');

/* HANDS */

module.exports.HAND = pre('hand.js');

module.exports.FOOTBALL_HAND = pre('football_hand.js');

/* FEET */

module.exports.FOOT = pre('foot.js');

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

},{}],18:[function(require,module,exports){

var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Phone;

function Phone(startPos, scale) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.scale = scale || 1;

  this.modelChoices = [modelNames.IPHONE/*, modelNames.PHONE, modelNames.OFFICE_PHONE*/];
}

Phone.prototype.__proto__ = BodyPart.prototype;

Phone.prototype.additionalInit = function() {

};

},{"./bodypart":3,"./lib/kutility":14,"./model_names":17}],19:[function(require,module,exports){

var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Shower;

function Shower(startPos, scale) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.scale = scale || 1;

  this.specificModelName = modelNames.SHOWER;
}

Shower.prototype.__proto__ = BodyPart.prototype;

Shower.prototype.additionalInit = function() {
  this.rotate(0, Math.PI, 0);
};

},{"./bodypart":3,"./lib/kutility":14,"./model_names":17}],20:[function(require,module,exports){


module.exports = Skybox;

function Skybox() {
  var size = 15000;
  var sections = 22;
  this.geometry = new THREE.BoxGeometry(size, size, size, sections, sections, sections);

  this.material = new THREE.MeshBasicMaterial({
    color: 0x777777,
    wireframe: true,
    wireframeLinewidth: 0.2,
    opacity: 0.15,
    transparent: true
  });

  this.mesh = new THREE.Mesh(this.geometry, this.material);
}

Skybox.prototype.addTo = function(scene) {
  scene.add(this.mesh);
}

},{}],21:[function(require,module,exports){

var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Weights;

function Weights(startPos, scale) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.scale = scale || 1;

  this.specificModelName = modelNames.WEIGHTS;
}

Weights.prototype.__proto__ = BodyPart.prototype;

},{"./bodypart":3,"./lib/kutility":14,"./model_names":17}]},{},[16])