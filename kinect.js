
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var osc = require('osc');
var maxer = require('./maxer');


app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
  if (req.socket.listeners('error').length) return next();
  req.socket.on('error', function(err){
    console.error(err.stack);
  });
  next();
});

server.listen(8888);
console.log('LISTENING ON 8888');

var browserSocket, forwarderSocket, phoneSocket1, phoneSocket2;


io.on('connection', function(socket) {
  /**
   * ROLL CALL
   */

  socket.on('rollcall', function(roll) {
    if (roll == 'browser') {
      browserSocket = this;
      console.log('got the browser socket');
    } else if (roll == 'forwarder') {
      forwarderSocket = this;
      setForwarderSocketEvents(forwarderSocket);
      console.log('got the forwarder socket');
    } else if (roll == 'phone1') {
      phoneSocket1 = this;
      setPhoneSocketEvents(phoneSocket1);
      console.log('got the first phone socket');
    } else if (roll == 'phone2') {
      phoneSocket2 = this;
      setPhoneSocketEvents(phoneSocket2);
      console.log('got the second phone socket');
    }
  });

  socket.on('showConnectedRolls', function() {
    var connectedRolls = {};

    if (browserSocket) {
      connectedRolls.browser = true;
    }

    if (forwarderSocket) {
      connectedRolls.forwarder = true;
    }

    if (phoneSocket1) {
      connectedRolls.phone1 = true;
    }

    if (phoneSocket2) {
      connectedRolls.phone2 = true;
    }

    socket.emit('connectedRolls', connectedRolls);
  });

  /**
   * STUFF FOR SENDING DATAM TO MAX FROM BROWSER
   */

  socket.on('startSwell', function(player) {
    maxer.startSwell(player);
  });

  socket.on('endSwell', function(player) {
    maxer.endSwell(player);
  });

  socket.on('startKnees', function(player) {
    maxer.startKnees(player);
  });

  socket.on('endKnees', function(player) {
    maxer.endKnees(player);
  });

  socket.on('startElbowRotUp', function(player) {
    maxer.startElbowRotUp(player);
  });

  socket.on('startElbowRotDown', function(player) {
    maxer.startElbowRotDown(player);
  });

  socket.on('endElbowRotUp', function(player) {
    maxer.endElbowRotUp(player);
  });

  socket.on('endElbowRotDown', function(player) {
    maxer.endElbowRotDown(player);
  });

  socket.on('handDelta', function(player, mag) {
    maxer.handDelta(player, mag);
  });

  socket.on('phrase', function(player, phraseIndex, velocity) {
    maxer.phrase(player, phraseIndex, velocity);
  });
  socket.on('artifact', function(player) {
    maxer.whoa(player);
  });
  socket.on('knock', function(player) {
    maxer.knock(player);
  });
  socket.on('rock', function(index) {
    maxer.rock(index);
  });
  socket.on('heaven', function() {
    maxer.heaven();
  });
  socket.on('running', function() {
    maxer.running();
  });
  socket.on('noHeaven', function() {
    maxer.stopHeaven();
  });
});

function setForwarderSocketEvents(forwarderSocket) {
  forwarderSocket.on('leftHand', function(oscPacket) {
    module.exports.leftHand(oscPacket.args, 2); // send left hand to browser
  });

  forwarderSocket.on('rightHand', function(oscPacket) {
    module.exports.rightHand(oscPacket.args, 2); // send right hand to browser
  });

  forwarderSocket.on('head', function(oscPacket) {
    module.exports.head(oscPacket.args, 2); // send head to browser
  });

  forwarderSocket.on('leftKnee', function(oscPacket) {
    module.exports.leftKnee(oscPacket.args, 2);
  });

  forwarderSocket.on('rightKnee', function(oscPacket) {
    module.exports.rightKnee(oscPacket.args, 2);
  });

  forwarderSocket.on('torso', function(oscPacket) {
    module.exports.torso(oscPacket.args, 2);
  });

  forwarderSocket.on('leftElbow', function(oscPacket) {
    module.exports.leftElbow(oscPacket.args, 2);
  });

  forwarderSocket.on('rightElbow', function(oscPacket) {
    module.exports.rightElbow(oscPacket.args, 2);
  });

  forwarderSocket.on('closestHand', function(oscPacket) {
    module.exports.closestHand(oscPacket.args, 2);
  });
}

function setPhoneSocketEvents(phoneSocket) {
  phoneSocket.on('resetPlayer', function(player) {
    if (browserSocket) browserSocket.emit('resetPlayer', player);
  });
  phoneSocket.on('endPhrases', function(player) {
    if (browserSocket) browserSocket.emit('endPhrases', player);
  });
  phoneSocket.on('transparentComputers', function(player) {
    if (browserSocket) browserSocket.emit('transparentComputers', player);
  });
  phoneSocket.on('phoneShatter', function(player) {
    if (browserSocket) browserSocket.emit('phoneShatter', player);
  });
  phoneSocket.on('endPokes', function(player) {
    if (browserSocket) browserSocket.emit('endPokes', player);
  });
}

module.exports.leftHand = function(argString, kinectNum) {
  emit('leftHand', argString, kinectNum);
}

module.exports.rightHand = function(argString, kinectNum) {
  emit('rightHand', argString, kinectNum);
};

module.exports.head = function(argString, kinectNum) {
  emit('head', argString, kinectNum);
};

module.exports.leftKnee = function(argString, kinectNum) {
  emit('leftKnee', argString, kinectNum);
}

module.exports.rightKnee = function(argString, kinectNum) {
  emit('rightKnee', argString, kinectNum);
}

module.exports.leftElbow = function(argString, kinectNum) {
  emit('leftElbow', argString, kinectNum);
}

module.exports.rightElbow = function(argString, kinectNum) {
  emit('rightElbow', argString, kinectNum);
}

module.exports.torso = function(argString, kinectNum) {
  emit('torso', argString, kinectNum);
}

module.exports.closestHand = function(argString, kinectNum) {
  emit('closestHand', argString, kinectNum);
}

function emit(name, argString, kinectNum) {
  if (!kinectNum) kinectNum = 1;

  var position = parsePositionString(argString);

  if (browserSocket) {
    browserSocket.emit(name, {position: position, wrestler: kinectNum});
  }
}

// example: 340.5114440917969,448.6510925292969,776.2993774414062
function parsePositionString(positionString) {
  var numbers = positionString;

  var x = parseFloat(numbers[0]);
  var y = parseFloat(numbers[1]);
  var z = parseFloat(numbers[2]);

  return {x: x, y: y, z: z};
}
