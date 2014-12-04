var kt = require('./lib/kutility');

module.exports = RonaldWord;

var phraseBank = [
  'RONALD',
  'MY FRIEND RONALD LIVES INSIDE THE COMPUTER',
  'MY FRIEND RONALD',
  'MY FRIEND RONALD LIVES IN THE COMPUTER TRASH CAN',
  'RONALD EATS ALL THE COMPUTER TRASH',
  'MY FRIEND RONALD SMOKES WEED'
];

function RonaldWord(phrase) {
  if (!phrase) {
    phrase = kt.choice(phraseBank);
  }

  this.phrase = phrase;

  this.geometry = new THREE.TextGeometry(this.phrase, {
    size: 2.2
    , height: 0.01
    , curveSegments: 1
    , font: "droid sans"

    , bevelThickness: 0.35
    , bevelSize: 0.15
    , bevelSegments: 1
    , bevelEnabled: true
  });

  this.material = new THREE.MeshPhongMaterial({
    ambient: 0xffffff
    , color: 0xffffff
    , combine: THREE.MixOperation
    , shading: THREE.FlatShading
    , shininess: 60
    , reflectivity: 0.5
    , side: THREE.DoubleSide
  });

  this.mesh = new THREE.Mesh(this.geometry, this.material);
}

RonaldWord.prototype.move = function(x, y, z) {
  if (!this.mesh) return;

  this.mesh.position.x += x;
  this.mesh.position.y += y;
  this.mesh.position.z += z;
}

RonaldWord.prototype.rotate = function(rx, ry, rz) {
  if (!this.mesh) return;

  this.mesh.rotation.x += rx;
  this.mesh.rotation.y += ry;
  this.mesh.rotation.z += rz;
}

RonaldWord.prototype.moveTo = function(x, y, z) {
  if (!this.mesh) return;

  this.mesh.position.set(x, y, z);

  this.move(0, 0, 0);
}

RonaldWord.prototype.addTo = function(scene, callback) {
  scene.add(this.mesh);
}

RonaldWord.prototype.render = function() {

}
