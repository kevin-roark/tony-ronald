
var SERVER_IP = '169.254.219.115';

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

var buttons = [$('#reset-button')];

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

$('#reset-button').click(function() {
  socket.emit('resetPlayer', playerNum);
});
