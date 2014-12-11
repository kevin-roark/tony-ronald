
var prefix = '/js/models/';

function pre(text) {
  return prefix + text;
}

/* LEGS */

module.exports.LOWPOLY_LEG = pre('low_poly_leg.js');

/* HEADS */

module.exports.LOWPOLY_HEAD = pre('low_poly_head.js');

/* ARMS */

module.exports.FOOTBALL_ARM = pre('football_arm.js');

module.exports.LOWPOLY_ARM = pre('low_poly_arm.js');

/* BODIES */

module.exports.FOOTBALL_TORSO = pre('football_torso.js');

module.exports.LOWPOLY_TORSO = pre('low_poly_torso.js');

/* HANDS */

module.exports.FOOTBALL_HAND = pre('football_hand.js');

module.exports.BASE_HAND = pre('base_hand.js');

/* FEET */

module.exports.FOOTBALL_FOOT = pre('football_foot.js');

/* HUMANS */

module.exports.TWEEN_GIRL = pre('manga.js');
module.exports.BOY = pre('chubby.js');

/* FUNCTIONS */

module.exports.loadModel = function(modelName, callback) {
  var loader = new THREE.JSONLoader;

  loader.load(modelName, function (geometry, materials) {
    callback(geometry, materials);
  });
}
