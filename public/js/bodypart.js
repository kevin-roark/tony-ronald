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
