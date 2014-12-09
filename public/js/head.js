
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
