var kt = require('./lib/kutility');

module.exports = RonaldWord;

var player1PhraseBank = [
  'RONALD',
  'MY FRIEND RONALD LIVES INSIDE THE COMPUTER',
  'MY FRIEND RONALD',
  'MY FRIEND RONALD LIVES IN THE COMPUTER TRASH CAN',
  'RONALD EATS ALL THE COMPUTER TRASH',
  'MY FRIEND RONALD SMOKES WEED',
  "MY FRIEND RONALD'S DEAD",
  'MY FRIEND RONALD USES ADOBE CREATIVE CLOUD',
  'MY FRIEND RONALD HAS A STARTUP',
  'MY FRIEND RONALD NEVER HAS TO GO OUTSIDE',
  "RONALD'S NOT AFRAID",
  "WHERE'D YOU GO, RONALD?",
  'MY FRIEND RONALD WEARS BAND TEES',
  'MY FRIEND RONALD HAS DESIRES',
  'MY FRIEND RONALD SEEKS CLOSURE',
  'MY FRIEND RONALD HELPS ME ESCAPE'
];

var player2PhraseBank =  [
  'I SEE MY FRIEND RONALD INSIDE OF EVERYONE',
  'MY FRIEND RONALD IS ON SNAPCHAT',
  'MY FRIEND RONALD BETA TESTED IOS 8',
  'MY FRIEND RONALD IS A DEVELOPER',
  'MY FRIEND RONALD PREFERS XBOX',
  'MY FRIEND RONALD HAS CONNECTIONS',
  'MY FRIEND RONALD WAKES UP EVERY MORNING WITH A SMILE',
  "RONALD'S ONLY FRIEND IS ME",
  'MY ONLY FRIEND IS RONALD',
  'MY FRIEND RONALD USES VSCO CAM',
  'MY FRIEND RONALD LOVES TV PARTY',
  'RONALD USES ANGULAR.JS FOR FRONTEND WEB DEVELOPMENT',
  "RONALD'S FAVORITE TRASH IS PICTURES",
  "RONALD'S HOME IS TRASH",
  "MY FRIEND RONALD IS AN EXPERT WHEN IT COMES TO CLEANING COMPUTERS",
  'YOU HAVE TO FEED MY FRIEND RONALD TRASH OR HE WILL DIE'
];

function negrand(scalar) {
  return (Math.random() - 0.5) * scalar;
}

function randcolor() {
  var r = kt.randInt(255);
  var g = kt.randInt(255);
  var b = kt.randInt(255);
  return new THREE.Color(r, g, b);
}

function RonaldWord(player, phrase, config) {
  if (!player) {
    player = 1;
  }

  var phraseBank = (player == 1)? player1PhraseBank : player2PhraseBank;
  if (!phrase) {
    phrase = kt.choice(phraseBank);
  }

  if (!config) config = {};
  if (!config.position) {
    config.position = {x: Math.random() * 80 - 40, y: Math.random() * 80, z: Math.random() * -100};
    config.position.x = (Math.random() > 0.5)? -20 : 20;
    config.position.y = Math.random() * 40 + 20;
    config.position.z = (Math.random() * -60) - 20;
  }
  if (!config.velocity) {
    config.velocity = {x: negrand(50), y: negrand(50), z: negrand(50)};
  }
  if (!config.decay) {
    config.decay = 60000;
  }

  this.phraseIndex = phraseBank.indexOf(phrase) + 1;
  this.phrase = phrase;
  this.position = config.position;
  this.velocity = config.velocity;
  this.decay = config.decay;

  this.geometry = new THREE.TextGeometry(this.phrase, {
    size: 2 + negrand(1)
    , height: 0.01
    , curveSegments: 1
    , font: "droid sans"
    , bevelThickness: 0.35
    , bevelSize: 0.15
    , bevelSegments: 1
    , bevelEnabled: true
  });

  var color = randcolor();
  this.material = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({
      ambient: color
      , color: color
      , shininess: 5
      , reflectivity: 0.1
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

  var self = this;
  setTimeout(function() {
    scene.remove(self.mesh);
  }, this.decay);
}

RonaldWord.prototype.render = function() {
  //this.move(this.velocity.x, this.velocity.y, this.velocity.z);
}
