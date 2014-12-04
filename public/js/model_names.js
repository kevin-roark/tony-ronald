
var prefix = '/js/models/';

function pre(text) {
  return prefix + text;
}

/* LEGS */

module.exports.ANIMAL_LEGS = pre('animal_legs.js');

module.exports.BABY_LEG = pre('baby_leg.js');

module.exports.FOOTBALL_LEG = pre('football_leg.js');

module.exports.LOWPOLY_LEG = pre('low_poly_leg.js');

/* HEADS */

module.exports.ANIME_HEAD = pre('anime_heads.js');

module.exports.HEAD = pre('head.js');

module.exports.BABY_HEAD = pre('baby_head.js');

module.exports.FOOTBALL_HEAD = pre('football_head.js');

module.exports.LOWPOLY_HEAD = pre('low_poly_head.js');

/* ARMS */

module.exports.ARM = pre('arm.js');

module.exports.ARMS = pre('arms.js');

module.exports.BABY_ARM = pre('baby_arm.js');

module.exports.FOOTBALL_ARM = pre('football_arm.js');

module.exports.LOWPOLY_ARM = pre('low_poly_arm.js');

/* BODIES */

module.exports.CHILD = pre('child.js');

module.exports.FEMALE = pre('female.js');

module.exports.MALE = pre('male.js');

module.exports.TORSO = pre('torso.js');

module.exports.FOOTBALL_PLAYER = pre('football_player.js');

module.exports.BABY_TORSO = pre('baby_torso.js');

module.exports.FOOTBALL_TORSO = pre('football_torso.js');

module.exports.LOWPOLY_TORSO = pre('low_poly_torso.js');

/* HANDS */

module.exports.HAND = pre('hand.js');

module.exports.FOOTBALL_HAND = pre('football_hand.js');

/* FEET */

module.exports.FOOT = pre('foot.js');

module.exports.FOOTBALL_FOOT = pre('football_foot.js');

/* OBJECTS */

module.exports.BOXING_RING = pre('boxing_ring.js');

module.exports.FITNESS_TOWER = pre('fitness_tower.js');

module.exports.IPHONE = pre('iPhone.js');
module.exports.PHONE = pre('phone.js');
module.exports.OFFICE_PHONE = pre('office_phone.js');

module.exports.LAPTOP = pre('laptop.js');

module.exports.SHOWER = pre('shower.js');

module.exports.LOCKER = pre('locker.js');

module.exports.WEIGHTS = pre('weights.js');

/* FUNCTIONS */

module.exports.loadModel = function(modelName, callback) {
  var loader = new THREE.JSONLoader;

  loader.load(modelName, function (geometry, materials) {
    callback(geometry, materials);
  });
}
