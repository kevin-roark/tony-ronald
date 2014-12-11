$(function() {

  var kt = require('./lib/kutility');
  var BodyPart = require('./bodypart');
  var Character = require('./character');
  var io = require('./io');
  var RonaldWord = require('./ronald_word');
  var Computer = require('./computer');
  var Artifact = require('./artifact');
  var mn = require('./model_names');
  var Hand = require('./hand');
  var Human = require('./human');
  var Billboard = require('./billboard');
  var Hotdog = require('./hotdog');
  var SKYBOX = require('./skybox');

  var TEST_MODE = false;

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
    if (active.desperate) {
      desperateState.physicsUpdate();
    }
    if (active.heaven) {
      heavenState.physicsUpdate();
    }
    if (active.endgame) {
      finalState.render();
    }

    scene.simulate(undefined, 1);
  });

  var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 20000);
  camera.target = {x: 0, y: 0, z: 0};
  scene.add(camera);

  // mainLight shinin from above casting shadows and the like
  var mainLight = new THREE.DirectionalLight(0xffffff);
  mainLight.position.set(20, 20, -10);
  mainLight.target.position.copy(scene.position);
  mainLight.castShadow = true;
  scene.add(mainLight);

  var tonyRonaldVideo = document.querySelector('#tony-ronald');
  var chatroomVideo = document.querySelector('#chatroom');
  console.log(chatroomVideo);
  var ronaldGUI = $('#ronald-gui');

  io.eventHandler = function(event, data) {
    console.log('io event: ' + event);

    if (event == 'phraseBlast') {
      var rw = new RonaldWord(data.player, undefined, {position: data.pos, velocity: data.vel});
      rw.addTo(scene);
      phraseState.phrases.push(rw);

      io.socket.emit('phrase', data.player, rw.phraseIndex, data.vel);
    }
    else if (event == 'shatter') {
      if (trappedState.mac) trappedState.mac.shatterable = true;
      if (trappedState.pc) trappedState.pc.shatterable = true;
    }
  };

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

  var cameraFollowState = {
    target: null,
    offset: {x: 0, y: 0, z: 0},
  };
  var lightFollowState = {
    target: null,
    offset: {x: 0, y: 0, z: 0}
  };

  kevinRonald = new Character({x: -700, y: -200, z: -1000}, 20);
  kevinRonald.addTo(scene);

  dylanRonald = new Character({x: -600, y: -200, z: -1000}, 20);
  dylanRonald.addTo(scene);
  var ronalds = [kevinRonald, dylanRonald];

  /*
   * * * * * STARTIN AND RENDERIN * * * * *
   */

  start();
  function start() {
    if (!TEST_MODE) {
      io.begin(kevinRonald, dylanRonald, camera);
    }

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
        if (cameraFollowState.offset) {
          cameraFollowState.offset.x += -1;
        }
      }
      else if (ev.which == 119)  { // up
        moveCameraPosition(0, 0, 1);
        if (cameraFollowState.offset) {
          cameraFollowState.offset.y += 1;
        }
      }
      else if (ev.which == 100)  { // right
        moveCameraPosition(1, 0, 0);
        if (cameraFollowState.offset) {
          cameraFollowState.offset.x += 1;
        }
      }
      else if (ev.which == 115)  { // down
        moveCameraPosition(0, 0, -1);
        if (cameraFollowState.offset) {
          cameraFollowState.offset.y += -1;
        }
      }
      else if (ev.which == 113) { // q
        moveCameraPosition(0, 1, 0);
        if (cameraFollowState.offset) {
          cameraFollowState.offset.z += 1;
        }
      }
      else if (ev.which == 101) { // e
        moveCameraPosition(0, -1, 0);
        if (cameraFollowState.offset) {
          cameraFollowState.offset.z += -1;
        }
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

    if (active.desperate) {
      desperateState.render();
    }

    if (active.heaven) {
      heavenState.render();
    }

    if (active.endgame) {
      finalState.render();
    }

    if (cameraFollowState.target) {
      camera.position.copy(cameraFollowState.target).add(cameraFollowState.offset);
      camera.lookAt(cameraFollowState.target);
    }
    if (lightFollowState.target) {
      mainLight.target.position.copy(lightFollowState.target);
      mainLight.position.addVectors(mainLight.target.position, lightFollowState.offset);
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

  function flash(text, timeout) {
    if (!text) return;
    if (!timeout) timeout = 200;

    $('#flash').text(text);
    $('#flash').show();
    setTimeout(function() {
      $('#flash').hide();
    }, timeout);
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

  function middlePosition(p1, p2) {
    return {x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2, z: (p1.z + p2.z) / 2}
  }

  function negrand(scalar) {
    return (Math.random() - 0.5) * scalar;
  }

  function moveTowardsTarget(pos, target, amt) {
    if (pos.x < target.x) {
      pos.x += amt.x;
    } else if (pos.x > target.x) {
      pos.x -= amt.x;
    }

    if (pos.y < target.y) {
      pos.y += amt.y;
    } else if (pos.y > target.y) {
      pos.y -= amt.y;
    }

    if (pos.z < target.z) {
      pos.z += amt.z;
    } else if (pos.z > target.z) {
      pos.z -= amt.z;
    }
  }

  function distanceMagnitude(pos1, pos2) {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y) + Math.abs(pos1.z - pos2.z);
  }

  /*
   * * * * * STATE CHANGES * * * * *
   */

  function enterPhrasesState() {
    active.phrases = true;
    io.mode = io.PHRASE;

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

    setCameraPosition(0, 40, 10);

    if (TEST_MODE) {
      var phraseInterval = setInterval(function() {
        var rw = new RonaldWord();
        rw.addTo(scene);
        phraseState.phrases.push(rw);
      }, 500);
    }

    var time = TEST_MODE? 3000 : 60000;
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
    }, time);
  }

  function enterTrappedState() {
    flash('RONALD IS BORN');

    active.ronalds = true;
    active.trapped = true;
    io.mode = io.KNOCK;

    setCameraPosition(0, 0, 0);

    mainLight.position.set(0, 20, 0);
    mainLight.target.position.set(0, 5, -100);
    mainLight.intensity = 5.0;

    trappedState.ambientLight = new THREE.PointLight(0x40404, 1, 200);
    trappedState.ambientLight.position.set(0, 20, -100);
    scene.add(trappedState.ambientLight);

    kevinRonald.moveTo(-100, 15, -170);
    kevinRonald.rotate(0, Math.PI/4, 0);

    dylanRonald.moveTo(100, 15, -170);
    dylanRonald.rotate(0, -Math.PI/4, 0);

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
    trappedState.mac = mac;
    trappedState.pc = pc;

    kevinRonald.leftArm.collisionHandler = function() {
      kevinRonald.leftArm.move(-1, 0, -1);
    };

    var time = TEST_MODE? 1000 : 20000;
    setTimeout(function() {
      mac.becomeTransparent(0.02);
      pc.becomeTransparent(0.02);

      var shatterChecker = setInterval(function() {
        if (mac.shattering && pc.shattering) {
          clearInterval(shatterChecker);
          endScene();
        }
      }, 100);
    }, time);

    function endScene() {
      console.log('IM DONE WITH COMPUTER!!!');

      kevinRonald.moveTo(-100, 5, -170);
      dylanRonald.moveTo(100, 5, -170);

      var cameraPosition = {x: 0, y: 40, z: -370};
      setCameraPosition(cameraPosition.x, cameraPosition.y, cameraPosition.z);
      camera.lookAt({x: 0, y: 0, z: -100});
      //tweenCameraToTarget(cameraPosition);

      active.trapped = false;
      enterDesperateFleeState();
    }

    $('body').keypress(function(ev) {
      ev.preventDefault();

      if (ev.which == 98) { // b
        kevinRonald.leftArm.move(3, 0, 3);
      }
      else if (ev.which == 110)  { // n
        kevinRonald.leftArm.move(-3, 0, -3);
      }
    });
  }

  function enterDesperateFleeState() {
    console.log('I AM DESPERATE NOW');
    flash('RONALD ESCAPES');

    var groundLength = 2500;
    var darkLength = 1000;
    var endRainZ = groundLength;
    var endZ = groundLength + darkLength;
    var numberOfArtifactTypes = 5;

    active.desperate = true;
    io.mode = io.RUN;

    desperateState.render = function() {
      var middle = middlePosition(kevinRonald.head.mesh.position, dylanRonald.head.mesh.position);
      middle.z += 70;
      cameraFollowState.target = middle;
      cameraFollowState.offset = {x: 0, y: 40, z: -270};
      lightFollowState.target = middle;
      lightFollowState.offset = {x: 10, y: 20, z: -60};

      if (middle.z > endZ) {
        endState();
      }
      else if (!desperateState.dark && middle.z > endRainZ) {
        darkTime();
      }
    };
    desperateState.physicsUpdate = function() {
      dylanRonald.resetMovement();
      kevinRonald.resetMovement();
    };

    var groundTexture = THREE.ImageUtils.loadTexture('/images/circuit.jpg');
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(6, 24);

    desperateState.ground_material = Physijs.createMaterial(
      new THREE.MeshBasicMaterial({map: groundTexture, side: THREE.DoubleSide}),
      .8, .4
    );
    desperateState.ground_geometry = new THREE.PlaneGeometry(500, groundLength * 2);
    desperateState.ground = new Physijs.BoxMesh(desperateState.ground_geometry, desperateState.ground_material, 0);
    desperateState.ground.rotation.x = -Math.PI / 2;
    desperateState.ground.position.y = -30;
    desperateState.ground.ground = true;
    scene.add(desperateState.ground);

    scene.setGravity(new THREE.Vector3(0, -100, 0));

    if (TEST_MODE) {
      var dummyForwardInterval = setInterval(function() {
        var z = Math.random() * 0.5 + 10;
        kevinRonald.walk(negrand(6), 0, z);
        dylanRonald.walk(negrand(6), 0, z);
      }, 30);
    }

    desperateState.artifacts = [];
    rainArtifacts();
    function rainArtifacts() {
      var middle = middlePosition(kevinRonald.head.mesh.position, dylanRonald.head.mesh.position);
      var future = {x: middle.x + negrand(400), y: kt.randInt(10), z: middle.z + Math.random() * 320 + 80};

      var percentageThroughRain = Math.min(0.99, Math.max(0, middle.z / endRainZ));
      var artifactIndex = Math.floor(percentageThroughRain * numberOfArtifactTypes);
      var artifact = new Artifact(future, Math.random() * 20 + 9.8, false, artifactIndex);
      desperateState.artifacts.push(artifact);
      artifact.addTo(scene);

      if (desperateState.artifacts.length > 300) {
        var firstArtifact = desperateState.artifacts.shift();
        scene.remove(firstArtifact.mesh);
      }

      if (!desperateState.stopRaining) {
        setTimeout(rainArtifacts, kt.randInt(107, 26));
      }
      else {
        setTimeout(function() {
          desperateState.artifacts.forEach(function(artifact) {
            scene.remove(artifact.mesh);
          });
        }, 10000);
      }
    }

    function darkTime() {
      console.log('IT IS DARK TIME');
      desperateState.dark = true;
      desperateState.stopRaining = true;
    }

    function endState() {
      clearInterval(dummyForwardInterval);

      active.desperate = false;
      enterHeavenState();
    }
  }

  function enterHeavenState(startGrassZ) {
    console.log('I AM HEAVEN NOW');
    flash('RONALD LIVES');

    if (!startGrassZ) startGrassZ = 4500;

    var groundLength = 3000;
    var heavenGroundZ = startGrassZ + groundLength / 2;
    var massiveComputerZ = startGrassZ + groundLength;
    var numberOfArtifactTypes = 5;
    var grassPath = '/images/grass.jpg';

    active.heaven = true;
    var grassMeshes = [];

    var patchTexture = THREE.ImageUtils.loadTexture(grassPath);
    heavenState.render = function() {
      var middle = middlePosition(kevinRonald.head.mesh.position, dylanRonald.head.mesh.position);
      middle.z += 70;

      if (!heavenState.reachedComputer) {
        cameraFollowState.target = middle;
        cameraFollowState.offset = {x: 0, y: 40, z: -270};
        lightFollowState.target = middle;
        lightFollowState.offset = {x: 10, y: 20, z: -60};
      }

      var distFromStartGrass = startGrassZ - middle.z;

      if (distFromStartGrass > 0) {
        var count = Math.min(10, Math.max(1, (800 - distFromStartGrass) / 100));
        for (var i = 0; i < count; i++) {
          var size = kt.randInt(9, 1);
          var grassGeometry = new THREE.PlaneGeometry(size, size);
          var grassMaterial = new THREE.MeshBasicMaterial({
            map: patchTexture,
            side: THREE.DoubleSide
          });
          var grassMesh = new THREE.Mesh(grassGeometry, grassMaterial);
          grassMesh.rotation.x = -Math.PI / 2;
          grassMesh.position.z = middle.z + kt.randInt(100);
          grassMesh.position.y = -29;
          grassMesh.position.x = negrand(400);
          scene.add(grassMesh);
        }
      }
      else {
        if (!heavenState.startedRaining) {
          rainArtifacts();
          heavenState.startedRaining = true;
        }

        if (distFromStartGrass < -100) {
          grassMeshes.forEach(function(grassMesh) {
            scene.remove(grassMesh);
          });
        }
      }

      if (middle.z >= massiveComputerZ - 1150 && !heavenState.visualizedComputer) {
        heavenState.visualizedComputer = true;
        heavenState.massiveComputer.material.opacity = 0.33;
      }
      if (middle.z >= massiveComputerZ - 250 && !heavenState.reachedComputer) {
        heavenState.reachedComputer = true;
        reachedComputer();
      }

      if (heavenState.bigGirlHand) {
        heavenState.bigGirlHand.render();
      }
      if (heavenState.massiveComputer) {
        heavenState.massiveComputer.render();
      }
    };
    heavenState.physicsUpdate = function() {
      dylanRonald.resetMovement();
      kevinRonald.resetMovement();

      if (heavenState.bigGirlHand) {
        heavenState.bigGirlHand.resetMovement();
      }
    };

    heavenState.skybox = SKYBOX.create(undefined, '/images/mountain.jpg');
    scene.add(heavenState.skybox);

    heavenState.skyBlocker = SKYBOX.blocker();
    scene.add(heavenState.skyBlocker);

    var grassTexture = THREE.ImageUtils.loadTexture(grassPath);
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(4, 20);

    heavenState.ground_material = Physijs.createMaterial(
      new THREE.MeshBasicMaterial({map: grassTexture, side: THREE.DoubleSide}),
      .8, .4
    );
    heavenState.ground_geometry = new THREE.PlaneGeometry(500, groundLength);
    heavenState.ground = new Physijs.BoxMesh(heavenState.ground_geometry, heavenState.ground_material, 0);
    heavenState.ground.rotation.x = -Math.PI / 2;
    heavenState.ground.position.y = -30;
    heavenState.ground.position.z = heavenGroundZ;
    heavenState.ground.ground = true;
    scene.add(heavenState.ground);

    heavenState.massiveComputer = new Computer({x: 0, y: 300, z: massiveComputerZ}, 600, 1000);
    heavenState.massiveComputer.twitchIntensity = 5;
    heavenState.massiveComputer.addTo(scene, function() {
      heavenState.massiveComputer.material.opacity = 0.01;
    });

    if (TEST_MODE) {
      var dummyForwardInterval = setInterval(function() {
        var z = Math.random() * 0.5 + 10;
        kevinRonald.walk(negrand(3), 0, z);
        dylanRonald.walk(negrand(3), 0, z);
      }, 30);
    }

    heavenState.artifacts = [];
    function rainArtifacts() {
      var middle = middlePosition(kevinRonald.head.mesh.position, dylanRonald.head.mesh.position);
      var future = {x: middle.x + negrand(400), y: kt.randInt(10), z: middle.z + Math.random() * 200 + 80};

      var percentageThroughGrass = Math.min(0.99, Math.max(0, (middle.z - startGrassZ) / (massiveComputerZ - startGrassZ)));
      var artifactIndex = Math.floor(percentageThroughGrass * numberOfArtifactTypes);
      var artifact = new Artifact(future, Math.random() * 20 + 9.8, true, artifactIndex);
      heavenState.artifacts.push(artifact);
      artifact.addTo(scene);

      if (heavenState.artifacts.length > 300) {
        var firstArtifact = heavenState.artifacts.shift();
        scene.remove(firstArtifact.mesh);
      }

      heavenState.skyBlocker.material.opacity = Math.max(0, heavenState.skyBlocker.material.opacity - 0.01);
      heavenState.skyBlocker.material.needsUpdate = true;

      if (!heavenState.stopRaining) {
        setTimeout(rainArtifacts, kt.randInt(107, 26));
      }
      else {
        setTimeout(function() {
          heavenState.artifacts.forEach(function(artifact) {
            scene.remove(artifact.mesh);
          });
        }, 10000);
      }
    }

    function reachedComputer() {
      console.log('I AM AT LINUX NOW');
      clearInterval(dummyForwardInterval);

      var currentTarget = cameraFollowState.target;
      var initY = currentTarget.y;
      cameraFollowState.target = null;
      cameraFollowState.offset = null;
      var aimCameraUpInterval = setInterval(function() {
        currentTarget.y += 0.4;
        camera.lookAt(currentTarget);

        if (currentTarget.y >= initY + 40) {
          clearInterval(aimCameraUpInterval);
          scene.remove(heavenState.skybox);
          scene.remove(heavenState.skyBlocker);
          addHand();
        }
      }, 10);

      function addHand() {
        var z = massiveComputerZ + 150;
        heavenState.bigGirlHand = new Hand({x: 0, y: 200, z: z}, 90);
        heavenState.bigGirlHand.mass = 500;
        heavenState.bigGirlHand.ignoreCollisons = true;
        heavenState.bigGirlHand.specificModelName = mn.BASE_HAND;
        heavenState.bigGirlHand.addTo(scene, function() {
          var material = heavenState.bigGirlHand.materials[0];
          material.color = new THREE.Color(198, 120, 86);
          material.needsUpdate = true;

          pokeHandMany(z, function() {
            setTimeout(function() { // lets give some time to twitch
              endState();
            }, 10000);
          });
        });
      }

      function endState() {
        heavenState.massiveComputer.knockable = false;
        heavenState.stopRaining = true;

        var time = 11000;

        var ascendInterval = setInterval(function() {
          kevinRonald.move(0, 0.5, 1);
          dylanRonald.move(0, 0.5, 1);
        }, 30);

        fadeOverlay(true, function() {
          clearInterval(ascendInterval);
          active.heaven = false;
          enterEndgameState(heavenState.massiveComputer);
        }, null, time);
      }

      function pokeHandMany(startZ, callback) {
        var dist = 60;
        var hand = heavenState.bigGirlHand;
        var pokeCount = 0;
        var maxPokes = 3;

        poke();
        function poke() {
          hand.pokeUntilCollision(dist, function() {
            pokeCount += 1;
            if (pokeCount < maxPokes) {
              setTimeout(poke, 1);
            } else {
              donePoking();
            }
          });
        }

        function donePoking() {
          heavenState.bigGirlHand.twitching = true;
          heavenState.bigGirlHand.fluctuating = true;
          callback();
        }
      }

    }
  }

  function enterEndgameState(linux) {
    console.log('IT IS TIME TO DIE RONALD');
    flash('RONALD?');
    active.endgame = true;
    io.mode = -1;

    scene.setGravity(new THREE.Vector3(0, 0, 0));

    // modify things from previous state y not
    heavenState.bigGirlHand.move(-300, 170, 400);
    linux.material.opacity = 0.975;
    linux.reset();
    linux.mesh.position.y = 200;
    kevinRonald.move(0, -5, -25);
    dylanRonald.move(0, -5, -25);

    var skybox = SKYBOX.create();
    scene.add(skybox);

    var girlZ = linux.mesh.position.z + 200;
    cameraFollowState.target = {x: 0, y: 50, z: girlZ};
    cameraFollowState.offset = {x: 500, y: 25, z: 50};
    lightFollowState.target = cameraFollowState.target;
    lightFollowState.offset = {x: 0, y: 40, z: 0};

    finalState.girl = new Human({x: 295, y: 50, z: girlZ - 10}, 29, 'girl');
    finalState.girl.addTo(scene);

    finalState.boy = new Human({x: -300, y: 50, z: girlZ - 50}, 45, 'boy');
    finalState.boy.addTo(scene);

    var tonyRonaldVideoStruct = {vid: tonyRonaldVideo};
    finalState.tonyRonaldScreen = new Billboard({x: -127, y: 280, z: girlZ - 165}, 1, tonyRonaldVideoStruct);
    finalState.tonyRonaldScreen.addTo(scene);

    var chatroomVideoStruct = {vid: chatroomVideo, width: 340, height: 120};
    finalState.chatroomScreen = new Billboard({x: -100, y: 75, z: girlZ - 165}, 1, chatroomVideoStruct);
    finalState.chatroomScreen.addTo(scene);

    finalState.hotdog = new Hotdog({x: 30, y: 110, z: girlZ - 145}, 25);
    finalState.hotdog.addTo(scene);

    finalState.keyboard = new BodyPart({x: 0, y: -10, z: girlZ - 30}, 15, '/js/models/keyboard.js');
    finalState.keyboard.addTo(scene);

    fadeOverlay(false, function() {
      girlGonnaTalkNow();
    }, null);

    finalState.render = function() {
      finalState.girl.render();
      if (finalState.tonyRonaldScreen) finalState.tonyRonaldScreen.render();
      if (finalState.chatroomScreen) finalState.chatroomScreen.render();
    };
    finalState.physicsUpdate = function() {

    };

    function girlGonnaTalkNow() {
      console.log('can you see me, ronald?');

      setTimeout(function() {
        tonyRonaldVideo.play();
        chatroomVideo.play();
        panToShowScreen();
      }, 4444);
    }

    function panToShowScreen() {
      var camTarget = {x: 0, z: girlZ, y: 120};
      var camOffset = {x: 0, z: 275, y: 6};
      var lightTarget = camTarget;
      var lightOffset = {x: 20, y: 40, z: 100};

      var amt = {x: 0.75, y: 0.15, z: 0.65};
      var thresh = 1;
      var panInterval = setInterval(function() {
        moveTowardsTarget(cameraFollowState.target, camTarget, amt);
        moveTowardsTarget(cameraFollowState.offset, camOffset, amt);
        moveTowardsTarget(lightFollowState.target, lightTarget, amt);
        moveTowardsTarget(lightFollowState.offset, lightOffset, amt);

        if (distanceMagnitude(cameraFollowState.target, camTarget) <= thresh &&
            distanceMagnitude(cameraFollowState.offset, camOffset) <= thresh &&
            distanceMagnitude(lightFollowState.target, lightTarget) <= thresh &&
            distanceMagnitude(lightFollowState.offset, lightOffset) <= thresh) {
              console.log('DONE PANNING');
              clearInterval(panInterval);
              startComputerActivity();
        }
      }, 20);
    }

    function startComputerActivity() {
      console.log('can u see the video and dress my ronald?');

      ronaldGUI.fadeIn(800);
    }

    // fallbacks to position the GUI
    finalState.movingGUI = false;
    $('body').keypress(function(ev) {
      ev.preventDefault();

      if (ev.which == 98) { // b
        finalState.movingGUI = !finalState.movingGUI;
      }
    });
    $('body').mousemove(function(ev) {
      if (finalState.movingGUI) {
        console.log(parseInt(ronaldGUI.css('left')));
        console.log(parseInt(ronaldGUI.css('top')));

        ronaldGUI.css('left', ev.clientX + 'px');
        ronaldGUI.css('top', ev.clientY + 'px');
      }
    });

    // reacting to button clicks in the GUI
    $('.ronald-button').click(function(ev) {
      var target = $(ev.target);
      var id = target[0].id;
      var shirtNumber = parseInt(id.replace('shirt', ''));
      finalState.hotdog.changeTeeShirt(shirtNumber);
    });
  }

});
