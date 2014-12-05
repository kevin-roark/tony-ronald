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

function negrand(scalar) {
  return (Math.random() - 0.5) * scalar;
}

function RonaldWord(phrase, position, velocity) {
  if (!phrase) {
    phrase = kt.choice(phraseBank);
  }
  if (!position) {
    position = {x: Math.random() * 80 - 40, y: Math.random() * 80, z: Math.random() * -100};
  }
  if (!velocity) {
    velocity = {x: negrand(30), y: negrand(30), z: negrand(30)};
  }

  this.phrase = phrase;
  this.position = position;
  this.velocity = velocity;

  this.geometry = new THREE.TextGeometry(this.phrase, {
    size: 1.5
    , height: 0.01
    , curveSegments: 1
    , font: "droid sans"
    , bevelThickness: 0.35
    , bevelSize: 0.15
    , bevelSegments: 1
    , bevelEnabled: true
  });

  this.material = Physijs.createMaterial(
    new THREE.MeshPhongMaterial({
      ambient: 0xffffff
      , color: 0xffffff
      , combine: THREE.MixOperation
      , shading: THREE.FlatShading
      , shininess: 60
      , reflectivity: 0.5
      , side: THREE.DoubleSide
    }),
    .4, // low friction
    .6 // high restitution
  );

  this.mesh = new Physijs.BoxMesh(this.geometry, this.material);
  this.mesh.castShadow = this.mesh.receiveShadow = true;
}

RonaldWord.prototype.move = function(x, y, z) {
  if (!this.mesh) return;

  this.mesh.position.x += x;
  this.mesh.position.y += y;
  this.mesh.position.z += z;

  this.mesh.__dirtyPosition = true;
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

  this.mesh.__dirtyPosition = true;
}

RonaldWord.prototype.addTo = function(scene, callback) {
  scene.add(this.mesh);

  this.moveTo(this.position.x, this.position.y, this.position.z);
  this.mesh.setLinearVelocity(this.velocity);
}

RonaldWord.prototype.render = function() {
  //this.move(this.velocity.x, this.velocity.y, this.velocity.z);
}
