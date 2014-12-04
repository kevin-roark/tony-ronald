

module.exports = Skybox;

function Skybox() {
  var size = 15000;
  var sections = 22;
  this.geometry = new THREE.BoxGeometry(size, size, size, sections, sections, sections);

  this.material = new THREE.MeshBasicMaterial({
    color: 0x777777,
    wireframe: true,
    wireframeLinewidth: 0.2,
    opacity: 0.15,
    transparent: true
  });

  this.mesh = new THREE.Mesh(this.geometry, this.material);
}

Skybox.prototype.addTo = function(scene) {
  scene.add(this.mesh);
}
