
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
    console.log('KNOCK!!!');

    this.twitching = true;
    setTimeout(function() {
      self.twitching = false;
    }, this.twitchtime);

    if (this.knockHandler) {
      this.knockHandler(other_object);
    }
  }
}

Computer.prototype.shatter = function() {
  this.shattering = true;
  this.ignoreCollisons = false;
  this.mesh.setLinearVelocity({x: negrand(36, 15), y: Math.random() * 36, z: negrand(36, 15)});
  this.mesh.setAngularVelocity({x: negrand(36, 15), y: Math.random() * 36, z: negrand(36, 15)});
  console.log('SHATTERED');
}
