
var kt = require('./lib/kutility');

var modelNames = require('./model_names');

var BodyPart = require('./bodypart');

module.exports = Billboard;

var VID_WIDTH = 300;
var VID_HEIGHT = 240;

function Billboard(startPos, scale, videoDomElementObject) {
  if (!startPos) startPos = {x: 0, y: 0, z: 0};
  this.startX = startPos.x;
  this.startY = startPos.y;
  this.startZ = startPos.z;

  this.scale = scale || 1;

  this.video = videoDomElementObject.vid;

  this.videoImage = document.createElement('canvas');
  this.videoImage.width = videoDomElementObject.width;
  this.videoImage.height = videoDomElementObject.height;

  this.videoImageContext = this.videoImage.getContext('2d');
	this.videoImageContext.fillStyle = '#ffffff'; // background color if no video present
	this.videoImageContext.fillRect( 0, 0, VID_WIDTH, VID_HEIGHT);
}

Billboard.prototype.__proto__ = BodyPart.prototype;

Billboard.prototype.createMesh = function(callback) {
  this.videoTexture = new THREE.Texture(this.videoImage);
  this.videoTexture.minFilter = THREE.LinearFilter;
  this.videoTexture.magFilter = THREE.LinearFilter;
  this.videoTexture.format = THREE.RGBFormat;
  this.videoTexture.generateMipmaps = false;

  this.material = new THREE.MeshBasicMaterial({
    map: this.videoTexture
    , overdraw: true
    , side: THREE.DoubleSide
  });

  this.geometry = new THREE.PlaneGeometry(VID_WIDTH, VID_HEIGHT);
  this.mesh = new THREE.Mesh(this.geometry, this.material);

  callback();
}

Billboard.prototype.render = function() {
  if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
    this.videoImageContext.drawImage(this.video, 0, 0);

    if (this.videoTexture) this.videoTexture.needsUpdate = true;
  }
}
