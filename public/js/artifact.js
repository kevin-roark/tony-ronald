
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
