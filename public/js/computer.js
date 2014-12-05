
var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Computer;

var MAC = '/images/mac_monitor.jpg';
var PC = '/images/pc_monitor.jpg';

module.exports.computerNames = [MAC, PC];
var computerNames = module.exports.computerNames;
var computerIndex = 0;

function Computer(startPos, scale) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.textureName = computerNames[++computerIndex % computerNames.length];

  this.scale = scale || 20;

  this.geometry = new THREE.BoxGeometry(1, 0.75, 0.25);

  this.material = new THREE.MeshPhongMaterial({transparent: true, opacity: 1.0});
  this.material.map = THREE.ImageUtils.loadTexture(this.textureName);

  this.mesh = new THREE.Mesh(this.geometry, this.material);
}

Computer.prototype.__proto__ = BodyPart.prototype;

Computer.prototype.addTo = function(scene, callback) {
  this.scaleBody(this.scale);
  this.moveTo(this.startX, this.startY, this.startZ);

  scene.add(this.mesh);
  if (callback) callback();
};

Computer.prototype.becomeTransparent = function() {
  var self = this;

  var int = setInterval(function() {
    self.material.opacity -= 0.01;
    if (self.material.opacity <= 0.5) {
      clearInterval(int);
    }
  }, 30);
}
