$(function() {

  var kt = require('./lib/kutility');
  var Character = require('./character');
  //var io = require('./io');
  var RonaldWord = require('./ronald_word');

  /*
   * * * * * RENDERIN AND LIGHTIN * * * * *
   */

  var renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

  var scene = new Physijs.Scene;
  scene.setGravity(new THREE.Vector3(0, 0, 0));
  scene.addEventListener('update', function() {
    // here wanna apply new forces to objects and things based on state

    scene.simulate(undefined, 1);
  });

  var camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 1000);
  scene.add(camera);

  // mainLight shinin from above casting shadows and the like
  var mainLight = new THREE.DirectionalLight(0xffffff);
  mainLight.position.set(20, 20, 0);
  mainLight.target.position.copy(scene.position);
  mainLight.castShadow = true;
  scene.add(mainLight);

  /*
   * * * * * STATE OBJECTS * * * * *
   */

  var active = {ronalds: false, lighting: false, camera: false, phrases: false};
  var history = {};

  var phrases = [];

  var ground_material = Physijs.createMaterial(
    new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.5}),
    .8, // high friction
    .4 // low restitution
  );

  var ground_geometry = new THREE.PlaneGeometry(100, 100);
  calculateGeometryThings(ground_geometry);

  var leftWallGeometry = new THREE.BoxGeometry(1, 80, 100);
  var rightWallGeometry = new THREE.BoxGeometry(1, 80, 100);
  var backWallGeometry = new THREE.BoxGeometry(100, 80, 1);
  var frontWallGeometry = new THREE.BoxGeometry(100, 80, 1);
  var wallGeometries = [leftWallGeometry, rightWallGeometry, backWallGeometry, frontWallGeometry];
  wallGeometries.forEach(function(geometry) {
    calculateGeometryThings(geometry);
  });

  var leftWall = new Physijs.BoxMesh(leftWallGeometry, ground_material.clone(), 0);
  leftWall.position.z = -50;
  leftWall.position.y = 40;
  leftWall.position.x = -50;
  leftWall.__dirtyPosition = true;
  scene.add(leftWall);

  var rightWall = new Physijs.BoxMesh(rightWallGeometry, ground_material.clone(), 0);
  rightWall.position.z = -50;
  rightWall.position.y = 40;
  rightWall.position.x = 50;
  rightWall.__dirtyPosition = true;
  scene.add(rightWall);

  var backWall = new Physijs.BoxMesh(backWallGeometry, ground_material.clone(), 0);
  backWall.position.z = -100;
  backWall.position.y = 40;
  backWall.__dirtyPosition = true;
  scene.add(backWall);

  var frontWall = new Physijs.BoxMesh(frontWallGeometry, ground_material.clone(), 0);
  frontWall.position.z = 0;
  frontWall.position.y = 40;
  frontWall.__dirtyPosition = true;
  scene.add(frontWall);

  var ground = new Physijs.BoxMesh(ground_geometry, ground_material, 0);
  ground.rotation.x = -Math.PI / 2;
  ground.position.z = -50;
  ground.position.y = 0;
  ground.__dirtyPosition = true;
  scene.add(ground);

  var ceiling = new Physijs.BoxMesh(ground_geometry.clone(), ground_material.clone(), 0);
  ceiling.rotation.x = -Math.PI / 2;
  ceiling.position.z = -50;
  ceiling.position.y = 80;
  ceiling.__dirtyPosition = true;
  scene.add(ceiling);

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
    //io.begin(kevinRonald, dylanRonald, camera, hueLight);

    enterPhrasesState();

    render();
    scene.simulate();

    $('body').keypress(function(ev) {
      console.log('key press eh? ' + ev.which);
      ev.preventDefault();

      if (ev.which == 32) { // spacebar
        resetRonaldPositions();
      }
      else if (ev.which == 97)  { // left
        moveCameraPosition(-1, 0, 0);
      }
      else if (ev.which == 119)  { // up
        moveCameraPosition(0, 0, 1);
      }
      else if (ev.which == 100)  { // right
        moveCameraPosition(1, 0, 0);
      }
      else if (ev.which == 115)  { // down
        moveCameraPosition(0, 0, -1);
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

    if (active.phrases) {
      phrases.forEach(function(phrase) {
        phrase.render();
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
      if (obj !== camera && obj !== mainLight) {
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

  function calculateGeometryThings(geometry) {
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
  }

  /*
   * * * * * STATE CHANGES * * * * *
   */

  function enterPhrasesState() {
    active.phrases = true;

    setCameraPosition(0, 40, 50);

    setInterval(function() {
      var rw = new RonaldWord();
      rw.addTo(scene);
      phrases.push(rw);
    }, 1000);
  }

  function enterTrappedState() {
    kevinRonald = new Character({x: -25, y: 5, z: -25}, 20);
    dylanRonald = new Character({x: 25, y: 5, z: -25}, 20);
    ronalds = [kevinRonald, dylanRonald];

    for (var i = 0; i < ronalds.length; i++) {
      ronalds[i].addTo(scene);
    }
  }

  function enterDesperateFleeState() {

  }

  function enterHeavenState() {

  }

  function enterEndgameState() {

  }

});
