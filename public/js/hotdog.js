
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
