
var PORT_FROM_KINECT = 12345; // also 12347
var HOST = '127.0.0.1';
var KEVIN_HOST = '160.39.255.239';

var osc = require('osc');

var kinect = require('./kinect');

var udpPort = new osc.UDPPort({
    localAddress: HOST,
    localPort: PORT_FROM_KINECT
});

var udpPort2 = new osc.UDPPort({
    localAddress: KEVIN_HOST,
    localPort: PORT_FROM_KINECT
});

// Listen for incoming OSC bundles.
udpPort.on("bundle", function (oscBundle) {
   for (var i = 0; i < oscBundle.packets.length; i++) {
     var packet = oscBundle.packets[i];

     if (packet.address == '/righthand_pos_screen') {
       kinect.rightHand(packet.args);
     } else if (packet.address == '/lefthand_pos_screen') {
       kinect.leftHand(packet.args);
     } else if (packet.address == '/head_pos_screen') {
       kinect.head(packet.args);
     } else if (packet.address == '/leftknee_pos_screen') {
       kinect.leftKnee(packet.args);
     } else if (packet.address == '/rightknee_pos_screen') {
       kinect.rightKnee(packet.args);
     } else if (packet.address == '/torso_pos_screen') {
       kinect.torso(packet.args);
     } else if (packet.address == '/leftelbow_pos_screen') {
       kinect.leftElbow(packet.args);
     } else if (packet.address == '/rightelbow_pos_screen') {
       kinect.rightElbow(packet.args);
     } else if (packet.address == '/closesthand_pos_screen') {
       kinect.closestHand(packet.args);
     }
   }
});

// Open the socket.
udpPort.open();
