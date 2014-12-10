
var kt = require('./lib/kutility');

var girlRoomPath = '/images/girl_room.jpg';

function cubify(url) {
  return [url, url, url, url, url, url];
}

function makeCubemap(textureURL, repeatX, repeatY) {
  if (!textureURL) return;
  if (!repeatX) repeatX = 4;
  if (!repeatY) repeatY = 4;

  var textureCube = cubify(textureURL);

  var cubemap = THREE.ImageUtils.loadTextureCube(textureCube); // load textures
  cubemap.format = THREE.RGBFormat;
  cubemap.wrapS = THREE.RepeatWrapping;
  cubemap.wrapT = THREE.RepeatWrapping;
  cubemap.repeat.set(repeatX, repeatY);

  return cubemap;
}

function makeShader(cubemap) {
  var shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
  console.log(shader);
  shader.uniforms['tCube'].value = cubemap; // apply textures to shader
  return shader;
}

function skyboxMaterial(textureURL) {
  var cubemap = makeCubemap(textureURL);
  var shader = makeShader(cubemap);

  return new THREE.ShaderMaterial({
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide,
    opacity: 0.5
  });
}

module.exports.create = function(size, textureURL) {
  if (!textureURL) textureURL = girlRoomPath;
  if (!size) size = {x: 20000, y: 20000, z: 20000};

  var geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
  var material = skyboxMaterial(textureURL);
  return new THREE.Mesh(geometry, material);
}
