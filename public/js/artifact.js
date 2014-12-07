
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
  '/images/finder.jpg'
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
