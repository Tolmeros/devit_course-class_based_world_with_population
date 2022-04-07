/*
Bugmon = [software] Bug Monster (like Pokemon)
*/

const helpers = require('./helpers.js')

module.exports = class Bugmon {
  static PHYSICAL_GENDER_MALE = "male";
  static PHYSICAL_GENDER_FEMALE = "female";
  static HUMAN_PHYSICAL_GENDERS = [
    Bugmon.PHYSICAL_GENDER_MALE,
    Bugmon.PHYSICAL_GENDER_FEMALE
  ];

  #age = 0;
  #physicalGender;
  #weight;
  #name;
  #eyesColor;
  #alive = true;
  #reproduceAbility = false;
  #kindOfCreature = 'bugmon'; // тогда Bugmon нужно наследовать от Creatures >.<

  static #generateInitialWeight(weight) {
    if (Array.isArray(weight)) {
      return helpers.getRandomInt(weight[0], weight[1]);
    }

    return weight;
  }

  constructor(gender, weight=10) {
    //console.log(`Bugmon.constructor: ${gender}`);
    // как сделать helper log - что бы он класс и метод сам писал?

    this.#physicalGender = gender;
    this.#weight = Bugmon.#generateInitialWeight(weight);

    //console.log(`Bugmon.constructor: weight = ${this.#weight}`);
  }

  grow(years=1) {
    if (this.#alive) {
      this.#age += years;
      //console.log(`Bugmon.grow: age ${this.#age} gender ${this.#physicalGender}`);

      this.#weight = this.changeWeight(this.#age, this.#weight);
      //console.log(`Bugmon.grow: weight ${this.#weight}`);

      //this.#reproduceAbility = this.changeReproduceAbility(this.#age, this.#weight);
      this.reproduceAbility = this.changeReproduceAbility(this.#age, this.#weight);
      //console.log(`Bugmon.grow: reproduceAbility ${this.#reproduceAbility}`);

      this.checkLifeParameters();

      return true;
    }
    return false;
  }

  changeReproduceAbility(age, weight) {
    return false;
  }

  changeWeight(age, weight) {
    if (age < 10) {
      return weight + 1;
    }

    return weight;
  }

  checkLifeParameters() {
    //console.log(`Bugmon.checkLifeParameters: weight ${this.#weight}`);
    //this.death();
    if ((this.#age <= 10) && (this.#weight < 2)) {
      this.death();
    }
    else if ((this.#age > 10) && (this.#weight < 16)) {
      this.death();
    }
  }

  death() {
    this.#alive = false;
  }

  get isAlive() {
    return this.#alive;
  }

  getBirthFrom(creature) {
    return null;
  }

  get gender() {
    return this.#physicalGender;
  }

  get reproduceAbility() {
    return this.#reproduceAbility;
  }

  set reproduceAbility(value) {
    // check if value bool
    this.#reproduceAbility = value;
  }

}
