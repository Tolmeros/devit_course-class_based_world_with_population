const Bugmon = require('./Bugmon.js');
const BugmonMale = require('./BugmonMale.js');
const helpers = require('./helpers.js');

module.exports = class BugmonFemale extends Bugmon {
  #reproductionBan = 0;

  constructor(eyesColor) {
    super(Bugmon.PHYSICAL_GENDER_FEMALE, [3,5], eyesColor);

  }

  changeWeight(age, weight) {
    if (age < 15) {
      return weight + helpers.getRandomInt(1, 3);
    }
    else if (age < 25) {
      return weight + helpers.getRandomInt(-1, 3);
    }
    else if (age < 35) {
      return weight + helpers.getRandomInt(-2, 2);
    }
    else {
      return weight + helpers.getRandomInt(-3, 2);
    }

    return weight;
  }

  changeReproduceAbility(age, weight) {
    if (this.#reproductionBan > 0) {
      this.#reproductionBan--;
      return false;
    }
    return (age > 10) && (weight<80) && (weight>23);
  }

  getBirthFrom(creature) {
    if (this.reproduceAbility &&
        creature.reproduceAbility &&
        (helpers.getRandomInt(0, 101) < 60)
      ) {

        let eyeChance = helpers.getRandomInt(0, 101);
        let eyesColor;
        if (eyeChance < 40) {
          eyesColor = this.eyesColor;
        }
        else if (eyeChance < 80) {
          eyesColor = creature.eyesColor;
        }
        else {
          let otherColors = helpers.arrayWithoutElements(
            Bugmon.BUGMON_EYES_COLOR,
            [this.eyesColor, creature.eyesColor]
          );
          eyesColor = helpers.getRandomElemetFromArray(otherColors);
        }

        let child = (helpers.getRandomInt(0, 101) < 57) ?
          new BugmonFemale(eyesColor) : new BugmonMale(eyesColor);

        this.#reproductionBan = helpers.getRandomInt(1, 3);
        this.reproduceAbility = false;
        // change weight

        return child;
    }

    return null;
  }

}
