
var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Human;

function Human(startPos, scale, gender) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.scale = scale || 20;

  if (!gender) gender = 'girl';

  if (gender == 'girl') {
    this.specificModelName = modelNames.TWEEN_GIRL;
  } else {
    this.specificModelName = modelNames.BOY;
  }
}

Human.prototype.__proto__ = BodyPart.prototype;

Human.prototype.createMesh = function(callback) {
  var self = this;

  modelNames.loadModel(self.specificModelName, function (geometry, materials) {
    self.geometry = geometry;
    self.materials = materials;

    self.faceMaterial = new THREE.MeshFaceMaterial(materials);
    self.material = self.faceMaterial;

    self.mesh = new THREE.SkinnedMesh(geometry, self.material);

    callback();
  });
}

Human.prototype.additionalInit = function() {
  var self = this;
};
