
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

  this.geometry = new THREE.SphereGeometry(1, 32, 32);

  this.material = new THREE.MeshPhongMaterial();
  this.material.map = THREE.ImageUtils.loadTexture(this.textureName);

  this.mesh = new THREE.Mesh(this.geometry, this.material);
}

Head.prototype.__proto__ = BodyPart.prototype;

Head.prototype.addTo = function(scene, callback) {
  this.scaleBody(this.scale);
  this.moveTo(this.startX, this.startY, this.startZ);

  scene.add(this.mesh);
  if (callback) callback();
};

Head.prototype.additionalInit = function() {
  var self = this;

  if (self.modelName == modelNames.LOWPOLY_HEAD) {
    self.scale *= 1.5;
    self.scaleBody(self.scale);
    self.move(0, -15, 0);
  }
};
