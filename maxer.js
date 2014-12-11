
var osc = require('node-osc');

var PORT_MAX_SENDING = 12348;
var PORT_MAX_LISTENING = 12349;
var HOST = '127.0.0.1';

var START_SWELL_ADDRESS = '/startSwell';
var END_SWELL_ADDRESS = '/endSwell';
var START_KNEES_ADDRESS = '/startKnees';
var END_KNEES_ADDRESS = '/endKnees';
var START_ROTUP_ADDRESS = '/startRotUp';
var END_ROTUP_ADDRESS = '/endRotUp';
var START_ROTDOWN_ADDRESS = '/startRotDown';
var END_ROTDOWN_ADDRESS = '/endRotDown';
var HAND_DELTA_ADDRESS = '/handDelta';

var PHRASE_ADDRESS = '/phrase';
var WHOA_ADDRESS = '/whoa';
var KNOCK_ADDRESS = '/knock';
var ROCK_ADDRESS = '/rock';
var HEAVEN_ADDRESS = '/heaven';
var RUNNING_ADDRESS = '/running';
var HEAVEN_DONE = '/hotdog';

var signalMap = {};
signalMap[playerize(START_SWELL_ADDRESS, 1)] = 1;
signalMap[playerize(START_SWELL_ADDRESS, 2)] = 2;
signalMap[playerize(END_SWELL_ADDRESS, 1)] = 3;
signalMap[playerize(END_SWELL_ADDRESS, 2)] = 4;
signalMap[playerize(START_KNEES_ADDRESS, 1)] = 5;
signalMap[playerize(START_KNEES_ADDRESS, 2)] = 6;
signalMap[playerize(END_KNEES_ADDRESS, 1)] = 7;
signalMap[playerize(END_KNEES_ADDRESS, 2)] = 8;
signalMap[playerize(START_ROTUP_ADDRESS, 1)] = 9;
signalMap[playerize(START_ROTUP_ADDRESS, 2)] = 10;
signalMap[playerize(END_ROTUP_ADDRESS, 1)] = 11;
signalMap[playerize(END_ROTUP_ADDRESS, 2)] = 12;
signalMap[playerize(START_ROTDOWN_ADDRESS, 1)] = 13;
signalMap[playerize(START_ROTDOWN_ADDRESS, 2)] = 14;
signalMap[playerize(END_ROTDOWN_ADDRESS, 1)] = 15;
signalMap[playerize(END_ROTDOWN_ADDRESS, 2)] = 16;

var maxClient = new osc.Client(HOST, PORT_MAX_LISTENING);

module.exports.startSwell = function(player) {
  sendAddressSignalMapToMax(player, START_SWELL_ADDRESS);
}

module.exports.endSwell = function(player) {
  sendAddressSignalMapToMax(player, END_SWELL_ADDRESS);
}

module.exports.startKnees = function(player) {
  sendAddressSignalMapToMax(player, START_KNEES_ADDRESS);
}

module.exports.endKnees = function(player) {
  sendAddressSignalMapToMax(player, END_KNEES_ADDRESS);
}

module.exports.startElbowRotUp = function(player) {
  sendAddressSignalMapToMax(player, START_ROTUP_ADDRESS);
}

module.exports.startElbowRotDown = function(player) {
  sendAddressSignalMapToMax(player, START_ROTDOWN_ADDRESS);
}

module.exports.endElbowRotUp = function(player) {
  sendAddressSignalMapToMax(player, END_ROTUP_ADDRESS);
}

module.exports.endElbowRotDown = function(player) {
  sendAddressSignalMapToMax(player, END_ROTDOWN_ADDRESS);
}

module.exports.handDelta = function(player, mag) {
  var address = playerize(HAND_DELTA_ADDRESS, player);
  sendPacketToMax(address, mag);
}

module.exports.phrase = function(playerIndex, phraseIndex, velocity) {
  maxClient.send(PHRASE_ADDRESS, playerIndex - 1, phraseIndex, velocity.x, velocity.y, velocity.z);
}

module.exports.whoa = function(playerIndex) {
  maxClient.send(WHOA_ADDRESS, playerIndex - 1);
}

module.exports.knock = function(playerIndex) {
  maxClient.send(KNOCK_ADDRESS, playerIndex - 1);
}

module.exports.rock = function(index) {
  maxClient.send(ROCK_ADDRESS, index);
}

module.exports.heaven = function() {
  maxClient.send(HEAVEN_ADDRESS, 1);
}

module.exports.running = function() {
  maxClient.send(RUNNING_ADDRESS, 1);
}

module.exports.stopHeaven = function() {
  maxClient.send(HEAVEN_DONE, 1);
}

function playerize(address, player) {
  return address + '-' + player;
}

function sendAddressSignalMapToMax(player, address) {
  var trueAddress = playerize(address, player);
  sendPacketToMax(trueAddress, signalMap[trueAddress]);
}

function sendPacketToMax(address, args) {
  console.log('maxer sending ' + address);
  maxClient.send(address, args);
}
