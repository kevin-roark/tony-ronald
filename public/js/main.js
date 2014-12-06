$(function() {

  var kt = require('./lib/kutility');
  var Character = require('./character');
  //var io = require('./io');
  var RonaldWord = require('./ronald_word');
  var Computer = require('./computer');

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

  var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
  camera.target = {x: 0, y: 0, z: 0};
  scene.add(camera);

  // mainLight shinin from above casting shadows and the like
  var mainLight = new THREE.DirectionalLight(0xffffff);
  mainLight.position.set(20, 20, -10);
  mainLight.target.position.copy(scene.position);
  mainLight.castShadow = true;
  scene.add(mainLight);

  /*
   * * * * * STATE OBJECTS * * * * *
   */

  var active = {ronalds: false, lighting: false, camera: false, phrases: false};
  var history = {};

  var phraseState = {};
  var trappedState = {};
  var desperateState = {};
  var heavenState = {};
  var finalState = {};

  phraseState.phrases = [];

  phraseState.ground_material = Physijs.createMaterial(
    new THREE.MeshBasicMaterial({color: 0x111111, side: THREE.DoubleSide, transparent: true, opacity: 0.2}),
    .8, // high friction
    .4 // low restitution
  );

  phraseState.ground_geometry = new THREE.PlaneGeometry(100, 100);
  calculateGeometryThings(phraseState.ground_geometry);

  phraseState.leftWallGeometry = new THREE.BoxGeometry(1, 80, 100);
  phraseState.rightWallGeometry = new THREE.BoxGeometry(1, 80, 100);
  phraseState.backWallGeometry = new THREE.BoxGeometry(100, 80, 1);
  phraseState.frontWallGeometry = new THREE.BoxGeometry(100, 80, 1);
  phraseState.wallGeometries = [phraseState.leftWallGeometry, phraseState.rightWallGeometry, phraseState.backWallGeometry, phraseState.frontWallGeometry];
  phraseState.wallGeometries.forEach(function(geometry) {
    calculateGeometryThings(geometry);
  });

  phraseState.leftWall = new Physijs.BoxMesh(phraseState.leftWallGeometry, phraseState.ground_material.clone(), 0);
  phraseState.leftWall.position.z = -50;
  phraseState.leftWall.position.y = 40;
  phraseState.leftWall.position.x = -50;
  phraseState.leftWall.__dirtyPosition = true;
  scene.add(phraseState.leftWall);

  phraseState.rightWall = new Physijs.BoxMesh(phraseState.rightWallGeometry, phraseState.ground_material.clone(), 0);
  phraseState.rightWall.position.z = -50;
  phraseState.rightWall.position.y = 40;
  phraseState.rightWall.position.x = 50;
  phraseState.rightWall.__dirtyPosition = true;
  scene.add(phraseState.rightWall);

  phraseState.backWall = new Physijs.BoxMesh(phraseState.backWallGeometry, phraseState.ground_material.clone(), 0);
  phraseState.backWall.position.z = -100;
  phraseState.backWall.position.y = 40;
  phraseState.backWall.__dirtyPosition = true;
  scene.add(phraseState.backWall);

  phraseState.frontWall = new Physijs.BoxMesh(phraseState.frontWallGeometry, phraseState.ground_material.clone(), 0);
  phraseState.frontWall.position.y = 40;
  phraseState.frontWall.__dirtyPosition = true;
  scene.add(phraseState.frontWall);

  phraseState.ground = new Physijs.BoxMesh(phraseState.ground_geometry, phraseState.ground_material, 0);
  phraseState.ground.rotation.x = -Math.PI / 2;
  phraseState.ground.position.z = -50;
  phraseState.ground.position.y = 0;
  phraseState.ground.__dirtyPosition = true;
  scene.add(phraseState.ground);

  phraseState.ceiling = new Physijs.BoxMesh(phraseState.ground_geometry.clone(), phraseState.ground_material.clone(), 0);
  phraseState.ceiling.rotation.x = -Math.PI / 2;
  phraseState.ceiling.position.z = -50;
  phraseState.ceiling.position.y = 80;
  phraseState.ceiling.__dirtyPosition = true;
  scene.add(phraseState.ceiling);

  var cameraFollowState = {
    obj: null,
    offset: {x: 0, y: 0, z: 0},
  };
  var lightFollowState = {
    obj: null,
    offset: {x: 0, y: 0, z: 0}
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
      phraseState.phrases.forEach(function(phrase) {
        phrase.render();
      });
    }

    if (active.trapped) {
      trappedState.renderObjects.forEach(function(obj) {
        obj.render();
      });
    }

    if (cameraFollowState.obj) {
      camera.position.copy(cameraFollowState.obj.position).add(cameraFollowState.offset);
      camera.lookAt(cameraFollowState.obj.position);
    }
    if (lightFollowState.obj) {
      light.target.position.copy(lightFollowState.obj.position);
      light.position.addVectors(light.target.position, lightFollowState.offset);
    }

    renderer.render(scene, camera);
  }

  /*
   * * * * * UTILITY * * * * *
   */

  function clearScene(meshes) {
    if (!meshes) meshes = scene.children;

    for (var i = meshes.length - 1; i >= 0; i--) {
      var obj = meshes[ i ];
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

  function tweenCameraToTarget(position) {
    var tween1 = new TWEEN.Tween(camera.position).to(position)
    .easing(TWEEN.Easing.Linear.None).onUpdate(function() {
      camera.lookAt(camera.target);
    }).onComplete(function() {
      camera.lookAt(position);
    }).start();

    var tween2 = new TWEEN.Tween(camera.target).to(position)
    .easing(TWEEN.Easing.Linear.None).onUpdate(function() {
    }).onComplete(function() {
      camera.lookAt(position);
    }).start();
  }

  function fadeOverlay(fadein, callback, color, time) {
    if (!color) color = 'rgb(255, 255, 255)';
    if (!time) time = 4000;
    if (!callback) callback = function(){};

    if (fadein) {
      $('.overlay').css('background-color', color);
      $('.overlay').fadeIn(time, function() {
        callback();
      });
    } else {
      $('.overlay').fadeOut(time, function() {
        callback();
      });
    }
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

    setCameraPosition(0, 40, 10);

    var phraseInterval = setInterval(function() {
      var rw = new RonaldWord();
      rw.addTo(scene);
      phraseState.phrases.push(rw);
    }, 500);

    setTimeout(function() {
      fadeOverlay(true, function() {
        clearInterval(phraseInterval);

        var phraseMeshes = [
          phraseState.leftWall,
          phraseState.rightWall,
          phraseState.backWall,
          phraseState.frontWall,
          phraseState.ceiling,
          phraseState.ground
        ];
        phraseState.phrases.forEach(function(phrase) {
          phraseMeshes.push(phrase.mesh);
        });
        clearScene(phraseMeshes);
        active.phrases = false;
        enterTrappedState();
        fadeOverlay(false);
      });
    }, 1000);
  }

  function enterTrappedState() {
    active.ronalds = true;
    active.trapped = true;

    setCameraPosition(0, 0, 0);

    mainLight.position.set(0, 20, 0);
    mainLight.target.position.set(0, 5, -100);
    mainLight.intensity = 5.0;

    trappedState.ambientLight = new THREE.PointLight(0x40404, 1, 200);
    trappedState.ambientLight.position.set(0, 20, -100);
    scene.add(trappedState.ambientLight);

    kevinRonald = new Character({x: -100, y: 5, z: -170}, 20);
    kevinRonald.addTo(scene, function() {
      kevinRonald.rotate(0, Math.PI/4, 0);
    });

    dylanRonald = new Character({x: 100, y: 5, z: -170}, 20);
    dylanRonald.addTo(scene, function() {
      dylanRonald.rotate(0, -Math.PI/4, 0);
    });

    ronalds = [kevinRonald, dylanRonald];

    var mac = new Computer({x: -50, y: 0, z: -80}, 60);
    mac.addTo(scene, function() {
      mac.rotate(0, Math.PI/6, 0);
    });

    var pc = new Computer({x: 50, y: 0, z: -80}, 60);
    pc.addTo(scene, function() {
      pc.rotate(0, -Math.PI/6, 0);
    });

    trappedState.renderObjects = [mac, pc];

    kevinRonald.leftArm.collisionHandler = function() {
      kevinRonald.leftArm.move(-1, 0, -1);
    };

    setTimeout(function() {
      mac.becomeTransparent(0.002);
      pc.becomeTransparent(0.002);

      var shatterChecker = setInterval(function() {
        if (mac.shattering && pc.shattering) {
          clearInterval(shatterChecker);
          endScene();
        }
      }, 100);
    }, 2000);

    function endScene() {
      console.log('IM DONE WITH COMPUTER!!!');

      kevinRonald.reset(); dylanRonald.reset();

      var cameraPosition = {x: 0, y: 70, z: -500};
      setCameraPosition(cameraPosition.x, cameraPosition.y, cameraPosition.z);
      camera.lookAt({x: 0, y: 0, z: -100});
      //tweenCameraToTarget(cameraPosition);
    }

    $('body').keypress(function(ev) {
      ev.preventDefault();

      if (ev.which == 98) { // b
        kevinRonald.leftArm.move(1, 0, 1);
      }
      else if (ev.which == 110)  { // n
        kevinRonald.leftArm.move(-1, 0, -1);
      }
    });
  }

  function enterDesperateFleeState() {

  }

  function enterHeavenState() {

  }

  function enterEndgameState() {

  }

});
