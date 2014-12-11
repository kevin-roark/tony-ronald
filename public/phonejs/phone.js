
var SERVER_IP = '169.254.138.240';

var socket = io('http://' + SERVER_IP + ':8888');

var playerNum = 0;

socket.on('connectedRolls', function(connectedRolls) {
  if (connectedRolls.phone1) {
    socket.emit('rollcall', 'phone2');
    playerNum = 2;
  } else {
    socket.emit('rollcall', 'phone1');
    playerNum = 1;
  }
});

socket.emit('showConnectedRolls');

var buttons = [$('#end-phrase'), $('#computer-transparent'), $('#shatter'), $('#end-pokes')];

buttons.forEach(function(button) {
  button.mousedown(function() {
    button.addClass('active');
  });

  button.mouseup(function() {
    setTimeout(function() {
      button.removeClass('active');
    }, 500);
  });
});

$('#end-phrase').click(function() {
  socket.emit('endPhrases', playerNum);
});

$('#computer-transparent').click(function() {
  socket.emit('transparentComputers', playerNum);
});

$('#shatter').click(function() {
  socket.emit('phoneShatter', playerNum);
});

$('#end-pokes').click(function() {
  socket.emit('endPokes', playerNum);
});
