$(function() {

  var kt = require('./lib/kutility');
  var Character = require('./character');
  var io = require('./io');

  /*
   * * * * * RENDERIN AND LIGHTIN * * * * *
   */

  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x111111, 1);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

  var scene = new Physijs.Scene;
  scene.setGravity(new THREE.Vector3(0, 0, 0));
  scene.addEventListener('update', function() {
      // here wanna apply new forces to objects and things based on state

      scene.simulate(undefined, 2);
    }
  );

  var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
  scene.add(camera);

  // spotlight shinin from above casting shadows and the like
  var spotlight = new THREE.SpotLight(0xffffff, 5.0);
  spotlight.position.set(20, 20, -25);
  spotlight.target.position.copy(scene.position);
  spotlight.castShadow = true;
  scene.add(spotlight);

  /*
   * * * * * STATE OBJECTS * * * * *
   */

  var active = {ronalds: true, lighting: true, camera: false};
  var history = {};

  var ground_material = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({color: 0xff0000}),
    .8, // high friction
    .4 // low restitution
  );

  var ground_geometry = new THREE.PlaneGeometry(300, 300, 100, 100);
  ground_geometry.computeFaceNormals();
  ground_geometry.computeVertexNormals();

  var ground = new Physijs.HeightfieldMesh(ground_geometry, ground_material, 0);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  var cameraFollowState = {
    obj: null,
    cameraOffset: {x: 0, y: 0, z: 0},
    lightOffset: {x: 0, y: 0, z: 0}
  };

  var kevinRonald;
  var dylanRonald;
  var ronalds = [];

  /*
   * * * * * STARTIN AND RENDERIN * * * * *
   */

  start();
  function start() {
    kevinRonald = new Character({x: -25, y: 5, z: -25}, 20);
    dylanRonald = new Character({x: 25, y: 5, z: -25}, 20);
    ronalds = [kevinRonald, dylanRonald];

    for (var i = 0; i < ronalds.length; i++) {
      ronalds[i].addTo(scene);
    }

    camera.position.set(0, 6, 110);

    io.begin(kevinRonald, dylanRonald, camera, hueLight);

    enterPhrasesState();

    render();
    scene.simulate();

    $('body').keypress(function(ev) {
      if (ev.which == 32) { // spacebar
        resetRonaldPositions();
      }
    });
  }

  function render() {
    requestAnimationFrame(render);

    if (active.ronalds) {
      ronalds.forEach(function(ronald) {
        ronald.render();
      });
    }

    if (cameraFollowState.obj) {
      camera.position.copy(cameraFollowState.obj.position).add(cameraFollowState.cameraOffset);
      camera.lookAt(cameraFollowState.obj.position);

      light.target.position.copy(cameraFollowState.obj.position);
      light.position.addVectors(light.target.position, lightOffset);
    }

    renderer.render(scene, camera);
  }

  /*
   * * * * * UTILITY * * * * *
   */

  function clearScene() {
    for (i = scene.children.length - 1; i >= 0; i--) {
      var obj = scene.children[ i ];
      if (obj !== camera && obj !== spotlight && obj !== hueLight) {
        scene.remove(obj);
      }
    }
  }

  function resetRonaldPositions() {
    ronalds.forEach(function(ronald) {
      ronald.reset();
    });
  }

  function shakeCamera() {
    var dx = (Math.random() - 0.5) * 1;
    var dy = (Math.random() - 0.5) * 0.5;
    var dz = (Math.random() - 0.5) * 1;

    moveCameraPosition(dx, dy, dz);
  }

  function moveCameraPosition(dx, dy, dz) {
    camera.position.x += dx;
    camera.position.y += dy;
    camera.position.z += dz;
  }

  function setCameraPosition(x, y, z) {
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
  }

  function fadeToWhite() {
    $('.overlay').fadeIn(9000, function() {
        changeToShowerMode();
    });
  }

  /*
   * * * * * STATE CHANGES * * * * *
   */

  function enterPhrasesState() {

  }

  function enterTrappedState() {

  }

  function enterDesperateFleeState() {

  }

  function enterHeavenState() {

  }

  function enterEndgameState() {

  }

});
