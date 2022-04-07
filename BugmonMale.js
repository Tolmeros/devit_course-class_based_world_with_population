const Bugmon = require('./Bugmon.js');
const helpers = require('./helpers.js');

module.exports = class BugmonMale extends Bugmon {
  #age;
  #weight;

  constructor() {
    super(Bugmon.PHYSICAL_GENDER_MALE, [4,7]);
  }

  changeWeight(age, weight) {
    if (age < 10) {
      return weight + helpers.getRandomInt(2, 5);
    }
    else if (age < 20) {
      return weight + helpers.getRandomInt(-1, 5);
    }
    else if (age < 30) {
      return weight + helpers.getRandomInt(-5, 5);
    }
    else {
      return weight + helpers.getRandomInt(-5, 2);
    }

    return weight;
  }

  changeReproduceAbility(age, weight) {
    return (age > 8) && (weight<60) && (weight>10);
  }

}
