$(function() {

  var kt = require('./lib/kutility');
  var Camera = require('./camera');
  var Character = require('./character');
  var Skybox = require('./skybox');
  var io = require('./io');
  
  var scene = new THREE.Scene();

  var renderer;
  var rendermode = 'webgl';
  try {
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x111111, 1);
  } catch(e) {
    $('.error').show();
  }

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

  var canvas = document.querySelector('canvas');
  var $canvas = $(canvas);

  var skybox = new Skybox();
  skybox.addTo(scene);

  var camera = new Camera(window, scene);

  // spotlight shinin from above casting shadows and the like
  var spotlight = new THREE.SpotLight(0xffffff, 5.0);
  spotlight.position.set(0, 200, -25);
  spotlight.castShadow = true;
  scene.add(spotlight);

  var hueLight = new THREE.SpotLight(0xffffff, 1.0);
  hueLight.castShadow = true;
  hueLight.position.set(0, 100, -25);
  scene.add(hueLight);

  var active = {ronalds: true, lighting: true, camera: false};
  var history = {};

  var kevinRonald;
  var dylanRonald;
  var ronalds = [];

  start();

  function start() {
    kevinRonald = new Character({x: -25, y: 5, z: -25}, 20);
    dylanRonald = new Character({x: 25, y: 5, z: -25}, 20);
    ronalds = [kevinRonald, dylanRonald];

    for (var i = 0; i < ronalds.length; i++) {
      ronalds[i].addTo(scene);
    }

    camera.cam.position.set(0, 6, 110);

    io.begin(kevinRonald, dylanRonald, camera.cam, hueLight);

    render();

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

    camera.render();

    renderer.render(scene, camera.cam);
  }

  /*
   * * * * * UTILITY * * * * *
   */

  function clearScene() {
    for (i = scene.children.length - 1; i >= 0; i--) {
      var obj = scene.children[ i ];
      if (obj !== camera.cam && obj !== spotlight && obj !== hueLight) {
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
    camera.cam.position.x += dx;
    camera.cam.position.y += dy;
    camera.cam.position.z += dz;
  }

  function setCameraPosition(x, y, z) {
    camera.cam.position.x = x;
    camera.cam.position.y = y;
    camera.cam.position.z = z;
  }

  function fadeToWhite() {
    $('.overlay').fadeIn(9000, function() {
        changeToShowerMode();
    });
  }

  /*
   * * * * * STATE CHANGES * * * * *
   */

  function enterHeavenState() {

  }

  function enterEndgameState() {

  }

});
