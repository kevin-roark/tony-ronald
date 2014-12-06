
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
  var self = this;

  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.textureName = computerNames[++computerIndex % computerNames.length];

  this.scale = scale || 20;

  this.ignoreCollisons = true;
}

Computer.prototype.__proto__ = BodyPart.prototype;

Computer.prototype.createMesh = function(callback) {
  this.geometry = new THREE.BoxGeometry(1, 0.75, 0.1);

  this.material = new THREE.MeshBasicMaterial({transparent: true, opacity: 1.0});
  this.material.map = THREE.ImageUtils.loadTexture(this.textureName);
  this.material = Physijs.createMaterial(this.material, .4, .6);

  this.mesh = new Physijs.BoxMesh(this.geometry, this.material, 1000);

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
    }
  }, 30);
}

Computer.prototype.collisonHandle = function(other_object, relative_velocity, relative_rotation, contact_normal) {
  console.log('got my computer collison dog: KNOCK KNOCK');

  var self = this;
  this.twitching = true;
  setTimeout(function() {
    self.twitching = false;
  }, 200);
}
